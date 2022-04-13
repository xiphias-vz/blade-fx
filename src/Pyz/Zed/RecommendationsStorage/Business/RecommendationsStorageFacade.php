<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\RecommendationsStorage\Business\RecommendationsStorageBusinessFactory getFactory()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageRepositoryInterface getRepository()
 * @method \Pyz\Zed\RecommendationsStorage\Persistence\RecommendationsStorageEntityManagerInterface getEntityManager()
 */
class RecommendationsStorageFacade extends AbstractFacade implements RecommendationsStorageFacadeInterface
{
    /**
     * @param array $eventTransfers
     *
     * @return void
     */
    public function publish(array $eventTransfers): void
    {
        $this->getFactory()->createRecommendationsStorageWriter()->publish($eventTransfers);
    }
}
