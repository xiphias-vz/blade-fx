<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Business\ContentBuilder;

use DateTime;
use Generated\Shared\Transfer\ExportContentsTransfer;
use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderItemTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesShipmentTableMap;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\PickingZoneOrderExport\PickingZoneOrderExportConfig;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;

class PickingZoneOrderExportContentBuilder implements PickingZoneOrderExportContentBuilderInterface
{
    protected const FILE_NAME_FORMAT = 'Picking Zone: %s';
    protected const FILE_NAME_FORMAT_ORDER_ITEMS_EXPORT = 'Picking Zone: %s (Order Items Export)';

    protected const DEFAULT_PRICE_DIVISION = 100;
    protected const DEFAULT_PRICE_CURRENCY = 'EUR';

    /**
     * @var \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    protected $pickingZoneFacade;

    /**
     * @var \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface
     */
    protected $merchantSalesOrderFacade;

    /**
     * @var \Spryker\Zed\Translator\Business\TranslatorFacadeInterface
     */
    protected $translatorFacade;

    /**
     * @param \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface $pickingZoneFacade
     * @param \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface $merchantSalesOrderFacade
     * @param \Spryker\Zed\Translator\Business\TranslatorFacadeInterface $translatorFacade
     */
    public function __construct(
        PickingZoneFacadeInterface $pickingZoneFacade,
        MerchantSalesOrderFacadeInterface $merchantSalesOrderFacade,
        TranslatorFacadeInterface $translatorFacade
    ) {
        $this->pickingZoneFacade = $pickingZoneFacade;
        $this->merchantSalesOrderFacade = $merchantSalesOrderFacade;
        $this->translatorFacade = $translatorFacade;
    }

