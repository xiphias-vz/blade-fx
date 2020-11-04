<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Maintenance\Communication\Console;

use Spryker\Zed\Maintenance\Communication\Console\MaintenanceDisableConsole as SprykerMaintenanceDisableConsole;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\Maintenance\Business\MaintenanceFacadeInterface getFacade()
 */
class MaintenanceDisableConsole extends SprykerMaintenanceDisableConsole
{
    public const APPLICATION_STORE_APP = 'storeApp';

    /**
     * @var array
     */
    protected $allowedApplications = [
        self::APPLICATION_YVES,
        self::APPLICATION_ZED,
        self::APPLICATION_ALL,
        self::APPLICATION_STORE_APP,
    ];

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        $application = $this->getApplicationName($input);

        $this->disableYvesMaintenancePage($application);
        $this->disableZedMaintenancePage($application);
        $this->disableStoreAppMaintenancePage($application);

        return static::CODE_SUCCESS;
    }

    /**
     * @param string $application
     *
     * @return void
     */
    protected function disableStoreAppMaintenancePage(string $application): void
    {
        if ($application === static::APPLICATION_ALL || $application === static::APPLICATION_STORE_APP) {
            $this->getFacade()->disableMaintenanceForStoreApp();
        }
    }
}
