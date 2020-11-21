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
use Orm\Zed\Sales\Persistence\Map\SpySalesShipmentTableMap;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\PickingZoneOrderExport\PickingZoneOrderExportConfig;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;

class PickingZoneOrderExportContentBuilder implements PickingZoneOrderExportContentBuilderInterface
{
    protected const FILE_NAME_FORMAT = 'Picking Zone: %s';

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
     * @param \DateTime $datePicking
     *
     * @return \Generated\Shared\Transfer\ExportContentsTransfer
     */
    public function generateContent(int $idPickingZone, DateTime $datePicking): ExportContentsTransfer
    {
        $pickingZoneTransfer = $this->pickingZoneFacade->findPickingZoneById($idPickingZone);

        $pickingZoneOrderExportContentsTransfer = new ExportContentsTransfer();
        $pickingZoneOrderExportContentsTransfer->setFilename($this->getFileName($pickingZoneTransfer, $datePicking));

        $pickingZoneOrderExportContentsTransfer->addContentItem([
            $this->translatorFacade->trans('picking_zone_order_export.column.picking_date'),
            $this->translatorFacade->trans('picking_zone_order_export.column.time_slot'),
            $this->translatorFacade->trans('picking_zone_order_export.column.article'),
            $this->translatorFacade->trans('picking_zone_order_export.column.total_amount'),
            //$this->translatorFacade->trans('picking_zone_order_export.column.location'),
            $this->translatorFacade->trans('picking_zone_order_export.column.ean'),
        ]);

        $readyForPickingOrderCriteriaFilterTransfer = (new OrderCriteriaFilterTransfer())
            ->setIdPickingZone($pickingZoneTransfer->getIdPickingZone())
            ->setDeliveryDate($datePicking->format('c'));

        $salesOrderItems = $this->merchantSalesOrderFacade
            ->getSalesOrderItemDataByPickingDateAndPickingZone($readyForPickingOrderCriteriaFilterTransfer);

        foreach ($salesOrderItems as $salesOrderItemData) {
            $deliveryDate = explode(
                '_',
                $salesOrderItemData[SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE]
            );

            $pickingZoneOrderExportContentsTransfer->addContentItem([
                $deliveryDate[0],
                $deliveryDate[1],
                $salesOrderItemData[SpySalesOrderItemTableMap::COL_NAME],
                $salesOrderItemData['quantity'],
                // location value here
                $salesOrderItemData[SpySalesOrderItemTableMap::COL_SKU],
            ]);
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

        return sprintf(
            self::FILE_NAME_FORMAT,
            implode(PickingZoneOrderExportConfig::FILE_NAME_DELIMITER, $filenameFragments)
        );
    }
}
