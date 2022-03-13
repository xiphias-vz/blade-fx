<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\RestAddToQueueResponseTransfer;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;

interface AddToQueueRestResponseBuilderInterface
{
    /**
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function createRestResponse(): RestResponseInterface;

    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     * @param \Generated\Shared\Transfer\RestAddToQueueResponseTransfer $restAddToQueueResponseTransfer
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface
     */
    public function createAddToQueueRestResource(
        AddToQueueTransfer $addToQueueTransfer,
        RestAddToQueueResponseTransfer $restAddToQueueResponseTransfer
    ): RestResourceInterface;
}
