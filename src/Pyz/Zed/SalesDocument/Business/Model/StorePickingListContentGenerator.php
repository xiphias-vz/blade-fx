<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDocument\Business\Model;

use ArrayObject;
use DateTime;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\MerchantCriteriaFilterTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\StorePickingListCollectionTransfer;
use Generated\Shared\Transfer\StorePickingListItemTransfer;
use Generated\Shared\Transfer\StorePickingListTransfer;
use Pyz\Shared\Oms\OmsConfig;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\PickingRoute\Business\PickingRouteFacadeInterface;
use Pyz\Zed\Product\Business\ProductFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Pyz\Zed\SalesDocument\SalesDocumentConfig;

class StorePickingListContentGenerator
{
    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    protected $salesFacade;

    /**
     * @var \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    private $merchantFacade;

    /**
     * @var \Pyz\Zed\Product\Business\ProductFacadeInterface
     */
    private $productFacade;

    /**
     * @var \Pyz\Zed\PickingRoute\Business\PickingRouteFacadeInterface
     */
    private $pickingRouteFacade;

    /**
     * @var \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface
     */
    private $merchantSalesOrderFacade;

    /**
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param \Pyz\Zed\Merchant\Business\MerchantFacadeInterface $merchantFacade
     * @param \Pyz\Zed\Product\Business\ProductFacadeInterface $productFacade
     * @param \Pyz\Zed\PickingRoute\Business\PickingRouteFacadeInterface $pickingRouteFacade
     * @param \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface $merchantSalesOrderFacade
     */
    public function __construct(
        SalesFacadeInterface $salesFacade,
        MerchantFacadeInterface $merchantFacade,
        ProductFacadeInterface $productFacade,
        PickingRouteFacadeInterface $pickingRouteFacade,
        MerchantSalesOrderFacadeInterface $merchantSalesOrderFacade
    ) {
        $this->salesFacade = $salesFacade;
        $this->merchantFacade = $merchantFacade;
        $this->productFacade = $productFacade;
        $this->pickingRouteFacade = $pickingRouteFacade;
        $this->merchantSalesOrderFacade = $merchantSalesOrderFacade;
    }

