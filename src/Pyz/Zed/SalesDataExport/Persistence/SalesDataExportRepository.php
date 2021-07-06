<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Persistence;

use Generated\Shared\Transfer\DataExportBatchTransfer;
use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Spryker\Zed\SalesDataExport\Persistence\SalesDataExportRepository as SpySalesDataExportRepository;

class SalesDataExportRepository extends SpySalesDataExportRepository
{
    /**
     * @module Country
     * @module Oms
     * @module Shipment
     *
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     * @param int $offset
     * @param int $limit
     *
     * @return \Generated\Shared\Transfer\DataExportBatchTransfer
     */
    public function getOrderItemData(DataExportConfigurationTransfer $dataExportConfigurationTransfer, int $offset, int $limit): DataExportBatchTransfer
    {
        $selectedColumns = $this->getSalesOrderItemSelectedColumns($dataExportConfigurationTransfer);
        $selectedFields = array_flip($selectedColumns);
        $dataExportBatchTransfer = (new DataExportBatchTransfer())
            ->setOffset($offset)
            ->setFields($selectedFields)
            ->setData([]);

        $salesOrderItemQuery = $this->getFactory()
            ->getSalesOrderItemPropelQuery()
            ->joinOrder()
            ->joinState()
            ->leftJoinProcess()
            ->leftJoinSalesOrderItemBundle()
            ->leftJoinSpySalesShipment()
            ->useSpySalesShipmentQuery()
            ->leftJoinSpySalesOrderAddress()
            ->useSpySalesOrderAddressQuery()
            ->leftJoinCountry()
            ->leftJoinRegion()
            ->endUse()
            ->endUse()
            ->orderByFkSalesOrder();

        $salesOrderItemQuery = $this->applyFilterCriteriaToSalesOrderItemQuery(
            $dataExportConfigurationTransfer->getFilterCriteria(),
            $salesOrderItemQuery
        );

        $salesOrderItemQuery->select($selectedColumns);

        $salesOrderItemData = $salesOrderItemQuery->find()->getArrayCopy();

        if ($salesOrderItemData === []) {
            return $dataExportBatchTransfer;
        }

        if (count($selectedColumns) === 1) {
            $salesOrderItemData = $this->formatSingleColumnData($salesOrderItemData, $selectedColumns);
        }

        $data = $this->getFactory()
            ->createSalesOrderItemMapper()
            ->mapSalesOrderItemDataByField($salesOrderItemData);

        return $dataExportBatchTransfer->setData($data);
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     * @param int $offset
     * @param int $limit
     *
     * @return \Generated\Shared\Transfer\DataExportBatchTransfer
     */
    public function getOrderExpenseData(DataExportConfigurationTransfer $dataExportConfigurationTransfer, int $offset, int $limit): DataExportBatchTransfer
    {
        $selectedColumns = $this->getSalesExpenseSelectedColumns($dataExportConfigurationTransfer);
        $selectedFields = array_flip($selectedColumns);
        $dataExportBatchTransfer = (new DataExportBatchTransfer())
            ->setOffset($offset)
            ->setFields($selectedFields)
            ->setData([]);

        $salesExpenseQuery = $this->getFactory()
            ->getSalesExpensePropelQuery()
            ->joinOrder()
            ->leftJoinSpySalesShipment()
            ->orderByFkSalesOrder();

        $salesExpenseQuery = $this->applyFilterCriteriaToSalesExpenseQuery(
            $dataExportConfigurationTransfer->getFilterCriteria(),
            $salesExpenseQuery
        );

        $salesExpenseQuery->select($selectedColumns);
        $orderExpenseData = $salesExpenseQuery->find()->toArray();

        if ($orderExpenseData === []) {
            return $dataExportBatchTransfer;
        }

        if (count($selectedColumns) === 1) {
            $orderExpenseData = $this->formatSingleColumnData($orderExpenseData, $selectedColumns);
        }

        $data = $this->getFactory()
            ->createSalesExpenseMapper()
            ->mapSalesExpenseDataByField($orderExpenseData);

        return $dataExportBatchTransfer->setData($data);
    }
}
