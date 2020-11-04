<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\StockDataImport\Business;

use Pyz\Zed\StockDataImport\Business\Writer\StockStoreWriterStep;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\StockDataImport\Business\StockDataImportBusinessFactory as SprykerStockDataImportBusinessFactory;

class StockDataImportBusinessFactory extends SprykerStockDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterBeforeImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    public function getStockStoreDataImporter()
    {
        /** @var \Spryker\Zed\DataImport\Business\Model\DataImporter $dataImporter */
        $dataImporter = $this->getCsvDataImporterFromConfig(
            $this->getConfig()->getStockStoreDataImporterConfiguration()
        );

        /** @var \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerTransactionAware $dataSetStepBroker */
        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(StockStoreWriterStep::BULK_SIZE);
        $dataSetStepBroker = $dataSetStepBroker->addStep($this->createStockNameToIdStockStep());
        $dataSetStepBroker = $dataSetStepBroker->addStep($this->createStockStoreWriterStep());

        $dataImporter = $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createStockStoreWriterStep(): DataImportStepInterface
    {
        return new StockStoreWriterStep();
    }
}
