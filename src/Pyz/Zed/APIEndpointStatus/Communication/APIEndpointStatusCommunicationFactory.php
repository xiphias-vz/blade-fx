<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\APIEndpointStatus\Communication;

use Pyz\Zed\APIEndpointStatus\Communication\Plugin\APIEndpointStatusPlugin;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Pyz\Zed\APIEndpointStatus\Persistence\APIEndpointStatusRepositoryInterface getRepository()
 */
class APIEndpointStatusCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Pyz\Zed\APIEndpointStatus\Communication\Plugin\APIEndpointStatusPlugin
     */
    public function createAPIEndpointStatusPlugin(): APIEndpointStatusPlugin
    {
        return new APIEndpointStatusPlugin();
    }
}
