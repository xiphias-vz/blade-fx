<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Persistence;

use DateTime;
use Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface as SprykerOmsQueryContainerInterface;

interface OmsQueryContainerInterface extends SprykerOmsQueryContainerInterface
{
    /**
     * @api
     *
     * @param array $states
     * @param string $processName
     * @param int|null $processId
     * @param int|null $limit
     * @param string|null $storeName
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery
     */
    public function querySalesOrderItemsByState(array $states, $processName, $processId = null, $limit = null, ?string $storeName = null);

    /**
     * @api
     *
     * @param \DateTime $now
     * @param int|null $processId
     * @param int|null $limit
     * @param string|null $storeName
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItemQuery
     */
    public function querySalesOrderItemsWithExpiredTimeouts(DateTime $now, $processId = null, $limit = null, ?string $storeName = null);
}
