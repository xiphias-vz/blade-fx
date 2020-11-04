<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThresholdDataImport\Business;

use Pyz\Zed\SalesOrderThresholdDataImport\Business\Model\DataImportStep\SalesOrderThresholdWriterStep;
use Spryker\Zed\SalesOrderThresholdDataImport\Business\SalesOrderThresholdDataImportBusinessFactory as SprykerSalesOrderThresholdDataImportBusinessFactory;

class SalesOrderThresholdDataImportBusinessFactory extends SprykerSalesOrderThresholdDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterBeforeImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    public function createSalesOrderThresholdDataImport()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig(
            $this->getConfig()->getSalesOrderThresholdDataImporterConfiguration()
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker->addStep(
            new SalesOrderThresholdWriterStep(
                $this->getSalesOrderThresholdFacade(),
                $this->getStoreFacade(),
                $this->getCurrencyFacade()
            )
        );

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }
}
