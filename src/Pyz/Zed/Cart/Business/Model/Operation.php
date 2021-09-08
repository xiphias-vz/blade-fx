<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cart\Business\Model;

use Generated\Shared\Transfer\CartChangeTransfer;
use Generated\Shared\Transfer\QuoteResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Cart\Business\Model\Operation as SprykerOperation;
use Spryker\Zed\Cart\Business\StorageProvider\StorageProviderInterface;
use Spryker\Zed\Cart\CartConfig;
use Spryker\Zed\Cart\Dependency\Facade\CartToCalculationInterface;
use Spryker\Zed\Cart\Dependency\Facade\CartToMessengerInterface;
use Spryker\Zed\Cart\Dependency\Facade\CartToQuoteFacadeInterface;
use Spryker\Zed\CartExtension\Dependency\Plugin\TerminationAwareCartPreCheckPluginInterface;

class Operation extends SprykerOperation
{
    /**
     * @var \Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface[]
     */
    protected $preCheckPlugins;

    /**
     * @param \Spryker\Zed\Cart\Business\StorageProvider\StorageProviderInterface $cartStorageProvider
     * @param \Spryker\Zed\Cart\Dependency\Facade\CartToCalculationInterface $calculationFacade
     * @param \Spryker\Zed\Cart\Dependency\Facade\CartToMessengerInterface $messengerFacade
     * @param \Spryker\Zed\Cart\Dependency\Facade\CartToQuoteFacadeInterface $quoteFacade
     * @param \Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface[] $itemExpanderPlugins
     * @param \Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface[] $preCheckPlugins
     * @param \Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationPostSavePluginInterface[] $postSavePlugins
     * @param \Spryker\Zed\CartExtension\Dependency\Plugin\CartTerminationPluginInterface[] $terminationPlugins
     * @param \Spryker\Zed\CartExtension\Dependency\Plugin\CartRemovalPreCheckPluginInterface[] $cartRemovalPreCheckPlugins
     * @param \Spryker\Zed\CartExtension\Dependency\Plugin\PostReloadItemsPluginInterface[] $postReloadItemsPlugins
     * @param \Spryker\Zed\CartExtension\Dependency\Plugin\CartChangeTransferNormalizerPluginInterface[] $cartBeforePreCheckNormalizerPlugins
     */
    public function __construct(
        StorageProviderInterface $cartStorageProvider,
        CartToCalculationInterface $calculationFacade,
        CartToMessengerInterface $messengerFacade,
        CartToQuoteFacadeInterface $quoteFacade,
        array $itemExpanderPlugins,
        array $preCheckPlugins,
        array $postSavePlugins,
        array $terminationPlugins,
        array $cartRemovalPreCheckPlugins,
        array $postReloadItemsPlugins,
        array $cartBeforePreCheckNormalizerPlugins
    ) {
        $this->cartStorageProvider = $cartStorageProvider;
        $this->calculationFacade = $calculationFacade;
        $this->messengerFacade = $messengerFacade;
        $this->quoteFacade = $quoteFacade;
        $this->itemExpanderPlugins = $itemExpanderPlugins;
        $this->preCheckPlugins = $preCheckPlugins;
        $this->postSavePlugins = $postSavePlugins;
        $this->terminationPlugins = $terminationPlugins;
        $this->cartRemovalPreCheckPlugins = $cartRemovalPreCheckPlugins;
        $this->postReloadItemsPlugins = $postReloadItemsPlugins;
        $this->cartBeforePreCheckNormalizerPlugins = $cartBeforePreCheckNormalizerPlugins;
    }

    /**
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteResponseTransfer
     */
    public function addToCart(CartChangeTransfer $cartChangeTransfer): QuoteResponseTransfer
    {
        $cartChangeTransfer->requireQuote();
        $cartChangeTransfer->setOperation(CartConfig::OPERATION_ADD);

        $originalQuoteTransfer = (new QuoteTransfer())
            ->fromArray($cartChangeTransfer->getQuote()->modifiedToArray(), true);

        $quoteResponseTransfer = (new QuoteResponseTransfer())
            ->setIsSuccessful(false)
            ->setQuoteTransfer($originalQuoteTransfer);

        if ($this->quoteFacade->isQuoteLocked($originalQuoteTransfer)) {
            $this->messengerFacade->addErrorMessage($this->createMessengerMessageTransfer(static::GLOSSARY_KEY_LOCKED_CART_CHANGE_DENIED));

            return $this->addQuoteErrorsToQuoteResponse($quoteResponseTransfer);
        }

        $cartChangeTransfer = $this->normalizeCartChangeTransfer($cartChangeTransfer);
        $this->addInfoMessages(
            $this->getNotificationMessages($cartChangeTransfer)
        );

        $expandedCartChangeTransfer = $this->expandChangedItems($cartChangeTransfer);

        if (!$this->preCheckCart($cartChangeTransfer)) {
            return $this->addQuoteErrorsToQuoteResponse($quoteResponseTransfer);
        }

        $quoteTransfer = $this->cartStorageProvider->addItems($expandedCartChangeTransfer);
        $quoteTransfer = $this->executePostSavePlugins($quoteTransfer);
        $quoteTransfer = $this->recalculate($quoteTransfer);

        if ($this->isTerminated(static::TERMINATION_EVENT_NAME_ADD, $cartChangeTransfer, $quoteTransfer)) {
            return $quoteResponseTransfer;
        }

        $this->messengerFacade->addSuccessMessage($this->createMessengerMessageTransfer(self::ADD_ITEMS_SUCCESS));

        return $quoteResponseTransfer
            ->setQuoteTransfer($quoteTransfer)
            ->setIsSuccessful(true);
    }

    /**
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return bool
     */
    protected function preCheckCart(CartChangeTransfer $cartChangeTransfer)
    {
        $isCartValid = true;
        foreach ($this->preCheckPlugins as $preCheck) {
            $cartPreCheckResponseTransfer = $preCheck->check($cartChangeTransfer);
            if ($cartPreCheckResponseTransfer->getIsSuccess()) {
                continue;
            }

            $this->collectErrorsFromPreCheckResponse($cartPreCheckResponseTransfer);

            if ($preCheck instanceof TerminationAwareCartPreCheckPluginInterface && $preCheck->terminateOnFailure()) {
                return false;
            }

            $isCartValid = false;
        }

        return $isCartValid;
    }
}
