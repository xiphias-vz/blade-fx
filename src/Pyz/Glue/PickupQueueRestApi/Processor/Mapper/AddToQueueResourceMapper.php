<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi\Processor\Mapper;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\RestAddToQueueAttributesTransfer;
use Generated\Shared\Transfer\RestAddToQueueResponseTransfer;

class AddToQueueResourceMapper implements AddToQueueResourceMapperInterface
{
    /**
     * @param array $addToQueueData
     *
     * @return \Generated\Shared\Transfer\RestAddToQueueAttributesTransfer
     */
    public function mapArrayAddToQueueDataToRestAddToQueueAttributesTransfer(array $addToQueueData): RestAddToQueueAttributesTransfer
    {
        return (new RestAddToQueueAttributesTransfer())
            ->fromArray($addToQueueData, true);
    }

    /**
     * @param \Generated\Shared\Transfer\RestAddToQueueAttributesTransfer $restAddToQueueAttributesTransfer
     *
     * @return \Generated\Shared\Transfer\AddToQueueTransfer
     */
    public function mapRestAddToQueueAttributesTransferToAddToQueueData(RestAddToQueueAttributesTransfer $restAddToQueueAttributesTransfer): AddToQueueTransfer
    {
        return (new AddToQueueTransfer())
            ->fromArray($restAddToQueueAttributesTransfer->toArray(), true);
    }

    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return \Generated\Shared\Transfer\RestAddToQueueAttributesTransfer
     */
    public function mapAddToQueueDataToRestAddToQueueAttributesTransfer(AddToQueueTransfer $addToQueueTransfer): RestAddToQueueAttributesTransfer
    {
        return (new RestAddToQueueAttributesTransfer())
            ->fromArray($addToQueueTransfer->toArray(), true);
    }

    /**
     * @param array $addToQueueData
     *
     * @return \Generated\Shared\Transfer\AddToQueueTransfer
     */
    public function mapArrayAddToQueueDataToAddToQueueTransfer(array $addToQueueData): AddToQueueTransfer
    {
        return (new AddToQueueTransfer())
            ->fromArray($addToQueueData, true);
    }

    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return \Generated\Shared\Transfer\RestAddToQueueResponseTransfer
     */
    public function mapAddToQueueTransferToRestAddToQueueResponseTransfer(AddToQueueTransfer $addToQueueTransfer): RestAddToQueueResponseTransfer
    {
        return (new RestAddToQueueResponseTransfer())
            ->fromArray($addToQueueTransfer->getDbResponse()[0], true);
    }
}
