<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PaymentDataImport\Business;

use Pyz\Zed\PaymentDataImport\Business\PaymentMethodStore\Writer\Step\PaymentMethodStoreWriterStep;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\PaymentDataImport\Business\PaymentDataImportBusinessFactory as SprykerPaymentDataImportBusinessFactory;

class PaymentDataImportBusinessFactory extends SprykerPaymentDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterBeforeImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    public function getPaymentMethodStoreDataImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig(
            $this->getConfig()->getPaymentMethodStoreDataImporterConfiguration()
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep($this->createPaymentMethodKeyToIdPaymentMethodStep())
            ->addStep($this->createPaymentMethodStoreWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createPaymentMethodStoreWriterStep(): DataImportStepInterface
    {
        return new PaymentMethodStoreWriterStep();
    }
}
