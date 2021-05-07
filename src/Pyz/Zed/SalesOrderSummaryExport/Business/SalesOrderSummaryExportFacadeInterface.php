<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport\Business;

interface SalesOrderSummaryExportFacadeInterface
{
    /**
     * @param string $content
     *
     * @return void
     */
    public function exportOrders(string $content): void;

    /**
     * @param string $content
     *
     * @return void
     */
    public function exportDeeplink(string $content): void;
}
