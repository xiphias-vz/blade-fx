<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Maintenance\Business;

use Spryker\Zed\Maintenance\Business\MaintenanceFacadeInterface as SprykerMaintenanceFacadeInterface;

interface MaintenanceFacadeInterface extends SprykerMaintenanceFacadeInterface
{
    /**
     * Specification:
     * - Enables maintenance mode for StoreApp.
     *
     * @api
     *
     * @return void
     */
    public function enableMaintenanceForStoreApp(): void;

    /**
     * Specification:
     * - Disables maintenance mode for StoreApp.
     *
     * @api
     *
     * @return void
     */
    public function disableMaintenanceForStoreApp(): void;
}
