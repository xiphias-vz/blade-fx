<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Communication\Plugin\Event;

use Generated\Shared\Transfer\EventEntityTransfer;
use Pyz\Shared\RecommendationsStorage\RecommendationsStorageConfig;
use Pyz\Zed\Recommendations\Dependency\RecommendationsEvents;
use Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourceBulkRepositoryPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\RecommendationsStorage\Communication\RecommendationsStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageRepositoryInterface getRepository()
 * @method \Pyz\Zed\RecommendationsStorage\Business\RecommendationsStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig getConfig()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageQueryContainerInterface getQueryContainer()
 */
class RecommendationsEventResourceBulkRepositoryPlugin extends AbstractPlugin implements EventResourceBulkRepositoryPluginInterface
{
    /**
     * @param int $offset
     * @param int $limit
     *
     * @return \Spryker\Shared\Kernel\Transfer\AbstractTransfer[]
     */
    public function getData(int $offset, int $limit): array
    {
        $stores = $this->getFactory()
            ->getStoreFacade()
            ->getAllStores();

        $eventEntityTransfers = [];
        foreach ($stores as $store) {
            $eventEntityTransfers[] = (new EventEntityTransfer())->setAdditionalValues([
                'storeId' => $store->getIdStore(),
                'store' => $store->getName(),
            ]);
        }

        return $eventEntityTransfers;
    }

    /**
     * @return string
     */
    public function getResourceName(): string
    {
        return RecommendationsStorageConfig::RECOMMENDATIONS_RESOURCE_NAME;
    }

    /**
     * @return string
     */
    public function getEventName(): string
    {
        return RecommendationsEvents::RECOMMENDATIONS_PUBLISH;
    }

    /**
     * @return string|null
     */
    public function getIdColumnName(): ?string
    {
        return null;
    }
}
