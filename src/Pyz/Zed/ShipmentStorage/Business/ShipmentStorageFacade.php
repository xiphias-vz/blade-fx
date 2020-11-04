<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentStorage\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\ShipmentStorage\Business\ShipmentStorageBusinessFactory getFactory()
 * @method \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\ShipmentStorage\Persistence\ShipmentStorageRepositoryInterface getRepository()
 */
class ShipmentStorageFacade extends AbstractFacade implements ShipmentStorageFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publishShipmentMethods(array $eventTransfers): void
    {
        $this->getFactory()->createShipmentStorageWriter()->publishByShipmentMethodIds($eventTransfers);
    }

    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publishShipmentCarriers(array $eventTransfers): void
    {
        $this->getFactory()->createShipmentStorageWriter()->publishByShipmentCarrierIds($eventTransfers);
    }

    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publishShipmentMethodStore(array $eventTransfers): void
    {
        $this->getFactory()->createShipmentStorageWriter()->publishByShipmentMethodStoreIds($eventTransfers);
    }

    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publishShipmentMethodPrice(array $eventTransfers): void
    {
        $this->getFactory()->createShipmentStorageWriter()->publishByShipmentMethodPriceIds($eventTransfers);
    }
}
