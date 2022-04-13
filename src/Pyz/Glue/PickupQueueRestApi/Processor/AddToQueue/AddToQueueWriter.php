<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Processor\AddToQueue;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\RestAddToQueueAttributesTransfer;
use Pyz\Glue\PickupQueueRestApi\Dependency\Client\PickupQueueRestApiToPickupQueueClientInterface;
use Pyz\Glue\PickupQueueRestApi\PickupQueueRestApiConfig;
use Pyz\Glue\PickupQueueRestApi\Processor\Mapper\AddToQueueResourceMapperInterface;
use Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\AddToQueueRestResponseBuilderInterface;
use Pyz\Glue\PickupQueueRestApi\Processor\Validation\RestApiErrorInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;
use Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface;

class AddToQueueWriter implements AddToQueueWriterInterface
{
    /**
     * @var \Pyz\Glue\PickupQueueRestApi\Dependency\Client\PickupQueueRestApiToPickupQueueClientInterface
     */
    protected $pickupQueueClient;

    /**
     * @var \Pyz\Glue\PickupQueueRestApi\Processor\Mapper\AddToQueueResourceMapperInterface
     */
    protected $addToQueueResourceMapper;

    /**
     * @var \Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\AddToQueueRestResponseBuilderInterface
     */
    protected $addToQueueRestResponseBuilder;

    /**
     * @var \Pyz\Glue\PickupQueueRestApi\Processor\Validation\RestApiErrorInterface
     */
    protected $restApiError;

    /**
     * @param \Pyz\Glue\PickupQueueRestApi\Dependency\Client\PickupQueueRestApiToPickupQueueClientInterface $pickupQueueClient
     * @param \Pyz\Glue\PickupQueueRestApi\Processor\Mapper\AddToQueueResourceMapperInterface $addToQueueResourceMapper
     * @param \Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\AddToQueueRestResponseBuilderInterface $addToQueueRestResponseBuilder
     * @param \Pyz\Glue\PickupQueueRestApi\Processor\Validation\RestApiErrorInterface $restApiError
     */
    public function __construct(
        PickupQueueRestApiToPickupQueueClientInterface $pickupQueueClient,
        AddToQueueResourceMapperInterface $addToQueueResourceMapper,
        AddToQueueRestResponseBuilderInterface $addToQueueRestResponseBuilder,
        RestApiErrorInterface $restApiError
    ) {
        $this->pickupQueueClient = $pickupQueueClient;
        $this->addToQueueResourceMapper = $addToQueueResourceMapper;
        $this->addToQueueRestResponseBuilder = $addToQueueRestResponseBuilder;
        $this->restApiError = $restApiError;
    }

    /**
     * @param \Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface $restRequest
     * @param \Generated\Shared\Transfer\RestAddToQueueAttributesTransfer $restAddToQueueAttributesTransfer
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function postOrderInQueue(RestRequestInterface $restRequest, RestAddToQueueAttributesTransfer $restAddToQueueAttributesTransfer): RestResponseInterface
    {
        $restResponse = $this->addToQueueRestResponseBuilder->createRestResponse();

        $parentResource = $restRequest->findParentResourceByType(PickupQueueRestApiConfig::RESOURCE_PICKUP_QUEUE);

        if (!$parentResource) {
             return $this->restApiError->addOrderInvoicedError($restResponse);
        }

        $storeReference = $parentResource->getId();

        if (!$storeReference) {
            return $this->restApiError->addUnspecifiedError($restResponse);
        }

        $attributes = $restRequest->getAttributesDataFromRequest();

        $addToQueueTransfer = $this->addToQueueResourceMapper->mapArrayAddToQueueDataToAddToQueueTransfer($attributes);

        $pickupData = $this->pickupQueueClient->addOrderToQueue($addToQueueTransfer);

        return $this->getResponseDataFromTransfer($pickupData, $restResponse);
    }

    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     * @param \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface $restResponse
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    protected function getResponseDataFromTransfer(AddToQueueTransfer $addToQueueTransfer, RestResponseInterface $restResponse): RestResponseInterface
    {
        $restResponse->addResource($this->getAddOrderToQueueResource($addToQueueTransfer));

        return $restResponse;
    }

    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface
     */
    protected function getAddOrderToQueueResource(AddToQueueTransfer $addToQueueTransfer): RestResourceInterface
    {
        $restAddToQueueResponse = $this->addToQueueResourceMapper
            ->mapAddToQueueTransferToRestAddToQueueResponseTransfer($addToQueueTransfer);

        return $this->addToQueueRestResponseBuilder->createAddToQueueRestResource(
            $addToQueueTransfer,
            $restAddToQueueResponse
        );
    }
}
