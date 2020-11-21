<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Business;

use Pyz\Zed\PickingZone\Business\Checker\OrderPickingBlockChecker;
use Pyz\Zed\PickingZone\Business\Checker\OrderPickingBlockCheckerInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\PickingZone\Persistence\PickingZoneEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\PickingZone\Persistence\PickingZoneRepositoryInterface getRepository()
 */
class PickingZoneBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\PickingZone\Business\Checker\OrderPickingBlockCheckerInterface
     */
    public function createOrderPickingBlockChecker(): OrderPickingBlockCheckerInterface
    {
        return new OrderPickingBlockChecker($this->getRepository());
    }
}
