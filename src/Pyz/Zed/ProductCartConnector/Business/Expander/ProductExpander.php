<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCartConnector\Business\Expander;

use Generated\Shared\Transfer\CartChangeTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\ProductConcreteTransfer;
use Orm\Zed\AssortmentZone\Persistence\Map\PyzAssortmentZoneTableMap;
use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Orm\Zed\PickingZone\Persistence\Map\PyzPickingZoneTableMap;
use Orm\Zed\PickingZone\Persistence\PyzPickingZoneQuery;
use Pyz\Shared\Product\ProductConfig;
use Spryker\Zed\ProductCartConnector\Business\Expander\ProductExpander as SprykerProductExpander;
use Spryker\Zed\ProductCartConnector\Business\Expander\ProductExpanderInterface;

class ProductExpander extends SprykerProductExpander implements ProductExpanderInterface
{
    /**
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return \Generated\Shared\Transfer\CartChangeTransfer
     */
    public function expandItems(CartChangeTransfer $cartChangeTransfer)
    {
        $productConcreteTransfers = $this->productFacade->getRawProductConcreteTransfersByConcreteSkus($this->getConcreteSkus($cartChangeTransfer));
        $productConcreteTransfers = $this->indexProductConcretesBySku($productConcreteTransfers);
        foreach ($cartChangeTransfer->getItems() as $itemTransfer) {
            $productConcreteTransfer = $productConcreteTransfers[$itemTransfer->getSku()] ?? null;
            if (!$productConcreteTransfer) {
                continue;
            }

            $this->assertProductConcreteTransfer($productConcreteTransfer);

            $this->expandItemWithProductConcreteLocal($productConcreteTransfer, $itemTransfer, $cartChangeTransfer);
        }

        return $cartChangeTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductConcreteTransfer $productConcreteTransfer
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return void
     */
    protected function expandItemWithProductConcreteLocal(ProductConcreteTransfer $productConcreteTransfer, ItemTransfer $itemTransfer, CartChangeTransfer $cartChangeTransfer)
    {
        parent::expandItemWithProductConcrete($productConcreteTransfer, $itemTransfer);

        $pickZone = '';

        if (isset($productConcreteTransfer->getAttributes()[ProductConfig::KEY_PICK_ZONE_ATTRIBUTE])) {
            $pickZone = $productConcreteTransfer->getAttributes()[ProductConfig::KEY_PICK_ZONE_ATTRIBUTE];
        }

        if (isset($productConcreteTransfer->getAttributes()[mb_strtolower(ProductConfig::KEY_PICK_ZONE_ATTRIBUTE)])) {
            $pickZone = $productConcreteTransfer->getAttributes()[mb_strtolower(ProductConfig::KEY_PICK_ZONE_ATTRIBUTE)];
        }

        if (empty($pickZone)) {
            $assortmentZone = '';

            if (isset($productConcreteTransfer->getAttributes()[ProductConfig::KEY_ASSORTMENT_ZONE_ATTRIBUTE])) {
                $assortmentZone = $productConcreteTransfer->getAttributes()[ProductConfig::KEY_ASSORTMENT_ZONE_ATTRIBUTE];
            }

            if (isset($productConcreteTransfer->getAttributes()[mb_strtolower(ProductConfig::KEY_ASSORTMENT_ZONE_ATTRIBUTE)])) {
                $assortmentZone = $productConcreteTransfer->getAttributes()[mb_strtolower(ProductConfig::KEY_ASSORTMENT_ZONE_ATTRIBUTE)];
            }

            if (!empty($assortmentZone)) {
                $merchantReference = $cartChangeTransfer->getQuote()->getMerchantReference();

                $query = PyzPickingZoneQuery::create();
                $query->joinWithPyzAssortmentPickZoneRelation()
                    ->usePyzAssortmentPickZoneRelationQuery()
                    ->joinWithAssortmentZone()
                    ->joinWithMerchant()
                    ->endUse()
                    ->where(PyzAssortmentZoneTableMap::COL_ASSORTMENT_ZONE . ' = ?', $assortmentZone)
                    ->where(SpyMerchantTableMap::COL_FILIAL_NUMBER . ' = ?', $merchantReference)
                    ->select([PyzPickingZoneTableMap::COL_NAME]);

                $entity = $query->find();
                if (!empty($entity)) {
                    $pickZone = $entity[0];
                }
            }
        }

        $weightPerUnit = $this->calculateWeightPerItem($productConcreteTransfer->getAttributes());

        $pricePerKg = null;
        if ($itemTransfer->getPriceProduct() && $itemTransfer->getPriceProduct()->getMoneyValue()) {
            $pricePerKg = $itemTransfer->getPriceProduct()->getMoneyValue()->getPricePerKg();
        }

        $pricePerKg = $pricePerKg ?: ($productConcreteTransfer->getAttributes()[ProductConfig::PRICE_PER_KG] ?? null);

        $itemTransfer
            ->setPickZone($pickZone)
            ->setAssortmentZone($assortmentZone)
            ->setWeightPerUnit($weightPerUnit)
            ->setPricePerKg($pricePerKg)
            ->setProductNumber($productConcreteTransfer->getProductNumber())
            ->setSapWgr($productConcreteTransfer->getAttributes()[ProductConfig::KEY_SAP_WGR] ?? '')
            ->setBontext($productConcreteTransfer->getAttributes()[ProductConfig::KEY_BON_TEXT] ?? '')
            ->setBrand($productConcreteTransfer->getAttributes()[ProductConfig::KEY_BRAND] ?? '')
            ->setBasePriceContent($productConcreteTransfer->getAttributes()[ProductConfig::KEY_BASE_PRICE_CONTENT] ?? '')
            ->setBasePriceUnit($productConcreteTransfer->getAttributes()[ProductConfig::KEY_BASE_PRICE_UNIT] ?? '');
    }

    /**
     * @param array $attributes
     *
     * @return int|null
     */
    protected function calculateWeightPerItem(array $attributes): ?int
    {
        if (!isset($attributes[ProductConfig::KEY_WEIGHT_PER_ITEM])) {
            return null;
        }

        return $attributes[ProductConfig::KEY_WEIGHT_PER_ITEM] * 1000;
    }
}
