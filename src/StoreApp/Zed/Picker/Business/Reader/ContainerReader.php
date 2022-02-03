<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Reader;

use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;
use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery;
use Orm\Zed\PickingZone\Persistence\Map\PyzPickingZoneTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Propel\Runtime\Propel;
use Pyz\Shared\PropelExtension\PropelExtension;
use Spryker\Zed\Sales\Business\SalesFacadeInterface;
use StoreApp\Zed\Picker\Business\PickerBusinessFactory;

class ContainerReader implements ContainerReaderInterface
{
    protected const ALIAS_ABBREVIATION = 'abbreviation';
    /**
     * @var \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery $pyzPickingSalesOrderQuery
     */
    protected $pyzPickingSalesOrderQuery;

    /**
     * @var \Spryker\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     */
    protected $salesFacade;

    /**
     * @var \StoreApp\Zed\Picker\Business\PickerBusinessFactory $factory
     */
    protected $factory;

    /**
     * @param \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery $pyzPickingSalesOrderQuery
     * @param \Spryker\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param \StoreApp\Zed\Picker\Business\PickerBusinessFactory $factory
     */
    public function __construct(
        PyzPickingSalesOrderQuery $pyzPickingSalesOrderQuery,
        SalesFacadeInterface $salesFacade,
        PickerBusinessFactory $factory
    ) {
        $this->pyzPickingSalesOrderQuery = $pyzPickingSalesOrderQuery;
        $this->salesFacade = $salesFacade;
        $this->factory = $factory;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer
     */
    public function getContainerCodes(
        PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
    ): PickingSalesOrderCollectionTransfer {
        $pickingSalesOrderCollectionTransfer = (new PickingSalesOrderCollectionTransfer());

        if (!empty($pickingSalesOrderCriteriaTransfer->getContainerCodes())) {
            $pickingSalesOrderQuery = $this->pyzPickingSalesOrderQuery->filterByContainerCode_In($pickingSalesOrderCriteriaTransfer->getContainerCodes());
            $pyzPickingSalesOrderEntityCollection = $pickingSalesOrderQuery->find();

            foreach ($pyzPickingSalesOrderEntityCollection as $pyzPickingSalesOrderEntity) {
                $pickingSalesOrderTransfer = $this->factory
                    ->createPickingSalesOrderMapper()
                    ->mapPickingSalesOrderEntityToPickingSalesOrderTransfer($pyzPickingSalesOrderEntity, new PickingSalesOrderTransfer());

                $pickingSalesOrderCollectionTransfer->addPickingSalesOrder($pickingSalesOrderTransfer);
            }
        }

        return $pickingSalesOrderCollectionTransfer;
    }

    /**
     * @param string $ContainerId
     * @param string $orderId
     *
     * @return bool
     */
    public function checkContainerUse(string $ContainerId, string $orderId): bool
    {
        $pickingContainerOrders = $this->pyzPickingSalesOrderQuery->findByContainerCode($ContainerId);
        foreach ($pickingContainerOrders->toArray() as $order) {
            if ($order['FkSalesOrder'] != $orderId) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param string $orderId
     *
     * @return array
     */
    public function getContainersByOrderId(string $orderId): array
    {
        $pickingSalesOrderCollectionTransfer = (new PickingSalesOrderCollectionTransfer());
        $pickingSalesOrders = $this->pyzPickingSalesOrderQuery
            ->leftJoinWithPickingZone()
            ->orderByShelfCode()
            ->withColumn(PyzPickingZoneTableMap::COL_ABBREVIATION, static::ALIAS_ABBREVIATION)
            ->findByFkSalesOrder($orderId)->getData();

        foreach ($pickingSalesOrders as $pyzPickingSalesOrderEntity) {
            $pickingSalesOrderTransfer = $this->factory
                ->createPickingSalesOrderMapper()
                ->mapPickingSalesOrderEntityToPickingSalesOrderTransfer($pyzPickingSalesOrderEntity, new PickingSalesOrderTransfer());

            $pickingSalesOrderCollectionTransfer->addPickingSalesOrder($pickingSalesOrderTransfer);
        }

        return $pickingSalesOrderCollectionTransfer->toArray();
    }

    /**
     * @param string $ContainerId
     *
     * @return array (IdPickingSalesOrder, FkSalesOrder, FkPickingZone, ContainerCode, ShelfCode)
     */
    public function getContainerShelfs(string $ContainerId): array
    {
        return $this->pyzPickingSalesOrderQuery->joinSpySalesOrder()
            ->withColumn("(select order_reference from spy_sales_order where spy_sales_order.id_sales_order = pyz_picking_sales_order.fk_sales_order)", "orderReference")
        ->where(SpySalesOrderTableMap::COL_INVOICE_REFERENCE . ' is null')
        ->findByContainerCode($ContainerId)
        ->toArray();
    }

    /**
     * @return array
     */
    public function getUsedContainers(): array
    {
        $merchantRef = $this->factory->getUserFacade()->getCurrentUser()->getMerchantReference();

        return PropelExtension::getResultNamed("
            select ppso.id_picking_sales_order as IdPickingSalesOrder,
                ppso.fk_sales_order as FkSalesOrder,
                ppso.fk_picking_zone as FkPickingZone,
                ppso.container_code as ContainerCode,
                ppso.has_substituted_item as HasSubstitutedItem,
                ppso.shelf_code as ShelfCode,
                sso.order_reference as orderReference,
                sso.first_name as firstName,
                sso.last_name as lastName
            from pyz_picking_sales_order ppso
            inner join spy_sales_order sso on ppso.fk_sales_order = sso.id_sales_order
            inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
            inner join spy_oms_order_item_state soois on ssoi.fk_oms_order_item_state = soois.id_oms_order_item_state
            where (sso.invoice_reference is null or sso.is_cashier_export_success  = 0)
                and sso.merchant_filial_number = '" . $merchantRef . "'
            group by ppso.id_picking_sales_order,
                ppso.fk_sales_order,
                ppso.fk_picking_zone,
                ppso.container_code
            having count(*) > sum(case when soois.name = 'cancelled' then 1 else 0 end)
            ", Propel::getConnection());
    }

    /**
     * @param string $customerFullName
     *
     * @return array
     */
    public function getOrderIdsByCustomer(string $customerFullName): array
    {
        return $this->pyzPickingSalesOrderQuery
            ->joinSpySalesOrder()
            ->withColumn(SpySalesOrderTableMap::COL_FIRST_NAME, 'firstName')
            ->withColumn(SpySalesOrderTableMap::COL_LAST_NAME, 'lastName')
            ->where("concat(" . SpySalesOrderTableMap::COL_FIRST_NAME . ", ' ', " . SpySalesOrderTableMap::COL_LAST_NAME . ")" . " = '" . $customerFullName . "'")
            ->find()
            ->toArray();
    }
}
