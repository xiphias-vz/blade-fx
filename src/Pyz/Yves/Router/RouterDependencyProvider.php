<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Router;

use Pyz\Yves\ApiTest\Plugin\Provider\ApiTestRouteProviderPlugin;
use Pyz\Yves\CartPage\Plugin\Router\CartPageRouteProviderPlugin;
use Pyz\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
use Pyz\Yves\CustomerPage\Plugin\Router\CustomerPageRouteProviderPlugin;
use Pyz\Yves\ErrorPage\Plugin\Router\ErrorPageRouteProviderPlugin;
use Pyz\Yves\ExampleProductSalePage\Plugin\Router\ExampleProductSaleRouteProviderPlugin;
use Pyz\Yves\StoreSwitcherWidget\Plugin\Router\StoreSwitcherWidgetRouteProviderPlugin;
use Pyz\Yves\WishlistPage\Plugin\Router\WishlistPageRouteProviderPlugin;
use Spryker\Yves\HealthCheck\Plugin\Router\HealthCheckRouteProviderPlugin;
use Spryker\Yves\Router\Plugin\RouteManipulator\LanguageDefaultPostAddRouteManipulatorPlugin;
use Spryker\Yves\Router\Plugin\RouteManipulator\SslPostAddRouteManipulatorPlugin;
use Spryker\Yves\Router\Plugin\RouteManipulator\StoreDefaultPostAddRouteManipulatorPlugin;
use Spryker\Yves\Router\Plugin\Router\YvesDevelopmentRouterPlugin;
use Spryker\Yves\Router\Plugin\Router\YvesRouterPlugin;
use Spryker\Yves\Router\Plugin\RouterEnhancer\LanguagePrefixRouterEnhancerPlugin;
use Spryker\Yves\Router\Plugin\RouterEnhancer\StorePrefixRouterEnhancerPlugin;
use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerEco\Yves\Payone\Plugin\Router\PayoneRouteProviderPlugin;
use SprykerShop\Yves\AvailabilityNotificationPage\Plugin\Router\AvailabilityNotificationPageRouteProviderPlugin;
use SprykerShop\Yves\AvailabilityNotificationWidget\Plugin\Router\AvailabilityNotificationWidgetRouteProviderPlugin;
use SprykerShop\Yves\CalculationPage\Plugin\Router\CalculationPageRouteProviderPlugin;
use SprykerShop\Yves\CartCodeWidget\Plugin\Router\CartCodeWidgetRouteProviderPlugin;
use SprykerShop\Yves\CartNoteWidget\Plugin\Router\CartNoteWidgetRouteProviderPlugin;
use SprykerShop\Yves\CatalogPage\Plugin\Router\CatalogPageRouteProviderPlugin;
use SprykerShop\Yves\CmsPage\Plugin\Router\CmsPageRouteProviderPlugin;
use SprykerShop\Yves\CmsSearchPage\Plugin\Router\CmsSearchPageRouteProviderPlugin;
use SprykerShop\Yves\CurrencyWidget\Plugin\Router\CurrencyWidgetRouteProviderPlugin;
use SprykerShop\Yves\CustomerReorderWidget\Plugin\Router\CustomerReorderWidgetRouteProviderPlugin;
use SprykerShop\Yves\DiscountWidget\Plugin\Router\DiscountWidgetRouteProviderPlugin;
use SprykerShop\Yves\FileManagerWidget\Plugin\Router\FileManagerWidgetRouteProviderPlugin;
use SprykerShop\Yves\HomePage\Plugin\Router\HomePageRouteProviderPlugin;
use SprykerShop\Yves\MerchantSwitcherWidget\Plugin\Router\MerchantSwitcherWidgetRouteProviderPlugin;
use SprykerShop\Yves\NewsletterPage\Plugin\Router\NewsletterPageRouteProviderPlugin;
use SprykerShop\Yves\NewsletterWidget\Plugin\Router\NewsletterWidgetRouteProviderPlugin;
use SprykerShop\Yves\PriceWidget\Plugin\Router\PriceWidgetRouteProviderPlugin;
use SprykerShop\Yves\ProductNewPage\Plugin\Router\ProductNewPageRouteProviderPlugin;
use SprykerShop\Yves\ProductSearchWidget\Plugin\Router\ProductSearchWidgetRouteProviderPlugin;
use SprykerShop\Yves\ProductSetListPage\Plugin\Router\ProductSetListPageRouteProviderPlugin;
use SprykerShop\Yves\StorageRouter\Plugin\Router\StorageRouterPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouterPluginInterface[]
     */
    protected function getRouterPlugins(): array
    {
        return [
            new YvesRouterPlugin(),
            new StorageRouterPlugin(),
            // This router will only be hit, when no other router was able to match/generate.
            new YvesDevelopmentRouterPlugin(),
        ];
    }

    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new ErrorPageRouteProviderPlugin(),
            new HomePageRouteProviderPlugin(),
            new CheckoutPageRouteProviderPlugin(),
            new CustomerPageRouteProviderPlugin(),
            new CustomerReorderWidgetRouteProviderPlugin(),
            new NewsletterPageRouteProviderPlugin(),
            new CartPageRouteProviderPlugin(),
            new WishlistPageRouteProviderPlugin(),
            new HealthCheckRouteProviderPlugin(),
            new NewsletterWidgetRouteProviderPlugin(),
            new CatalogPageRouteProviderPlugin(),
            new CalculationPageRouteProviderPlugin(),
            new ProductSetListPageRouteProviderPlugin(),
            new ExampleProductSaleRouteProviderPlugin(),
            new CmsPageRouteProviderPlugin(),
            new CurrencyWidgetRouteProviderPlugin(),
            new ProductNewPageRouteProviderPlugin(),
            new DiscountWidgetRouteProviderPlugin(),
            new PriceWidgetRouteProviderPlugin(),
            new CartCodeWidgetRouteProviderPlugin(),
            new CartNoteWidgetRouteProviderPlugin(), #CartNoteFeature
            new FileManagerWidgetRouteProviderPlugin(),
            new CmsSearchPageRouteProviderPlugin(), #CmsSearchPageFeature
            new ProductSearchWidgetRouteProviderPlugin(),
            new AvailabilityNotificationWidgetRouteProviderPlugin(),
            new AvailabilityNotificationPageRouteProviderPlugin(),
            new MerchantSwitcherWidgetRouteProviderPlugin(),
            new PayoneRouteProviderPlugin(), #Payone
            new StoreSwitcherWidgetRouteProviderPlugin(),
            new ApiTestRouteProviderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\PostAddRouteManipulatorPluginInterface[]
     */
    protected function getPostAddRouteManipulator(): array
    {
        return [
            new LanguageDefaultPostAddRouteManipulatorPlugin(),
            new StoreDefaultPostAddRouteManipulatorPlugin(),
            new SslPostAddRouteManipulatorPlugin(),
        ];
    }

    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouterEnhancerPluginInterface[]
     */
    protected function getRouterEnhancerPlugins(): array
    {
        return [
            new LanguagePrefixRouterEnhancerPlugin(),
            new StorePrefixRouterEnhancerPlugin(),
        ];
    }
}
