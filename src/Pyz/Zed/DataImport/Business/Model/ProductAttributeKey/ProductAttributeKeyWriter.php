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
use Pyz\Zed\DataImport\Business\Model\BaseProduct\StoreSpecificAttributeExtractorStep;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductAttributeKeyWriter implements DataImportStepInterface
{
    public const KEY_SUPER_ATTRIBUTE = 'super_attribute';
    public const KEY_PACKAGING_UNIT = 'packaging_unit';

    private const SYSTEM_ATTRIBUTES = [
        ProductAbstractWriterStep::KEY_PRODUCT_NUMBER,
        ProductAbstractWriterStep::KEY_DESCRIPTION,
    ];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        if (SpyProductAttributeKeyQuery::create()->count() > 0) {
            return;
        }

        $attributes = $this->getAllowedAttributes($dataSet);

        foreach ($attributes as $attribute) {
            $productAttributeKeyEntity = SpyProductAttributeKeyQuery::create()
                ->filterByKey($attribute)
                ->findOneOrCreate();

            $productAttributeKeyEntity->setIsSuper(($attribute == static::KEY_SUPER_ATTRIBUTE || $attribute == static::KEY_PACKAGING_UNIT));
            $productAttributeKeyEntity->save();

            $productManagementAttributeEntity = SpyProductManagementAttributeQuery::create()
                ->filterByFkProductAttributeKey($productAttributeKeyEntity->getIdProductAttributeKey())
                ->findOneOrCreate();
            if ($productManagementAttributeEntity->isNew()) {
                $productManagementAttributeEntity
                    ->setAllowInput('yes')
                    ->setInputType('text');
                $productManagementAttributeEntity->save();
                if ($attribute == static::KEY_SUPER_ATTRIBUTE) {
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
        $attributes[] = static::KEY_SUPER_ATTRIBUTE;
        $attributes[] = static::KEY_PACKAGING_UNIT;

        foreach ($attributes as $attribute) {
            if (strpos($attribute, Store::getInstance()->getCurrentLocale()) !== false) {
                $attributes[] = explode('.', $attribute)[0];
            }
        }

        $attributes = $this->cleanUpAttributes($attributes);
        $attributes = $this->addStoreSpecificAttributes($dataSet, $attributes);

        return $attributes;
    }

    /**
     * @param array $attributes
     *
     * @return array
     */
    private function cleanUpAttributes(array $attributes): array
    {
        return array_filter($attributes, function ($attribute) {
            return !empty($attribute) && strpos($attribute, 'attribute_key_') === false && strpos($attribute, 'value_') === false &&
                $attribute !== StoreSpecificAttributeExtractorStep::KEY_STORE_SPECIFIC_ATTRIBUTES &&
                !$this->isRegionAttribute($attribute);
        });
    }

    /**
     * @param string $attribute
     *
     * @return bool
     */
    private function isRegionAttribute(string $attribute): bool
    {
        return preg_match(ProductConfig::PRODUCT_REGION_ATTRIBUTE_CHECK_REGEX, $attribute) === 1;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param array $attributes
     *
     * @return array
     */
    private function addStoreSpecificAttributes(DataSetInterface $dataSet, array $attributes): array
    {
        foreach ($dataSet[StoreSpecificAttributeExtractorStep::KEY_STORE_SPECIFIC_ATTRIBUTES] as $store => $storeAttributes) {
            foreach ($storeAttributes as $storeAttributeKey => $storeAttributeValue) {
                if ($storeAttributeKey === ProductConfig::KEY_PRICE) {
                    continue;
                }
                $attributes[] = sprintf(ProductConfig::PRODUCT_STORE_ATTRIBUTE_FORMAT, $storeAttributeKey, $store);
            }
        }

        return $attributes;
    }
}
