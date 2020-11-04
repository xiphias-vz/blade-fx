<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThresholdDataImport\Business\Model\DataImportStep;

use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\SalesOrderThresholdDataImport\Business\Model\DataImportStep\SalesOrderThresholdWriterStep as SprykerSalesOrderThresholdWriterStep;
use Spryker\Zed\SalesOrderThresholdDataImport\Business\Model\DataSet\SalesOrderThresholdDataSetInterface;

class SalesOrderThresholdWriterStep extends SprykerSalesOrderThresholdWriterStep
{
    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $availableStores = Store::getInstance()->getAllowedStores();

        foreach ($availableStores as $store) {
            $storeTransfer = $this->getStoreByName($store);
            $currencyTransfer = $this->getCurrencyByCode($dataSet[SalesOrderThresholdDataSetInterface::COLUMN_CURRENCY]);

            if ($dataSet[SalesOrderThresholdDataSetInterface::COLUMN_SALES_ORDER_THRESHOLD_TYPE_KEY] && $dataSet[SalesOrderThresholdDataSetInterface::COLUMN_THRESHOLD]) {
                $salesOrderThresholdTransfer = $this->createSalesOrderThresholdTransfer(
                    $dataSet[SalesOrderThresholdDataSetInterface::COLUMN_SALES_ORDER_THRESHOLD_TYPE_KEY],
                    $storeTransfer,
                    $currencyTransfer,
                    (int)$dataSet[SalesOrderThresholdDataSetInterface::COLUMN_THRESHOLD],
                    (int)$dataSet[SalesOrderThresholdDataSetInterface::COLUMN_FEE],
                    $dataSet[SalesOrderThresholdDataSetInterface::COLUMN_MESSAGE_GLOSSARY_KEY]
                );

                $this->salesOrderThresholdFacade->saveSalesOrderThreshold($salesOrderThresholdTransfer);
            }
        }
    }
}
