<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Persistence;

interface MonitoringReportQueryContainerInterface
{
    /**
     * @return string
     */
    public function getDBVersion(): string;
}
