<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Persistence;

use Generated\Shared\Transfer\TimeSlotsDefinitionTransfer;

interface TimeSlotQueryContainerInterface
{
    /**
     * @param \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer
     *
     * @return \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer
     */
    public function saveTimeSlotDefinitionForStore(TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer): TimeSlotsDefinitionTransfer;

    /**
     * @param \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer
     *
     * @return array
     */
    public function getTimeSlotDefinition(TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer): array;

    /**
     * @param string $merchantReference
     * @param string $exactDate
     * @param string $timeSlot
     * @param int $capacity
     * @param int|null $oldCapacity
     * @param int|null $idUser
     *
     * @return array
     */
    public function setTimeSlotExactDateCapacity(string $merchantReference, string $exactDate, string $timeSlot, int $capacity, ?int $oldCapacity, ?int $idUser): array;
}
