<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot\Zed;

use Generated\Shared\Transfer\WeekDayTimeSlotsTransfer;
use Spryker\Client\ZedRequest\ZedRequestClientInterface;

class TimeSlotStub implements TimeSlotStubInterface
{
    /**
     * @var \Spryker\Client\ZedRequest\ZedRequestClientInterface
     */
    protected $zedRequestClient;

    /**
     * @param \Spryker\Client\ZedRequest\ZedRequestClientInterface $zedRequestClient
     */
    public function __construct(ZedRequestClientInterface $zedRequestClient)
    {
        $this->zedRequestClient = $zedRequestClient;
    }

    /**
     * @return \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer
     */
    public function getTimeSlot(): WeekDayTimeSlotsTransfer
    {
        /** @var \Generated\Shared\Transfer\WeekDayTimeSlotsTransfer $WDTSTransfer */
        $WDTSTransfer = $this->zedRequestClient->call('/time-slot/gateway/get-time-slots', new WeekDayTimeSlotsTransfer());

        return $WDTSTransfer;
    }
}
