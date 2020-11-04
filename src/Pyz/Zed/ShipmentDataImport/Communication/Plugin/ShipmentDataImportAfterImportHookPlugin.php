<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentDataImport\Communication\Plugin;

use Spryker\Zed\DataImport\Dependency\Plugin\DataImportAfterImportHookInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\ShipmentDataImport\Business\ShipmentDataImportFacade getFacade()
 * @method \Pyz\Zed\ShipmentDataImport\ShipmentDataImportConfig getConfig()
 */
class ShipmentDataImportAfterImportHookPlugin extends AbstractPlugin implements DataImportAfterImportHookInterface
{
    /**
     * @return void
     */
    public function afterImport()
    {
        $this->getFacade()->triggerShipmentMethodsPublishEvents();
    }
}
