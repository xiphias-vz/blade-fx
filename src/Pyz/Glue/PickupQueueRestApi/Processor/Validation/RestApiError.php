<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Processor\Validation;

use Generated\Shared\Transfer\RestErrorMessageTransfer;
use Pyz\Glue\PickupQueueRestApi\PickupQueueRestApiConfig;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;
use Symfony\Component\HttpFoundation\Response;

class RestApiError implements RestApiErrorInterface
{
    /**
     * @param \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface $restResponse
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function addOrderDidNotMeetCriteriaError(RestResponseInterface $restResponse): RestResponseInterface
    {
        $restErrorTransfer = (new RestErrorMessageTransfer())
            ->setCode(PickupQueueRestApiConfig::RESPONSE_CODE_ORDER_MET_NO_CRITERIA)
            ->setStatus(Response::HTTP_FOUND)
            ->setDetail(PickupQueueRestApiConfig::RESPONSE_DETAIL_ORDER_MET_NO_CRITERIA);

        return $restResponse->addError($restErrorTransfer);
    }

    /**
     * @param \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface $restResponse
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function addOrderInvoicedError(RestResponseInterface $restResponse): RestResponseInterface
    {
        $restErrorTransfer = (new RestErrorMessageTransfer())
            ->setCode(PickupQueueRestApiConfig::RESPONSE_CODE_ORDER_INVOICED)
            ->setStatus(Response::HTTP_FOUND)
            ->setDetail(PickupQueueRestApiConfig::RESPONSE_DETAIL_ORDER_INVOICED);

        return $restResponse->addError($restErrorTransfer);
    }

    /**
     * @param \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface $restResponse
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function addOrderExceededTimeSlotError(RestResponseInterface $restResponse): RestResponseInterface
    {
        $restErrorTransfer = (new RestErrorMessageTransfer())
            ->setCode(PickupQueueRestApiConfig::RESPONSE_CODE_ORDER_EXCEEDED_TIME_SLOT_WITH_NO_READY_FOR_COLLECTION)
            ->setStatus(Response::HTTP_FOUND)
            ->setDetail(PickupQueueRestApiConfig::RESPONSE_DETAIL_ORDER_EXCEEDED_TIME_SLOT_WITH_NO_READY_FOR_COLLECTION);

        return $restResponse->addError($restErrorTransfer);
    }

    /**
     * @param \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface $restResponse
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function addOrderHasTimeSlotInFutureError(RestResponseInterface $restResponse): RestResponseInterface
    {
        $restErrorTransfer = (new RestErrorMessageTransfer())
            ->setCode(PickupQueueRestApiConfig::RESPONSE_CODE_ORDER_HAS_TIME_SLOT_IN_FUTURE_WITH_NO_READY_FOR_COLLECTION)
            ->setStatus(Response::HTTP_FOUND)
            ->setDetail(PickupQueueRestApiConfig::RESPONSE_DETAIL_ORDER_HAS_TIME_SLOT_IN_FUTURE_WITH_NO_READY_FOR_COLLECTION);

        return $restResponse->addError($restErrorTransfer);
    }

    /**
     * @param \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface $restResponse
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function addOrderOrderedFromAnotherStoreError(RestResponseInterface $restResponse): RestResponseInterface
    {
        $restErrorTransfer = (new RestErrorMessageTransfer())
            ->setCode(PickupQueueRestApiConfig::RESPONSE_CODE_ORDER_WAS_NOT_ORDERED_FROM_CURRENT_STORE)
            ->setStatus(Response::HTTP_FOUND)
            ->setDetail(PickupQueueRestApiConfig::RESPONSE_DETAIL_ORDER_WAS_NOT_ORDERED_FROM_CURRENT_STORE);

        return $restResponse->addError($restErrorTransfer);
    }

    /**
     * @param \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface $restResponse
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function addUnspecifiedError(RestResponseInterface $restResponse): RestResponseInterface
    {
        $restErrorTransfer = (new RestErrorMessageTransfer())
            ->setCode(PickupQueueRestApiConfig::RESPONSE_CODE_UNSPECIFIED_ERROR)
            ->setStatus(Response::HTTP_FOUND)
            ->setDetail(PickupQueueRestApiConfig::RESPONSE_DETAIL_UNSPECIFIED_ERROR);

        return $restResponse->addError($restErrorTransfer);
    }
}
