<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Plugin\GlueApplication;

use Generated\Shared\Transfer\GetOrdersQueueTransfer;
use Pyz\Glue\PickupQueueRestApi\PickupQueueRestApiConfig;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRouteCollectionInterface;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceWithParentPluginInterface;
use Spryker\Glue\Kernel\AbstractPlugin;

class GetOrdersQueueResourceRoutePlugin extends AbstractPlugin implements ResourceRoutePluginInterface, ResourceWithParentPluginInterface
{
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRouteCollectionInterface $resourceRouteCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRouteCollectionInterface
     */
    public function configure(ResourceRouteCollectionInterface $resourceRouteCollection): ResourceRouteCollectionInterface
    {
        $resourceRouteCollection
            ->addGet('get', true);

        return $resourceRouteCollection;
    }

    /**
     * @return string
     */
    public function getResourceType(): string
    {
        return PickupQueueRestApiConfig::RESOURCE_GET_ORDERS_QUEUE;
    }

    /**
     * @return string
     */
    public function getController(): string
    {
        return 'get-orders-queue-resource';
    }

    /**
     * @return string
     */
    public function getResourceAttributesClassName(): string
    {
        return GetOrdersQueueTransfer::class;
    }

    /**
     * @return string
     */
    public function getParentResourceType(): string
    {
        return PickupQueueRestApiConfig::RESOURCE_PICKUP_QUEUE;
    }
}
