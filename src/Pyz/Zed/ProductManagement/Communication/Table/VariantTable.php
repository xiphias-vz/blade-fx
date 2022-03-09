<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductManagement\Communication\Table;

use Orm\Zed\Product\Persistence\SpyProduct;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Zed\ProductManagement\Communication\Controller\EditController;
use Spryker\Zed\ProductManagement\Communication\Table\VariantTable as SpyVariantTable;

class VariantTable extends SpyVariantTable
{
    /**
     * @param \Orm\Zed\Product\Persistence\SpyProduct $productEntity
     *
     * @return array
     */
    protected function createActionColumn(SpyProduct $productEntity)
    {
        $urls = [];

        $urls[] = $this->generateViewButton(
            sprintf(
                '/product-management/view/variant?%s=%d&%s=%d&type=%s',
                EditController::PARAM_ID_PRODUCT,
                $productEntity->getIdProduct(),
                EditController::PARAM_ID_PRODUCT_ABSTRACT,
                $productEntity->getFkProductAbstract(),
                $this->type
            ),
            'View'
        );

        $urls[] = $this->generateEditButton(
            sprintf(
                '/product-management/edit/variant?%s=%d&%s=%d&type=%s',
                EditController::PARAM_ID_PRODUCT,
                $productEntity->getIdProduct(),
                EditController::PARAM_ID_PRODUCT_ABSTRACT,
                $productEntity->getFkProductAbstract(),
                $this->type
            ),
            'Edit'
        );

        $urls[] = $this->generateEditButton(
            Url::generate('/product-attribute-gui/view/product-abstract', [
                EditController::PARAM_ID_PRODUCT_ABSTRACT => $productEntity->getIdProduct(),
            ]),
            'Manage Attributes'
        );

        return $urls;
    }

    /**
     * @param \Orm\Zed\Product\Persistence\SpyProduct $productEntity
     *
     * @return array
     */
    protected function generateItem(SpyProduct $productEntity)
    {
        $newSku = $productEntity->getSku();

        if (strpos($newSku, '_')) {
            $position = strpos($newSku, '_');
            $houseNumber = substr($newSku, $position, 5);
            $withoutHouseNumber = str_replace($houseNumber, '', $newSku);
            $productEntity->setSku($withoutHouseNumber);
        }

        return [
            static::COL_ID_PRODUCT => $productEntity->getIdProduct(),
            static::COL_SKU => $productEntity->getSku(),
            static::COL_NAME => $productEntity->getVirtualColumn(static::COL_NAME),
            static::COL_STATUS => $this->getStatusLabel($productEntity->getIsActive()),
            static::COL_IS_BUNDLE => $this->getIsBundleProduct($productEntity),
            static::COL_ACTIONS => implode(' ', $this->createActionColumn($productEntity)),
            static::COL_VALID_FROM => $productEntity->getVirtualColumn(static::COL_VALID_FROM),
            static::COL_VALID_TO => $productEntity->getVirtualColumn(static::COL_VALID_TO),
        ];
    }
}
