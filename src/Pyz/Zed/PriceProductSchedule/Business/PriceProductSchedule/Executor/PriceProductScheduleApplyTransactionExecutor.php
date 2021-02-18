<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProductSchedule\Business\PriceProductSchedule\Executor;

use Generated\Shared\Transfer\PriceProductScheduleTransfer;
use Orm\Zed\PriceProduct\Persistence\SpyPriceProductDefaultQuery;
use Orm\Zed\PriceProduct\Persistence\SpyPriceProductQuery;
use Orm\Zed\PriceProduct\Persistence\SpyPriceProductStoreQuery;
use Spryker\Zed\PriceProductSchedule\Business\PriceProductSchedule\Executor\PriceProductScheduleApplyTransactionExecutor as SprykerPriceProductScheduleApplyTransactionExecutor;
use Symfony\Component\Config\Definition\Exception\Exception;

class PriceProductScheduleApplyTransactionExecutor extends SprykerPriceProductScheduleApplyTransactionExecutor
{
    /**
     * @param \Generated\Shared\Transfer\PriceProductScheduleTransfer[] $priceProductScheduleForEnable
     *
     * @return void
     */
    public function execute(array $priceProductScheduleForEnable): void
    {
        foreach ($priceProductScheduleForEnable as $priceProductScheduleTransfer) {
            $this->getTransactionHandler()->handleTransaction(function () use ($priceProductScheduleTransfer): void {
                $this->executeApplyScheduledPrices($priceProductScheduleTransfer);
            });
        }
    }

    /**
     * @param \Generated\Shared\Transfer\PriceProductScheduleTransfer $priceProductScheduleTransfer
     *
     * @return void
     */
    protected function executeApplyScheduledPrices(PriceProductScheduleTransfer $priceProductScheduleTransfer): void
    {
        $this->priceProductScheduleDisabler->disableNotRelevantPriceProductSchedulesByPriceProductSchedule($priceProductScheduleTransfer);

        $this->removeFromPriceProductStore($priceProductScheduleTransfer);

        $priceProductTransfer = $this->preparePriceProductTransferForPersist($priceProductScheduleTransfer);
        $this->priceProductFacade->persistPriceProductStore($priceProductTransfer);

        $priceProductScheduleTransfer->setIsCurrent(true);

        $this->priceProductScheduleEntityManager->savePriceProductSchedule($priceProductScheduleTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\PriceProductScheduleTransfer $priceProductScheduleTransfer
     *
     * @return void
     */
    protected function removeFromPriceProductStore(PriceProductScheduleTransfer $priceProductScheduleTransfer): void
    {
        $idProductAbstract = $priceProductScheduleTransfer->getPriceProduct()->getIdProductAbstract() ?? null;
        $idProduct = $priceProductScheduleTransfer->getPriceProduct()->getIdProduct() ?? null;

        $priceProductEntity = SpyPriceProductQuery::create()
            ->filterByFkProductAbstract($idProductAbstract)
            ->filterByFkProduct($idProduct)
            ->find();

        foreach ($priceProductEntity->getData() as $priceProduct) {
            $idPriceProduct = $priceProduct->getIdPriceProduct();
            $priceStoreEntity = SpyPriceProductStoreQuery::create()
                    ->filterByFkStore($priceProductScheduleTransfer->getStore()->getIdStore())
                    ->filterByFkPriceProduct($idPriceProduct)
                    ->find() ?? null;

            foreach ($priceStoreEntity->getData() as $priceStore) {
                $idPriceProductStore = $priceStore->getIdPriceProductStore();
                $this->removeFromPriceProductDefault($idPriceProductStore);
            }
            if ($priceStoreEntity != null) {
                SpyPriceProductStoreQuery::create()
                    ->filterByFkStore($priceProductScheduleTransfer->getStore()->getIdStore())
                    ->filterByFkPriceProduct($idPriceProduct)
                    ->delete();
            }
        }
    }

    /**
     * @param int $idPriceProductStore
     *
     * @return void
     */
    protected function removeFromPriceProductDefault(int $idPriceProductStore): void
    {
        try {
            $qry = SpyPriceProductDefaultQuery::create();
            $qry->findByFkPriceProductStore($idPriceProductStore);
            $qry->delete();
        } catch (Exception $e) {
        }
    }
}
