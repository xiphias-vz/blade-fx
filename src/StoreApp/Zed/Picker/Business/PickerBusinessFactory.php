<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business;

use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\MerchantSalesOrder\MerchantSalesOrderDependencyProvider;
use Pyz\Zed\PickingSalesOrder\Persistence\Propel\Mapper\PickingSalesOrderMapper;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use Spryker\Zed\Oms\Business\OmsFacadeInterface;
use Spryker\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;
use StoreApp\Zed\Picker\Business\Reader\ContainerReader;
use StoreApp\Zed\Picker\Business\Reader\ContainerReaderInterface;
use StoreApp\Zed\Picker\Business\Reader\PickingZoneReader;
use StoreApp\Zed\Picker\Business\Reader\PickingZoneReaderInterface;
use StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransferData;
use StoreApp\Zed\Picker\Business\Updater\OrderUpdater;
use StoreApp\Zed\Picker\Business\Updater\OrderUpdaterInterface;
use StoreApp\Zed\Picker\Business\Writer\PickingZoneWriter;
use StoreApp\Zed\Picker\Business\Writer\PickingZoneWriterInterface;
use StoreApp\Zed\Picker\PickerDependencyProvider;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 * @method \StoreApp\Zed\Picker\PickerConfig getConfig()
 */
class PickerBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \StoreApp\Zed\Picker\Business\Updater\OrderUpdaterInterface
     */
    public function createOrderUpdater(): OrderUpdaterInterface
    {
        return new OrderUpdater(
            $this->getOmsFacade(),
            $this->getSalesFacade()
        );
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Reader\PickingZoneReaderInterface
     */
    public function createPickingZoneReader(): PickingZoneReaderInterface
    {
        return new PickingZoneReader(
            $this->getConfig(),
            $this->getPickingZoneFacade(),
            $this->getSessionService()
        );
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Writer\PickingZoneWriterInterface
     */
    public function createPickingZoneWriter(): PickingZoneWriterInterface
    {
        return new PickingZoneWriter(
            $this->getConfig(),
            $this->getSessionService()
        );
    }

    /**
     * @return \Spryker\Zed\Oms\Business\OmsFacadeInterface
     */
    public function getOmsFacade(): OmsFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_OMS);
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    public function getPickingZoneFacade(): PickingZoneFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_PICKING_ZONE);
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Session\Session
     */
    public function getSessionService(): Session
    {
        return $this->getProvidedDependency(PickerDependencyProvider::SERVICE_SESSION);
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Reader\ContainerReaderInterface
     */
    public function createContainerReader(): ContainerReaderInterface
    {
        return new ContainerReader(
            new PyzPickingSalesOrderQuery(),
            $this->getSalesFacade(),
            $this
        );
    }

    /**
     * @return \Pyz\Zed\PickingSalesOrder\Persistence\Propel\Mapper\PickingSalesOrderMapper
     */
    public function createPickingSalesOrderMapper(): PickingSalesOrderMapper
    {
        return new PickingSalesOrderMapper();
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransferData
     */
    public function createPickingHeaderTransferData(): PickingHeaderTransferData
    {
        return new PickingHeaderTransferData(
            $this->getOmsFacade(),
            $this->getSalesFacade(),
            $this->getSessionService(),
            $this->getUserFacade(),
            $this->getPickingZoneFacade(),
            $this->createOrderUpdater(),
            $this->getPickerFacade()
        );
    }

    /**
     * @return \Spryker\Zed\User\Business\UserFacadeInterface
     */
    public function getUserFacade(): UserFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_USER);
    }

    /**
     * @return \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    public function getMerchantFacade(): MerchantFacadeInterface
    {
        return $this->getProvidedDependency(MerchantSalesOrderDependencyProvider::FACADE_MERCHANT);
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\PickerFacadeInterface
     */
    public function getPickerFacade(): PickerFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_PICKER);
    }
}
