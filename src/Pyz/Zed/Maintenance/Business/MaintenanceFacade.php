<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Maintenance\Business;

use Spryker\Zed\Maintenance\Business\MaintenanceFacade as SprykerMaintenanceFacade;

/**
 * @method \Pyz\Zed\Maintenance\Business\MaintenanceBusinessFactory getFactory()
 */
class MaintenanceFacade extends SprykerMaintenanceFacade implements MaintenanceFacadeInterface
{
    /**
     * @inheritDoc
     */
    public function enableMaintenanceForStoreApp(): void
    {
        $this->getFactory()->createMaintenanceForStoreApp()->enableMaintenance();
    }

    /**
     * @inheritDoc
     */
    public function disableMaintenanceForStoreApp(): void
    {
        $this->getFactory()->createMaintenanceForStoreApp()->disableMaintenance();
    }
}
