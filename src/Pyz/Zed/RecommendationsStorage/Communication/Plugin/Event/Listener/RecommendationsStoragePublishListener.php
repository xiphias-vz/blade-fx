<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Communication\Plugin\Event\Listener;

use Spryker\Zed\Event\Dependency\Plugin\EventBulkHandlerInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\RecommendationsStorage\Communication\RecommendationsStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\RecommendationsStorage\Business\RecommendationsStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig getConfig()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageQueryContainerInterface getQueryContainer()
 */
class RecommendationsStoragePublishListener extends AbstractPlugin implements EventBulkHandlerInterface
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
}
