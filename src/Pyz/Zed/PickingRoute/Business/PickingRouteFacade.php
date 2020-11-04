<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingRoute\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\PickingRoute\Business\PickingRouteBusinessFactory getFactory()
 * @method \Pyz\Zed\PickingRoute\Persistence\PickingRouteRepositoryInterface getRepository()
 */
class PickingRouteFacade extends AbstractFacade implements PickingRouteFacadeInterface
{
    /**
     * @inheritDoc
     */
    public function getSkuToProductPickingOrderMap(array $productAttributesGroupedBySku): array
    {
        return $this->getFactory()->createPickingRouteMapper()->getSkuToPickingOrderMap($productAttributesGroupedBySku);
    }
}
