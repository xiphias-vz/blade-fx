<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Persistence;

use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;
use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrder;
use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery;
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
 * @method \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderPersistenceFactory getFactory()
 */
class PickingSalesOrderEntityManager extends AbstractEntityManager implements PickingSalesOrderEntityManagerInterface
{
    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer
     *
     * @return void
     */
    public function create(PickingSalesOrderTransfer $pickingSalesOrderTransfer): void
    {
        $pickingSalesOrderEntity = $this->getFactory()
            ->createPickingSalesOrderMapper()
            ->mapPickingSalesOrderTransferToPickingSalesOrderEntity($pickingSalesOrderTransfer, new PyzPickingSalesOrder());

        $pickingSalesOrderEntity->save();
    }

    /**
     * @param \Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
     *
     * @return void
     */
    public function delete(PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer): void
    {
        $pickingSalesOrderEntities = $this->applyFilters(
            $this->getFactory()->createPickingSalesOrderQuery(),
            $pickingSalesOrderCriteriaTransfer
        )->find();

        if (!$pickingSalesOrderEntities) {
            return;
        }

        $pickingSalesOrderEntities->delete();
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
