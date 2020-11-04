<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct;

use Pyz\Shared\Product\ProductConfig;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class SetDefaultValuesFromStoreStep implements DataImportStepInterface
{
    public const KEY_LOCALES = 'locales';

    /**
     * @var array
     */
    protected $locales = [];

    /**
     * @var \Spryker\Shared\Kernel\Store
     */
    protected $store;

    /**
     * @param \Spryker\Shared\Kernel\Store $store
     */
    public function __construct(Store $store)
    {
        $this->store = $store;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        foreach (ProductConfig::PRODUCT_STORE_SPECIFIC_ATTRIBUTES as $attributeName) {
            $this->fillEmptyValueFromStoreSpecificField($attributeName, $dataSet);
        }
    }

    /**
     * @param string $attributeName
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    private function fillEmptyValueFromStoreSpecificField(string $attributeName, DataSetInterface $dataSet): void
    {
        $allStoreValues = $dataSet[StoreSpecificAttributeExtractorStep::KEY_STORE_SPECIFIC_ATTRIBUTES];
        $currentStoreName = $this->store->getStoreName();

        if (!isset($allStoreValues[$currentStoreName][$attributeName])) {
            return;
        }

        if (empty($dataSet[$attributeName])) {
            $dataSet[$attributeName] = $allStoreValues[$currentStoreName][$attributeName];
        }
    }
}
