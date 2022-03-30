<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductManagement\Communication\Table;

use Orm\Zed\Product\Persistence\Map\SpyProductAbstractLocalizedAttributesTableMap;
use Orm\Zed\Product\Persistence\Map\SpyProductAbstractTableMap;
use Orm\Zed\Tax\Persistence\Map\SpyTaxSetTableMap;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;
use Spryker\Zed\ProductManagement\Communication\Table\ProductTable as SprykerProductTable;

class ProductTable extends SprykerProductTable
{
    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return mixed
     */
    protected function configure(TableConfiguration $config)
    {
        $config->setHeader([
            static::COL_ID_PRODUCT_ABSTRACT => 'Product ID',
            static::COL_NAME => 'Name',
            static::COL_SKU => 'Sku',
            static::COL_TAX_SET => 'Tax Set',
            static::COL_VARIANT_COUNT => 'Variants',
            static::COL_STATUS => 'Status',
            static::COL_PRODUCT_TYPES => 'Product type',
            static::COL_STORE_RELATION => 'Stores',
            static::COL_ACTIONS => 'Actions',
        ]);

        $config->setRawColumns([
            static::COL_STATUS,
            static::COL_PRODUCT_TYPES,
            static::COL_STORE_RELATION,
            static::COL_ACTIONS,
        ]);

        $config->setSearchable([
            SpyProductAbstractTableMap::COL_SKU,
            SpyProductAbstractLocalizedAttributesTableMap::COL_NAME,
            SpyTaxSetTableMap::COL_NAME,
            SpyProductAbstractTableMap::COL_SAP_NUMBER,
        ]);

        $config->setSortable([
            static::COL_ID_PRODUCT_ABSTRACT,
            static::COL_SKU,
            static::COL_NAME,
            static::COL_TAX_SET,
        ]);

        $config->setDefaultSortDirection(TableConfiguration::SORT_DESC);

        return $config;
    }
}
