<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantStorage\Business\Storage;

use Generated\Shared\Transfer\MerchantCriteriaFilterTransfer;
use Orm\Zed\Merchant\Persistence\Map\PyzMerchantDeliveryPostalCodeTableMap;
use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Pyz\Zed\MerchantStorage\Persistence\MerchantStorageEntityManagerInterface;
use Pyz\Zed\MerchantStorage\Persistence\MerchantStorageRepositoryInterface;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface;

class MerchantStorageWriter implements MerchantStorageWriterInterface
{
    /**
     * @var \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageRepositoryInterface
     */
    protected $merchantStorageRepository;

    /**
     * @var \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageEntityManagerInterface
     */
    protected $merchantStorageEntityManager;

    /**
     * @var \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface
     */
    protected $eventBehaviorFacade;

    /**
     * @param \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageRepositoryInterface $merchantStorageRepository
     * @param \Pyz\Zed\MerchantStorage\Persistence\MerchantStorageEntityManagerInterface $merchantStorageEntityManager
     * @param \Spryker\Zed\EventBehavior\Business\EventBehaviorFacadeInterface $eventFacade
     */
    public function __construct(
        MerchantStorageRepositoryInterface $merchantStorageRepository,
        MerchantStorageEntityManagerInterface $merchantStorageEntityManager,
        EventBehaviorFacadeInterface $eventFacade
    ) {
        $this->merchantStorageRepository = $merchantStorageRepository;
        $this->merchantStorageEntityManager = $merchantStorageEntityManager;
        $this->eventBehaviorFacade = $eventFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function publish(array $eventTransfers): void
    {
        $storeIds = array_unique($this->eventBehaviorFacade->getEventTransfersAdditionalValues(
            $eventTransfers,
            SpyMerchantTableMap::COL_FK_STORE
        ));

        $this->storeData($storeIds);
    }

    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function writeMerchantListStorageCollectionByDeliveryPostalCodeEvents(array $eventTransfers): void
    {
        $merchantIds = $this->eventBehaviorFacade->getEventTransferForeignKeys(
            $eventTransfers,
            PyzMerchantDeliveryPostalCodeTableMap::COL_FK_MERCHANT
        );

        $storeIds = $this->merchantStorageRepository->getStoreIdsByMerchantIds($merchantIds);
        $this->storeData($storeIds);
    }

    /**
     * @param int[] $storeIds
     *
     * @return void
     */
    protected function storeData(array $storeIds): void
    {
        foreach ($storeIds as $idStore) {
            $merchantCollectionTransfer = $this->merchantStorageRepository->getMerchants(
                (new MerchantCriteriaFilterTransfer())->setIdStore($idStore)
                ->setWithTimeSlots(true)
            );
            $this->merchantStorageEntityManager->saveMerchantsList($merchantCollectionTransfer);
        }
    }
}
