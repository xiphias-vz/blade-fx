<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Controller;

use Generated\Shared\Transfer\RestAddToQueueAttributesTransfer;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;
use Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface;
use Spryker\Glue\Kernel\Controller\AbstractController;

/**
 * @method \Pyz\Glue\PickupQueueRestApi\PickupQueueRestApiFactory getFactory()
 */
class AddToQueueResourceController extends AbstractController
{
    /**
     * @param \Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface $restRequest
     * @param \Generated\Shared\Transfer\RestAddToQueueAttributesTransfer $restAddToQueueAttributesTransfer
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function postAction(RestRequestInterface $restRequest, RestAddToQueueAttributesTransfer $restAddToQueueAttributesTransfer): RestResponseInterface
    {
        return $this->getFactory()
            ->createAddToQueueWriter()
            ->postOrderInQueue($restRequest, $restAddToQueueAttributesTransfer);
    }
}
