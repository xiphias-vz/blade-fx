<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DateTimeWithZone;

use DateTime;

interface DateTimeWithZoneServiceInterface
{
    /**
     * Specification:
     * - create date time object in store time zone.
     *
     * @api
     *
     * @param string $dateTimeString
     *
     * @return \DateTime
     */
    public function getDateTimeInStoreTimeZone(string $dateTimeString): DateTime;

    /**
     * Specification:
     * - recreate datetime, forcing store time zone
     *
     * @api
     *
     * @param \DateTime $dateTime
     *
     * @return \DateTime
     */
    public function getDateTimeAsInStoreTimeZone(DateTime $dateTime): DateTime;

    /**
     * Specification:
     * - get current store timezone.
     *
     * @api
     *
     * @return string
     */
    public function getCurrentStoreTimezoneString(): string;

    /**
     * Specification:
     * - recreate date time object with store time zone.
     *
     * @api
     *
     * @param \DateTime $dateTime
     *
     * @return \DateTime
     */
    public function updateDateTimeWithStoreTimeZone(DateTime $dateTime): DateTime;
}
