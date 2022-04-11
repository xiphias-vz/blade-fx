<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\TimeSlot\Expander;

use Generated\Shared\Transfer\MerchantTransfer;
use Pyz\Client\MerchantStorage\MerchantStorageClientInterface;

class MerchantStorageDataExpander implements MerchantStorageDataExpanderInterface
{
    /**
     * @var \Pyz\Client\MerchantStorage\MerchantStorageClientInterface
     */
    protected $storageClient;

    /**
     * @param \Pyz\Client\MerchantStorage\MerchantStorageClientInterface $storageClient
     */
    public function __construct(MerchantStorageClientInterface $storageClient)
    {
        $this->storageClient = $storageClient;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function expand(MerchantTransfer $merchantTransfer): MerchantTransfer
    {
        $merchantCollectionTransfer = $this->storageClient->getMerchantsList();
        foreach ($merchantCollectionTransfer->getMerchants() as $storageMerchantTransfer) {
            /** @var \Generated\Shared\Transfer\MerchantTransfer $storageMerchantTransfer */
            if ($storageMerchantTransfer->getMerchantReference() === $merchantTransfer->getMerchantReference()) {
                $merchantTransfer = $merchantTransfer
                    ->setDateTimeSlots($storageMerchantTransfer->getDateTimeSlots())
                    ->setDeliveryCapacityPerSlot($storageMerchantTransfer->getDeliveryCapacityPerSlot())
                    ->setTimeSlotsCutoffTime($storageMerchantTransfer->getTimeSlotsCutoffTime())
                    ->setWeekDaysTimeSlots($storageMerchantTransfer->getWeekDaysTimeSlots());

                break;
            }
        }

        return $merchantTransfer;
    }
}
