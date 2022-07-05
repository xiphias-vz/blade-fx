<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductManagement\Communication\Form\DataProvider;

use Generated\Shared\Transfer\ProductAbstractTransfer;
use Generated\Shared\Transfer\StoreRelationTransfer;
use Orm\Zed\Product\Persistence\Map\PyzProductAbstractStoreTableMap;
use Orm\Zed\Product\Persistence\PyzProductAbstractStoreQuery;
use Pyz\Zed\ProductManagement\Communication\Form\ProductFormAdd;
use Spryker\Zed\ProductManagement\Communication\Form\DataProvider\ProductFormEditDataProvider as SpyProductFormEditDataProvider;

class ProductFormEditDataProvider extends SpyProductFormEditDataProvider
{
    /**
     * @param int $idProductAbstract
     * @param array|null $priceDimension
     *
     * @return array
     */
    public function getData($idProductAbstract, ?array $priceDimension = null): array
    {
        $formData = $this->getDefaultFormFields($priceDimension);
        $productAbstractTransfer = $this->productFacade->findProductAbstractById($idProductAbstract);
        $productAbstractTransfer->setPyzStoreRelation($this->getPyzStoreRelationTransfer($idProductAbstract));

        if ($productAbstractTransfer) {
            $formData = $this->appendGeneralAndSeoData($productAbstractTransfer, $formData);
            $formData = $this->appendPriceAndTax($productAbstractTransfer, $formData);
            $formData = $this->appendAbstractProductImages($productAbstractTransfer, $formData);
            $formData = $this->appendStoreRelation($productAbstractTransfer, $formData);
            $formData = $this->appendPyzStoreRelation($productAbstractTransfer, $formData);

            $formData[ProductFormAdd::FIELD_ID_PRODUCT_ABSTRACT] = $productAbstractTransfer->getIdProductAbstract();
        }

        return $formData;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductAbstractTransfer $productAbstractTransfer
     * @param array $formData
     *
     * @return array
     */
    protected function appendPyzStoreRelation(ProductAbstractTransfer $productAbstractTransfer, array $formData)
    {
        $formData[ProductFormAdd::FORM_PYZ_STORE_RELATION] = $productAbstractTransfer->getPyzStoreRelation();

        return $formData;
    }

    /**
     * @param int $idProductAbstract
     *
     * @return array
     */
    protected function getPyzRelatedStores(int $idProductAbstract): array
    {
        return PyzProductAbstractStoreQuery::create()
            ->select([PyzProductAbstractStoreTableMap::COL_FK_STORE])
            ->findByFkProductAbstract($idProductAbstract)
            ->toArray();
    }

    /**
     * @param int $idProductAbstract
     *
     * @return \Generated\Shared\Transfer\StoreRelationTransfer
     */
    protected function getPyzStoreRelationTransfer(int $idProductAbstract): StoreRelationTransfer
    {
        return (new StoreRelationTransfer())
            ->setIdEntity($idProductAbstract)
            ->setIdStores($this->getPyzRelatedStores($idProductAbstract));
    }
}
