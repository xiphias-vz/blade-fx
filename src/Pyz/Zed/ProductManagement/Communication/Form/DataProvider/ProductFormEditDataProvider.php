<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductManagement\Communication\Form\DataProvider;

use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Spryker\Zed\ProductManagement\Communication\Form\DataProvider\ProductFormEditDataProvider as SpyProductFormEditDataProvider;
use Spryker\Zed\ProductManagement\Communication\Form\ProductFormAdd;

class ProductFormEditDataProvider extends SpyProductFormEditDataProvider
{
    /**
     * @param int $idProductAbstract
     * @param array|null $priceDimension
     * @param bool $userSupervisor
     * @param $userDataTransfer
     *
     * @return array
     */
    public function getDataExtended(int $idProductAbstract, ?array $priceDimension, bool $userSupervisor, $userDataTransfer)
    {
        $formData = $this->getDefaultFormFields($priceDimension);
        $productAbstractTransfer = $this->productFacade->findProductAbstractById($idProductAbstract);

        if ($userSupervisor) {
            $userMerchantReference = $userDataTransfer->getMerchantReference();
            $spyMerchantEntity = SpyMerchantQuery::create()
                ->filterByFilialNumber($userMerchantReference)
                ->findOneOrCreate();
            $userStoreId = $spyMerchantEntity->getFkStore();

            $productAbstractTransfer->getStoreRelation()
                ->setIdStores([$userStoreId]);
        }

        if ($productAbstractTransfer) {
            $formData = $this->appendGeneralAndSeoData($productAbstractTransfer, $formData);
            $formData = $this->appendPriceAndTax($productAbstractTransfer, $formData);
            $formData = $this->appendAbstractProductImages($productAbstractTransfer, $formData);
            $formData = $this->appendStoreRelation($productAbstractTransfer, $formData);

            $formData[ProductFormAdd::FIELD_ID_PRODUCT_ABSTRACT] = $productAbstractTransfer->getIdProductAbstract();
        }

        return $formData;
    }
}
