<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductStock;

use Orm\Zed\Stock\Persistence\SpyStockProductQuery;
use Orm\Zed\Stock\Persistence\SpyStockQuery;
use Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository;
use Pyz\Zed\DataImport\Business\Model\ProductConcrete\ProductConcreteWriter;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductStockWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;

    /**
     * @var \Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository
     */
    protected $productRepository;

    /**
     * @var array
     */
    protected static $idStockBuffer = [];

    /**
     * @param \Pyz\Zed\DataImport\Business\Model\Product\Repository\ProductRepository $productRepository
     */
    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $idProduct = $this->productRepository->getIdProductByConcreteSku(ProductConcreteWriter::getConcreteSku($dataSet));

        $stockProductEntity = SpyStockProductQuery::create()
            ->filterByFkProduct($idProduct)
            ->filterByFkStock($this->getIdStockByWarehouseName('Warehouse1'))
            ->findOneOrCreate();

        $stockProductEntity
            ->setQuantity(0)
            ->setIsNeverOutOfStock(true);

        $stockProductEntity->save();
    }

    /**
     * @param string $warehouseName
     *
     * @return int
     */
    protected function getIdStockByWarehouseName($warehouseName)
    {
        if (!isset(static::$idStockBuffer[$warehouseName])) {
            $stockEntity = SpyStockQuery::create()->filterByName($warehouseName)->findOneOrCreate();
            $stockEntity->save();
            static::$idStockBuffer[$warehouseName] = $stockEntity->getIdStock();
        }

        return static::$idStockBuffer[$warehouseName];
    }
}
