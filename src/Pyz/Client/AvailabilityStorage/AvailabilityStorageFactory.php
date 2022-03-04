<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\AvailabilityStorage;

use Pyz\Client\AvailabilityStorage\Expander\ProductViewAvailabilityExpander;
use Spryker\Client\AvailabilityStorage\AvailabilityStorageFactory as SprykerAvailabilityStorageFactory;
use Spryker\Client\AvailabilityStorage\Expander\ProductViewAvailabilityExpanderInterface;

class AvailabilityStorageFactory extends SprykerAvailabilityStorageFactory
{
    /**
     * @return \Spryker\Client\AvailabilityStorage\Expander\ProductViewAvailabilityExpanderInterface
     */
    public function createProductViewAvailabilityExpander(): ProductViewAvailabilityExpanderInterface
    {
        return new ProductViewAvailabilityExpander(
            $this->createAvailabilityStorageReader(),
            $this->getAvailabilityStorageStrategyPlugins()
        );
    }
}
