<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Processor\GetOrdersQueue;

use Generated\Shared\Transfer\GetOrdersQueueTransfer;
use Pyz\Glue\PickupQueueRestApi\Dependency\Client\PickupQueueRestApiToPickupQueueClientInterface;
use Pyz\Glue\PickupQueueRestApi\PickupQueueRestApiConfig;
use Pyz\Glue\PickupQueueRestApi\Processor\Mapper\GetOrdersQueueResourceMapperInterface;
use Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\GetOrdersQueueRestResponseBuilder;
use Pyz\Glue\PickupQueueRestApi\Processor\Validation\RestApiErrorInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;
use Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface;

class GetOrdersQueueReader implements GetOrdersQueueReaderInterface
{
    /**
     * @var \Pyz\Glue\PickupQueueRestApi\Dependency\Client\PickupQueueRestApiToPickupQueueClientInterface
     */
    protected $pickupQueueClient;

    /**
     * @var \Pyz\Glue\PickupQueueRestApi\Processor\Mapper\GetOrdersQueueResourceMapperInterface
     */
    protected $getOrdersQueueResourceMapper;

    /**
     * @var \Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\GetOrdersQueueRestResponseBuilder
     */
    protected $getOrdersQueueRestResponseBuilder;

    /**
     * @var \Pyz\Glue\PickupQueueRestApi\Processor\Validation\RestApiErrorInterface
     */
    protected $restApiError;

    /**
     * @param \Pyz\Glue\PickupQueueRestApi\Dependency\Client\PickupQueueRestApiToPickupQueueClientInterface $pickupQueueClient
     * @param \Pyz\Glue\PickupQueueRestApi\Processor\Mapper\GetOrdersQueueResourceMapperInterface $getOrdersQueueResourceMapper
     * @param \Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\GetOrdersQueueRestResponseBuilder $getOrdersQueueRestResponseBuilder
     * @param \Pyz\Glue\PickupQueueRestApi\Processor\Validation\RestApiErrorInterface $restApiError
     */
    public function __construct(
        PickupQueueRestApiToPickupQueueClientInterface $pickupQueueClient,
        GetOrdersQueueResourceMapperInterface $getOrdersQueueResourceMapper,
        GetOrdersQueueRestResponseBuilder $getOrdersQueueRestResponseBuilder,
        RestApiErrorInterface $restApiError
    ) {
        $this->pickupQueueClient = $pickupQueueClient;
        $this->getOrdersQueueResourceMapper = $getOrdersQueueResourceMapper;
        $this->getOrdersQueueRestResponseBuilder = $getOrdersQueueRestResponseBuilder;
        $this->restApiError = $restApiError;
    }

    /**
     * @param \Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface $restRequest
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function getOrdersQueued(RestRequestInterface $restRequest): RestResponseInterface
    {
        $response = $this->getOrdersQueueRestResponseBuilder->createRestResponse();

        $parentResource = $restRequest->findParentResourceByType(PickupQueueRestApiConfig::RESOURCE_PICKUP_QUEUE);

        if (!$parentResource) {
            return $this->restApiError->addOrderExceededTimeSlotError($response);
        }

        $storeReference = $parentResource->getId();

        if (!$storeReference) {
            return $this->restApiError->addUnspecifiedError($response);
        }

        $getOrdersQueueTransfer = $this->getOrdersQueueResourceMapper->mapGetOrdersQueueStoreReferenceToGetOrdersQueueTransfer((int)$storeReference);

        $pickupData = $this->pickupQueueClient->getOrdersQueue($getOrdersQueueTransfer);

        return $this->getResponseDataFromTransfer($pickupData, $response);
    }

    /**
     * @param \Generated\Shared\Transfer\GetOrdersQueueTransfer $getOrdersQueueTransfer
     * @param \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface $restResponse
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    protected function getResponseDataFromTransfer(GetOrdersQueueTransfer $getOrdersQueueTransfer, RestResponseInterface $restResponse): RestResponseInterface
    {
        $restResponse->addResource($this->getGetOrdersQueueResource($getOrdersQueueTransfer));

        return $restResponse;
    }

    /**
     * @param \Generated\Shared\Transfer\GetOrdersQueueTransfer $getOrdersQueueTransfer
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface
     */
    protected function getGetOrdersQueueResource(GetOrdersQueueTransfer $getOrdersQueueTransfer): RestResourceInterface
    {
        return $this->getOrdersQueueRestResponseBuilder->createGetOrdersQueueRestResource($getOrdersQueueTransfer);
    }
}
