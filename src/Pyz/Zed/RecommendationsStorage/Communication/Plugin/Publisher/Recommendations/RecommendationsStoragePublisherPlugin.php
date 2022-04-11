<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Spryker Marketplace License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\RecommendationsStorage\Communication\Plugin\Publisher\Recommendations;

use Pyz\Zed\Recommendations\Dependency\RecommendationsEvents;
use Pyz\Zed\RecommendationsStorage\Business\RecommendationsStorageFacadeInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface;

/**
 * @method RecommendationsStorageFacadeInterface getFacade()
 */
class RecommendationsStoragePublisherPlugin extends AbstractPlugin implements PublisherPluginInterface
{
    /**
     * @param array $eventEntityTransfers
     * @param $eventName
     * @return void
     */
    public function handleBulk(array $eventEntityTransfers, $eventName)
    {
        $this->getFacade()->publish($eventEntityTransfers);
    }

    /**
     * @return array|string[]
     */
    public function getSubscribedEvents(): array
    {
        return [
            RecommendationsEvents::RECOMMENDATIONS_PUBLISH,
            RecommendationsEvents::ENTITY_PYZ_RECOMMENDATION_DEFINITION_UPDATE
        ];
    }
}
