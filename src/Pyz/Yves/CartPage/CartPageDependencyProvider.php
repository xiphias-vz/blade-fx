<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CartPage;

use Pyz\Yves\CartPage\Dependency\Client\CartPageToZedRequestClientBridge;
use Spryker\Yves\Kernel\Container;
use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;

class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    public const CLIENT_DEPOSIT_PRODUCT_OPTION = 'CLIENT_DEPOSIT_PRODUCT_OPTION';
    public const CLIENT_PRODUCT_OPTION_STORAGE = 'CLIENT_PRODUCT_OPTION_STORAGE';
    public const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';
    public const BASE_CLIENT_QUOTE = 'BASE_CLIENT_QUOTE';
    public const CLIENT_SESSION = 'CLIENT_SESSION';
    public const CLIENT_ORDER_DETAIL = 'CLIENT_ORDER_DETAIL';
    public const CLIENT_AVAILABILITY = 'CLIENT_AVAILABILITY';
    public const PYZ_CLIENT_ZED_REQUEST = 'PYZ_CLIENT_ZED_REQUEST';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = parent::provideDependencies($container);

        $container = $this->addBaseQuoteClient($container);
        $container = $this->addDepositProductOptionClient($container);
        $container = $this->addSessionClient($container);
        $container = $this->addOrderDetailClient($container);
        $container = $this->addPyzZedRequestClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addBaseQuoteClient(Container $container): Container
    {
        $container->set(static::BASE_CLIENT_QUOTE, function (Container $container) {
            return $container->getLocator()->quote()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addSessionClient(Container $container): Container
    {
        $container->set(static::CLIENT_SESSION, function (Container $container) {
            return $container->getLocator()->session()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addOrderDetailClient(Container $container): Container
    {
        $container->set(static::CLIENT_ORDER_DETAIL, function (Container $container) {
            return $container->getLocator()->orderDetail()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addDepositProductOptionClient(Container $container): Container
    {
        $container->set(static::CLIENT_DEPOSIT_PRODUCT_OPTION, function (Container $container) {
            return $container->getLocator()->depositProductOption()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addPyzZedRequestClient(Container $container): Container
    {
        $container->set(static::PYZ_CLIENT_ZED_REQUEST, function (Container $container) {
            return new CartPageToZedRequestClientBridge($container->getLocator()->zedRequest()->client());
        });

        return $container;
    }
}
