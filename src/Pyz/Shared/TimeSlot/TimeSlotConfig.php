<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\TimeSlot;

interface TimeSlotConfig
{
    public const TIME_SLOT_WEEK_UNAVAILABILITY_DAYS_DE = [
        'Sunday',
    ];

    public const TIME_SLOT_WEEK_UNAVAILABILITY_DAYS_CZ = [];

    public const TIME_SLOT_DATE_TIME_CONC_FORMAT = '%s_%s';
}
