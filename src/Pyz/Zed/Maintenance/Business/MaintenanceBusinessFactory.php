<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Maintenance\Business;

use Spryker\Zed\Maintenance\Business\MaintenanceBusinessFactory as SprykerMaintenanceBusinessFactory;
use Spryker\Zed\Maintenance\Business\Model\Maintenance\MaintenanceInterface;
use Spryker\Zed\Maintenance\Business\Model\Maintenance\MaintenanceMarkerFile;

/**
 * @method \Pyz\Zed\Maintenance\MaintenanceConfig getConfig()
 */
class MaintenanceBusinessFactory extends SprykerMaintenanceBusinessFactory
{
    /**
     * @return \Spryker\Zed\Maintenance\Business\Model\Maintenance\MaintenanceInterface
     */
    public function createMaintenanceForStoreApp(): MaintenanceInterface
    {
        return new MaintenanceMarkerFile($this->getConfig()->getMaintenanceMarkerDirStoreApp());
    }
}
