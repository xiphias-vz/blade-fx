<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot\Zed;

use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;

interface TimeSlotStubInterface
{
    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlot(): WeekDayTimeSlotsTransfer;
}
