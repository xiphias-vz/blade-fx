<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCartConnector\Business\Expander;

use Generated\Shared\Transfer\CartChangeTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\ProductConcreteTransfer;
use Generated\Shared\Transfer\QuoteZoneMappingTransfer;
use Orm\Zed\AssortmentZone\Persistence\Map\PyzAssortmentZoneTableMap;
use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Orm\Zed\PickingZone\Persistence\Map\PyzPickingZoneTableMap;
use Orm\Zed\PickingZone\Persistence\PyzPickingZoneQuery;
use Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductScheduleQuery;
use Orm\Zed\PriceProductStorage\Persistence\SpyPriceProductAbstractStorageQuery;
use PDO;
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
        $this->setAssortmentZoneMapping($cartChangeTransfer);

        $pickZone = $this->getPickZoneName($productConcreteTransfer, $cartChangeTransfer, $assortmentZone);
        $weightPerUnit = $this->calculateWeightPerItem($productConcreteTransfer->getAttributes());

        $currentStoreName = $cartChangeTransfer->getQuote()->getStore()->getName();

        $priceProductAbstractStorageEntity = $this->createPriceProductAbstractStorageQuery();
        $priceProductAbstractData = $this->getPriceProductByProductFromAbstractStorageEntity($priceProductAbstractStorageEntity, $productConcreteTransfer, $currentStoreName);
        $originalPrice = null;
        $grossPriceData = null;
        if (isset($priceProductAbstractData['prices']->EUR->GROSS_MODE)) {
            $grossPriceData = $priceProductAbstractData['prices']->EUR->GROSS_MODE;
        } elseif (isset($priceProductAbstractData['prices']->CZK->GROSS_MODE)) {
            $grossPriceData = $priceProductAbstractData['prices']->CZK->GROSS_MODE;
        }
        if (isset($grossPriceData->ORIGINAL)) {
            $originalPrice = $grossPriceData->ORIGINAL;
        }

        $priceProductScheduleEntity = $this->createPriceProductScheduleQuery();
        $priceProductScheduleData = $this->getActiveFromAndActiveToDiscountDataFromProductScheduleEntity($priceProductScheduleEntity, $productConcreteTransfer);
        $priceActiveFrom = null;
        $priceActiveTo = null;
        if (array_key_exists('active_from', $priceProductScheduleData) && array_key_exists('active_to', $priceProductScheduleData)) {
            $priceActiveFrom = (date("Y-m-d H:i:s", strtotime($priceProductScheduleData['active_from'])));
            $priceActiveTo = (date("Y-m-d H:i:s", strtotime($priceProductScheduleData['active_to'])));
        }

        $pricePerKg = null;
        if ($itemTransfer->getPriceProduct() && $itemTransfer->getPriceProduct()->getMoneyValue()) {
            $pricePerKg = $itemTransfer->getPriceProduct()->getMoneyValue()->getPricePerKg();
        }

        $pricePerKg = $pricePerKg ?: ($productConcreteTransfer->getAttributes()[ProductConfig::PRICE_PER_KG] ?? null);
        $billName = $productConcreteTransfer->getAttributes()[ProductConfig::BILLNAME] ?? '';

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
            ->setBasePriceUnit($productConcreteTransfer->getAttributes()[ProductConfig::KEY_BASE_PRICE_UNIT] ?? '')
            ->setOriginalPrice($originalPrice)
            ->setDiscountedPriceFrom($priceActiveFrom)
            ->setDiscountedPriceTo($priceActiveTo)
            ->setBillName($billName);
    }

    /**
     * @return \Orm\Zed\PriceProductStorage\Persistence\SpyPriceProductAbstractStorageQuery
     */
    protected function createPriceProductAbstractStorageQuery(): SpyPriceProductAbstractStorageQuery
    {
        return SpyPriceProductAbstractStorageQuery::create();
    }

    /**
     * @return \Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductScheduleQuery
     */
    protected function createPriceProductScheduleQuery(): SpyPriceProductScheduleQuery
    {
        return SpyPriceProductScheduleQuery::create();
    }

    /**
     * @param \Orm\Zed\PriceProductStorage\Persistence\SpyPriceProductAbstractStorageQuery $priceProductAbstractStorageQuery
     * @param \Generated\Shared\Transfer\ProductConcreteTransfer $productConcreteTransfer
     * @param string $currentStoreName
     *
     * @return array
     */
    protected function getPriceProductByProductFromAbstractStorageEntity(
        SpyPriceProductAbstractStorageQuery $priceProductAbstractStorageQuery,
        ProductConcreteTransfer $productConcreteTransfer,
        string $currentStoreName
    ): array {
        $priceProductAbstractStorageEntity = $priceProductAbstractStorageQuery
            ->select(['data'])
            ->filterByFkProductAbstract($productConcreteTransfer->getFkProductAbstract())
            ->filterByStore($currentStoreName)
            ->findOne();

        return (array)json_decode($priceProductAbstractStorageEntity);
    }

    /**
     * @param \Orm\Zed\PriceProductSchedule\Persistence\SpyPriceProductScheduleQuery $priceProductScheduleQuery
     * @param \Generated\Shared\Transfer\ProductConcreteTransfer $productConcreteTransfer
     *
     * @return array
     */
    protected function getActiveFromAndActiveToDiscountDataFromProductScheduleEntity(
        SpyPriceProductScheduleQuery $priceProductScheduleQuery,
        ProductConcreteTransfer $productConcreteTransfer
    ): array {
        return (array)$priceProductScheduleQuery
            ->select(['active_from', 'active_to'])
            ->filterByFkProductAbstract($productConcreteTransfer->getFkProductAbstract())
            ->findOne();
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

    /**
     * @return string
     */
    protected function getDefaultPickZone(): string
    {
        $pickZone = null;
        $defZone = PyzPickingZoneQuery::create()->findOneByIsDefault(true);
        if ($defZone) {
            if (strlen(trim($defZone->getName())) > 2) {
                $pickZone = $defZone->getName();
            }
        }
        if (!$pickZone) {
            $defZone = PyzPickingZoneQuery::create()->findOne();
            if ($defZone) {
                if (strlen(trim($defZone->getName())) > 2) {
                    $pickZone = $defZone->getName();
                }
            }
        }
        if (!$pickZone) {
            $pickZone = "Sonstiges";
        }

        return $pickZone;
    }

    /**
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return void
     */
    protected function setAssortmentZoneMapping(CartChangeTransfer $cartChangeTransfer)
    {
        $merchantReference = $cartChangeTransfer->getQuote()->getMerchantReference();
        if (count($cartChangeTransfer->getQuote()->getQuoteZoneMapping()) === 0 ||
            $cartChangeTransfer->getQuote()->getQuoteZoneMapping()[0]->getMerchantReference() !== $merchantReference) {
            $quote = $cartChangeTransfer->getQuote();
            $query = PyzPickingZoneQuery::create();
            $query->joinWithPyzAssortmentPickZoneRelation()
                ->usePyzAssortmentPickZoneRelationQuery()
                ->joinWithAssortmentZone()
                ->joinWithMerchant()
                ->endUse()
                ->where(SpyMerchantTableMap::COL_FILIAL_NUMBER . ' = ?', $merchantReference, PDO::PARAM_STR)
                ->select([PyzAssortmentZoneTableMap::COL_ASSORTMENT_ZONE, PyzPickingZoneTableMap::COL_NAME]);

            $zones = $query->find();
            foreach ($zones as $zone) {
                $quote->addQuoteZoneMapping((new QuoteZoneMappingTransfer())
                    ->setAssortmentZone($zone[PyzAssortmentZoneTableMap::COL_ASSORTMENT_ZONE])
                    ->setPickZone($zone[PyzPickingZoneTableMap::COL_NAME])
                    ->setMerchantReference($merchantReference));
            }
            $cartChangeTransfer->setQuote($quote);
        }
    }

    /**
     * @param \Generated\Shared\Transfer\ProductConcreteTransfer $productConcreteTransfer
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     * @param string|null $assortmentZone
     *
     * @return string
     */
    protected function getPickZoneName(ProductConcreteTransfer $productConcreteTransfer, CartChangeTransfer $cartChangeTransfer, ?string &$assortmentZone): string
    {
        $pickZone = '';
        if (isset($productConcreteTransfer->getAttributes()[ProductConfig::KEY_PICK_ZONE_ATTRIBUTE])) {
            $pickZone = $productConcreteTransfer->getAttributes()[ProductConfig::KEY_PICK_ZONE_ATTRIBUTE];
        }
        if (isset($productConcreteTransfer->getAttributes()[mb_strtolower(ProductConfig::KEY_PICK_ZONE_ATTRIBUTE)])) {
            $pickZone = $productConcreteTransfer->getAttributes()[mb_strtolower(ProductConfig::KEY_PICK_ZONE_ATTRIBUTE)];
        }

        if (empty($pickZone)) {
            if (isset($productConcreteTransfer->getAttributes()[ProductConfig::KEY_ASSORTMENT_ZONE_ATTRIBUTE])) {
                $assortmentZone = $productConcreteTransfer->getAttributes()[ProductConfig::KEY_ASSORTMENT_ZONE_ATTRIBUTE];
            }

            if (isset($productConcreteTransfer->getAttributes()[mb_strtolower(ProductConfig::KEY_ASSORTMENT_ZONE_ATTRIBUTE)])) {
                $assortmentZone = $productConcreteTransfer->getAttributes()[mb_strtolower(ProductConfig::KEY_ASSORTMENT_ZONE_ATTRIBUTE)];
            }

            if (!empty($assortmentZone)) {
                foreach ($cartChangeTransfer->getQuote()->getQuoteZoneMapping() as $zoneMapping) {
                    if ($zoneMapping->getAssortmentZone() === $assortmentZone) {
                        $pickZone = $zoneMapping->getPickZone();
                        break;
                    }
                }
            }
        }

        if (strlen(trim($pickZone)) < 2) {
            $pickZone = $this->getDefaultPickZone();
        }

        return $pickZone;
    }
}
