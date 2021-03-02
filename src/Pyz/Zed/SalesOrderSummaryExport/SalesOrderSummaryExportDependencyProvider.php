<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport;

use Orm\Zed\Sales\Persistence\SpySalesExpenseQuery;
use Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery;
use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;

class SalesOrderSummaryExportDependencyProvider extends AbstractBundleDependencyProvider
{
    public const FACADE_OMS = 'FACADE_OMS';
    public const FACADE_SALES = 'FACADE_SALES';

    public const PROPEL_QUERY_SALES_ORDER = 'PROPEL_QUERY_SALES_ORDER';
    public const PROPEL_QUERY_SALES_ORDER_ITEM = 'PROPEL_QUERY_SALES_ORDER_ITEM';
    public const PROPEL_QUERY_SALES_EXPENSE = 'PROPEL_QUERY_SALES_EXPENSE';
    public const PROPEL_QUERY_CUSTOM_SALES_ORDER_ITEM = 'PROPEL_QUERY_CUSTOM_SALES_ORDER_ITEM';
    public const SERVICE_FILE_SYSTEM = 'SERVICE_FILE_SYSTEM';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->addOmsFacade($container);
        $container = $this->addSalesFacade($container);
        $container = $this->addCustomSalesOrderItemPropelQuery($container);
        $container = $this->addSalesOrderItemPropelQuery($container);
        $container = $this->addSalesExpensePropelQuery($container);
        $container = $this->addSalesOrderPropelQuery($container);
        $container = $this->addFileSystemService($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addOmsFacade(Container $container): Container
    {
        $container->set(self::FACADE_OMS, function (Container $container) {
            return $container->getLocator()->oms()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addSalesFacade(Container $container): Container
    {
        $container->set(self::FACADE_SALES, function (Container $container) {
            return $container->getLocator()->sales()->facade();
        });

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
    protected function addCustomSalesOrderItemPropelQuery(Container $container): Container
    {
        $container->set(static::PROPEL_QUERY_CUSTOM_SALES_ORDER_ITEM, $container->factory(function (): SpySalesOrderItemQuery {
            return SpySalesOrderItemQuery::create();
        }));

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addFileSystemService(Container $container): Container
    {
        $container->set(static::SERVICE_FILE_SYSTEM, function (Container $container) {
            return $container->getLocator()->fileSystem()->service();
        });

        return $container;
    }
}
