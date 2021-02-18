<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport;

use Orm\Zed\Sales\Persistence\SpySalesExpenseQuery;
use Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery;
use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Pyz\Service\DataExport\DataExportService;
use Pyz\Zed\SalesDataExport\Dependency\Service\SalesDataExportToDataExportServiceBridge;
use Pyz\Zed\SalesDataExport\Dependency\Service\SalesDataExportToDataExportServiceInterface;
use Pyz\Zed\SalesDataExport\Dependency\Service\SalesDataExportToUtilEncodingServiceBridge;
use Pyz\Zed\SalesDataExport\Dependency\Service\SalesDataExportToUtilEncodingServiceInterface;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\SalesDataExport\SalesDataExportDependencyProvider as SprySalesDataExportDependencyProvider;

/**
 * @method \Pyz\Zed\SalesDataExport\SalesDataExportConfig getConfig()
 */
class SalesDataExportDependencyProvider extends SprySalesDataExportDependencyProvider
{
    public const SERVICE_DATA_EXPORT = 'SERVICE_DATA_EXPORT';
    public const SERVICE_UTIL_ENCODING = 'SERVICE_UTIL_ENCODING';

    public const PROPEL_QUERY_SALES_ORDER = 'PROPEL_QUERY_SALES_ORDER';
    public const PROPEL_QUERY_SALES_ORDER_ITEM = 'PROPEL_QUERY_SALES_ORDER_ITEM';
    public const PROPEL_QUERY_SALES_EXPENSE = 'PROPEL_QUERY_SALES_EXPENSE';
    public const PROPEL_QUERY_CUSTOM_SALES_ORDER_ITEM = 'PROPEL_QUERY_CUSTOM_SALES_ORDER_ITEM';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->addDataExportService($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function providePersistenceLayerDependencies(Container $container): Container
    {
        $container = parent::providePersistenceLayerDependencies($container);
        $container = $this->addSalesOrderPropelQuery($container);
        $container = $this->addSalesOrderItemPropelQuery($container);
        $container = $this->addCustomSalesOrderItemPropelQuery($container);
        $container = $this->addSalesExpensePropelQuery($container);
        $container = $this->addUtilEncodingService($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addSalesOrderPropelQuery(Container $container): Container
    {
        $container->set(static::PROPEL_QUERY_SALES_ORDER, $container->factory(function (): SpySalesOrderQuery {
            return SpySalesOrderQuery::create();
        }));

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addSalesOrderItemPropelQuery(Container $container): Container
    {
        $container->set(static::PROPEL_QUERY_SALES_ORDER_ITEM, $container->factory(function (): SpySalesOrderItemQuery {
            return SpySalesOrderItemQuery::create();
        }));

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addSalesExpensePropelQuery(Container $container): Container
    {
        $container->set(static::PROPEL_QUERY_SALES_EXPENSE, $container->factory(function (): SpySalesExpenseQuery {
            return SpySalesExpenseQuery::create();
        }));

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addUtilEncodingService(Container $container): Container
    {
        $container->set(static::SERVICE_UTIL_ENCODING, function (Container $container): SalesDataExportToUtilEncodingServiceInterface {
            return new SalesDataExportToUtilEncodingServiceBridge(
                $container->getLocator()->utilEncoding()->service()
            );
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addDataExportService(Container $container): Container
    {
        $container->set(static::SERVICE_DATA_EXPORT, function (Container $container): SalesDataExportToDataExportServiceInterface {
            return new SalesDataExportToDataExportServiceBridge(
                new DataExportService()
            );
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addCustomSalesOrderItemPropelQuery(Container $container): Container
    {
        $container->set(static::PROPEL_QUERY_CUSTOM_SALES_ORDER_ITEM, $container->factory(function (): SpySalesOrderItemQuery {
            return SpySalesOrderItemQuery::create();
        }));

        return $container;
    }
}