    /**
     * @param int $idPickingZone
     * @param string $pickingStore
     * @param \DateTime $datePicking
     * @param array $timeSlots
     * @param string $status
     *
     * @return \Generated\Shared\Transfer\ExportContentsTransfer
     */
    public function generateContent(int $idPickingZone, string $pickingStore, DateTime $datePicking, array $timeSlots, string $status): ExportContentsTransfer
    {
        $statusArr = [];
        array_push($statusArr, $status);

        $pickingZoneTransfer = $this->pickingZoneFacade->findPickingZoneById($idPickingZone);

        $pickingZoneOrderExportContentsTransfer = new ExportContentsTransfer();
        $pickingZoneOrderExportContentsTransfer->setFilename($this->getFileName($pickingZoneTransfer, $datePicking));

        if (isset($_REQUEST["orderItemsExport"])) {
            $pickingZoneOrderExportContentsTransfer->addContentItem([
                $this->translatorFacade->trans('picking_zone_order_export.column.order_number'),
                $this->translatorFacade->trans('picking_zone_order_export.column.picking_date'),
                $this->translatorFacade->trans('picking_zone_order_export.column.time_slot'),
                $this->translatorFacade->trans('picking_zone_order_export.column.article'),
                $this->translatorFacade->trans('picking_zone_order_export.column.brand'),
                $this->translatorFacade->trans('picking_zone_order_export.column.content'),
                $this->translatorFacade->trans('picking_zone_order_export.column.total_amount'),
                $this->translatorFacade->trans('picking_zone_order_export.column.weight_per_unit'),
                $this->translatorFacade->trans('picking_zone_order_export.column.shelf'),
                $this->translatorFacade->trans('picking_zone_order_export.column.shelf_floor'),
                $this->translatorFacade->trans('picking_zone_order_export.column.shelf_field'),
                $this->translatorFacade->trans('picking_zone_order_export.column.ean'),
                $this->translatorFacade->trans('picking_zone_order_export.column.unit.price'),
            ]);
        } else {
            $pickingZoneOrderExportContentsTransfer->addContentItem([
                $this->translatorFacade->trans('picking_zone_order_export.column.picking_date'),
                $this->translatorFacade->trans('picking_zone_order_export.column.time_slot'),
                $this->translatorFacade->trans('picking_zone_order_export.column.article'),
                $this->translatorFacade->trans('picking_zone_order_export.column.brand'),
                $this->translatorFacade->trans('picking_zone_order_export.column.content'),
                $this->translatorFacade->trans('picking_zone_order_export.column.total_amount'),
                $this->translatorFacade->trans('picking_zone_order_export.column.weight_per_unit'),
                $this->translatorFacade->trans('picking_zone_order_export.column.shelf'),
                $this->translatorFacade->trans('picking_zone_order_export.column.shelf_floor'),
                $this->translatorFacade->trans('picking_zone_order_export.column.shelf_field'),
                $this->translatorFacade->trans('picking_zone_order_export.column.ean'),
                $this->translatorFacade->trans('picking_zone_order_export.column.unit.price'),
            ]);
        }

        $readyForPickingOrderCriteriaFilterTransfer = (new OrderCriteriaFilterTransfer())
            ->setIdPickingZone($pickingZoneTransfer->getIdPickingZone())
            ->setPickingStore($pickingStore)
            ->setDeliveryDate($datePicking->format('c'))
            ->setItemStatuses($statusArr);

        if ($status == "paused") {
            $salesOrderItems = $this->merchantSalesOrderFacade
                ->getSalesOrderItemDataByPickingDateAndPickingZoneWithPauseStatus($readyForPickingOrderCriteriaFilterTransfer);
        } else {
            $salesOrderItems = $this->merchantSalesOrderFacade
                ->getSalesOrderItemDataByPickingDateAndPickingZone($readyForPickingOrderCriteriaFilterTransfer);
        }

        foreach ($salesOrderItems as $salesOrderItemData) {
            $deliveryDate = explode(
                '_',
                $salesOrderItemData[SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE]
            );

            $timeSlotDate = $deliveryDate[0];
            $timeSlotTime = $deliveryDate[1];

            $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');
            if ($storeCodeBucket == 'CZ') {
                if ($salesOrderItemData[SpySalesOrderItemTableMap::COL_BRAND] == 'keine') {
                    $salesOrderItemData['spy_sales_order_item.brand'] = '';
                }
            }

            if (isset($_REQUEST["orderItemsExport"])) {
                if (in_array($timeSlotTime, $timeSlots)) {
                    $pickingZoneOrderExportContentsTransfer->addContentItem([
                        $salesOrderItemData[SpySalesOrderTableMap::COL_ORDER_REFERENCE],
                        $timeSlotDate,
                        $timeSlotTime,
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_NAME],
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_BRAND] ?? '',
                        ($salesOrderItemData[SpySalesOrderItemTableMap::COL_BASE_PRICE_CONTENT] / 10000) . ' ' . $salesOrderItemData[SpySalesOrderItemTableMap::COL_BASE_PRICE_UNIT],
                        $salesOrderItemData['quantity'],
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_WEIGHT_PER_UNIT] ?? '',
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_SHELF],
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_SHELF_FLOOR],
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_SHELF_FIELD],
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_SKU],
                        str_replace('.', ',', ($salesOrderItemData[SpySalesOrderItemTableMap::COL_PRICE] / static::DEFAULT_PRICE_DIVISION)),
                    ]);
                }
            } else {
                if (in_array($timeSlotTime, $timeSlots)) {
                    $pickingZoneOrderExportContentsTransfer->addContentItem([
                        $timeSlotDate,
                        $timeSlotTime,
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_NAME],
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_BRAND] ?? '',
                        ($salesOrderItemData[SpySalesOrderItemTableMap::COL_BASE_PRICE_CONTENT] / 10000) . ' ' . $salesOrderItemData[SpySalesOrderItemTableMap::COL_BASE_PRICE_UNIT],
                        $salesOrderItemData['quantity'],
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_WEIGHT_PER_UNIT] ?? '',
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_SHELF],
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_SHELF_FLOOR],
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_SHELF_FIELD],
                        $salesOrderItemData[SpySalesOrderItemTableMap::COL_SKU],
                        str_replace('.', ',', ($salesOrderItemData[SpySalesOrderItemTableMap::COL_PRICE] / static::DEFAULT_PRICE_DIVISION)),
                    ]);
                }
            }
        }

        return $pickingZoneOrderExportContentsTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\PickingZoneTransfer $pickingZoneTransfer
     * @param \DateTime $datePicking
     *
     * @return string
     */
    protected function getFileName(PickingZoneTransfer $pickingZoneTransfer, DateTime $datePicking): string
    {
        $filenameFragments = [
            $pickingZoneTransfer->getName(),
            $datePicking->format(PickingZoneOrderExportConfig::DATE_FORMAT),
        ];

        if (isset($_REQUEST["orderItemsExport"])) {
            return sprintf(
                self::FILE_NAME_FORMAT_ORDER_ITEMS_EXPORT,
                implode('-', $filenameFragments)
            );
        } else {
            return sprintf(
                self::FILE_NAME_FORMAT,
                implode('-', $filenameFragments)
            );
        }
    }
}
