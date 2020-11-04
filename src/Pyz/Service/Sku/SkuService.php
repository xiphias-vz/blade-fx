<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Sku;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Service\Kernel\AbstractService;

/**
 * @method \Pyz\Service\Sku\SkuServiceFactory getFactory()
 */
class SkuService extends AbstractService implements SkuServiceInterface
{
    /**
     * @inheritDoc
     */
    public function aggregateOrderSkus(OrderTransfer $orderTransfer): array
    {
        return $this->getFactory()->createSkuAggregator()
            ->aggregateOrderSkus($orderTransfer);
    }
}
