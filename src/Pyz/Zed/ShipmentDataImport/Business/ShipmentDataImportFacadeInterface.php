<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentDataImport\Business;

use Spryker\Zed\ShipmentDataImport\Business\ShipmentDataImportFacadeInterface as SprykerShipmentDataImportFacadeInterface;

interface ShipmentDataImportFacadeInterface extends SprykerShipmentDataImportFacadeInterface
{
    /**
     * @return void
     */
    public function triggerShipmentMethodsPublishEvents(): void;
}
