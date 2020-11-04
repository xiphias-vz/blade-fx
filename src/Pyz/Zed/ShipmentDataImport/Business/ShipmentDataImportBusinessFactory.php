<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentDataImport\Business;

use Pyz\Zed\ShipmentDataImport\Business\ShipmentMethodsEventsPublisher\ShipmentMethodsEventsPublisher;
use Pyz\Zed\ShipmentDataImport\Business\ShipmentMethodsEventsPublisher\ShipmentMethodsEventsPublisherInterface;
use Pyz\Zed\ShipmentDataImport\Business\ShipmentMethodStore\Writer\Step\ShipmentMethodStoreWriterStep;
use Pyz\Zed\ShipmentDataImport\ShipmentDataImportDependencyProvider;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\Event\Business\EventFacadeInterface;
use Spryker\Zed\Shipment\Business\ShipmentFacadeInterface;
use Spryker\Zed\ShipmentDataImport\Business\ShipmentDataImportBusinessFactory as SprykerShipmentDataImportBusinessFactory;

/**
 * @method \Pyz\Zed\ShipmentDataImport\ShipmentDataImportConfig getConfig()
 */
class ShipmentDataImportBusinessFactory extends SprykerShipmentDataImportBusinessFactory
{
    /**
     * @return \Pyz\Zed\ShipmentDataImport\Business\ShipmentMethodsEventsPublisher\ShipmentMethodsEventsPublisherInterface
     */
    public function createShipmentMethodsEventsPublisher(): ShipmentMethodsEventsPublisherInterface
    {
        return new ShipmentMethodsEventsPublisher($this->getShipmentFacade(), $this->getEventFacade());
    }

    /**
     * @return \Spryker\Zed\Shipment\Business\ShipmentFacadeInterface
     */
    public function getShipmentFacade(): ShipmentFacadeInterface
    {
        return $this->getProvidedDependency(ShipmentDataImportDependencyProvider::FACADE_SHIPMENT);
    }

    /**
     * @return \Spryker\Zed\Event\Business\EventFacadeInterface
     */
    public function getEventFacade(): EventFacadeInterface
    {
        return $this->getProvidedDependency(ShipmentDataImportDependencyProvider::FACADE_EVENT);
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterBeforeImportAwareInterface|\Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
     */
    public function getShipmentMethodStoreDataImporter()
    {
        $dataImporter = $this->getCsvDataImporterFromConfig(
            $this->getConfig()->getShipmentMethodStoreDataImporterConfiguration()
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(ShipmentMethodStoreWriterStep::BULK_SIZE);
        $dataSetStepBroker = $dataSetStepBroker->addStep($this->createShipmentMethodKeyToIdShipmentMethodStep());
        $dataSetStepBroker = $dataSetStepBroker->addStep($this->createShipmentMethodStoreWriterStep());
        $dataImporter = $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createShipmentMethodStoreWriterStep(): DataImportStepInterface
    {
        return new ShipmentMethodStoreWriterStep();
    }
}
