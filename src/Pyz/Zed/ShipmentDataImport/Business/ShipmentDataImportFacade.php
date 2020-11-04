<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentDataImport\Business;

use Spryker\Zed\ShipmentDataImport\Business\ShipmentDataImportFacade as SprykerShipmentDataImportFacade;

/**
 * @method \Pyz\Zed\ShipmentDataImport\Business\ShipmentDataImportBusinessFactory getFactory()
 */
class ShipmentDataImportFacade extends SprykerShipmentDataImportFacade implements ShipmentDataImportFacadeInterface
{
    /**
     * @return void
     */
    public function triggerShipmentMethodsPublishEvents(): void
    {
        $this->getFactory()->createShipmentMethodsEventsPublisher()->triggerShipmentMethodsPublishEvents();
    }
}
