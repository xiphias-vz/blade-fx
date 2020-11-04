<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Shipment\DeliveryDate;

use DateTime;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;

class Parser
{
    public const REGEX_REQUESTED_DELIVERY_DATE = '/(.*)_(\d\d):(\d\d)-.+/';

    /**
     * @var \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    private $dateTimeWithZoneService;

    /**
     * @param \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface $dateTimeWithZoneService
     */
    public function __construct(DateTimeWithZoneServiceInterface $dateTimeWithZoneService)
    {
        $this->dateTimeWithZoneService = $dateTimeWithZoneService;
    }

    /**
     * @param string $requestedDeliveryDate
     *
     * @return \DateTime
     */
    public function parseRequestedDeliveryDate(string $requestedDeliveryDate): DateTime
    {
        $matches = [];
        preg_match(self::REGEX_REQUESTED_DELIVERY_DATE, $requestedDeliveryDate, $matches);

        [, $date, $hour, $minute] = $matches;

        return $this->dateTimeWithZoneService
            ->getDateTimeInStoreTimeZone($date)
            ->setTime((int)$hour, (int)$minute);
    }
}
