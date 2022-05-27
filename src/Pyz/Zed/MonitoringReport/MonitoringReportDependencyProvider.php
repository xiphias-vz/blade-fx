<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport;

use Pyz\Zed\Mail\Business\MailFacadeInterface;
use Spryker\Client\Catalog\Plugin\Elasticsearch\Query\ProductCatalogSearchQueryPlugin;
use Spryker\Client\Search\Dependency\Plugin\QueryInterface;
use Spryker\Service\FileSystem\FileSystemServiceInterface;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;

class MonitoringReportDependencyProvider extends AbstractBundleDependencyProvider
{
    public const FACADE_MAIL = 'FACADE_MAIL';
    public const STORE = 'STORE';
    public const FACADE_TRANSLATOR = 'FACADE_TRANSLATOR';
    public const SERVICE_MAIL_CMS_BLOCK = 'SERVICE_MAIL_CMS_BLOCK';
    public const CLIENT_SEARCH = 'CLIENT_SEARCH';
    public const CATALOG_SEARCH_QUERY_PLUGIN = 'catalog search query plugin';
    public const SERVICE_FLY_SYSTEM_SERVICE = 'SERVICE_FLY_SYSTEM_SERVICE';

    /**
     * @uses \Spryker\Zed\Twig\Communication\Plugin\Application\TwigApplicationPlugin::SERVICE_TWIG
     */
    public const SERVICE_TWIG = 'twig';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container = $this->addMailFacade($container);
        $container = $this->addTranslatorsFacade($container);
        $container = $this->addMailCmsBlockService($container);
        $container = $this->addStore($container);
        $container = $this->addSearchClient($container);
        $container = $this->addFlySystemService($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container)
    {
        $container = parent::provideCommunicationLayerDependencies($container);
        $container = $this->addTwigEnvironment($container);
        $container = $this->addSearchClient($container);
        $container = $this->addCatalogSearchQueryPlugin($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addMailFacade(Container $container)
    {
        $container->set(self::FACADE_MAIL, function (Container $container): MailFacadeInterface {
            return $container->getLocator()->mail()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTranslatorsFacade(Container $container): Container
    {
        $container->set(static::FACADE_TRANSLATOR, function (Container $container): TranslatorFacadeInterface {
            return $container->getLocator()->translator()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addMailCmsBlockService(Container $container): Container
    {
        $container->set(self::SERVICE_MAIL_CMS_BLOCK, function (Container $container) {
            return $container->getLocator()->mailCmsBlock()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addStore(Container $container): Container
    {
        $container->set(self::STORE, function (Container $container) {
            return Store::getInstance();
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
        $container->set(static::SERVICE_TWIG, function (Container $container) {
            return $container->getApplicationService(static::SERVICE_TWIG);
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addSearchClient(Container $container): Container
    {
        $container->set(static::CLIENT_SEARCH, function (Container $container) {
            return $container->getLocator()->searchElasticsearch()->client();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addCatalogSearchQueryPlugin(Container $container)
    {
        $container[static::CATALOG_SEARCH_QUERY_PLUGIN] = function () {
            return $this->createCatalogSearchQueryPlugin();
        };

        return $container;
    }

    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryInterface
     */
    protected function createCatalogSearchQueryPlugin(): QueryInterface
    {
        return new ProductCatalogSearchQueryPlugin();
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addFlySystemService(Container $container): Container
    {
        $container->set(static::SERVICE_FLY_SYSTEM_SERVICE, function (Container $container): FileSystemServiceInterface {
            return $container->getLocator()->fileSystem()->service();
        });

        return $container;
    }
}
