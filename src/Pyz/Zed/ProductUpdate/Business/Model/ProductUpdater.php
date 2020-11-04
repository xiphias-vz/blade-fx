<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductUpdate\Business\Model;

use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\ProductUpdate\Persistence\ProductUpdateRepositoryInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSet;
use Spryker\Zed\PriceProductDataImport\Business\Model\DataSet\PriceProductDataSet;
use Spryker\Zed\Product\Persistence\ProductQueryContainer;

class ProductUpdater
{
    protected const CSV_DELIMITER = ';';
    protected const KEY_PRODUCT_NUMBER = 'Artikelnummer';
    protected const KEY_PRICE = 'Verkaufspreis';
    private const DEFAULT_STORE_PRICE = 'default';

    /**
     * @var \Pyz\Zed\ProductUpdate\Business\Model\ProductPriceSaver
     */
    private $productPriceSaver;

    /**
     * @var \Spryker\Zed\Product\Persistence\ProductQueryContainerInterface
     */
    protected $productQueryContainer;

    /**
     * @var \Pyz\Zed\ProductUpdate\Persistence\ProductUpdateRepositoryInterface
     */
    private $repository;

    /**
     * @param \Pyz\Zed\ProductUpdate\Business\Model\ProductPriceSaver $productPriceSaver
     * @param \Spryker\Zed\Product\Persistence\ProductQueryContainer $productQueryContainer
     * @param \Pyz\Zed\ProductUpdate\Persistence\ProductUpdateRepositoryInterface $repository
     */
    public function __construct(
        ProductPriceSaver $productPriceSaver,
        ProductQueryContainer $productQueryContainer,
        ProductUpdateRepositoryInterface $repository
    ) {
        $this->productPriceSaver = $productPriceSaver;
        $this->productQueryContainer = $productQueryContainer;
        $this->repository = $repository;
    }

    /**
     * @param string $productsCsvData
     *
     * @return array
     */
    public function updateProducts(string $productsCsvData): array
    {
        $result = [];
        $productsCsvDataLines = explode(PHP_EOL, $productsCsvData);
        $headers = array_map('trim', str_getcsv(array_shift($productsCsvDataLines), static::CSV_DELIMITER));

        $regionToStoreNameMapping = $this->repository->getRegionToStoreNameMapping();

        $headers = $this->convertRegionToStore($headers, $regionToStoreNameMapping);

        foreach ($productsCsvDataLines as $productNumber => $productsCsvDataLine) {
            $productValues = str_getcsv($productsCsvDataLine, static::CSV_DELIMITER);
            $productData = array_combine($headers, $productValues);

            if (!array_key_exists(static::KEY_PRODUCT_NUMBER, $productData)) {
                $result[] = sprintf('Missing %s for product %s', static::KEY_PRODUCT_NUMBER, $productNumber);
                continue;
            }

            $concreteProductEntities = $this->productQueryContainer
                ->queryProduct()
                ->filterByProductNumber(trim($productData[static::KEY_PRODUCT_NUMBER]))
                ->find();

            unset($productData[static::KEY_PRODUCT_NUMBER]);

            if (!empty($productData[self::DEFAULT_STORE_PRICE])) {
                foreach ($regionToStoreNameMapping as $region => $storeName) {
                    if (empty($productData[$storeName])) {
                        $productData[$storeName] = $productData[self::DEFAULT_STORE_PRICE];
                    }
                }

                unset($productData[self::DEFAULT_STORE_PRICE]);
            }

            $result = $this->updateProductData($productData, $concreteProductEntities, $result);
        }

        return $result;
    }

    /**
     * @param array $productData
     * @param \Orm\Zed\Product\Persistence\SpyProduct[] $concreteProductEntities
     * @param array $result
     *
     * @return array
     */
    protected function updateProductData(array $productData, $concreteProductEntities, array $result): array
    {
        $productAbstractIds = [];

        foreach ($concreteProductEntities as $concreteProductEntity) {
            $productAbstractIds[] = $concreteProductEntity->getFkProductAbstract();
        }

        $productAbstractIds = array_unique($productAbstractIds);

        foreach ($productData as $storeName => $priceValue) {
            foreach ($productAbstractIds as $productAbstractId) {
                $productDataSet = new DataSet();
                $productDataSet[PriceProductDataSet::KEY_STORE] = $storeName;
                $productDataSet[PriceProductDataSet::ID_PRODUCT_ABSTRACT] = $productAbstractId;
                $productDataSet[ProductConfig::KEY_PRICE] = str_replace('.', ',', $priceValue);

                $this->productPriceSaver->saveSinglePrice(
                    $productDataSet,
                    ProductPriceSaver::PRICE_TYPE_DEFAULT,
                    ProductConfig::KEY_PRICE
                );
                $result[] = sprintf('Updated Prices for Abstract Product with ID %s in the store %s', $productAbstractId, $storeName);
            }
        }

        return $result;
    }

    /**
     * @param array $headers
     * @param array $regionToStoreNameMapping
     *
     * @return array
     */
    private function convertRegionToStore(array $headers, array $regionToStoreNameMapping): array
    {
        $mappedHeaders = [];

        foreach ($headers as $header) {
            if (strpos($header, self::KEY_PRICE) !== 0) {
                $mappedHeaders[] = $header;

                continue;
            }

            if ($header === self::KEY_PRICE) {
                $mappedHeaders[] = self::DEFAULT_STORE_PRICE;

                continue;
            }

            [, $regionId] = explode('_', $header, 2);
            $mappedHeaders[] = $regionToStoreNameMapping[(int)$regionId] ?? '';
        }

        return $mappedHeaders;
    }
}
