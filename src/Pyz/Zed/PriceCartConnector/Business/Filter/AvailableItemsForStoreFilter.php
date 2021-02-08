<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceCartConnector\Business\Filter;

use ArrayObject;
use Generated\Shared\Transfer\CartPreCheckResponseTransfer;
use Generated\Shared\Transfer\MessageTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\DecimalObject\Decimal;
use Spryker\Zed\AvailabilityCartConnector\Business\Cart\CheckCartAvailability as SpyCheckCartAvailability;
use Spryker\Zed\AvailabilityCartConnector\Dependency\Facade\AvailabilityCartConnectorToAvailabilityInterface;
use Spryker\Zed\Cart\Dependency\Facade\CartToMessengerInterface;
use Spryker\Zed\PriceCartConnector\Business\Filter\ItemFilterInterface;

class AvailableItemsForStoreFilter extends SpyCheckCartAvailability implements ItemFilterInterface
{
    /**
     * @var \Spryker\Zed\Cart\Dependency\Facade\CartToMessengerInterface
     */
    protected $messengerFacade;

    /**
     * @param \Spryker\Zed\AvailabilityCartConnector\Dependency\Facade\AvailabilityCartConnectorToAvailabilityInterface $availabilityFacade
     * @param \Spryker\Zed\Cart\Dependency\Facade\CartToMessengerInterface $messengerFacade
     */
    public function __construct(
        AvailabilityCartConnectorToAvailabilityInterface $availabilityFacade,
        CartToMessengerInterface $messengerFacade
    ) {
        parent::__construct($availabilityFacade);

        $this->messengerFacade = $messengerFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function filterItems(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        $cartPreCheckResponseTransfer = new CartPreCheckResponseTransfer();
        $cartPreCheckResponseTransfer->setIsSuccess(true);

        $productsNotAvailableForStore = [];

        foreach ($quoteTransfer->getItems() as $itemTransfer) {
            $isSellable = $this->availabilityFacade->isProductSellableForStore(
                $itemTransfer->getSku(),
                new Decimal($itemTransfer->getQuantity()),
                $quoteTransfer->getStore()
            );

            if (!$isSellable) {
                array_push($productsNotAvailableForStore, $itemTransfer->getSku());
            }
        }

        $this->addErrorMessageForNotAvailableProducts($productsNotAvailableForStore);
        $quoteTransfer = $this->removeItemsNotSellable($quoteTransfer, $productsNotAvailableForStore);

        return $quoteTransfer;
    }

    /**
     * @param array $productsNotAvailableForStore
     *
     * @return void
     */
    protected function addErrorMessageForNotAvailableProducts(array $productsNotAvailableForStore): void
    {
        if (!empty($productsNotAvailableForStore)) {
            $this->messengerFacade->addErrorMessage(
                $this->createMessengerMessageTransfer(static::CART_PRE_CHECK_AVAILABILITY_EMPTY)
            );
        }
    }

    /**
     * @param string $message
     * @param array $parameters
     *
     * @return \Generated\Shared\Transfer\MessageTransfer
     */
    protected function createMessengerMessageTransfer(string $message, array $parameters = []): MessageTransfer
    {
        $messageTransfer = new MessageTransfer();
        $messageTransfer->setValue($message);
        $messageTransfer->setParameters($parameters);

        return $messageTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param array $productNotAvailableSkus
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    protected function removeItemsNotSellable(QuoteTransfer $quoteTransfer, array $productNotAvailableSkus): QuoteTransfer
    {
        foreach ($productNotAvailableSkus as $sku) {
            $key = $this->findItemKeyBySku($quoteTransfer->getItems(), $sku);
            if ($key !== null) {
                $quoteTransfer->getItems()->offsetUnset($key);
            }
        }

        return $quoteTransfer;
    }

    /**
     * @param \ArrayObject $itemTransfers
     * @param string $sku
     *
     * @return int|null
     */
    protected function findItemKeyBySku(ArrayObject $itemTransfers, string $sku): ?int
    {
        foreach ($itemTransfers as $key => $itemTransfer) {
            if ($itemTransfer->getSku() === $sku) {
                return (int)$key;
            }
        }

        return null;
    }
}
