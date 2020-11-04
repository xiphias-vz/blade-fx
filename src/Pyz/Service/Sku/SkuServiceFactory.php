<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Sku;

use Pyz\Service\Sku\Aggregator\SkuAggregator;
use Pyz\Service\Sku\Aggregator\SkuAggregatorInterface;
use Spryker\Service\Kernel\AbstractServiceFactory;

class SkuServiceFactory extends AbstractServiceFactory
{
    /**
     * @return \Pyz\Service\Sku\Aggregator\SkuAggregatorInterface
     */
    public function createSkuAggregator(): SkuAggregatorInterface
    {
        return new SkuAggregator();
    }
}
