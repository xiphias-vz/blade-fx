<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Maintenance\Communication\Console;

use Spryker\Zed\Maintenance\Communication\Console\MaintenanceEnableConsole as SprykerMaintenanceEnableConsole;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\Maintenance\Business\MaintenanceFacadeInterface getFacade()
 */
class MaintenanceEnableConsole extends SprykerMaintenanceEnableConsole
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

        $this->enableYvesMaintenancePage($application);
        $this->enableZedMaintenancePage($application);
        $this->enableStoreAppMaintenancePage($application);

        return static::CODE_SUCCESS;
    }

    /**
     * @param string $application
     *
     * @return void
     */
    protected function enableYvesMaintenancePage(string $application): void
    {
        if ($application === static::APPLICATION_ALL || $application === static::APPLICATION_YVES) {
            $this->getFacade()->enableMaintenanceForYves();
        }
    }

    /**
     * @param string $application
     *
     * @return void
     */
    protected function enableZedMaintenancePage(string $application): void
    {
        if ($application === static::APPLICATION_ALL || $application === static::APPLICATION_ZED) {
            $this->getFacade()->enableMaintenanceForZed();
        }
    }

    /**
     * @param string $application
     *
     * @return void
     */
    protected function enableStoreAppMaintenancePage(string $application): void
    {
        if ($application === static::APPLICATION_ALL || $application === static::APPLICATION_STORE_APP) {
            $this->getFacade()->enableMaintenanceForStoreApp();
        }
    }
}
