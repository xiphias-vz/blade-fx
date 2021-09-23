<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\AvailabilityCartConnector\Business\Cart;

use ArrayObject;
use Generated\Shared\Transfer\CartChangeTransfer;
use Generated\Shared\Transfer\CartPreCheckResponseTransfer;
use Generated\Shared\Transfer\MessageTransfer;
use Generated\Shared\Transfer\ProductAvailabilityCriteriaTransfer;
use Spryker\DecimalObject\Decimal;
use Spryker\Zed\AvailabilityCartConnector\Business\Cart\CheckCartAvailability as SpyCheckCartAvailability;

class CheckCartAvailability extends SpyCheckCartAvailability
{
    public const CART_PRE_CHECK_AVAILABILITY_NOT_SELLABLE = 'cart.pre.check.availability.failed.not.sellable';

    /**
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return \Generated\Shared\Transfer\CartPreCheckResponseTransfer
     */
    public function checkCartAvailability(CartChangeTransfer $cartChangeTransfer): CartPreCheckResponseTransfer
    {
        $cartPreCheckResponseTransfer = new CartPreCheckResponseTransfer();
        $cartPreCheckResponseTransfer->setIsSuccess(true);

        $httpAction = $_SERVER['REQUEST_URI'];
        $httpActionSplit = explode("/", $httpAction);
        $action = end($httpActionSplit);

        $storeTransfer = $this->getStoreTransfer($cartChangeTransfer);
        $itemsInCart = clone $cartChangeTransfer->getQuote()->getItems();

        $messages = new ArrayObject();
        foreach ($cartChangeTransfer->getItems() as $itemTransfer) {
            if ($itemTransfer->getAmount() !== null) {
                continue;
            }

            $currentItemQuantity = $this->calculateCurrentCartQuantityForGivenSku(
                $itemsInCart,
                $itemTransfer->getSku()
            );

            $currentItemQuantity += $itemTransfer->getQuantity();

            $productAvailabilityCriteriaTransfer = (new ProductAvailabilityCriteriaTransfer())
                ->fromArray($itemTransfer->toArray(), true);

            $isSellable = $this->availabilityFacade->isProductSellableForStore(
                $itemTransfer->getSku(),
                new Decimal($currentItemQuantity),
                $storeTransfer,
                $productAvailabilityCriteriaTransfer
            );

            if (!$isSellable) {
                $cartPreCheckResponseTransfer->setIsSuccess(false);
                $availability = $this->findProductConcreteAvailability($itemTransfer, $storeTransfer, $productAvailabilityCriteriaTransfer);

                if ($action != 'add-valid-items') {
                    $messages[] = $this->createItemIsNotAvailableMessageTransfer($availability, $itemTransfer->getName());
                } else {
                    $messages[] = $this->createItemIsNotAvailableMessageTransferForNotSellableItems($availability, $itemTransfer->getName());
                }
            }

            $itemsInCart->append($itemTransfer);
        }

        $cartPreCheckResponseTransfer->setMessages($messages);

        return $cartPreCheckResponseTransfer;
    }

    /**
     * @param \Spryker\DecimalObject\Decimal $availability
     * @param string $sku
     *
     * @return \Generated\Shared\Transfer\MessageTransfer
     */
    protected function createItemIsNotAvailableMessageTransferForNotSellableItems(Decimal $availability, string $sku): MessageTransfer
    {
        $translationKey = $this->getTranslationKeyForDeletedItems($availability);

        $messageTransfer = new MessageTransfer();
        $messageTransfer->setValue($translationKey);
        $messageTransfer->setParameters([
            static::STOCK_TRANSLATION_PARAMETER => $availability->trim()->toString(),
            static::SKU_TRANSLATION_PARAMETER => $sku,
        ]);

        return $messageTransfer;
    }

    /**
     * @param \Spryker\DecimalObject\Decimal $availability
     *
     * @return string
     */
    protected function getTranslationKeyForDeletedItems(Decimal $availability): string
    {
        $translationKey = static::CART_PRE_CHECK_AVAILABILITY_NOT_SELLABLE;
        if ($availability->lessThanOrEquals(0)) {
            $translationKey = static::CART_PRE_CHECK_AVAILABILITY_NOT_SELLABLE;
        }

        return $translationKey;
    }
}
