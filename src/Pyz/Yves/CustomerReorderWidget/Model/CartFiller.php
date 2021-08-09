<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerReorderWidget\Model;

use Generated\Shared\Transfer\OrderTransfer;
use SprykerShop\Yves\CustomerReorderWidget\Dependency\Client\CustomerReorderWidgetToCartClientInterface;
use SprykerShop\Yves\CustomerReorderWidget\Model\CartFiller as SprykerCartFiller;
use SprykerShop\Yves\CustomerReorderWidget\Model\ItemFetcherInterface;

class CartFiller extends SprykerCartFiller
{
    protected const PARAM_ORDER_REFERENCE = 'orderReference';

    /**
     * @param \SprykerShop\Yves\CustomerReorderWidget\Dependency\Client\CustomerReorderWidgetToCartClientInterface $cartClient
     * @param \SprykerShop\Yves\CustomerReorderWidget\Model\ItemFetcherInterface $itemsFetcher
     * @param \SprykerShop\Yves\CustomerReorderWidgetExtension\Dependency\Plugin\PostReorderPluginInterface[] $postReorderPlugins
     */
    public function __construct(
        CustomerReorderWidgetToCartClientInterface $cartClient,
        ItemFetcherInterface $itemsFetcher,
        array $postReorderPlugins
    ) {
        parent::__construct($cartClient, $itemsFetcher, $postReorderPlugins);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return void
     */
    public function fillFromOrder(OrderTransfer $orderTransfer): void
    {
        $items = $this->itemsFetcher->getAll($orderTransfer);

        $this->updateCart($items, $orderTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $orderItems
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return void
     */
    protected function updateCart(array $orderItems, OrderTransfer $orderTransfer): void
    {
        $orderItemsBeforeSanitize = $this->copyItemTransfers($orderItems);
        $cartChangeTransfer = $this->createCartChangeTransfer($orderItems);
        $cartChangeTransfer->setQuote($this->cartClient->getQuote());
        $orderItemTransfers = $this->sanitizeOrderItems($orderItems);
        $cartChangeTransfer->setItems($orderItemTransfers);

        $quoteTransfer = $this->cartClient->addValidItems($cartChangeTransfer, [
            static::PARAM_ORDER_REFERENCE => $orderTransfer->getOrderReference(),
        ]);

        $this->executePostReorderPlugins($quoteTransfer, $orderItemsBeforeSanitize);
    }
}
