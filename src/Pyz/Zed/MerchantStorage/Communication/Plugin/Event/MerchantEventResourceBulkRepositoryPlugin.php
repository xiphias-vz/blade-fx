<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Communication\Plugin\Event;

use Generated\Shared\Transfer\EventEntityTransfer;
use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Pyz\Shared\MerchantStorage\MerchantStorageConfig;
use Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourceBulkRepositoryPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Merchant\Dependency\MerchantEvents;

/**
 * @method \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageRepositoryInterface getRepository()
 * @method \Pyz\Zed\MerchantStorage\Business\MerchantStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\MerchantStorage\Communication\MerchantStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\MerchantStorage\MerchantStorageConfig getConfig()
 */
class MerchantEventResourceBulkRepositoryPlugin extends AbstractPlugin implements EventResourceBulkRepositoryPluginInterface
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
        return MerchantStorageConfig::MERCHANTS_LIST_RESOURCE_NAME;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param int $offset
     * @param int $limit
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer[]|\Spryker\Shared\Kernel\Transfer\AbstractTransfer[]
     */
    public function getData(int $offset, int $limit): array
    {
        $stores = $this->getFactory()->getStoreFacade()->getAllStores();

        $eventEntityTransfers = [];
        foreach ($stores as $store) {
            $eventEntityTransfers[] = (new EventEntityTransfer())->setAdditionalValues([
                SpyMerchantTableMap::COL_FK_STORE => $store->getIdStore(),
            ]);
        }

        return $eventEntityTransfers;
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
        return MerchantEvents::MERCHANT_PUBLISH;
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
        return null;
    }
}
