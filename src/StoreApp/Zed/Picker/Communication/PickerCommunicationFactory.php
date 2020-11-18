<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\PickingRoute\Business\PickingRouteFacadeInterface;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\Product\Business\ProductFacadeInterface;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Spryker\Zed\Oms\Business\OmsFacadeInterface;
use Spryker\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;
use StoreApp\Zed\PermissionAccess\Business\PermissionAccessFacadeInterface;
use StoreApp\Zed\Picker\Communication\Aggregator\ItemAggregator;
use StoreApp\Zed\Picker\Communication\Form\DataProvider\OrderItemSelectionFormDataProvider;
use StoreApp\Zed\Picker\Communication\Form\DataProvider\PickingZoneSelectionFormDataProvider;
use StoreApp\Zed\Picker\Communication\Form\OrderItemSelectionForm;
use StoreApp\Zed\Picker\Communication\Form\PickingZoneSelectionForm;
use StoreApp\Zed\Picker\Communication\Mapper\FormDataMapper;
use StoreApp\Zed\Picker\Communication\Mapper\FormDataMapperInterface;
use StoreApp\Zed\Picker\Communication\Mapper\OrderItemsMapper;
use StoreApp\Zed\Picker\Communication\Mapper\OrderItemsMapperInterface;
use StoreApp\Zed\Picker\PickerDependencyProvider;
use Symfony\Component\Form\FormInterface;

/**
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 * @method \StoreApp\Zed\Picker\PickerConfig getConfig()
 */
class PickerCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \StoreApp\Zed\Picker\Communication\Form\DataProvider\PickingZoneSelectionFormDataProvider
     */
    public function createPickingZoneSelectionFormDataProvider(): PickingZoneSelectionFormDataProvider
    {
        return new PickingZoneSelectionFormDataProvider($this->getPickingZoneFacade());
    }

    /**
     * @param mixed[] $data
     * @param mixed[] $options
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createPickingZoneSelectionForm(array $data, array $options): FormInterface
    {
        return $this->getFormFactory()->create(PickingZoneSelectionForm::class, $data, $options);
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Spryker\Zed\Oms\Business\OmsFacadeInterface
     */
    public function getOmsFacade(): OmsFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_OMS);
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
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_MERCHANT);
    }

    /**
     * @param array $formData
     * @param array $formOptions
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createOrderItemSelectionForm(array $formData = [], array $formOptions = []): FormInterface
    {
        return $this->getFormFactory()->create(OrderItemSelectionForm::class, $formData, $formOptions);
    }

    /**
     * @return \StoreApp\Zed\Picker\Communication\Form\DataProvider\OrderItemSelectionFormDataProvider
     */
    public function createOrderItemSelectionFormDataProvider(): OrderItemSelectionFormDataProvider
    {
        return new OrderItemSelectionFormDataProvider(
            $this->getProductFacade()
        );
    }

    /**
     * @return \Pyz\Zed\Product\Business\ProductFacadeInterface
     */
    public function getProductFacade(): ProductFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_PRODUCT);
    }

    /**
     * @return \StoreApp\Zed\Picker\Communication\Aggregator\ItemAggregator
     */
    public function getItemAggregator(): ItemAggregator
    {
        return new ItemAggregator();
    }

    /**
     * @return \StoreApp\Zed\Picker\Communication\Mapper\FormDataMapperInterface
     */
    public function getFormDataMapper(): FormDataMapperInterface
    {
        return new FormDataMapper();
    }

    /**
     * @return \StoreApp\Zed\Picker\Communication\Mapper\OrderItemsMapperInterface
     */
    public function getOrderItemsMapper(): OrderItemsMapperInterface
    {
        return new OrderItemsMapper();
    }

    /**
     * @return \Pyz\Zed\PickingRoute\Business\PickingRouteFacadeInterface
     */
    public function getPickingRouteFacade(): PickingRouteFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_PICKING_ROUTE);
    }

    /**
     * @return \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    public function getPickingZoneFacade(): PickingZoneFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_PICKING_ZONE);
    }

    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    public function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }

    /**
     * @return \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface
     */
    public function getMerchantSalesOrderFacade(): MerchantSalesOrderFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_MERCHANT_SALES_ORDER);
    }

    /**
     * @return \StoreApp\Zed\PermissionAccess\Business\PermissionAccessFacadeInterface
     */
    public function getPermissionAccessFacade(): PermissionAccessFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_PERMISSION_ACCESS);
    }
}
