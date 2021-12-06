<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProductSchedule\Business;

use Pyz\Zed\PriceProductSchedule\Business\PriceProductSchedule\Executor\PriceProductScheduleApplyTransactionExecutor;
use Pyz\Zed\PriceProductSchedule\Business\PriceProductSchedule\PriceProductScheduleApplier;
use Pyz\Zed\PriceProductSchedule\Business\PriceProductSchedule\PriceProductScheduleDisabler;
use Spryker\Zed\PriceProductSchedule\Business\PriceProductSchedule\Executor\PriceProductScheduleApplyTransactionExecutorInterface;
use Spryker\Zed\PriceProductSchedule\Business\PriceProductSchedule\PriceProductScheduleApplierInterface;
use Spryker\Zed\PriceProductSchedule\Business\PriceProductSchedule\PriceProductScheduleDisablerInterface;
use Spryker\Zed\PriceProductSchedule\Business\PriceProductScheduleBusinessFactory as SprykerPriceProductScheduleBusinessFactory;

/**
 * @method \Spryker\Zed\PriceProductSchedule\PriceProductScheduleConfig getConfig()
 * @method \Spryker\Zed\PriceProductSchedule\Persistence\PriceProductScheduleEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\PriceProductSchedule\Persistence\PriceProductScheduleRepositoryInterface getRepository()
 */
class PriceProductScheduleBusinessFactory extends SprykerPriceProductScheduleBusinessFactory
{
    /**
     * @return \Spryker\Zed\PriceProductSchedule\Business\PriceProductSchedule\Executor\PriceProductScheduleApplyTransactionExecutorInterface
     */
    public function createPriceProductScheduleApplyTransactionExecutor(): PriceProductScheduleApplyTransactionExecutorInterface
    {
        return new PriceProductScheduleApplyTransactionExecutor(
            $this->createPriceProductScheduleDisabler(),
            $this->getPriceProductFacade(),
            $this->getEntityManager()
        );
    }

    /**
     * @return \Spryker\Zed\PriceProductSchedule\Business\PriceProductSchedule\PriceProductScheduleApplierInterface
     */
    public function createPriceProductScheduleApplier(): PriceProductScheduleApplierInterface
    {
        return new PriceProductScheduleApplier(
            $this->createPriceProductScheduleDisabler(),
            $this->getRepository(),
            $this->getStoreFacade(),
            $this->createPriceProductScheduleApplyTransactionExecutor()
        );
    }

    /**
     * @return \Spryker\Zed\PriceProductSchedule\Business\PriceProductSchedule\PriceProductScheduleDisablerInterface
     */
    public function createPriceProductScheduleDisabler(): PriceProductScheduleDisablerInterface
    {
        return new PriceProductScheduleDisabler(
            $this->getEntityManager(),
            $this->getRepository(),
            $this->createPriceProductFallbackFinder(),
            $this->createProductPriceUpdater(),
            $this->getPriceProductFacade()
        );
    }
}
