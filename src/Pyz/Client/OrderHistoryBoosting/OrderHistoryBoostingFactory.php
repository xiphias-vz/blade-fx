<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderHistoryBoosting;

use Pyz\Client\Customer\CustomerClientInterface;
use Spryker\Client\Kernel\AbstractFactory;

class OrderHistoryBoostingFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Client\Customer\CustomerClientInterface
     */
    public function getCustomerClient(): CustomerClientInterface
    {
        return $this->getProvidedDependency(OrderHistoryBoostingDependencyProvider::CLIENT_CUSTOMER);
    }

    /**
     * @return string
     */
    public function getCodeBucket(): string
    {
        return getenv('SPRYKER_CODE_BUCKET');
    }
}
