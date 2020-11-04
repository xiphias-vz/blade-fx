<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct;

use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\Store\Persistence\Map\SpyStoreTableMap;
use Pyz\Shared\Product\ProductConfig;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class StoreSpecificAttributeExtractor
{
    /**
     * Returns all region specific attributes in format: [store_name1 => [ attribute_name1 => value1, attribute_name2 => value2,...], ....]
     *
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return array
     */
    public function getAttributesWithStoreSpecificValues(DataSetInterface $dataSet): array
    {
        $attributesWithStoreSpecificValues = [];

        foreach (ProductConfig::PRODUCT_STORE_SPECIFIC_ATTRIBUTES as $attributeName) {
            foreach ($this->getRegionToStoreMapping() as $regionNumber => $storeName) {
                $storeSpecificAttributeName = $this->getStoreSpecificAttributeName($attributeName, $regionNumber);
                if (isset($dataSet[$storeSpecificAttributeName])) {
                    $attributesWithStoreSpecificValues[$storeName][$attributeName] = $dataSet[$storeSpecificAttributeName];
                }
            }
        }

        return $attributesWithStoreSpecificValues;
    }

    /**
     * @param string $attributeName
     * @param int $regionNumber
     *
     * @return string
     */
    private function getStoreSpecificAttributeName(string $attributeName, int $regionNumber): string
    {
        return sprintf(
            ProductConfig::PRODUCT_STORE_ATTRIBUTE_FORMAT,
            $attributeName,
            str_pad($regionNumber, 3, '0', STR_PAD_LEFT)
        );
    }

    /**
     * @return array
     */
    private function getRegionToStoreMapping(): array
    {
        return SpyMerchantQuery::create()
            ->select([SpyMerchantTableMap::COL_REGION_NUMBER, SpyStoreTableMap::COL_NAME])
            ->innerJoinWithSpyStore()
            ->groupBy([SpyMerchantTableMap::COL_REGION_NUMBER, SpyStoreTableMap::COL_NAME])
            ->find()
            ->toKeyValue(SpyMerchantTableMap::COL_REGION_NUMBER, SpyStoreTableMap::COL_NAME);
    }
}
