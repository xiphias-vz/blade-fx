<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\OrderDate;

use DateInterval;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;

class OrderDateCheck
{
    /**
     * @var \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    private $dateTimeWithZoneService;

    /**
     * @param \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface $dateTimeWithZoneService
     */
    public function __construct(
        DateTimeWithZoneServiceInterface $dateTimeWithZoneService
    ) {
        $this->dateTimeWithZoneService = $dateTimeWithZoneService;
    }

    /**
     * @param string $requestedDeliveryDate
     * @param int $hours
     *
     * @return bool
     */
    public function isRequestedOrderDatePassed(string $requestedDeliveryDate, int $hours): bool
    {
        $requestedDeliveryDateParts = explode('_', $requestedDeliveryDate);
        $readyForPickingDateTime = $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone(
            $requestedDeliveryDateParts[0]
        )->add(new DateInterval(sprintf('PT%sH', $hours)));

        return $readyForPickingDateTime <= $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone('now');
    }
}
