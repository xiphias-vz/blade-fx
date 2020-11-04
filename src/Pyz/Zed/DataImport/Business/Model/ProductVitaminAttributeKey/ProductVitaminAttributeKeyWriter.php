<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductVitaminAttributeKey;

use Orm\Zed\Product\Persistence\SpyProductAttributeKeyQuery;
use Orm\Zed\ProductAttribute\Persistence\SpyProductManagementAttributeQuery;
use Pyz\Shared\ProductDetailPage\ProductDetailPageConfig;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductVitaminAttributeKeyWriter implements DataImportStepInterface
{
    public const KEY_VITAMIN_COMPOSITE_NAME = 'Vitamin%s%s%s%s';
    public const KEY_VITAMIN_NAME = 'Inhaltsstoff';
    public const VITAMIN_PARAMS = [
        'Menge',
        'Einheit',
        'Prozent Tagesdosis',
    ];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        foreach (static::VITAMIN_PARAMS as $vitaminParam) {
            $vitaminAttributeKey = $this->getVitaminAttributeKey($dataSet, $vitaminParam);
            $productAttributeKeyEntity = SpyProductAttributeKeyQuery::create()
                ->filterByKey($vitaminAttributeKey)
                ->findOneOrCreate();

            $productAttributeKeyEntity->setIsSuper(false);
            $productAttributeKeyEntity->save();

            $productManagementAttributeEntity = SpyProductManagementAttributeQuery::create()
                ->filterByFkProductAttributeKey($productAttributeKeyEntity->getIdProductAttributeKey())
                ->findOneOrCreate();

            if ($productManagementAttributeEntity->isNew()) {
                $productManagementAttributeEntity
                    ->setAllowInput('yes')
                    ->setInputType('text');
                $productManagementAttributeEntity->save();
            }
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $vitaminParam
     *
     * @return string
     */
    protected function getVitaminAttributeKey(DataSetInterface $dataSet, string $vitaminParam): string
    {
        return sprintf(
            static::KEY_VITAMIN_COMPOSITE_NAME,
            ProductDetailPageConfig::VITAMIN_ATTRIBUTE_KEY_SEPARATOR,
            $dataSet[static::KEY_VITAMIN_NAME],
            ProductDetailPageConfig::VITAMIN_ATTRIBUTE_KEY_SEPARATOR,
            $vitaminParam
        );
    }
}
