<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CmsPageDataImport\Business;

use Pyz\Zed\CmsPageDataImport\Business\CmsPageStore\CmsPageStoreWriterStep;
use Spryker\Zed\CmsPageDataImport\Business\CmsPageDataImportBusinessFactory as SprykerCmsPageDataImportBusinessFactory;

class CmsPageDataImportBusinessFactory extends SprykerCmsPageDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterBeforeImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    public function createCmsPageStoreImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig(
            $this->getConfig()->getCmsPageStoreDataImporterConfiguration()
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(CmsPageStoreWriterStep::BULK_SIZE);
        $dataSetStepBroker->addStep($this->createCmsPageKeyToIdCmsPageStep());
        $dataSetStepBroker->addStep(new CmsPageStoreWriterStep(
            $this->getCmsFacade()
        ));
        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }
}
