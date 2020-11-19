<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\OrderContainer\Business\OrderContainerFacadeInterface;
use Pyz\Zed\PickingRoute\Business\PickingRouteFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Business\OmsFacadeInterface;
use Spryker\Zed\Product\Business\ProductFacadeInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;
use StoreApp\Zed\PermissionAccess\Business\PermissionAccessFacadeInterface;

class PickerDependencyProvider extends AbstractBundleDependencyProvider
{
    public const FACADE_SALES = 'FACADE_SALES';
    public const FACADE_OMS = 'FACADE_OMS';
    public const FACADE_ORDER_CONTAINER = 'FACADE_ORDER_CONTAINER';
    public const FACADE_USER = 'FACADE_USER';
    public const FACADE_MERCHANT = 'FACADE_MERCHANT';
    public const FACADE_PRODUCT = 'FACADE_PRODUCT';
    public const FACADE_PICKING_ROUTE = 'FACADE_PICKING_ROUTE';

    public const SERVICE_DATE_TIME_WITH_ZONE = 'SERVICE_DATE_TIME_WITH_ZONE';
    public const FACADE_MERCHANT_SALES_ORDER = 'FACADE_MERCHANT_SALES_ORDER';
    public const FACADE_PERMISSION_ACCESS = 'FACADE_PERMISSION_ACCESS';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = parent::provideCommunicationLayerDependencies($container);

        $container = $this->addSalesFacade($container);
        $container = $this->addOmsFacade($container);
        $container = $this->addUserFacade($container);
        $container = $this->addMerchantFacade($container);
        $container = $this->addProductFacade($container);
        $container = $this->addPickingRouteFacade($container);
        $container = $this->addDateTimeWithZoneService($container);
        $container = $this->addMerchantSalesOrderFacade($container);
        $container = $this->addPermissionAccessFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container = $this->addSalesFacade($container);
        $container = $this->addOmsFacade($container);
        $container = $this->addUserFacade($container);
        $container = $this->addOrderContainerFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addSalesFacade(Container $container): Container
    {
        $container->set(static::FACADE_SALES, function (Container $container): SalesFacadeInterface {
            return $container->getLocator()->sales()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addOmsFacade(Container $container): Container
    {
        $container->set(static::FACADE_OMS, function (Container $container): OmsFacadeInterface {
            return $container->getLocator()->oms()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addOrderContainerFacade(Container $container): Container
    {
        $container->set(static::FACADE_ORDER_CONTAINER, function (Container $container): OrderContainerFacadeInterface {
            return $container->getLocator()->orderContainer()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addUserFacade(Container $container): Container
    {
        $container->set(static::FACADE_USER, function (Container $container): UserFacadeInterface {
            return $container->getLocator()->user()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addMerchantFacade(Container $container): Container
    {
        $container->set(static::FACADE_MERCHANT, function (Container $container): MerchantFacadeInterface {
            return $container->getLocator()->merchant()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addProductFacade(Container $container): Container
    {
        $container->set(static::FACADE_PRODUCT, function (Container $container): ProductFacadeInterface {
            return $container->getLocator()->product()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addPickingRouteFacade(Container $container): Container
    {
        $container->set(static::FACADE_PICKING_ROUTE, function (Container $container): PickingRouteFacadeInterface {
            return $container->getLocator()->pickingRoute()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addDateTimeWithZoneService(Container $container): Container
    {
        $container->set(static::SERVICE_DATE_TIME_WITH_ZONE, function (Container $container): DateTimeWithZoneServiceInterface {
            return $container->getLocator()->dateTimeWithZone()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addMerchantSalesOrderFacade(Container $container): Container
    {
        $container->set(static::FACADE_MERCHANT_SALES_ORDER, function (Container $container): MerchantSalesOrderFacadeInterface {
            return $container->getLocator()->merchantSalesOrder()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addPermissionAccessFacade(Container $container): Container
    {
        $container->set(static::FACADE_PERMISSION_ACCESS, function (Container $container): PermissionAccessFacadeInterface {
            return $container->getLocator()->permissionAccess()->facade();
        });

        return $container;
    }
}
