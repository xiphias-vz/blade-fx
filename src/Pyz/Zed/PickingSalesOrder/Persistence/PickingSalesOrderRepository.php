<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Persistence;

use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;
use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderPersistenceFactory getFactory()
 */
class PickingSalesOrderRepository extends AbstractRepository implements PickingSalesOrderRepositoryInterface
{
    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer
     */
    public function getPickingSalesOrderCollection(PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer): PickingSalesOrderCollectionTransfer
    {
        $pickingSalesOrderCollectionTransfer = (new PickingSalesOrderCollectionTransfer());
        $pickingSalesOrderQuery = $this->getFactory()
            ->createPickingSalesOrderQuery();
//            ->joinWithSpyCountry()
//            ->leftJoinWithSpyProductAbstract()
//            ->joinWithSpyMerchant();

        $pickingSalesOrderQuery = $this->applyFilters($pickingSalesOrderQuery, $pickingSalesOrderCriteriaTransfer);
        $pyzPickingSalesOrderEntityCollection = $pickingSalesOrderQuery->find();

        foreach ($pyzPickingSalesOrderEntityCollection as $pyzPickingSalesOrderEntity) {
            $pickingSalesOrderTransfer = $this->getFactory()
                ->createPickingSalesOrderMapper()
                ->mapPickingSalesOrderEntityToPickingSalesOrderTransfer($pyzPickingSalesOrderEntity, new PickingSalesOrderTransfer());

            $pickingSalesOrderCollectionTransfer->addPickingSalesOrder($pickingSalesOrderTransfer);
        }

        return $pickingSalesOrderCollectionTransfer;
    }

    /**
     * @param \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery $pyzPickingSalesOrderQuery
     * @param \Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
     *
     * @return \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery
     */
    protected function applyFilters(
        PyzPickingSalesOrderQuery $pyzPickingSalesOrderQuery,
        PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
    ): PyzPickingSalesOrderQuery {
        if (!empty($pickingSalesOrderCriteriaTransfer->getIdSalesOrder())) {
            $pyzPickingSalesOrderQuery->filterByFkSalesOrder($pickingSalesOrderCriteriaTransfer->getIdSalesOrder());
        }

        if (!empty($pickingSalesOrderCriteriaTransfer->getContainerCodes())) {
            $pyzPickingSalesOrderQuery->filterByContainerCode_In($pickingSalesOrderCriteriaTransfer->getContainerCodes());
        }

        return $pyzPickingSalesOrderQuery;
    }
}
