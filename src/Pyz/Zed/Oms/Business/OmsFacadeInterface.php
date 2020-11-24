<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business;

use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Spryker\Zed\Oms\Business\OmsFacadeInterface as SprykerOmsFacadeInterface;

interface OmsFacadeInterface extends SprykerOmsFacadeInterface
{
    /**
     * @param int $idOrder
     *
     * @return bool
     */
    public function isOrderFlaggedCancellableByCustomer($idOrder): bool;

    /**
     * Specification:
     *  - Triggers even for given order items, data is used as additional payload which is passed to commands.
     *  - Locks state machine trigger from concurrent access
     *  - Logs state machine transitions
     *  - Executes state machine for each order item following their definitions
     *  - Calls command plugins
     *  - Calls condition plugins
     *  - Sets timeouts for timeout events
     *  - Triggers item reservation plugins
     *  - Unlocks state machine trigger
     *  - Returns number of processed order items
     *
     * @api
     *
     * @param string $eventId
     * @param array $orderItemIds
     * @param array $data
     *
     * @return int
     */
    public function triggerEventForOrderItemsAndCountProcessed($eventId, array $orderItemIds, array $data = []);

    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     *
     * @return void
     */
    public function sendOrderCancelledMail(SpySalesOrder $salesOrderEntity): void;

    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     *
     * @return void
     */
    public function sendOrderRefundedMail(SpySalesOrder $salesOrderEntity): void;

    /**
     * @api
     *
     * @param array $logContext
     * @param int|null $processId
     *
     * @return int
     */
    public function checkConditions(array $logContext = [], $processId = null);

    /**
     * @api
     *
     * @param array $logContext
     * @param int|null $processId
     *
     * @return int
     */
    public function checkTimeouts(array $logContext = [], $processId = null);

    /**
     * @param int $idOrder
     *
     * @return bool
     */
    public function isOrderFlaggedCancelled($idOrder): bool;

    /**
     * @param int $idOrder
     *
     * @return bool
     */
    public function isOrderFlaggedShippedMailAwaits($idOrder): bool;
}
