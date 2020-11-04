<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Twig;

// @codingStandardsIgnoreStart
use Spryker\Zed\User\Communication\Plugin\Twig\UserTwigPlugin;
use StoreApp\Zed\Twig\Communication\Plugin\FilesystemTwigLoaderPlugin;
use Spryker\Service\UtilDateTime\Plugin\Twig\DateTimeFormatterTwigPlugin;
use Spryker\Shared\Twig\Dependency\Service\TwigToUtilTextServiceBridge;
use Spryker\Shared\Twig\Plugin\DebugTwigPlugin;
use Spryker\Shared\Twig\Plugin\FormTwigPlugin;
use Spryker\Shared\Twig\Plugin\HttpKernelTwigPlugin;
use Spryker\Shared\Twig\Plugin\RoutingTwigPlugin;
use Spryker\Shared\Twig\Plugin\RuntimeLoaderTwigPlugin;
use Spryker\Shared\Twig\Plugin\SecurityTwigPlugin;
use Spryker\Shared\Twig\Plugin\TranslationTwigPlugin;
use Spryker\Yves\Twig\Plugin\FormFilesystemTwigLoaderPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\AssetsPathTwigPlugin;
use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use SprykerShop\Yves\MoneyWidget\Plugin\Twig\MoneyTwigPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\Twig\ShopApplicationFormTwigLoaderPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\Twig\ShopApplicationTwigPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\Twig\WidgetTagTwigPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\Twig\WidgetTwigPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\TwigFormRuntimeLoaderPlugin;
use SprykerShop\Yves\ShopUi\Plugin\Twig\ShopUiTwigPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\Twig\WebProfilerTwigLoaderPlugin;

// @codingStandardsIgnoreEnd

/**
 * @method \Spryker\Yves\Twig\TwigConfig getConfig()
 */
class TwigDependencyProvider extends AbstractBundleDependencyProvider
{
    public const SERVICE_UTIL_TEXT = 'util text service';
    public const PLUGINS_TWIG = 'PLUGINS_TWIG';
    public const PLUGINS_TWIG_LOADER = 'PLUGINS_TWIG_LOADER';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container)
    {
        $container = $this->addUtilTextService($container);
        $container = $this->addTwigPlugins($container);
        $container = $this->addTwigLoaderPlugins($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addUtilTextService(Container $container)
    {
        $container[static::SERVICE_UTIL_TEXT] = function (Container $container) {
            return new TwigToUtilTextServiceBridge($container->getLocator()->utilText()->service());
        };

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTwigPlugins(Container $container): Container
    {
        $container->set(static::PLUGINS_TWIG, function (Container $container) {
            return $this->getTwigPlugins();
        });

        return $container;
    }

    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            new DebugTwigPlugin(),
            new FormTwigPlugin(),
            new HttpKernelTwigPlugin(),
            new RoutingTwigPlugin(),
            new SecurityTwigPlugin(),
            new TranslationTwigPlugin(),
            new RuntimeLoaderTwigPlugin(),
            new ShopApplicationTwigPlugin(),
            new TwigFormRuntimeLoaderPlugin(),
            new MoneyTwigPlugin(),
            new WidgetTwigPlugin(),
            new ShopUiTwigPlugin(),
            new DateTimeFormatterTwigPlugin(),
            new WidgetTagTwigPlugin(),
            new AssetsPathTwigPlugin(),
            new UserTwigPlugin(),
        ];
    }

    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigLoaderPluginInterface[]
     */
    protected function getTwigLoaderPlugins(): array
    {
        $plugins = [
            new FilesystemTwigLoaderPlugin(),
            new FormFilesystemTwigLoaderPlugin(),
            new ShopApplicationFormTwigLoaderPlugin(),
        ];

        if (class_exists(WebProfilerTwigLoaderPlugin::class)) {
            $plugins[] = new WebProfilerTwigLoaderPlugin();
        }

        return $plugins;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTwigLoaderPlugins(Container $container): Container
    {
        $container->set(static::PLUGINS_TWIG_LOADER, function (Container $container) {
            return $this->getTwigLoaderPlugins();
        });

        return $container;
    }
}
