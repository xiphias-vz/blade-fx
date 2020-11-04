<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantDataImport\Business;

use Pyz\Zed\MerchantDataImport\Business\Model\MerchantStoreEventTrigger;
use Pyz\Zed\MerchantDataImport\Business\Model\MerchantWriterStep;
use Pyz\Zed\MerchantDataImport\Business\Model\PrepareMerchantDataStep;
use Pyz\Zed\MerchantDataImport\MerchantDataImportDependencyProvider;
use Spryker\Zed\DataImport\Business\DataImportBusinessFactory;

/**
 * @method \Pyz\Zed\MerchantDataImport\MerchantDataImportConfig getConfig()
 */
class MerchantDataImportBusinessFactory extends DataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterBeforeImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    public function createMerchantDataImport()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig(
            $this->getConfig()->getMerchantDataImporterConfiguration()
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker->addStep($this->createMerchantDataPreparationStep());
        $dataSetStepBroker->addStep(new MerchantWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Pyz\Zed\MerchantDataImport\Business\Model\PrepareMerchantDataStep
     */
    protected function createMerchantDataPreparationStep(): PrepareMerchantDataStep
    {
        return new PrepareMerchantDataStep();
    }

    /**
     * @return \Pyz\Zed\MerchantDataImport\Business\Model\MerchantStoreEventTrigger
     */
    public function createMerchantStoreEventTrigger(): MerchantStoreEventTrigger
    {
        return new MerchantStoreEventTrigger(
            $this->getProvidedDependency(MerchantDataImportDependencyProvider::FACADE_EVENT)
        );
    }
}
