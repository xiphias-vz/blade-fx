<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Delivery\Communication;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Spryker\Zed\Oms\Business\OmsFacadeInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;
use StoreApp\Zed\Delivery\Communication\Form\DataProvider\DeliveryFormDataProvider;
use StoreApp\Zed\Delivery\Communication\Form\DeliveryForm;
use StoreApp\Zed\Delivery\DeliveryDependencyProvider;
use StoreApp\Zed\PermissionAccess\Business\PermissionAccessFacadeInterface;
use StoreApp\Zed\Picker\PickerDependencyProvider;
use StoreApp\Zed\StoreOrder\Business\StoreOrderFacadeInterface;
use Symfony\Component\Form\FormInterface;

/**
 * @method \StoreApp\Zed\Delivery\Business\DeliveryFacadeInterface getFacade()
 * @method \StoreApp\Zed\Delivery\DeliveryConfig getConfig()
 */
class DeliveryCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(DeliveryDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Spryker\Zed\Oms\Business\OmsFacadeInterface
     */
    public function getOmsFacade(): OmsFacadeInterface
    {
        return $this->getProvidedDependency(DeliveryDependencyProvider::FACADE_OMS);
    }

    /**
     * @return \Spryker\Zed\User\Business\UserFacadeInterface
     */
    public function getUserFacade(): UserFacadeInterface
    {
        return $this->getProvidedDependency(DeliveryDependencyProvider::FACADE_USER);
    }

    /**
     * @return \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    public function getMerchantFacade(): MerchantFacadeInterface
    {
        return $this->getProvidedDependency(DeliveryDependencyProvider::FACADE_MERCHANT);
    }

    /**
     * @param array $formData
     * @param array $formOptions
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createDeliveryForm(array $formData = [], array $formOptions = []): FormInterface
    {
        return $this->getFormFactory()->create(DeliveryForm::class, $formData, $formOptions);
    }

    /**
     * @return \StoreApp\Zed\Delivery\Communication\Form\DataProvider\DeliveryFormDataProvider
     */
    public function createDeliveryFormDataProvider(): DeliveryFormDataProvider
    {
        return new DeliveryFormDataProvider();
    }

    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    public function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(DeliveryDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }

    /**
     * @return \StoreApp\Zed\StoreOrder\Business\StoreOrderFacadeInterface
     */
    public function getStoreOrderFacade(): StoreOrderFacadeInterface
    {
        return $this->getProvidedDependency(DeliveryDependencyProvider::FACADE_STORE_ORDER);
    }

    /**
     * @return \Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface
     */
    public function getMerchantSalesOrderFacade(): MerchantSalesOrderFacadeInterface
    {
        return $this->getProvidedDependency(DeliveryDependencyProvider::FACADE_MERCHANT_SALES_ORDER);
    }

    /**
     * @return \StoreApp\Zed\PermissionAccess\Business\PermissionAccessFacadeInterface
     */
    public function getPermissionAccessFacade(): PermissionAccessFacadeInterface
    {
        return $this->getProvidedDependency(PickerDependencyProvider::FACADE_PERMISSION_ACCESS);
    }
}
