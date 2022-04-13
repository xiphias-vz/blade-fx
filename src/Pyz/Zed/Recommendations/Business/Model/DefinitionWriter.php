<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Business\Model;

use Generated\Shared\Transfer\EventEntityTransfer;
use Generated\Shared\Transfer\RecommendationDefinitionTransfer;
use Pyz\Zed\Recommendations\Business\Model\Exception\ResourceNotFoundException;
use Pyz\Zed\Recommendations\Dependency\RecommendationsEvents;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;
use Spryker\Zed\Event\Business\EventFacadeInterface;
use Spryker\Zed\Kernel\Persistence\EntityManager\TransactionTrait;
use Spryker\Zed\Store\Business\StoreFacadeInterface;

class DefinitionWriter implements DefinitionWriterInterface
{
    use TransactionTrait;

    private const ID = 1;

    /**
     * @var \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface
     */
    protected $recommendationsQueryContainer;

    protected $eventFacade;

    protected $storeFacade;

    /**
     * @param \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface $recommendationsQueryContainer
     */
    public function __construct(
        RecommendationsQueryContainerInterface $recommendationsQueryContainer,
        EventFacadeInterface $eventFacade,
        StoreFacadeInterface $storeFacade
    ) {
        $this->recommendationsQueryContainer = $recommendationsQueryContainer;
        $this->eventFacade = $eventFacade;
        $this->storeFacade = $storeFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\RecommendationDefinitionTransfer $definitionTransfer
     *
     * @throws \Pyz\Zed\Recommendations\Business\Model\Exception\ResourceNotFoundException
     *
     * @return int
     */
    public function updateDefinition(RecommendationDefinitionTransfer $definitionTransfer): int
    {
        $definitionEntity = $this->recommendationsQueryContainer
            ->queryDefinitions()
            ->findOneByIdRecommendationDefinition(static::ID);

        if ($definitionEntity === null) {
            throw new ResourceNotFoundException();
        }

        $definitionEntity->fromArray($definitionTransfer->toArray());

        $definitionEntity->save();

        $this->triggerPublishEvent($definitionTransfer);

        return 1;
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantTransfer $merchantTransfer
     *
     * @return void
     */
    protected function triggerPublishEvent(RecommendationDefinitionTransfer $definitionTransfer): void
    {
        $eventEntityTransfer = new EventEntityTransfer();
        $eventEntityTransfer->setId($definitionTransfer->getIdRecommendationDefinition());

        $stores = $this->storeFacade
            ->getAllStores();

        foreach ($stores as $store) {
            $eventEntityTransfer->setAdditionalValues([
                'storeId' => $store->getIdStore(),
                'store' => $store->getName(),
            ]);
            $this->eventFacade->trigger(RecommendationsEvents::RECOMMENDATIONS_PUBLISH, $eventEntityTransfer);
        }
    }
}
