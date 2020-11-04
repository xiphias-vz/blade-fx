<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\EventBehavior\Business\Model;

use Spryker\Zed\EventBehavior\Business\Model\EventResourceRepositoryManager as SprykerEventResourceRepositoryManager;
use Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourceBulkRepositoryPluginInterface;
use Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface;

class EventResourceRepositoryManager extends SprykerEventResourceRepositoryManager
{
    /**
     * @param \Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourceBulkRepositoryPluginInterface $plugin
     *
     * @return void
     */
    protected function processEventsForRepositoryBulkPlugins(EventResourceBulkRepositoryPluginInterface $plugin): void
    {
        foreach ($this->createEventResourceRepositoryBulkPluginIterator($plugin) as $eventEntities) {
            if ($plugin->getIdColumnName() === null) {
                $this->triggerBulkByEntityTransfer($plugin, $eventEntities);

                return;
            }
            $eventEntitiesIds = $this->getEventEntitiesIds($plugin, $eventEntities);
            $this->triggerBulk($plugin, $eventEntitiesIds);
        }
    }

    /**
     * @param \Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface $plugin
     * @param \Spryker\Shared\Kernel\Transfer\TransferInterface[] $transfers
     *
     * @return void
     */
    protected function triggerBulkByEntityTransfer(EventResourcePluginInterface $plugin, array $transfers): void
    {
        $this->eventFacade->triggerBulk($plugin->getEventName(), $transfers);
    }
}
