<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Reader;

use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;

interface TimeSlotReaderInterface
{
    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getDateTimeSlotCapacityForNextDays(): WeekDayTimeSlotsTransfer;
}
