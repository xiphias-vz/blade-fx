<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDocument;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\PickingRoute\Business\PickingRouteFacadeInterface;
use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\MerchantSearch\Business\MerchantSearchFacadeInterface;
use Spryker\Zed\Messenger\Business\MessengerFacadeInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class SalesDocumentDependencyProvider extends AbstractBundleDependencyProvider
{
    public const FACADE_SALES = 'FACADE_SALES';
    public const FACADE_PRODUCT = 'FACADE_PRODUCT';
    public const FACADE_MERCHANT_SEARCH_FACADE = 'FACADE_MERCHANT_SEARCH_FACADE';
    public const FACADE_USER = 'FACADE_USER';
    public const FACADE_MERCHANT = 'FACADE_MERCHANT';

    public const TWIG_ENVIRONMENT = 'TWIG_ENVIRONMENT';
    public const TWIG_FILESYSTEM_LOADER = 'TWIG_FILE_LOADER';

    public const CLIENT_PDF = 'CLIENT_PDF';
    public const SERVICE_DATE_TIME_WITH_ZONE = 'SERVICE_DATE_TIME_WITH_ZONE';
    public const FACADE_MESSENGER = 'FACADE_MESSENGER';
    public const FACADE_PICKING_ROUTE = 'FACADE_PICKING_ROUTE';

    public const FACADE_MERCHANT_SALES_ORDER = 'FACADE_MERCHANT_SALES_ORDER';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = $this->addSalesFacade($container);
        $container = $this->addProductFacade($container);
        $container = $this->addDateTimeWithZoneService($container);
        $container = $this->addMerchantFacade($container);
        $container = $this->addPickingRouteFacade($container);
        $container = $this->addMerchantSalesOrderFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = $this->addSalesFacade($container);
        $container = $this->addMerchantSearchFacade($container);
        $container = $this->addUserFacade($container);
        $container = $this->addMessengerFacade($container);
        $container = $this->addMerchantFacade($container);

        $container = $this->addTwigEnvironment($container);
        $container = $this->addTwigFilesystemLoader($container);

        $container = $this->addPdfClient($container);
        $container = $this->addDateTimeWithZoneService($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function addSalesFacade(Container $container): Container
    {
        $container->set(static::FACADE_SALES, function (Container $container) {
            return $container->getLocator()->sales()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function addProductFacade(Container $container): Container
    {
        $container->set(static::FACADE_PRODUCT, function (Container $container) {
            return $container->getLocator()->product()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function addMerchantSearchFacade(Container $container): Container
    {
        $container->set(static::FACADE_MERCHANT_SEARCH_FACADE, function (Container $container): MerchantSearchFacadeInterface {
            return $container->getLocator()->merchantSearch()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function addUserFacade(Container $container): Container
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
    public function addMessengerFacade(Container $container): Container
    {
        $container->set(static::FACADE_MESSENGER, function (Container $container): MessengerFacadeInterface {
            return $container->getLocator()->messenger()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function addMerchantFacade(Container $container): Container
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
    public function addPickingRouteFacade(Container $container): Container
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
    public function addMerchantSalesOrderFacade(Container $container): Container
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
    protected function addTwigEnvironment(Container $container): Container
    {
        $container[static::TWIG_ENVIRONMENT] = function () {
            return $this->createTwigEnvironment();
        };

        return $container;
    }

    /**
     * @return \Twig\Environment
     */
    protected function createTwigEnvironment(): Environment
    {
        return new Environment();
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTwigFilesystemLoader(Container $container): Container
    {
        $container[static::TWIG_FILESYSTEM_LOADER] = function () {
            return $this->createTwigFilesystemLoader();
        };

        return $container;
    }

    /**
     * @return \Twig\Loader\FilesystemLoader
     */
    protected function createTwigFilesystemLoader(): FilesystemLoader
    {
        return new FilesystemLoader();
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addPdfClient(Container $container): Container
    {
        $container->set(static::CLIENT_PDF, function (Container $container) {
            return $container->getLocator()->pdf()->client();
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
}
