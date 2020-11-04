<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingRoute\Business;

use Pyz\Zed\PickingRoute\Business\Mapper\PickingRouteMapper;
use Pyz\Zed\PickingRoute\Business\Mapper\PickingRouteMapperInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\PickingRoute\PickingRouteConfig getConfig()
 * @method \Pyz\Zed\PickingRoute\Persistence\PickingRouteRepositoryInterface getRepository()
 */
class PickingRouteBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\PickingRoute\Business\Mapper\PickingRouteMapperInterface
     */
    public function createPickingRouteMapper(): PickingRouteMapperInterface
    {
        return new PickingRouteMapper(
            $this->getRepository()
        );
    }
}
