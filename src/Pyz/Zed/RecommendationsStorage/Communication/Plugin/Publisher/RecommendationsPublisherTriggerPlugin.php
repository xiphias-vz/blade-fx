<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Communication\Plugin\Publisher;

use Generated\Shared\Transfer\EventEntityTransfer;
use Orm\Zed\Recommendations\Persistence\Map\PyzRecommendationDefinitionTableMap;
use Pyz\Shared\RecommendationsStorage\RecommendationsStorageConfig;
use Pyz\Zed\Recommendations\Dependency\RecommendationsEvents;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface;

/**
 * @method \Pyz\Zed\RecommendationsStorage\Communication\RecommendationsStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\RecommendationsStorage\Business\RecommendationsStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig getConfig()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageQueryContainerInterface getQueryContainer()
 */
class RecommendationsPublisherTriggerPlugin extends AbstractPlugin implements PublisherTriggerPluginInterface
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
        return PyzRecommendationDefinitionTableMap::COL_ID_RECOMMENDATION_DEFINITION;
    }
}
