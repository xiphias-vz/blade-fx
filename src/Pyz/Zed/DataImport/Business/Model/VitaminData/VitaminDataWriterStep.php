<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\VitaminData;

use NumberFormatter;
use Orm\Zed\Product\Persistence\SpyProductQuery;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Shared\ProductDetailPage\ProductDetailPageConfig;
use Pyz\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository;
use Pyz\Zed\DataImport\Business\Model\ProductVitaminAttributeKey\ProductVitaminAttributeKeyWriter;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Product\Dependency\ProductEvents;

class VitaminDataWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;

    protected const NUMERIC_VITAMIN_PARAMS = [
        ProductConfig::PRODUCT_ATTRIBUTE_KEY_QUANTITY => true,
        ProductConfig::PRODUCT_ATTRIBUTE_KEY_DAILY_INTAKE => true,
    ];

    /**
     * @var \Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository
     */
    protected $productRepository;

    /**
     * @var \NumberFormatter
     */
    private $numberFormatter;

    /**
     * @param \Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository $productRepository
     * @param \NumberFormatter $numberFormatter
     */
    public function __construct(
        ProductRepository $productRepository,
        NumberFormatter $numberFormatter
    ) {
        $this->productRepository = $productRepository;
        $this->numberFormatter = $numberFormatter;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $productEntity = SpyProductQuery::create()
            ->filterBySku_Like(sprintf('*%s*', $dataSet[ProductConfig::KEY_PRODUCT_EAN]))
            ->findOne();

        if (!$productEntity) {
            return;
        }

        $attributes = json_decode($productEntity->getAttributes(), true);

        foreach (ProductVitaminAttributeKeyWriter::VITAMIN_PARAMS as $vitaminParam) {
            $vitaminAttributeKey = $this->getVitaminAttributeKey($dataSet, $vitaminParam);
            $attributes[$vitaminAttributeKey] = isset(static::NUMERIC_VITAMIN_PARAMS[$vitaminParam])
                ? $this->numberFormatter->parse($dataSet[$vitaminParam])
                : $dataSet[$vitaminParam];
        }

        $productEntity->setAttributes(json_encode($attributes));
        $productEntity->save();

        $this->addPublishEvents(ProductEvents::PRODUCT_CONCRETE_PUBLISH, $productEntity->getIdProduct());
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
            ProductVitaminAttributeKeyWriter::KEY_VITAMIN_COMPOSITE_NAME,
            ProductDetailPageConfig::VITAMIN_ATTRIBUTE_KEY_SEPARATOR,
            $dataSet[ProductVitaminAttributeKeyWriter::KEY_VITAMIN_NAME],
            ProductDetailPageConfig::VITAMIN_ATTRIBUTE_KEY_SEPARATOR,
            $vitaminParam
        );
    }
}
