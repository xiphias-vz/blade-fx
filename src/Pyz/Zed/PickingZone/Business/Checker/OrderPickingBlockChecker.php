<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Business\Checker;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Pyz\Zed\PickingZone\Persistence\PickingZoneRepositoryInterface;

class OrderPickingBlockChecker implements OrderPickingBlockCheckerInterface
{
    /**
     * @var \Pyz\Zed\PickingZone\Persistence\PickingZoneRepositoryInterface
     */
    protected $pickingZoneRepository;

    /**
     * @param \Pyz\Zed\PickingZone\Persistence\PickingZoneRepositoryInterface $pickingZoneRepository
     */
    public function __construct(PickingZoneRepositoryInterface $pickingZoneRepository)
    {
        $this->pickingZoneRepository = $pickingZoneRepository;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return bool
     */
    public function isOrderPickingBlockAvailableForUser(OrderPickingBlockTransfer $orderPickingBlockTransfer): bool
    {
        $orderPickingBlockTransfer->requireIdSalesOrder()
            ->requireIdPickingZone()
            ->requireIdUser();

        $orderPickingBlockTransfer = $this->pickingZoneRepository->findOrderPickingBlock(
            $orderPickingBlockTransfer->getIdSalesOrder(),
            $orderPickingBlockTransfer->getIdPickingZone()
        );

        if (!$orderPickingBlockTransfer) {
            return false;
        }

        if ($orderPickingBlockTransfer->getIdUser() === $orderPickingBlockTransfer->getIdUser()) {
            return false;
        }

        return true;
    }
}
