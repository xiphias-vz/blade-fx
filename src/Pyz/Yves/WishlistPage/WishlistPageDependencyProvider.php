<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\WishlistPage;

use Spryker\Client\AvailabilityStorage\Plugin\ProductViewAvailabilityStorageExpanderPlugin;
use Spryker\Client\PriceProductStorage\Plugin\ProductViewPriceExpanderPlugin;
use Spryker\Client\ProductImageStorage\Plugin\ProductViewImageExpanderPlugin;
use Spryker\Client\ZedRequest\ZedRequestClientInterface;
use Spryker\Yves\Kernel\Container;
use SprykerShop\Yves\WishlistPage\WishlistPageDependencyProvider as SprykerWishlistPageDependencyProvider;

class WishlistPageDependencyProvider extends SprykerWishlistPageDependencyProvider
{
    public const CLIENT_DEPOSIT_PRODUCT_OPTION = 'CLIENT_DEPOSIT_PRODUCT_OPTION';
    public const BASE_CLIENT_WISHLIST = 'BASE_CLIENT_WISHLIST';

    public const CLIENT_ZED_REQUEST = 'CLIENT_ZED_REQUEST';

    /**
     * @uses \Spryker\Yves\Form\Plugin\Application\FormApplicationPlugin::SERVICE_FORM_CSRF_PROVIDER
     */
    public const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);
        $container = $this->addBaseWishlistClient($container);
        $container = $this->addDepositProductOptionClient($container);
        $container = $this->addZedRequestClient($container);
        $container = $this->addFormCsrfProviderService($container);

        return $container;
    }

    /**
     * @return \Spryker\Client\ProductStorage\Dependency\Plugin\ProductViewExpanderPluginInterface[]
     */
    protected function getWishlistItemExpanderPlugins(): array
    {
        return [
            new ProductViewPriceExpanderPlugin(),
            new ProductViewImageExpanderPlugin(),
            new ProductViewAvailabilityStorageExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addBaseWishlistClient(Container $container): Container
    {
        $container[self::BASE_CLIENT_WISHLIST] = function (Container $container) {
            return $container->getLocator()->wishlist()->client();
        };

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
    protected function addZedRequestClient(Container $container): Container
    {
        $container[self::CLIENT_ZED_REQUEST] = function (Container $container): ZedRequestClientInterface {
            return $container->getLocator()->zedRequest()->client();
        };

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addFormCsrfProviderService(Container $container): Container
    {
        $container->set(static::SERVICE_FORM_CSRF_PROVIDER, function (Container $container) {
            return $container->getApplicationService(static::SERVICE_FORM_CSRF_PROVIDER);
        });

        return $container;
    }
}
