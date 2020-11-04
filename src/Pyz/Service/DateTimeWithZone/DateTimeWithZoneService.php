<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DateTimeWithZone;

use DateTime;
use Spryker\Service\Kernel\AbstractService;

/**
 * @method \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceFactory getFactory()
 */
class DateTimeWithZoneService extends AbstractService implements DateTimeWithZoneServiceInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $dateTimeString
     *
     * @return \DateTime
     */
    public function getDateTimeInStoreTimeZone(string $dateTimeString): DateTime
    {
        return $this->getFactory()
            ->createDateTimeWithTimeZone()
            ->getDateTimeInStoreTimeZone($dateTimeString);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \DateTime $dateTime
     *
     * @return \DateTime
     */
    public function getDateTimeAsInStoreTimeZone(DateTime $dateTime): DateTime
    {
        $updatedDateTime = clone $dateTime;

        $this->updateDateTimeWithStoreTimeZone($updatedDateTime);
        $updatedDateTime->setTimestamp($dateTime->getTimestamp() + $dateTime->getOffset() - $updatedDateTime->getOffset());

        return $updatedDateTime;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getCurrentStoreTimezoneString(): string
    {
        return $this->getFactory()
            ->createDateTimeWithTimeZone()
            ->getCurrentStoreTimezoneString();
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \DateTime $dateTime
     *
     * @return \DateTime
     */
    public function updateDateTimeWithStoreTimeZone(DateTime $dateTime): DateTime
    {
        return $this->getFactory()
            ->createDateTimeWithTimeZone()
            ->updateDateTimeWithStoreTimeZone($dateTime);
    }
}
