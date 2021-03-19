<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ShopApplication;

use Pyz\Yves\CookieBot\Plugin\Application\CookieBotApplicationPlugin;
use Pyz\Yves\CurrentStoreCookieCheck\Plugin\Application\CurrentStoreCookieCheckApplicationPlugin;
use Pyz\Yves\CustomerPage\Plugin\Application\CustomerPageApplicationPlugin;
use Pyz\Yves\GoogleTagManager\Plugin\Application\GoogleTagManagerIdApplicationPlugin;
use Pyz\Yves\LanguageSwitcherWidget\Widget\LanguageSwitcherWidget;
use Pyz\Yves\MerchantSwitcherWidget\Plugin\Application\CurrentMerchantApplicationPlugin;
use Pyz\Yves\MerchantSwitcherWidget\Widget\MerchantSwitcherSelectorFormWidget;
use Pyz\Yves\Messenger\Plugin\Application\FlashMessengerApplicationPlugin;
use Pyz\Yves\ProductComparativePriceWidget\Widget\ProductComparativePriceWidget;
use Pyz\Yves\ProductOptionWidget\Widget\ProductOptionConfiguratorWidget;
use Pyz\Yves\ProductRelationWidget\Widget\UpSellingProductsWidget;
use Pyz\Yves\ProductSetWidget\Widget\ProductSetIdsWidget;
use Pyz\Yves\ProductWidget\Widget\CatalogPageProductWidget;
use Pyz\Yves\Security\Plugin\Application\SecurityApplicationPlugin;
use Pyz\Yves\StoreSwitcherWidget\Widget\StoreSwitcherWidget;
use Spryker\Yves\ErrorHandler\Plugin\Application\ErrorHandlerApplicationPlugin;
use Spryker\Yves\EventDispatcher\Plugin\Application\EventDispatcherApplicationPlugin;
use Spryker\Yves\Form\Plugin\Application\FormApplicationPlugin;
use Spryker\Yves\Http\Plugin\Application\HttpApplicationPlugin;
use Spryker\Yves\Locale\Plugin\Application\LocaleApplicationPlugin;
use Spryker\Yves\Router\Plugin\Application\RouterApplicationPlugin;
use Spryker\Yves\Session\Plugin\Application\SessionApplicationPlugin;
use Spryker\Yves\ShopContext\Communication\Plugin\ShopApplication\ShopContextApplicationPlugin;
use Spryker\Yves\Store\Plugin\Application\StoreApplicationPlugin;
use Spryker\Yves\Translator\Plugin\Application\TranslatorApplicationPlugin;
use Spryker\Yves\Twig\Plugin\Application\TwigApplicationPlugin;
use Spryker\Yves\Validator\Plugin\Application\ValidatorApplicationPlugin;
use SprykerShop\Yves\AvailabilityNotificationWidget\Widget\AvailabilityNotificationSubscriptionWidget;
use SprykerShop\Yves\CartCodeWidget\Widget\CartCodeFormWidget;
use SprykerShop\Yves\CartNoteWidget\Widget\CartItemNoteFormWidget;
use SprykerShop\Yves\CartNoteWidget\Widget\CartNoteFormWidget;
use SprykerShop\Yves\CategoryImageStorageWidget\Widget\CategoryImageStorageWidget;
use SprykerShop\Yves\CheckoutWidget\Widget\CheckoutBreadcrumbWidget;
use SprykerShop\Yves\CurrencyWidget\Widget\CurrencyWidget;
use SprykerShop\Yves\CustomerPage\Widget\CustomerNavigationWidget;
use SprykerShop\Yves\CustomerReorderWidget\Plugin\CustomerPage\CustomerReorderItemCheckboxWidget;
use SprykerShop\Yves\DiscountPromotionWidget\Widget\CartDiscountPromotionProductListWidget;
use SprykerShop\Yves\DiscountWidget\Widget\CheckoutVoucherFormWidget;
use SprykerShop\Yves\DiscountWidget\Widget\DiscountVoucherFormWidget;
use SprykerShop\Yves\NavigationWidget\Widget\NavigationWidget;
use SprykerShop\Yves\NewsletterWidget\Widget\NewsletterSubscriptionSummaryWidget;
use SprykerShop\Yves\PriceProductVolumeWidget\Widget\ProductPriceVolumeWidget;
use SprykerShop\Yves\PriceWidget\Widget\PriceModeSwitcherWidget;
use SprykerShop\Yves\ProductAlternativeWidget\Widget\ProductAlternativeListWidget;
use SprykerShop\Yves\ProductAlternativeWidget\Widget\ShoppingListProductAlternativeWidget;
use SprykerShop\Yves\ProductAlternativeWidget\Widget\WishlistProductAlternativeWidget;
use SprykerShop\Yves\ProductCategoryWidget\Widget\ProductBreadcrumbsWithCategoriesWidget;
use SprykerShop\Yves\ProductDiscontinuedWidget\Widget\ProductDiscontinuedNoteWidget;
use SprykerShop\Yves\ProductDiscontinuedWidget\Widget\ProductDiscontinuedWidget;
use SprykerShop\Yves\ProductLabelWidget\Widget\ProductAbstractLabelWidget;
use SprykerShop\Yves\ProductLabelWidget\Widget\ProductConcreteLabelWidget;
use SprykerShop\Yves\ProductMeasurementUnitWidget\Widget\CartProductMeasurementUnitQuantitySelectorWidget;
use SprykerShop\Yves\ProductMeasurementUnitWidget\Widget\ManageProductMeasurementUnitWidget;
use SprykerShop\Yves\ProductPackagingUnitWidget\Widget\ProductPackagingUnitWidget;
use SprykerShop\Yves\ProductRelationWidget\Widget\SimilarProductsWidget;
use SprykerShop\Yves\ProductReplacementForWidget\Widget\ProductReplacementForListWidget;
use SprykerShop\Yves\ProductWidget\Widget\CmsProductWidget;
use SprykerShop\Yves\ProductWidget\Widget\PdpProductRelationWidget;
use SprykerShop\Yves\ProductWidget\Widget\PdpProductReplacementForListWidget;
use SprykerShop\Yves\ProductWidget\Widget\ProductAlternativeWidget;
use SprykerShop\Yves\SalesOrderThresholdWidget\Widget\SalesOrderThresholdWidget;
use SprykerShop\Yves\ShopApplication\Plugin\Application\ShopApplicationApplicationPlugin;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\TabsWidget\Widget\FullTextSearchTabsWidget;
use SprykerShop\Yves\WebProfilerWidget\Plugin\Application\WebProfilerApplicationPlugin;
use SprykerShop\Yves\WishlistWidget\Widget\WishlistMenuItemWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    public const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';

    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            CartDiscountPromotionProductListWidget::class,
            CartCodeFormWidget::class,
            CartItemNoteFormWidget::class,
            CartNoteFormWidget::class,
            CatalogPageProductWidget::class,
            CheckoutBreadcrumbWidget::class,
            CmsProductWidget::class,
            CurrencyWidget::class,
            CustomerNavigationWidget::class,
            CustomerReorderItemCheckboxWidget::class,
            LanguageSwitcherWidget::class,
            NavigationWidget::class,
            NewsletterSubscriptionSummaryWidget::class,
            PdpProductRelationWidget::class,
            PdpProductReplacementForListWidget::class,
            ProductReplacementForListWidget::class,
            PriceModeSwitcherWidget::class,
            ProductAbstractLabelWidget::class,
            ProductAlternativeListWidget::class,
            ProductAlternativeWidget::class,
            ProductBreadcrumbsWithCategoriesWidget::class,
            ProductConcreteLabelWidget::class,
            ProductDiscontinuedNoteWidget::class,
            ProductDiscontinuedWidget::class,
            ProductOptionConfiguratorWidget::class,
            ProductPriceVolumeWidget::class,
            SalesOrderThresholdWidget::class,
            ShoppingListProductAlternativeWidget::class,
            SimilarProductsWidget::class,
            UpSellingProductsWidget::class,
            DiscountVoucherFormWidget::class,
            CheckoutVoucherFormWidget::class,
            WishlistMenuItemWidget::class,
            WishlistProductAlternativeWidget::class,
            ProductSetIdsWidget::class,
            CategoryImageStorageWidget::class,
            FullTextSearchTabsWidget::class,
            AvailabilityNotificationSubscriptionWidget::class,
            MerchantSwitcherSelectorFormWidget::class,
            ProductComparativePriceWidget::class,
            StoreSwitcherWidget::class,
            ManageProductMeasurementUnitWidget::class,
            CartProductMeasurementUnitQuantitySelectorWidget::class,
            ProductPackagingUnitWidget::class,
        ];
    }

    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        $applicationPlugins = [
            new TwigApplicationPlugin(),
            new EventDispatcherApplicationPlugin(),
            new ShopApplicationApplicationPlugin(),
            new StoreApplicationPlugin(),
            new LocaleApplicationPlugin(),
            new TranslatorApplicationPlugin(),
            new RouterApplicationPlugin(),
            new HttpApplicationPlugin(),
            new SessionApplicationPlugin(),
            new SecurityApplicationPlugin(),
            new FormApplicationPlugin(),
            new ValidatorApplicationPlugin(),
            new FlashMessengerApplicationPlugin(),
            new ErrorHandlerApplicationPlugin(),
            new ShopContextApplicationPlugin(),
            new CurrentMerchantApplicationPlugin(),
            new GoogleTagManagerIdApplicationPlugin(),
            new CustomerPageApplicationPlugin(),
            new CookieBotApplicationPlugin(),
            new CurrentStoreCookieCheckApplicationPlugin(),
        ];

        if (class_exists(WebProfilerApplicationPlugin::class)) {
            $applicationPlugins[] = new WebProfilerApplicationPlugin();
        }

        return $applicationPlugins;
    }
}
