<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\AvailabilityCartConnector\Business;

use Pyz\Zed\AvailabilityCartConnector\Business\Cart\CheckCartAvailability;
use Spryker\Zed\AvailabilityCartConnector\Business\AvailabilityCartConnectorBusinessFactory as SpyAvailabilityCartConnectorBusinessFactory;

class AvailabilityCartConnectorBusinessFactory extends SpyAvailabilityCartConnectorBusinessFactory
{
    /**
     * @return \Spryker\Zed\AvailabilityCartConnector\Business\Cart\CheckCartAvailabilityInterface
     */
    public function createCartCheckAvailability()
    {
        return new CheckCartAvailability($this->getAvailabilityFacade());
    }
}
