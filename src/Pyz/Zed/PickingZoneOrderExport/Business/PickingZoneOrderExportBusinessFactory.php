<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Business;

use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\PickingZoneOrderExport\Business\ContentBuilder\PickingZoneOrderExportContentBuilder;
use Pyz\Zed\PickingZoneOrderExport\Business\ResponseBuilder\ExportCsvResponseBuilder;
use Pyz\Zed\PickingZoneOrderExport\Business\ResponseBuilder\ExportCsvResponseBuilderInterface;
use Pyz\Zed\PickingZoneOrderExport\PickingZoneOrderExportDependencyProvider;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;
use StoreApp\Zed\Picker\PickerDependencyProvider;

/**
 * @method \Pyz\Zed\PickingZoneOrderExport\PickingZoneOrderExportConfig getConfig()
 */
class PickingZoneOrderExportBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\PickingZoneOrderExport\Business\ContentBuilder\PickingZoneOrderExportContentBuilder
     */
    public function createPickingZoneOrderExportContentBuilder(): PickingZoneOrderExportContentBuilder
    {
        return new PickingZoneOrderExportContentBuilder(
            $this->getPickingZoneFacade(),
            $this->getMerchantSalesOrderFacade(),
            $this->getTranslatorFacade()
        );
    }

    /**
     * @return \Pyz\Zed\PickingZoneOrderExport\Business\ResponseBuilder\ExportCsvResponseBuilderInterface
     */
    public function createExportCsvResponseBuilder(): ExportCsvResponseBuilderInterface
    {
        return new ExportCsvResponseBuilder();
    }

    /**
     * @return \Spryker\Zed\Translator\Business\TranslatorFacadeInterface
     */
    public function getTranslatorFacade(): TranslatorFacadeInterface
    {
        return $this->getProvidedDependency(PickingZoneOrderExportDependencyProvider::FACADE_TRANSLATOR);
    }

    /**
     * @return \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    public function getPickingZoneFacade(): PickingZoneFacadeInterface
    {
        return $this->getProvidedDependency(PickingZoneOrderExportDependencyProvider::FACADE_PICKING_ZONE);
    }

    /**
     * @return \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface
     */
    public function getMerchantSalesOrderFacade(): MerchantSalesOrderFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_MERCHANT_SALES_ORDER);
    }
}
