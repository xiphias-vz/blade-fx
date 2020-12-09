<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Persistence\Propel\Mapper;

use ArrayObject;
use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\SpyMerchantEntityTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchant;
use Propel\Runtime\Collection\ObjectCollection;
use Spryker\Zed\Merchant\Persistence\Propel\Mapper\MerchantMapperInterface as SprykerMerchantMapperInterface;

interface MerchantMapperInterface extends SprykerMerchantMapperInterface
{
    /**
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     * @param \Orm\Zed\Merchant\Persistence\SpyMerchant $spyMerchant
     *
     * @return \Orm\Zed\Merchant\Persistence\SpyMerchant
     */
    public function mapMerchantTransferToMerchantEntity(
        MerchantTransfer $merchantTransfer,
        SpyMerchant $spyMerchant
    ): SpyMerchant;

    /**
     * @param \Generated\Shared\Transfer\SpyMerchantEntityTransfer $merchantEntityTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function mapMerchantEntityTransferToMerchantTransfer(SpyMerchantEntityTransfer $merchantEntityTransfer): MerchantTransfer;

    /**
     * @param \Orm\Zed\Merchant\Persistence\SpyMerchant $spyMerchant
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function mapMerchantEntityToMerchantTransfer(
        SpyMerchant $spyMerchant,
        MerchantTransfer $merchantTransfer
    ): MerchantTransfer;

    /**
     * @param \Generated\Shared\Transfer\SpyMerchantEntityTransfer[] $collection
     * @param \Generated\Shared\Transfer\MerchantCollectionTransfer $merchantCollectionTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer
     */
    public function mapMerchantCollectionToMerchantCollectionTransfer(
        $collection,
        MerchantCollectionTransfer $merchantCollectionTransfer
    ): MerchantCollectionTransfer;

    /**
     * @param \Propel\Runtime\Collection\ObjectCollection $timeSlots
     *
     * @return \ArrayObject
     */
    public function mapTimeslotEntitiesToWeekDaysTimeSlotsTransfer(ObjectCollection $timeSlots): ArrayObject;
}
