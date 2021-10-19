<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductLabel\Business;

use Psr\Log\LoggerInterface;
use Spryker\Zed\ProductLabel\Business\ProductLabelFacade as SpryProductLabelFacade;

/**
 * @api
 *
 * @method \Pyz\Zed\ProductLabel\Business\ProductLabelBusinessFactory getFactory()
 * @method \Spryker\Zed\ProductLabel\Persistence\ProductLabelEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\ProductLabel\Persistence\ProductLabelRepositoryInterface getRepository()
 */
class ProductLabelFacade extends SpryProductLabelFacade
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Psr\Log\LoggerInterface|null $logger
     * @param bool $isTouchEnabled
     *
     * @return void
     */
    public function updateDynamicProductLabelRelations(?LoggerInterface $logger = null, bool $isTouchEnabled = true)
    {
        $this->getFactory()
            ->createProductAbstractRelationUpdater($logger)
            ->updateProductLabelRelations($isTouchEnabled);

        $this->getFactory()
            ->getNavigationStorageFacade()
            ->publish($this->getFactory()->getNavigationFacade()->getMainNavigationIds());
    }
}
