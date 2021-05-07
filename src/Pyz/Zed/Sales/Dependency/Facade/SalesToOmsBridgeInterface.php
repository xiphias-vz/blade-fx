<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Dependency\Facade;

interface SalesToOmsBridgeInterface
{
    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
     *
     * @return void
     */
    public function sendEmail($salesOrderEntity);
}
