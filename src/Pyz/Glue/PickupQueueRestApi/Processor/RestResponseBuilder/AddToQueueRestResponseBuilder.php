<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\RestAddToQueueResponseTransfer;
use Pyz\Glue\PickupQueueRestApi\PickupQueueRestApiConfig;
use Pyz\Glue\PickupQueueRestApi\Processor\Mapper\AddToQueueResourceMapperInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceBuilderInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;

class AddToQueueRestResponseBuilder implements AddToQueueRestResponseBuilderInterface
{
    /**
     * @var \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceBuilderInterface
     */
    protected $restResourceBuilder;

    /**
     * @var \Pyz\Glue\PickupQueueRestApi\Processor\Mapper\AddToQueueResourceMapperInterface
     */
    protected $addToQueueMapper;

    /**
     * @param \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceBuilderInterface $restResourceBuilder
     * @param \Pyz\Glue\PickupQueueRestApi\Processor\Mapper\AddToQueueResourceMapperInterface $addToQueueResourceMapper
     */
    public function __construct(
        RestResourceBuilderInterface $restResourceBuilder,
        AddToQueueResourceMapperInterface $addToQueueResourceMapper
    ) {
        $this->restResourceBuilder = $restResourceBuilder;
        $this->addToQueueMapper = $addToQueueResourceMapper;
    }

    /**
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function createRestResponse(): RestResponseInterface
    {
        return $this->restResourceBuilder->createRestResponse();
    }

    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     * @param \Generated\Shared\Transfer\RestAddToQueueResponseTransfer $restAddToQueueResponseTransfer
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface
     */
    public function createAddToQueueRestResource(AddToQueueTransfer $addToQueueTransfer, RestAddToQueueResponseTransfer $restAddToQueueResponseTransfer): RestResourceInterface
    {
        return $this->restResourceBuilder
            ->createRestResource(
                PickupQueueRestApiConfig::RESOURCE_ADD_TO_QUEUE,
                $addToQueueTransfer->getOrderReference(),
                $restAddToQueueResponseTransfer
            );
    }
}
