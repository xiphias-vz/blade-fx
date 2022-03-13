<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder;

use Generated\Shared\Transfer\GetOrdersQueueTransfer;
use Pyz\Glue\PickupQueueRestApi\PickupQueueRestApiConfig;
use Pyz\Glue\PickupQueueRestApi\Processor\Mapper\GetOrdersQueueResourceMapperInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceBuilderInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;

class GetOrdersQueueRestResponseBuilder implements GetOrdersQueueRestResponseBuilderInterface
{
    /**
     * @var \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceBuilderInterface
     */
    protected $restResourceBuilder;

    /**
     * @var \Pyz\Glue\PickupQueueRestApi\Processor\Mapper\GetOrdersQueueResourceMapperInterface
     */
    protected $getOrdersQueueMapper;

    /**
     * @param \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceBuilderInterface $restResourceBuilder
     * @param \Pyz\Glue\PickupQueueRestApi\Processor\Mapper\GetOrdersQueueResourceMapperInterface $getOrdersQueueResourceMapper
     */
    public function __construct(
        RestResourceBuilderInterface $restResourceBuilder,
        GetOrdersQueueResourceMapperInterface $getOrdersQueueResourceMapper
    ) {
        $this->restResourceBuilder = $restResourceBuilder;
        $this->getOrdersQueueMapper = $getOrdersQueueResourceMapper;
    }

    /**
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function createRestResponse(): RestResponseInterface
    {
        return $this->restResourceBuilder->createRestResponse();
    }

    /**
     * @param \Generated\Shared\Transfer\GetOrdersQueueTransfer $getOrdersQueueTransfer
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface
     */
    public function createGetOrdersQueueRestResource(GetOrdersQueueTransfer $getOrdersQueueTransfer): RestResourceInterface
    {
        return $this->restResourceBuilder
            ->createRestResource(
                PickupQueueRestApiConfig::RESOURCE_GET_ORDERS_QUEUE,
                $getOrdersQueueTransfer->getMerchantFilialNumber(),
                $getOrdersQueueTransfer
            );
    }
}
