<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCartConnector\Business\InactiveItemsFilter;

use Generated\Shared\Transfer\MessageTransfer;
use Generated\Shared\Transfer\ProductCriteriaTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\ProductCartConnector\Business\InactiveItemsFilter\InactiveItemsFilter as SprykerInactiveItemsFilter;
use Spryker\Zed\ProductCartConnector\Business\InactiveItemsFilter\InactiveItemsFilterInterface;
use Spryker\Zed\ProductCartConnector\Dependency\Facade\ProductCartConnectorToMessengerFacadeInterface;
use Spryker\Zed\ProductCartConnector\Dependency\Facade\ProductCartConnectorToProductInterface;
use Spryker\Zed\ProductCartConnector\Dependency\Facade\ProductCartConnectorToStoreFacadeInterface;

class InactiveItemsFilter extends SprykerInactiveItemsFilter implements InactiveItemsFilterInterface
{
    protected const MESSAGE_PARAM_NAME = '%name%';
    protected const MESSAGE_INFO_CONCRETE_INACTIVE_PRODUCT_REMOVED_WITH_NAME = 'product-cart.info.concrete-product-inactive.removed-with-name';

    /**
     * @param \Spryker\Zed\ProductCartConnector\Dependency\Facade\ProductCartConnectorToProductInterface $productFacade
     * @param \Spryker\Zed\ProductCartConnector\Dependency\Facade\ProductCartConnectorToStoreFacadeInterface $storeFacade
     * @param \Spryker\Zed\ProductCartConnector\Dependency\Facade\ProductCartConnectorToMessengerFacadeInterface $messengerFacade
     */
    public function __construct(ProductCartConnectorToProductInterface $productFacade, ProductCartConnectorToStoreFacadeInterface $storeFacade, ProductCartConnectorToMessengerFacadeInterface $messengerFacade)
    {
        parent::__construct($productFacade, $storeFacade, $messengerFacade);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function filterInactiveItems(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        $skus = $this->getProductSkusFromQuoteTransfer($quoteTransfer);
        $productCriteriaTransfer = (new ProductCriteriaTransfer())
            ->setSkus($skus)
            ->setIsActive(true)
            ->setIdStore(
                $this->storeFacade->getStoreByName($quoteTransfer->getStore()->getName())->getIdStore()
            );

        $productConcreteTransfers = $this->productFacade->getProductConcretesByCriteria($productCriteriaTransfer);
        $indexedProductConcreteTransfers = $this->indexProductConcreteTransfersBySku($productConcreteTransfers);

        foreach ($quoteTransfer->getItems() as $key => $itemTransfer) {
            if (!isset($indexedProductConcreteTransfers[$itemTransfer->getSku()])) {
                $quoteTransfer->getItems()->offsetUnset($key);
                $this->addFilterMessage($itemTransfer->getName());
            }
        }

        return $quoteTransfer;
    }

    /**
     * @param string $name
     *
     * @return void
     */
    protected function addFilterMessage(string $name): void
    {
        $messageTransfer = new MessageTransfer();
        $messageTransfer->setValue(static::MESSAGE_INFO_CONCRETE_INACTIVE_PRODUCT_REMOVED_WITH_NAME);
        $messageTransfer->setParameters([
            static::MESSAGE_PARAM_NAME => $name,
        ]);

        $this->messengerFacade->addInfoMessage($messageTransfer);
    }
}
