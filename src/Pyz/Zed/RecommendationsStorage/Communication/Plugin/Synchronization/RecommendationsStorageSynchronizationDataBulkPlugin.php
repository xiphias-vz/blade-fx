<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Communication\Plugin\Synchronization;

use Generated\Shared\Transfer\SynchronizationDataTransfer;
use Orm\Zed\RecommendationsStorage\Persistence\PyzRecommendationDefinitionStorageQuery;
use Pyz\Zed\RecommendationsStorage\Business\RecommendationsStorageFacadeInterface;
use Pyz\Zed\RecommendationsStorage\Communication\RecommendationsStorageCommunicationFactory;
use Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageRepositoryInterface;
use Pyz\Shared\RecommendationsStorage\RecommendationsStorageConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataBulkRepositoryPluginInterface;

/**
 * @method RecommendationsStorageCommunicationFactory getFactory()
 * @method RecommendationsStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\RecommendationsStorage\RecommendationsStorageConfig getConfig()
 * @method RecommendationsStorageRepositoryInterface getRepository()
 */
class RecommendationsStorageSynchronizationDataBulkPlugin extends AbstractPlugin implements SynchronizationDataBulkRepositoryPluginInterface
{
    /**
     * @uses \Propel\Runtime\ActiveQuery\Criteria::ASC
     */
    protected const ORDER_DIRECTION = 'ASC';

    /**
     * @param int $offset
     * @param int $limit
     * @param array $ids
     *
     * @return array|\Generated\Shared\Transfer\SynchronizationDataTransfer[]
     */
    public function getData(int $offset, int $limit, array $ids = []): array
    {
        if (count($ids) < 1) {
            $allStores = $this->getFactory()->getStoreFacade()->getAllStores();

            foreach ($allStores as $store) {
                $ids[] = $store->getIdStore();
            }
        }

        // nesmije ::create biti tu ali sprykerovci su isto tako napisali
        $recommendationsStorageEntity = PyzRecommendationDefinitionStorageQuery::create()
            ->offset($offset)
            ->limit($limit)
            ->filterByIdRecommendationsStorage_In($ids)
            ->find();

        $recommendationsStorageString = PyzRecommendationDefinitionStorageQuery::create()
            ->offset($offset)
            ->limit($limit)
            ->filterByIdRecommendationsStorage_In($ids)
            ->toString();

        $synchronizationDataTransfers = [];

        foreach ($recommendationsStorageEntity as $definitionEntity) {
            $synchronizationDataTransfer = new SynchronizationDataTransfer();
            $synchronizationDataTransfer->setData($definitionEntity->getData());
            $synchronizationDataTransfer->setKey($definitionEntity->getKey());
            $synchronizationDataTransfer->setStore($definitionEntity->getStore());
            $synchronizationDataTransfer->setAliasKeys($definitionEntity->getAliasKeys());
            $synchronizationDataTransfers[] = $synchronizationDataTransfer;
        }

        return $synchronizationDataTransfers;
    }

    /**
     * @return string
     */
    public function getResourceName(): string
    {
        return RecommendationsStorageConfig::RECOMMENDATIONS_RESOURCE_NAME;
    }

    /**
     * @return bool
     */
    public function hasStore(): bool
    {
        return false;
    }

    /**
     * @return array
     */
    public function getParams(): array
    {
        return [];
    }

    /**
     * @return string
     */
    public function getQueueName(): string
    {
        return RecommendationsStorageConfig::RECOMMENDATIONS_SYNC_STORAGE_QUEUE;
    }

    /**
     * @return string|null
     */
    public function getSynchronizationQueuePoolName(): ?string
    {
        return $this->getFactory()->getConfig()->getRecommendationsSynchronizationPoolName();
    }
}
