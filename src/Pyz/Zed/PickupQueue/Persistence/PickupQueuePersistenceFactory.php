<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickupQueue\Persistence;

use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\PickupQueue\Persistence\PickupQueueQueryContainerInterface getQueryContainer()
 */
class PickupQueuePersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Pyz\Zed\PickupQueue\Persistence\PickupQueueQueryContainerInterface
     */
    public function createPickupQueueQueryContainer(): PickupQueueQueryContainerInterface
    {
        return new PickupQueueQueryContainer();
    }
}
