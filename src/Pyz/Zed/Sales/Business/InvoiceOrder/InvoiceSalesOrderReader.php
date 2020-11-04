<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\InvoiceOrder;

use DateTime;
use DateTimeZone;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Zed\Sales\Persistence\SalesRepositoryInterface;

class InvoiceSalesOrderReader
{
    protected const DATE_FORMAT = 'Y-m-d H:i:s';

    /**
     * @var \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    private $dateTimeWithZoneService;

    /**
     * @var \Pyz\Zed\Sales\Persistence\SalesRepositoryInterface
     */
    private $salesRepository;

    /**
     * @param \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface $dateTimeWithZoneService
     * @param \Pyz\Zed\Sales\Persistence\SalesRepositoryInterface $salesRepository
     */
    public function __construct(
        DateTimeWithZoneServiceInterface $dateTimeWithZoneService,
        SalesRepositoryInterface $salesRepository
    ) {
        $this->dateTimeWithZoneService = $dateTimeWithZoneService;
        $this->salesRepository = $salesRepository;
    }

    /**
     * @param \DateTime|null $dateFrom
     * @param \DateTime|null $dateTo
     *
     * @return array
     */
    public function getOrdersInfoByInvoiceDateTimeRange(?DateTime $dateFrom, ?DateTime $dateTo): array
    {
        return $this->salesRepository->getOrdersInfoByInvoiceDateTimeRange(
            $this->getQueryCriteria($dateFrom, $dateTo)
        );
    }

    /**
     * @param \DateTime|null $dateFrom
     * @param \DateTime|null $dateTo
     *
     * @return array
     */
    protected function getQueryCriteria(?DateTime $dateFrom, ?DateTime $dateTo): array
    {
        $criteria = [];

        if ($dateFrom) {
            $criteria['min'] = $dateFrom->setTime(0, 0, 0)->format(self::DATE_FORMAT);
        }

        if ($dateTo) {
            $criteria['max'] = $dateTo->setTime(23, 59, 59)->format(self::DATE_FORMAT);
        }

        if (!$dateFrom && !$dateTo) {
            $dateTimeZone = new DateTimeZone($this->dateTimeWithZoneService->getCurrentStoreTimezoneString());
            $criteria['max'] = (new DateTime())
                ->setTimezone($dateTimeZone)
                ->format('Y-m-d H:i:s');
        }

        return $criteria;
    }
}
