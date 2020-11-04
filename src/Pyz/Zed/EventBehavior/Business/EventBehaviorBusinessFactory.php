<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\EventBehavior\Business;

use Pyz\Zed\EventBehavior\Business\Model\EventResourceRepositoryManager;
use Spryker\Zed\EventBehavior\Business\EventBehaviorBusinessFactory as SprykerEventBehaviorBusinessFactory;
use Spryker\Zed\EventBehavior\Business\Model\EventResourceRepositoryManager as SprykerEventResourceRepositoryManager;

class EventBehaviorBusinessFactory extends SprykerEventBehaviorBusinessFactory
{
    /**
     * @return \Spryker\Zed\EventBehavior\Business\Model\EventResourceRepositoryManager
     */
    public function createEventResourceRepositoryManager(): SprykerEventResourceRepositoryManager
    {
        return new EventResourceRepositoryManager(
            $this->getEventFacade(),
            $this->getConfig()->getChunkSize()
        );
    }
}