    /**
     * @param \DateTime $pickingDate
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\StorePickingListCollectionTransfer
     */
    public function generate(DateTime $pickingDate, string $merchantReference): StorePickingListCollectionTransfer
    {
        $storePickingListCollectionTransfer = new StorePickingListCollectionTransfer();

        $merchantFilterCriteria = (new MerchantCriteriaFilterTransfer())->setMerchantReference($merchantReference);
        $merchantTransfer = $this->merchantFacade->findOne($merchantFilterCriteria);

        if ($merchantTransfer === null) {
            return $storePickingListCollectionTransfer;
        }

        $merchantDetails = $this->getMerchantDetails($merchantTransfer);

        $idSalesOrders = array_keys(
            $this->findMerchantSalesOrdersReadyForPicking($pickingDate, $merchantReference)
        );

        foreach ($idSalesOrders as $idSalesOrder) {
            $salesOrder = $this->salesFacade->getOrderByIdSalesOrder($idSalesOrder);
            $storePickingList = $this->createPickingListTransfer($salesOrder, $merchantDetails, $pickingDate);

            $storePickingListCollectionTransfer->addStorePickingList($storePickingList);
        }

        return $storePickingListCollectionTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     * @param string $merchantDetails
     * @param \DateTime $pickingDate
     *
     * @return \Generated\Shared\Transfer\StorePickingListTransfer
     */
    protected function createPickingListTransfer(
        OrderTransfer $salesOrderTransfer,
        string $merchantDetails,
        DateTime $pickingDate
    ): StorePickingListTransfer {
        $pickingListTransfer = new StorePickingListTransfer();

        $pickingListTransfer->setMerchantDetails($merchantDetails);
        $pickingListTransfer->setDeliveryDate($pickingDate);
        $pickingListTransfer->setOrderReference($salesOrderTransfer->getOrderReference());
        $pickingListTransfer->setCustomerReference($salesOrderTransfer->getCustomerReference());

        $pickingListTransfer->setItems(
            $this->createStorePickingListItems($salesOrderTransfer)
        );

        return $pickingListTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\ItemTransfer[]
     */
    protected function createStorePickingListItems(OrderTransfer $salesOrderTransfer): ArrayObject
    {
        $storePickingListItems = new ArrayObject();

        $aggregatedOrderItemTransfers = $this->aggregateOrderItemTransfers($salesOrderTransfer);

        $productAttributesBySku = $this->getProductAttributes($aggregatedOrderItemTransfers, $salesOrderTransfer->getStore());

        foreach ($aggregatedOrderItemTransfers as $itemTransfer) {
            $sku = $itemTransfer->getSku();

            $productAttributes = $productAttributesBySku[$sku];

            $pickingListItemTransfer = new StorePickingListItemTransfer();

            $pickingListItemTransfer->setProductNumber($productAttributes[ProductConfig::KEY_PRODUCT_NUMBER]);
            $pickingListItemTransfer->setProductName($productAttributes[ProductConfig::KEY_ARTIKELNAME_SPRYKER]);
            $pickingListItemTransfer->setProductVariety($productAttributes[ProductConfig::PRODUCT_ATTRIBUTE_VARIETY] ?? '');
            $pickingListItemTransfer->setQuantity($itemTransfer->getQuantity());

            $storePickingListItems->offsetSet($sku, $pickingListItemTransfer);
        }

        $skuToProductPickingOrderMap = $this->pickingRouteFacade->getSkuToProductPickingOrderMap($productAttributesBySku);

        $storePickingListItems->uksort(
            function (string $sku1, string $sku2) use ($skuToProductPickingOrderMap): int {
                return $skuToProductPickingOrderMap[$sku1] - $skuToProductPickingOrderMap[$sku2];
            }
        );

        return $storePickingListItems;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\ItemTransfer[]
     */
    protected function aggregateOrderItemTransfers(OrderTransfer $salesOrderTransfer): array
    {
        return array_reduce(
            $salesOrderTransfer->getItems()->getArrayCopy(),
            function ($itemTransfers, ItemTransfer $itemTransfer) {
                if ($itemTransfer->getCanceledAmount() > 0) {
                    return $itemTransfers;
                }

                if (isset($itemTransfers[$itemTransfer->getSku()])) {
                    /** @var \Generated\Shared\Transfer\ItemTransfer $existingItemTransfer */
                    $existingItemTransfer = $itemTransfers[$itemTransfer->getSku()];
                    $existingItemTransfer->setQuantity(
                        $existingItemTransfer->getQuantity() + $itemTransfer->getQuantity()
                    );

                    return $itemTransfers;
                }

                $itemTransfers[$itemTransfer->getSku()] = $itemTransfer;

                return $itemTransfers;
            },
            []
        );
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $itemTransfers
     * @param string $storeName
     *
     * @return string[][]
     */
    protected function getProductAttributes(array $itemTransfers, string $storeName): array
    {
        $orderItemSkus = array_map(
            function (ItemTransfer $itemTransfer) {
                return $itemTransfer->getSku();
            },
            $itemTransfers
        );

        return $this->productFacade->getConcreteSkuToAttributesMap($orderItemSkus, $storeName);
    }

    /**
     * @param \DateTime $deliveryDate
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer[]
     */
    protected function findMerchantSalesOrdersReadyForPicking(DateTime $deliveryDate, string $merchantReference): array
    {
        $readyForPickingOrderCriteriaFilterTransfer = (new OrderCriteriaFilterTransfer())
            ->addMerchantReference($merchantReference)
            ->addStoreStatus(OmsConfig::STORE_STATE_READY_FOR_PICKING)
            ->setDeliveryDate($deliveryDate->format('c'));

        return $this->merchantSalesOrderFacade
            ->findMerchantSalesOrdersByOrderFilterCriteria($readyForPickingOrderCriteriaFilterTransfer)
            ->getMerchantSalesOrders()
            ->getArrayCopy();
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return string
     */
    protected function getMerchantDetails(MerchantTransfer $merchantTransfer): string
    {
        return sprintf(
            SalesDocumentConfig::FORMAT_MERCHANT_DETAILS,
            $merchantTransfer->getRegionName(),
            $merchantTransfer->getFilialNumber()
        );
    }
}
