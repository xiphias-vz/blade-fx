<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Spryker Marketplace License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\RecommendationsStorage\Communication\Plugin\Publisher;

use Generated\Shared\Transfer\EventEntityTransfer;
use Orm\Zed\Recommendations\Persistence\Map\PyzRecommendationDefinitionTableMap;
use Pyz\Shared\RecommendationsStorage\RecommendationsStorageConfig;
use Pyz\Zed\Recommendations\Dependency\RecommendationsEvents;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface;

class RecommendationsPublisherTriggerPlugin extends AbstractPlugin implements PublisherTriggerPluginInterface
{
    /**
     * @param int $offset
     * @param int $limit
     * @return array|\Spryker\Shared\Kernel\Transfer\AbstractTransfer[]
     */
    public function getData(int $offset, int $limit): array
    {
        $stores = $this->getFactory()
            ->getStoreFacade()
            ->getAllStores();

        $eventEntityTransfers = [];
        foreach($stores as $store) {
            $eventEntityTransfers[] = (new EventEntityTransfer())->setAdditionalValues([
                'storeId' => $store->getIdStore(),
                'store' => $store->getName(),
            ]);
        }

        return $eventEntityTransfers;
    }

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
