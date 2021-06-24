<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\TimeSlot\TimeSlotServiceInterface;
use Pyz\Zed\Oms\Business\OmsBusinessFactory;
use Pyz\Zed\Oms\Business\OmsFacadeInterface;
use Pyz\Zed\Product\Business\ProductFacadeInterface;
use Pyz\Zed\Sales\Business\InvoiceOrder\InvoiceSalesOrderReader;
use Pyz\Zed\Sales\Business\Model\Customer\PaginatedCustomerOrderOverview;
use Pyz\Zed\Sales\Business\Model\Order\MinimumAgeHydrator;
use Pyz\Zed\Sales\Business\Model\Order\MinimumAgeHydratorInterface;
use Pyz\Zed\Sales\Business\Model\Order\OrderStatusHydrator;
use Pyz\Zed\Sales\Business\Model\Order\OrderStatusHydratorInterface;
use Pyz\Zed\Sales\Business\Model\Order\OrderUpdater;
use Pyz\Zed\Sales\Business\Model\Order\SalesOrderChecker;
use Pyz\Zed\Sales\Business\Model\Order\SalesOrderSaver;
use Pyz\Zed\Sales\Business\Order\OrderHydrator;
use Pyz\Zed\Sales\Business\Order\OrderHydratorInterface as PyzOrderHydratorInterface;
use Pyz\Zed\Sales\Business\Order\OrderReader;
use Pyz\Zed\Sales\Business\Order\OrderReaderInterface;
use Pyz\Zed\Sales\Business\OrderChange\OrderChangeSaver;
use Pyz\Zed\Sales\Business\OrderDate\OrderDateCheck;
use Pyz\Zed\Sales\Business\OrderItem\OrderItemExpander;
use Pyz\Zed\Sales\Dependency\Facade\SalesToOmsBridgeInterface;
use Pyz\Zed\Sales\SalesDependencyProvider;
use Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Zed\Sales\Business\Model\Customer\CustomerOrderOverviewInterface;
use Spryker\Zed\Sales\Business\Model\Order\OrderUpdaterInterface;
use Spryker\Zed\Sales\Business\Order\OrderHydratorInterface;
use Spryker\Zed\Sales\Business\Order\OrderReaderInterface as SprykerOrderReaderInterface;
use Spryker\Zed\Sales\Business\SalesBusinessFactory as SprykerSalesBusinessFactory;
use Spryker\Zed\Shipment\Business\ShipmentFacadeInterface;

/**
 * @method \Pyz\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 * @method \Pyz\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\Sales\SalesConfig getConfig()
 */
class SalesBusinessFactory extends SprykerSalesBusinessFactory
{
    /**
     * @return \Spryker\Zed\Sales\Business\Model\Order\SalesOrderSaverInterface
     */
    public function createSalesOrderSaver()
    {
        return new SalesOrderSaver(
            $this->getCountryFacade(),
            $this->getOmsFacade(),
            $this->createReferenceGenerator(),
            $this->getConfig(),
            $this->getLocaleQueryContainer(),
            $this->getStore(),
            $this->getOrderExpanderPreSavePlugins(),
            $this->createSalesOrderSaverPluginExecutor(),
            $this->createSalesOrderItemMapper(),
            $this->getOrderPostSavePlugins()
        );
    }

    /**
     * @return \Spryker\Zed\Sales\Business\Model\Order\OrderUpdaterInterface
     */
    public function createOrderUpdater(): OrderUpdaterInterface
    {
        return new OrderUpdater($this->getQueryContainer());
    }

    /**
     * @return \Pyz\Zed\Sales\Business\OrderChange\OrderChangeSaver
     */
    public function createOrderChangeSaver()
    {
        return new OrderChangeSaver(
            $this->getQueryContainer(),
            $this->createOrderHydratorWithMultiShippingAddress(),
            $this->createOrderUpdater(),
            $this->getCalculationFacade()
        );
    }

    /**
     * @return \Pyz\Zed\Sales\Business\Model\Order\SalesOrderChecker
     */
    public function createSalesOrderChecker(): SalesOrderChecker
    {
        return new SalesOrderChecker(
            $this->getShipmentFacade(),
            $this->getRepository()
        );
    }

    /**
     * @return \Spryker\Zed\Sales\Business\Model\Customer\CustomerOrderOverviewInterface
     */
    public function createPaginatedCustomerOrderOverview(): CustomerOrderOverviewInterface
    {
        return new PaginatedCustomerOrderOverview(
            $this->getQueryContainer(),
            $this->createCustomerOrderOverviewHydrator(),
            $this->getOmsFacade(),
            $this->createOrderStatusHydrator(),
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Zed\Sales\Business\Model\Order\OrderStatusHydratorInterface
     */
    public function createOrderStatusHydrator(): OrderStatusHydratorInterface
    {
        return new OrderStatusHydrator(
            $this->getBaseOmsFacade(),
            $this->getDateTimeWithZoneService(),
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Zed\Oms\Business\OmsFacadeInterface
     */
    public function getBaseOmsFacade(): OmsFacadeInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::BASE_FACADE_OMS);
    }

    /**
     * @return \Spryker\Zed\Shipment\Business\ShipmentFacadeInterface
     */
    public function getShipmentFacade(): ShipmentFacadeInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::FACADE_SHIPMENT);
    }

