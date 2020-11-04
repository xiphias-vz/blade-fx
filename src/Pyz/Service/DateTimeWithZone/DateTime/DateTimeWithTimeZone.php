<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DateTimeWithZone\DateTime;

use DateTime;
use DateTimeZone;
use Spryker\Shared\Kernel\Store;

class DateTimeWithTimeZone
{
    /**
     * @var \Spryker\Shared\Kernel\Store
     */
    private $store;

    /**
     * @param \Spryker\Shared\Kernel\Store $store
     */
    public function __construct(
        Store $store
    ) {
        $this->store = $store;
    }

    /**
     * @return string
     */
    public function getCurrentStoreTimezoneString(): string
    {
        return $this->store->getContexts()['*']['timezone'];
    }

    /**
     * @param string $dateTime
     *
     * @return \DateTime
     */
    public function getDateTimeInStoreTimeZone(string $dateTime): DateTime
    {
        $timeZone = new DateTimeZone($this->getCurrentStoreTimezoneString());

        return new DateTime($dateTime, $timeZone);
    }

    /**
     * @param \DateTime $dateTime
     *
     * @return \DateTime
     */
    public function updateDateTimeWithStoreTimeZone(DateTime $dateTime): DateTime
    {
        $timeZone = new DateTimeZone($this->getCurrentStoreTimezoneString());

        return $dateTime->setTimezone($timeZone);
    }
}
