<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Communication\Plugin\Event\Listener;

use Pyz\Zed\RecommendationsStorage\Business\RecommendationsStorageFacadeInterface;
use Pyz\Zed\RecommendationsStorage\Communication\RecommendationsStorageCommunicationFactory;
use Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig;
use Spryker\Zed\Event\Dependency\Plugin\EventBulkHandlerInterface;
use Spryker\Zed\Kernel\Business\AbstractFacade;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method RecommendationsStorageCommunicationFactory getFactory()
 * @method RecommendationsStorageFacadeInterface getFacade()
 * @method RecommendationsStorageConfig getConfig()
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