    /**
     * @return \Pyz\Zed\Sales\Business\Order\OrderReaderInterface
     */
    public function createOrderReaderWithMultiShippingAddress(): SprykerOrderReaderInterface
    {
        return new OrderReader(
            $this->getQueryContainer(),
            $this->createOrderHydratorWithMultiShippingAddress(),
            $this->getQueryContainer()
        );
    }

    /**
     * @return \Pyz\Zed\Sales\Business\Order\OrderReaderInterface
     */
    public function createOrderReaderForStoreApp(): OrderReaderInterface
    {
        return new OrderReader(
            $this->getQueryContainer(),
            $this->createOrderHydratorForStoreApp(),
            $this->getQueryContainer()
        );
    }

    /**
     * @return \Spryker\Zed\Sales\Business\Model\Order\OrderHydratorInterface
     */
    public function createOrderHydratorWithMultiShippingAddress(): OrderHydratorInterface
    {
        return new OrderHydrator(
            $this->getQueryContainer(),
            $this->getOmsFacade(),
            $this->getConfig(),
            $this->getCustomerFacade(),
            $this->getHydrateOrderPlugins()
        );
    }

    /**
     * @return \Spryker\Zed\Sales\Business\Model\Order\OrderHydratorInterface
     */
    public function createOrderHydratorForStoreApp(): OrderHydratorInterface
    {
        return new OrderHydrator(
            $this->getQueryContainer(),
            $this->getOmsFacade(),
            $this->getConfig(),
            $this->getCustomerFacade(),
            $this->getHydrateOrderForStoreAppPlugins()
        );
    }

    /**
     * @return \Pyz\Zed\Sales\Business\Order\OrderHydratorInterface
     */
    public function createOrderHydratorForCashier(): PyzOrderHydratorInterface
    {
        return new OrderHydrator(
            $this->getQueryContainer(),
            $this->getOmsFacade(),
            $this->getConfig(),
            $this->getCustomerFacade(),
            $this->getHydrateOrderPlugins(),
        );
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface[]
     */
    public function getHydrateOrderForStoreAppPlugins()
    {
        return $this->getProvidedDependency(SalesDependencyProvider::HYDRATE_ORDER_PLUGINS_FOR_STORE_APP);
    }

    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    public function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }

    /**
     * @return \Pyz\Zed\Sales\Business\InvoiceOrder\InvoiceSalesOrderReader
     */
    public function createInvoiceSalesOrderReader(): InvoiceSalesOrderReader
    {
        return new InvoiceSalesOrderReader(
            $this->getDateTimeWithZoneService(),
            $this->getRepository()
        );
    }

    /**
     * @return \Pyz\Zed\Sales\Business\Model\Order\MinimumAgeHydratorInterface
     */
    public function createMinimumAgeHydrator(): MinimumAgeHydratorInterface
    {
        return new MinimumAgeHydrator(
            $this->getProductFacade()
        );
    }

    /**
     * @return \Pyz\Zed\Product\Business\ProductFacadeInterface
     */
    public function getProductFacade(): ProductFacadeInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::FACADE_PRODUCT);
    }

    /**
     * @return \Pyz\Zed\Sales\Business\OrderDate\OrderDateCheck
     */
    public function createOrderDateCheck(): OrderDateCheck
    {
        return new OrderDateCheck(
            $this->getDateTimeWithZoneService()
        );
    }

    /**
     * @return \Pyz\Zed\Sales\Business\OrderItem\OrderItemExpander
     */
    public function createOrderItemExpander(): OrderItemExpander
    {
        return new OrderItemExpander($this->getRepository());
    }

    /**
     * @return \Spryker\Client\Storage\StorageClientInterface
     */
    public function getStorageClient(): StorageClientInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::CLIENT_STORAGE);
    }

    /**
     * @return \Pyz\Zed\Oms\Business\OmsBusinessFactory
     */
    public function getOmsFactory(): OmsBusinessFactory
    {
        return $this->getProvidedDependency(SalesDependencyProvider::PLUGINS_OMS_ORDER_MAIL_EXPANDER);
    }

    /**
     * @return \Pyz\Zed\Sales\Dependency\Facade\SalesToOmsBridgeInterface
     */
    public function getNewOmsFacade(): SalesToOmsBridgeInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::NEW_FACADE_OMS);
    }

    /**
     * @return \Pyz\Service\TimeSlot\TimeSlotServiceInterface
     */
    public function getTimeSlotService(): TimeSlotServiceInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::SERVICE_TIME_SLOTS);
    }

    /**
     * @return \Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface
     */
    public function getTimeSlotFacade(): TimeSlotFacadeInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::FACADE_TIME_SLOTS_ORDER_OVERVIEW);
    }
}
