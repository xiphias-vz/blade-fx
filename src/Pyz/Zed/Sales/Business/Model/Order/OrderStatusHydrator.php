<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Model\Order;

use DateTime;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Zed\Oms\Business\OmsFacadeInterface;
use Pyz\Zed\Sales\SalesConfig;

class OrderStatusHydrator implements OrderStatusHydratorInterface
{
    /**
     * @var \Pyz\Zed\Oms\Business\OmsFacadeInterface
     */
    protected $baseOmsFacade;

    /**
     * @var \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    protected $dateTimeWithZoneService;

    /**
     * @var \Pyz\Zed\Sales\SalesConfig
     */
    protected $salesConfig;

    /**
     * @param \Pyz\Zed\Oms\Business\OmsFacadeInterface $baseOmsFacade
     * @param \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface $dateTimeWithZoneService
     * @param \Pyz\Zed\Sales\SalesConfig $salesConfig
     */
    public function __construct(OmsFacadeInterface $baseOmsFacade, DateTimeWithZoneServiceInterface $dateTimeWithZoneService, SalesConfig $salesConfig)
    {
        $this->baseOmsFacade = $baseOmsFacade;
        $this->dateTimeWithZoneService = $dateTimeWithZoneService;
        $this->salesConfig = $salesConfig;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function hydrateOrderStatus(OrderTransfer $orderTransfer): OrderTransfer
    {
        $limitTimePeriod = (new DateTime($orderTransfer->getCreatedAt()))->modify($this->salesConfig->getOrderCancellationAllowedPeriod());
        $isOrderCancellationAllowed = $this->dateTimeWithZoneService->getDateTimeAsInStoreTimeZone($limitTimePeriod) >=
            $this->dateTimeWithZoneService->getDateTimeInStoreTimeZone('now');

        if (!$isOrderCancellationAllowed) {
            return $orderTransfer;
        }

        $orderTransfer->setIsCancellableByCustomer(
            $this->baseOmsFacade->isOrderFlaggedCancellableByCustomer($orderTransfer->getIdSalesOrder())
        );

        return $orderTransfer;
    }
}
