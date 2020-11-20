<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Business;

use Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer;
use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\PickingSalesOrder\Business\PickingSalesOrderBusinessFactory getFactory()
 * @method \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderRepositoryInterface getRepository()()
 */
class PickingSalesOrderFacade extends AbstractFacade implements PickingSalesOrderFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer
     *
     * @return void
     */
    public function updatePickingSalesOrderCollection(PickingSalesOrderCollectionTransfer $pickingSalesOrderCollectionTransfer): void
    {
        $this->getFactory()->createPickingSalesOrderWriter()->updatePickingSalesOrderCollection($pickingSalesOrderCollectionTransfer);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PickingSalesOrderTransfer $pickingSalesOrderTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderTransfer
     */
    public function bindContainerToShelf(PickingSalesOrderTransfer $pickingSalesOrderTransfer): PickingSalesOrderTransfer
    {
        return $this->getFactory()->createPickingSalesOrderWriter()->bindContainerToShelf($pickingSalesOrderTransfer);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\PickingSalesOrderCollectionTransfer
     */
    public function getPickingSalesOrderCollection(PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer): PickingSalesOrderCollectionTransfer
    {
        return $this->getRepository()->getPickingSalesOrderCollection($pickingSalesOrderCriteriaTransfer);
    }
}
