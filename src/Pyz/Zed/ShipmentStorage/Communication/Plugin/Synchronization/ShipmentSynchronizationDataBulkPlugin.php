<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Communication\Plugin\Synchronization;

use Generated\Shared\Transfer\SynchronizationDataTransfer;
use Orm\Zed\ShipmentStorage\Persistence\PyzShipmentMethodsListStorageQuery;
use Pyz\Shared\ShipmentStorage\ShipmentStorageConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataBulkRepositoryPluginInterface;

/**
 * @method \Pyz\Zed\ShipmentStorage\Business\ShipmentStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\ShipmentStorage\Communication\ShipmentStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\ShipmentStorage\ShipmentStorageConfig getConfig()
 * @method \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageRepositoryInterface getRepository()()
 */
class ShipmentSynchronizationDataBulkPlugin extends AbstractPlugin implements SynchronizationDataBulkRepositoryPluginInterface
{
    /**
     * @uses \Propel\Runtime\ActiveQuery\Criteria::ASC
     */
    protected const ORDER_DIRECTION = 'ASC';

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getResourceName(): string
    {
        return ShipmentStorageConfig::SHIPMENT_METHODS_LIST_RESOURCE_NAME;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return bool
     */
    public function hasStore(): bool
    {
        return false;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param int $offset
     * @param int $limit
     * @param int[] $ids
     *
     * @return \Generated\Shared\Transfer\SynchronizationDataTransfer[]
     */
    public function getData(int $offset, int $limit, array $ids = []): array
    {
        $shipmentMethodsListStorageEntities = PyzShipmentMethodsListStorageQuery::create()
            ->offset($offset)
            ->limit($limit)
            ->filterByIdShipmentMethodsListStorage_In($ids)
            ->find();

        $synchronizationDataTransfers = [];
        foreach ($shipmentMethodsListStorageEntities as $shipmentMethodsListStorageEntity) {
            $synchronizationDataTransfer = new SynchronizationDataTransfer();
            $synchronizationDataTransfer->setData(json_encode($shipmentMethodsListStorageEntity->getData()));
            $synchronizationDataTransfer->setKey($shipmentMethodsListStorageEntity->getKey());
            $synchronizationDataTransfers[] = $synchronizationDataTransfer;
        }

        return $synchronizationDataTransfers;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return array
     */
    public function getParams(): array
    {
        return [];
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getQueueName(): string
    {
        return ShipmentStorageConfig::SHIPMENT_SYNC_STORAGE_QUEUE;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string|null
     */
    public function getSynchronizationQueuePoolName(): ?string
    {
        return $this->getFactory()->getConfig()->getShipmentSynchronizationPoolName();
    }
}
