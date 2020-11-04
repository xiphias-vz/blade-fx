<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingRoute\Business\Mapper;

use Pyz\Shared\DataImport\DataImportConfig;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\PickingRoute\Persistence\PickingRouteRepositoryInterface;

class PickingRouteMapper implements PickingRouteMapperInterface
{
    protected const PICKING_ORDER_LAST_TO_PICK = PHP_INT_MAX;

    /**
     * @var \Pyz\Zed\PickingRoute\Persistence\PickingRouteRepositoryInterface
     */
    private $pickingRouteRepository;

    /**
     * @param \Pyz\Zed\PickingRoute\Persistence\PickingRouteRepositoryInterface $pickingRouteRepository
     */
    public function __construct(PickingRouteRepositoryInterface $pickingRouteRepository)
    {
        $this->pickingRouteRepository = $pickingRouteRepository;
    }

    /**
     * @param string[][] $productAttributesGroupedBySku
     *
     * @return int[]
     */
    public function getSkuToPickingOrderMap(array $productAttributesGroupedBySku): array
    {
        $skuToPickingOrderKeyMap = $this->getSkuToPickingOrderKeyMap($productAttributesGroupedBySku);

        $pickingOrderKeyToPickingOrderMap = $this->pickingRouteRepository
            ->findPickingOrderByPickingOrderKeys($skuToPickingOrderKeyMap);

        $skuToPickingOrderMap = [];

        foreach ($skuToPickingOrderKeyMap as $sku => $pickingOrderKey) {
            $skuToPickingOrderMap[$sku] = (int)($pickingOrderKeyToPickingOrderMap[$pickingOrderKey] ?? static::PICKING_ORDER_LAST_TO_PICK);
        }

        return $skuToPickingOrderMap;
    }

    /**
     * @param string[][] $productAttributesBySku
     *
     * @return string[]
     */
    protected function getSkuToPickingOrderKeyMap(array $productAttributesBySku): array
    {
        $skuToPickingOrderKeyMap = [];

        foreach ($productAttributesBySku as $sku => $productAttributes) {
            $skuToPickingOrderKeyMap[$sku] = $this->createPickingOrderKeyValue($productAttributes);
        }

        return $skuToPickingOrderKeyMap;
    }

    /**
     * @param string[] $productAttributes
     *
     * @return string
     */
    protected function createPickingOrderKeyValue(array $productAttributes): string
    {
        return sprintf(
            DataImportConfig::PICKING_ORDER_KEY_FORMAT,
            $productAttributes[ProductConfig::KEY_ACG_WARENGROUPPE] ?? '',
            $productAttributes[ProductConfig::KEY_ACG_UNTER_WARENGROUPPE] ?? ''
        );
    }
}
