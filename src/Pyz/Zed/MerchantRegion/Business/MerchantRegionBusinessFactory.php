<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantRegion\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReaderConfigurationTransfer;
use Pyz\Zed\MerchantRegion\Business\DataImport\MerchantRegionWriterStep;
use Pyz\Zed\MerchantRegion\Business\Expander\OrderExpander;
use Spryker\Zed\DataImport\Business\Model\DataImporter;
use Spryker\Zed\DataImport\Business\Model\DataReader\CsvReader\CsvReader;
use Spryker\Zed\DataImport\Business\Model\DataReader\CsvReader\CsvReaderConfiguration;
use Spryker\Zed\DataImport\Business\Model\DataReader\CsvReader\CsvReaderConfigurationInterface;
use Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface;
use Spryker\Zed\DataImport\Business\Model\DataReader\FileResolver\FileResolver;
use Spryker\Zed\DataImport\Business\Model\DataReader\FileResolver\FileResolverInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSet;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerTransactionAware;
use Spryker\Zed\DataImport\DataImportDependencyProvider;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\MerchantRegion\MerchantRegionConfig getConfig()
 * @method \Pyz\Zed\MerchantRegion\Persistence\MerchantRegionRepositoryInterface getRepository()
 */
class MerchantRegionBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterBeforeImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    public function createMerchantRegionDataImport()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig(
            $this->getConfig()->getMerchantDataImporterConfiguration()
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker->addStep($this->createMerchantRegionWriterStep());

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Pyz\Zed\MerchantRegion\Business\Expander\OrderExpander
     */
    public function createOrderExpander(): OrderExpander
    {
        return new OrderExpander(
            $this->getRepository()
        );
    }

    /**
     * @param int|null $bulkSize
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerInterface|\Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepAwareInterface
     */
    private function createTransactionAwareDataSetStepBroker($bulkSize = null)
    {
        return new DataSetStepBrokerTransactionAware($this->getPropelConnection(), $bulkSize);
    }

    /**
     * @return \Spryker\Zed\DataImport\Dependency\Propel\DataImportToPropelConnectionInterface
     */
    private function getPropelConnection()
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::PROPEL_CONNECTION);
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterBeforeImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    private function getCsvDataImporterFromConfig(DataImporterConfigurationTransfer $dataImporterConfigurationTransfer)
    {
        $csvReader = $this->createCsvReaderFromConfig($dataImporterConfigurationTransfer->getReaderConfiguration());

        return $this->createDataImporter($dataImporterConfigurationTransfer->getImportType(), $csvReader);
    }

    /**
     * @param string $importType
     * @param \Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface $reader
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    private function createDataImporter($importType, DataReaderInterface $reader)
    {
        return new DataImporter($importType, $reader);
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterReaderConfigurationTransfer $dataImporterReaderConfigurationTransfer
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface
     */
    private function createCsvReaderFromConfig(DataImporterReaderConfigurationTransfer $dataImporterReaderConfigurationTransfer)
    {
        $csvReaderConfiguration = new CsvReaderConfiguration(
            $dataImporterReaderConfigurationTransfer,
            $this->createFileResolver()
        );

        return $this->createCsvReader($csvReaderConfiguration);
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataReader\FileResolver\FileResolverInterface
     */
    private function createFileResolver(): FileResolverInterface
    {
        return new FileResolver();
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataReader\CsvReader\CsvReaderConfigurationInterface $csvReaderConfiguration
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface
     */
    private function createCsvReader(CsvReaderConfigurationInterface $csvReaderConfiguration): DataReaderInterface
    {
        return new CsvReader($csvReaderConfiguration, $this->createDataSet());
    }

    /**
     * @param array $data
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface
     */
    private function createDataSet(array $data = [])
    {
        return new DataSet($data);
    }

    /**
     * @return \Pyz\Zed\MerchantRegion\Business\DataImport\MerchantRegionWriterStep
     */
    private function createMerchantRegionWriterStep(): MerchantRegionWriterStep
    {
        return new MerchantRegionWriterStep();
    }
}
