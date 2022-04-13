<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Communication\Plugin\Publisher\Recommendations;

use Pyz\Zed\Recommendations\Dependency\RecommendationsEvents;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface;

/**
 * @method \Pyz\Zed\RecommendationsStorage\Business\RecommendationsStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\RecommendationsStorage\Communication\RecommendationsStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig getConfig()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageQueryContainerInterface getQueryContainer()
 */
class RecommendationsStoragePublisherPlugin extends AbstractPlugin implements PublisherPluginInterface
{
    /**
     * @param array $eventEntityTransfers
     * @param $eventName
     *
     * @return void
     */
    public function handleBulk(array $eventEntityTransfers, $eventName)
    {
        $this->getFacade()->publish($eventEntityTransfers);
    }

    /**
     * @return string[]
     */
    public function getSubscribedEvents(): array
    {
        return [
            RecommendationsEvents::RECOMMENDATIONS_PUBLISH,
            RecommendationsEvents::ENTITY_PYZ_RECOMMENDATION_DEFINITION_UPDATE,
        ];
    }
}
