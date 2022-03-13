<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickupQueue\Business;

use Pyz\Zed\PickupQueue\Business\Model\Reader;
use Pyz\Zed\PickupQueue\Business\Model\ReaderInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\PickupQueue\Persistence\PickupQueueQueryContainerInterface getQueryContainer()
 */
class PickupQueueBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\PickupQueue\Business\Model\ReaderInterface
     */
    public function createReader(): ReaderInterface
    {
        return new Reader(
            $this->getQueryContainer()
        );
    }
}
