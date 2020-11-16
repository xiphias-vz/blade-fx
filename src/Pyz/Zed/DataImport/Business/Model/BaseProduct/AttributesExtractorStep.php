<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct;

use NumberFormatter;
use Orm\Zed\Product\Persistence\Map\SpyProductAttributeKeyTableMap;
use Orm\Zed\Product\Persistence\SpyProductAttributeKeyQuery;
use Pyz\Shared\ProductPageSearch\ProductPageSearchConstants;
use Pyz\Zed\DataImport\Business\Exception\InvalidDataException;
use Pyz\Zed\DataImport\DataImportConfig;
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

        $dataSet[static::KEY_ATTRIBUTES] = $attributes;
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
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string[]
     */
    protected function getAllowedAttributes(DataSetInterface $dataSet): array
    {
        return array_intersect_key(
            $dataSet->getArrayCopy(),
            array_flip($this->getAvailableProductAttributes())
        );
    }
}
