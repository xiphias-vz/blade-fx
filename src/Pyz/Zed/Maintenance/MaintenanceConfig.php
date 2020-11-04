<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Maintenance;

use Spryker\Zed\Maintenance\MaintenanceConfig as SprykerMaintenanceConfig;

class MaintenanceConfig extends SprykerMaintenanceConfig
{
    /**
     * Specification:
     * - Directory to which the marker file will be written.
     *
     * @api
     *
     * @return string
     */
    public function getMaintenanceMarkerDirStoreApp(): string
    {
        return APPLICATION_ROOT_DIR . '/public/StoreApp/maintenance';
    }
}
