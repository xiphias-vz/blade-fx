<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZone\Business;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\PickingZone\Persistence\PickingZoneRepositoryInterface getRepository()
 * @method \Pyz\Zed\PickingZone\Persistence\PickingZoneEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\PickingZone\Business\PickingZoneBusinessFactory getFactory()
 */
class PickingZoneFacade extends AbstractFacade implements PickingZoneFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer[]
     */
    public function getPickingZones(): array
    {
        return $this->getRepository()->getPickingZones();
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param int $idPickingZone
     *
     * @return \Generated\Shared\Transfer\PickingZoneTransfer|null
     */
    public function findPickingZoneById(int $idPickingZone): ?PickingZoneTransfer
    {
        return $this->getRepository()->findPickingZoneById($idPickingZone);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return \Generated\Shared\Transfer\OrderPickingBlockTransfer
     */
    public function createOrderPickingBlock(
        OrderPickingBlockTransfer $orderPickingBlockTransfer
    ): OrderPickingBlockTransfer {
        return $this->getEntityManager()->createOrderPickingBlock($orderPickingBlockTransfer);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return bool
     */
    public function isOrderPickingBlockAvailableForUser(OrderPickingBlockTransfer $orderPickingBlockTransfer): bool
    {
        return $this->getFactory()->createOrderPickingBlockChecker()
            ->isOrderPickingBlockAvailableForUser($orderPickingBlockTransfer);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OrderPickingBlockTransfer $orderPickingBlockTransfer
     *
     * @return void
     */
    public function deleteOrderPickingBlock(OrderPickingBlockTransfer $orderPickingBlockTransfer): void
    {
        $this->getEntityManager()->deleteOrderPickingBlock($orderPickingBlockTransfer);
    }
}
