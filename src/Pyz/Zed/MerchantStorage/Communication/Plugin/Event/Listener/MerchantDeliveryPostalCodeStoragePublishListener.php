<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Communication\Plugin\Event\Listener;

use Spryker\Zed\Event\Dependency\Plugin\EventBulkHandlerInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\MerchantStorage\Communication\MerchantStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\MerchantStorage\Business\MerchantStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\MerchantStorage\MerchantStorageConfig getConfig()
 */
class MerchantDeliveryPostalCodeStoragePublishListener extends AbstractPlugin implements EventBulkHandlerInterface
{
    /**
     * {@inheritDoc}
     * - Handles merchant create amd update events.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     * @param string $eventName
     *
     * @return void
     */
    public function handleBulk(array $eventTransfers, $eventName)
    {
        $this->getFacade()->writeCollectionByDeliveryPostalCodeEvents($eventTransfers);
    }
}
