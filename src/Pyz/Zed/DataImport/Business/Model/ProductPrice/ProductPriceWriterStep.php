<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductPrice;

use NumberFormatter;
use Orm\Zed\DataImport\Persistence\PyzImpPriceProduct;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;

class ProductPriceWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const KEY_GTIN = 'GTIN';

    /**
     * @var string
     */
    protected static $dtImport;

    /**
     * @var \NumberFormatter
     */
    private $numberFormatter;

    /**
     * @var \Pyz\Zed\DataImport\DataImportConfig
     */
    private $dataImportConfig;

    /**
     * @param \NumberFormatter $numberFormatter
     * @param \Pyz\Zed\DataImport\DataImportConfig $dataImportConfig
     */
    public function __construct(
        NumberFormatter $numberFormatter,
        DataImportConfig $dataImportConfig
    ) {
        $this->numberFormatter = $numberFormatter;
        $this->dataImportConfig = $dataImportConfig;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $sapStoreIdToStoreMap = $this->dataImportConfig->getSapStoreIdToStoreMap();
        $dataSet[PriceProductDataSet::KEY_STORE] = $sapStoreIdToStoreMap[$dataSet[PriceProductDataSet::KEY_STORE]];

        $key = ProductConfig::KEY_SAP_NUMBER;
        $keys = array_keys($dataSet->getArrayCopy());
        if (!in_array($key, $keys)) {
            foreach ($keys as $str) {
                if (str_ends_with($str, $key)) {
                    $key = $str;
                    break;
                }
            }
        }

        if (!static::$dtImport) {
            static::$dtImport = date("Y-m-d h:i:sa");
        }

        $importEntity = new PyzImpPriceProduct();
        if (isset($dataSet[static::KEY_GTIN]) && !ctype_space($dataSet[static::KEY_GTIN]) && !empty($dataSet[static::KEY_GTIN])) {
            $importEntity->setGtin($dataSet[static::KEY_GTIN]);
        }

        $importEntity
            ->setStore($dataSet[PriceProductDataSet::KEY_STORE])
            ->setSapnumber($dataSet[$key])
            ->setPrice($this->numberFormatter->parse(trim($dataSet[ProductConfig::KEY_PRICE])))
            ->setPseudoprice($this->numberFormatter->parse(trim($dataSet[ProductConfig::KEY_PSEUDO_PRICE])))
            ->setDtimported(static::$dtImport);
        if (!empty($dataSet[ProductConfig::KEY_PRICE_FROM])) {
            $importEntity
                ->setPromotion($dataSet[ProductConfig::KEY_PRICE_PROMOTION])
                ->setPromotionstart($dataSet[ProductConfig::KEY_PRICE_FROM])
                ->setPromotionend($dataSet[ProductConfig::KEY_PRICE_TO]);
        }
        $importEntity->save();
    }
}
