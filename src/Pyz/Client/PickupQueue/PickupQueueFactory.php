<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\PickupQueue;

use Pyz\Client\PickupQueue\Zed\PickupQueueStub;
use Pyz\Client\PickupQueue\Zed\PickupQueueStubInterface;
use Spryker\Client\Kernel\AbstractFactory;

class PickupQueueFactory extends AbstractFactory
{
    /**
     * @return mixed
     */
    public function getZedRequestClient()
    {
        return $this->getProvidedDependency(PickupQueueDependencyProvider::CLIENT_ZED_REQUEST);
    }

    /**
     * @return \Pyz\Client\PickupQueue\Zed\PickupQueueStubInterface
     */
    public function createZedStub(): PickupQueueStubInterface
    {
        return new PickupQueueStub(
            $this->getZedRequestClient()
        );
    }
}
