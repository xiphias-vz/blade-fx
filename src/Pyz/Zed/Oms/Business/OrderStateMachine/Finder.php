<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business\OrderStateMachine;

use Exception;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Zed\Oms\Business\OrderStateMachine\Finder as SprykerFinder;

class Finder extends SprykerFinder implements FinderInterface
{
    /**
     * @param int $idOrder
     *
     * @return bool
     */
    public function isOrderFlaggedCancellableByCustomer($idOrder): bool
    {
        return $this->isOrderFlaggedMultiple(
            $idOrder,
            [OmsConfig::STATE_TYPE_FLAG_CANCELLABLE_BY_CUSTOMER],
            [OmsConfig::STATE_TYPE_FLAG_CANCELLED]
        );
    }

    /**
     * @param int $idOrder
     * @param string[] $requiredFlags
     * @param string[] $optionalFlags
     *
     * @throws \Exception
     *
     * @return bool
     */
    public function isOrderFlaggedMultiple(int $idOrder, array $requiredFlags, array $optionalFlags): bool
    {
        $order = $this->queryContainer
            ->querySalesOrderById($idOrder)
            ->findOne();

        if ($order === null) {
            throw new Exception('Order not found for id ' . $idOrder);
        }

        $totalFlaggedItemsCount = $this->countItemsByFlags($order, $requiredFlags);
        if ($totalFlaggedItemsCount == 0) {
            return false;
        }

        $totalFlaggedItemsCount += $this->countItemsByFlags($order, $optionalFlags);

        return $totalFlaggedItemsCount === count($order->getItems());
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $order
     * @param string[] $flags
     *
     * @return int
     */
    protected function countItemsByFlags(SpySalesOrder $order, array $flags): int
    {
        $itemsCount = 0;

        $items = $order->getItems();
        $states = $this->getStateNamesByFlags(
            $items->getFirst()->getProcess()->getName(),
            $flags
        );

        foreach ($items as $item) {
            if (in_array($item->getState()->getName(), $states)) {
                $itemsCount++;
            }
        }

        return $itemsCount;
    }

    /**
     * @param string $processName
     * @param string[] $flags
     *
     * @return string[]
     */
    protected function getStateNamesByFlags(string $processName, array $flags): array
    {
        $selectedStates = [];
        $builder = clone $this->builder;
        $processStateList = $builder->createProcess($processName)->getAllStates();

        foreach ($processStateList as $state) {
            if ($state->hasFlags() && array_intersect($state->getFlags(), $flags)) {
                $selectedStates[] = $state->getName();
            }
        }

        return $selectedStates;
    }

    /**
     * @param int $idOrder
     *
     * @return bool
     */
    public function isOrderFlaggedCancelled($idOrder): bool
    {
        return $this->isOrderFlaggedAll($idOrder, OmsConfig::STATE_TYPE_FLAG_CANCELLED);
    }

    /**
     * @param int $idOrder
     *
     * @return bool
     */
    public function isOrderFlaggedShippedMailAwaits($idOrder): bool
    {
        return $this->isOrderFlaggedAll($idOrder, OmsConfig::STATE_TYPE_FLAG_SHIPPED_MAIL_AWAITS);
    }
}
