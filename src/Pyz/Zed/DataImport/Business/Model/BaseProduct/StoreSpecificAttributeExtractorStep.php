<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct;

use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class StoreSpecificAttributeExtractorStep implements DataImportStepInterface
{
    public const KEY_STORE_SPECIFIC_ATTRIBUTES = 'store_specific_attributes';

    /**
     * @var \Pyz\Zed\DataImport\Business\Model\BaseProduct\StoreSpecificAttributeExtractor
     */
    private $storeSpecificAttributeExtractor;

    /**
     * @param \Pyz\Zed\DataImport\Business\Model\BaseProduct\StoreSpecificAttributeExtractor $storeSpecificAttributeExtractor
     */
    public function __construct(StoreSpecificAttributeExtractor $storeSpecificAttributeExtractor)
    {
        $this->storeSpecificAttributeExtractor = $storeSpecificAttributeExtractor;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $dataSet[self::KEY_STORE_SPECIFIC_ATTRIBUTES] = $this->storeSpecificAttributeExtractor->getAttributesWithStoreSpecificValues($dataSet);
    }
}
