<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantDataImport\Communication\Plugin;

use Spryker\Zed\DataImport\Dependency\Plugin\DataImportAfterImportHookInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\MerchantDataImport\Business\MerchantDataImportFacade getFacade()
 * @method \Pyz\Zed\MerchantDataImport\Communication\MerchantDataImportCommunicationFactory getFactory()
 * @method \Pyz\Zed\MerchantDataImport\MerchantDataImportConfig getConfig()
 */
class MerchantDataImportAfterImportHookPlugin extends AbstractPlugin implements DataImportAfterImportHookInterface
{
    /**
     * @return void
     */
    public function afterImport()
    {
        $stores = $this->getFactory()->getStoreFacade()->getAllStores();
        $this->getFacade()->triggerMerchantPublishEventsForStores($stores);
    }
}
