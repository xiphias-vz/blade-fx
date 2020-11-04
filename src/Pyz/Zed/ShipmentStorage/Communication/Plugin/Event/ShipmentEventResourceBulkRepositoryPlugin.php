<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Communication\Plugin\Event;

use Generated\Shared\Transfer\ShipmentMethodTransfer;
use Orm\Zed\Shipment\Persistence\Map\SpyShipmentMethodTableMap;
use Orm\Zed\Shipment\Persistence\SpyShipmentMethodQuery;
use Pyz\Shared\ShipmentStorage\ShipmentStorageConfig;
use Pyz\Zed\Shipment\Dependency\ShipmentEvents;
use Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourceBulkRepositoryPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageRepositoryInterface getRepository()
 * @method \Pyz\Zed\ShipmentStorage\Business\ShipmentStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\ShipmentStorage\Communication\ShipmentStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\ShipmentStorage\ShipmentStorageConfig getConfig()
 */
class ShipmentEventResourceBulkRepositoryPlugin extends AbstractPlugin implements EventResourceBulkRepositoryPluginInterface
{
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
     * @param int $offset
     * @param int $limit
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodTransfer[]|\Spryker\Shared\Kernel\Transfer\AbstractTransfer[]
     */
    public function getData(int $offset, int $limit): array
    {
        $shipmentMethodTransfers = [];
        $shipmentMethods = SpyShipmentMethodQuery::create()->limit($limit)->offset($offset)->find();
        foreach ($shipmentMethods as $shipmentMethod) {
            $shipmentMethodTransfers[] = (new ShipmentMethodTransfer())->fromArray($shipmentMethod->toArray(), true);
        }

        return $shipmentMethodTransfers;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getEventName(): string
    {
        return ShipmentEvents::SHIPMENT_METHODS_PUBLISH;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string|null
     */
    public function getIdColumnName(): ?string
    {
        return SpyShipmentMethodTableMap::COL_ID_SHIPMENT_METHOD;
    }
}
