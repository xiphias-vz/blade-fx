<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct;

use NumberFormatter;
use Orm\Zed\Product\Persistence\Map\SpyProductAttributeKeyTableMap;
use Orm\Zed\Product\Persistence\SpyProductAttributeKeyQuery;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Shared\ProductPageSearch\ProductPageSearchConstants;
use Pyz\Zed\DataImport\Business\Exception\InvalidDataException;
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class AttributesExtractorStep implements DataImportStepInterface
{
    /**
     * @var string
     */
    public const KEY_ATTRIBUTES = 'attributes';

    /**
     * @var bool[]
     */
    protected const NUMERIC_ATTRIBUTES = [
        ProductConfig::KEY_PRICE => true,
        ProductConfig::KEY_PRICE_ORIGINAL => true,
        ProductConfig::KEY_SALE_VOLUME => true,
        ProductConfig::KEY_REFERENCE_SIZE => true,

        ProductConfig::KEY_ENERGY_KCAL => true,
        ProductConfig::KEY_ENERGY_KJ => true,
        ProductConfig::KEY_CARBOHYDRATES => true,
        ProductConfig::KEY_OF_WHICH_SUGAR => true,
        ProductConfig::KEY_FAT => true,

        ProductConfig::KEY_SATURATED_FAT => true,
        ProductConfig::KEY_PROTEIN => true,
        ProductConfig::KEY_SALT => true,
        ProductConfig::KEY_HEIGHT => true,
        ProductConfig::KEY_WIDTH => true,

        ProductConfig::KEY_DEPTH => true,
        ProductConfig::KEY_WEIGHT => true,
    ];

    /**
     * @var string[]
     */
    protected $searchableAttributes = [];

    /**
     * @var string[]
     */
    protected $requiredAttributes = [];

    /**
     * @var \NumberFormatter
     */
    private $numberFormatter;

    /**
     * @var array
     */
    protected $searchableAttributeValueMap = [
        'ja' => ProductPageSearchConstants::SEARCHABLE_ATTRIBUTE_VALUE_YES,
        '1' => ProductPageSearchConstants::SEARCHABLE_ATTRIBUTE_VALUE_YES,
    ];

    /**
     * @param \Pyz\Zed\DataImport\DataImportConfig $config
     * @param \NumberFormatter $numberFormatter
     */
    public function __construct(
        DataImportConfig $config,
        NumberFormatter $numberFormatter
    ) {
        $this->searchableAttributes = $config->getSearchableAttributeKeys();
        $this->requiredAttributes = $config->getRequiredAttributeKeys();
        $this->numberFormatter = $numberFormatter;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\InvalidDataException
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $attributes = [];

        $allowedAttributes = $this->getAllowedAttributes($dataSet);

        foreach ($allowedAttributes as $key => $value) {
            if (in_array($key, $this->searchableAttributes)) {
                if (isset($this->searchableAttributeValueMap[$value])) {
                    $attributes[$key] = $this->searchableAttributeValueMap[$value];
                }
                continue;
            }

            if ($key === ProductConfig::PRODUCT_ATTRIBUTE_KEY_PICKING_AREA) {
                $attributes[$key] = strtoupper($value);
                continue;
            }

            if ($value !== '') {
                $attributes[$key] = $value;
                if (isset(static::NUMERIC_ATTRIBUTES[$key])) {
                    $numericValue = str_replace('.', ',', $value);
                    $attributes[$key] = $this->numberFormatter->parse($numericValue);
                }
            }
        }

        $missingRequiredAttributes = array_diff_key(array_flip($this->requiredAttributes), $attributes);
        if (count($missingRequiredAttributes) > 0 && count($missingRequiredAttributes) < count($this->requiredAttributes)) {
            throw new InvalidDataException(
                sprintf('Required attributes (%s) are not found in imported data.', implode(", ", array_keys($missingRequiredAttributes)))
            );
        }

        $dataSet[static::KEY_ATTRIBUTES] = $this->removeStoreSpecificAttributes($attributes);
    }

    /**
     * @return string[]
     */
    private function getAvailableProductAttributes(): array
    {
        return SpyProductAttributeKeyQuery::create()
            ->select([SpyProductAttributeKeyTableMap::COL_KEY])
            ->find()
            ->toArray();
    }

    /**
     * @param array $attributes
     *
     * @return array
     */
    protected function removeStoreSpecificAttributes(array $attributes): array
    {
        foreach (ProductConfig::PRODUCT_STORE_SPECIFIC_ATTRIBUTES as $storeAttributeKey) {
            foreach ($attributes as $attributeKey => $attributeValue) {
                if (strpos($attributeKey, $storeAttributeKey) !== false && $attributeKey !== $storeAttributeKey) {
                    unset($attributes[$attributeKey]);
                }
            }
        }

        return $attributes;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string[]
     */
    protected function getAllowedAttributes(DataSetInterface $dataSet): array
    {
        $attributes = [];
        foreach ($dataSet->getArrayCopy() as $key => $attribute) {
            if (strpos($key, Store::getInstance()->getCurrentLocale()) !== false) {
                $attributes[explode('.', $key)[0]] = $attribute;
            } else {
                $attributes[$key] = $attribute;
            }
        }

        return array_intersect_key(
            $attributes,
            array_flip($this->getAvailableProductAttributes())
        );
    }
}
