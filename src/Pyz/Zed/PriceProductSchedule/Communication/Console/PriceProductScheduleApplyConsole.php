<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProductSchedule\Communication\Console;

use Spryker\Zed\PriceProductSchedule\Communication\Console\PriceProductScheduleApplyConsole as SpryPriceProductScheduleApplyConsole;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Spryker\Zed\PriceProductSchedule\Business\PriceProductScheduleFacadeInterface getFacade()
 * @method \Spryker\Zed\PriceProductSchedule\Persistence\PriceProductScheduleRepositoryInterface getRepository()
 */
class PriceProductScheduleApplyConsole extends SpryPriceProductScheduleApplyConsole
{
     /**
      * @param \Symfony\Component\Console\Input\InputInterface $input
      * @param \Symfony\Component\Console\Output\OutputInterface $output
      *
      * @return int|null
      */
    protected function execute(InputInterface $input, OutputInterface $output): ?int
    {
        $this->getFacade()->applyScheduledPrices();

        return static::CODE_SUCCESS;
    }
}
