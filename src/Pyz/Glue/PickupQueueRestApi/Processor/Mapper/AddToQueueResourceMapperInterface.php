<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Processor\Mapper;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\RestAddToQueueAttributesTransfer;
use Generated\Shared\Transfer\RestAddToQueueResponseTransfer;

interface AddToQueueResourceMapperInterface
{
    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return \Generated\Shared\Transfer\RestAddToQueueAttributesTransfer
     */
    public function mapAddToQueueDataToRestAddToQueueAttributesTransfer(AddToQueueTransfer $addToQueueTransfer): RestAddToQueueAttributesTransfer;

    /**
     * @param \Generated\Shared\Transfer\RestAddToQueueAttributesTransfer $restAddToQueueAttributesTransfer
     *
     * @return \Generated\Shared\Transfer\AddToQueueTransfer
     */
    public function mapRestAddToQueueAttributesTransferToAddToQueueData(RestAddToQueueAttributesTransfer $restAddToQueueAttributesTransfer): AddToQueueTransfer;

    /**
     * @param array $addToQueueData
     *
     * @return \Generated\Shared\Transfer\RestAddToQueueAttributesTransfer
     */
    public function mapArrayAddToQueueDataToRestAddToQueueAttributesTransfer(array $addToQueueData): RestAddToQueueAttributesTransfer;

    /**
     * @param array $addToQueueData
     *
     * @return \Generated\Shared\Transfer\AddToQueueTransfer
     */
    public function mapArrayAddToQueueDataToAddToQueueTransfer(array $addToQueueData): AddToQueueTransfer;

    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return \Generated\Shared\Transfer\RestAddToQueueResponseTransfer
     */
    public function mapAddToQueueTransferToRestAddToQueueResponseTransfer(AddToQueueTransfer $addToQueueTransfer): RestAddToQueueResponseTransfer;
}
