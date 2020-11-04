<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThreshold\Persistence;

use Generated\Shared\Transfer\SalesOrderThresholdTransfer;
use Orm\Zed\SalesOrderThreshold\Persistence\SpySalesOrderThreshold;
use Spryker\Zed\SalesOrderThreshold\Persistence\SalesOrderThresholdEntityManager as SprykerSalesOrderThresholdEntityManager;

/**
 * @method \Spryker\Zed\SalesOrderThreshold\Persistence\SalesOrderThresholdPersistenceFactory getFactory()
 */
class SalesOrderThresholdEntityManager extends SprykerSalesOrderThresholdEntityManager
{
    /**
     * @param \Generated\Shared\Transfer\SalesOrderThresholdTransfer $salesOrderThresholdTransfer
     *
     * @return \Generated\Shared\Transfer\SalesOrderThresholdTransfer
     */
    public function saveSalesOrderThreshold(SalesOrderThresholdTransfer $salesOrderThresholdTransfer): SalesOrderThresholdTransfer
    {
        $this->assertRequiredAttributes($salesOrderThresholdTransfer);

        $salesOrderThresholdTypeTransfer = $salesOrderThresholdTransfer->getSalesOrderThresholdValue()->getSalesOrderThresholdType();
        $storeTransfer = $salesOrderThresholdTransfer->getStore();
        $currencyTransfer = $salesOrderThresholdTransfer->getCurrency();

        $salesOrderThresholdEntity = $this->getFactory()
            ->createSalesOrderThresholdQuery()
            ->filterByFkStore($storeTransfer->getIdStore())
            ->filterByFkCurrency($currencyTransfer->getIdCurrency())
            ->useSalesOrderThresholdTypeQuery()
                ->filterByThresholdGroup($salesOrderThresholdTypeTransfer->getThresholdGroup())
                ->filterByKey($salesOrderThresholdTypeTransfer->getKey())
            ->endUse()
            ->findOne();

        if (!$salesOrderThresholdEntity) {
            $salesOrderThresholdEntity = (new SpySalesOrderThreshold())
                ->setFkStore($storeTransfer->getIdStore())
                ->setFkCurrency($currencyTransfer->getIdCurrency());
        }

        if (!$salesOrderThresholdEntity->getMessageGlossaryKey()) {
            $salesOrderThresholdEntity->setMessageGlossaryKey(
                $salesOrderThresholdTransfer->getSalesOrderThresholdValue()->getMessageGlossaryKey()
            );
        }

        $salesOrderThresholdEntity
            ->setThreshold($salesOrderThresholdTransfer->getSalesOrderThresholdValue()->getThreshold())
            ->setFee($salesOrderThresholdTransfer->getSalesOrderThresholdValue()->getFee())
            ->setFkSalesOrderThresholdType(
                $salesOrderThresholdTypeTransfer->getIdSalesOrderThresholdType()
            )->save();

        return $this->getFactory()
            ->createSalesOrderThresholdMapper()
            ->mapSalesOrderThresholdEntityToTransfer(
                $salesOrderThresholdEntity,
                $salesOrderThresholdTransfer
            );
    }
}
