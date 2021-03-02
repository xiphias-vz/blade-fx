<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Communication\Controller;

use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractGatewayController;

/**
 * @method \Pyz\Zed\TimeSlot\Business\TimeSlotFacade getFacade()
 */
class GatewayController extends AbstractGatewayController
{
    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlotsAction(): WeekDayTimeSlotsTransfer
    {
        return $this->getFacade()
            ->getTimeSlot();
    }
}
