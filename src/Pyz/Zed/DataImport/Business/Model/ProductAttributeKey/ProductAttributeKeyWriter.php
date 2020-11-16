<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductAttributeKey;

use Orm\Zed\Product\Persistence\SpyProductAttributeKeyQuery;
use Orm\Zed\ProductAttribute\Persistence\SpyProductManagementAttributeQuery;
use Orm\Zed\ProductAttribute\Persistence\SpyProductManagementAttributeValueQuery;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductAttributeKeyWriter implements DataImportStepInterface
{
    public const KEY_SUPER_ATTRIBUTES = [
        ProductConfig::KEY_HERKUNFTSLAND_ATTRIBUTE,
    ];

    public const KEY_PACKAGING_UNIT = [];

    private const SYSTEM_ATTRIBUTES = [
        ProductAbstractWriterStep::KEY_PRODUCT_NUMBER,
        ProductAbstractWriterStep::KEY_DESCRIPTION,
        ProductAbstractWriterStep::KEY_NAME,
    ];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $attributes = $this->getAllowedAttributes($dataSet);

        foreach ($attributes as $attribute) {
            $productAttributeKeyEntity = SpyProductAttributeKeyQuery::create()
                ->filterByKey($attribute)
                ->findOneOrCreate();

            $productAttributeKeyEntity->setIsSuper((in_array($attribute, static::KEY_SUPER_ATTRIBUTES) || in_array($attribute, static::KEY_PACKAGING_UNIT)));
            $productAttributeKeyEntity->save();

            $productManagementAttributeEntity = SpyProductManagementAttributeQuery::create()
                ->filterByFkProductAttributeKey($productAttributeKeyEntity->getIdProductAttributeKey())
                ->findOneOrCreate();
            if ($productManagementAttributeEntity->isNew()) {
                $productManagementAttributeEntity
                    ->setAllowInput('yes')
                    ->setInputType('text');
                $productManagementAttributeEntity->save();
                if (in_array($attribute, static::KEY_SUPER_ATTRIBUTES)) {
                    $productManagementAttributeEntityValueEntity = SpyProductManagementAttributeValueQuery::create()
                        ->filterByFkProductManagementAttribute($productManagementAttributeEntity->getIdProductManagementAttribute())
                        ->filterByValue('default')
                        ->findOneOrCreate();
                    $productManagementAttributeEntityValueEntity->save();
                }
            }
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string[]
     */
    private function getAllowedAttributes(DataSetInterface $dataSet): array
    {
        $attributes = array_keys($dataSet->getArrayCopy());

        $attributes = array_diff($attributes, self::SYSTEM_ATTRIBUTES);

        return $attributes;
    }
}
