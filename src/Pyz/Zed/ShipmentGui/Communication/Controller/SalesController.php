<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentGui\Communication\Controller;

use Pyz\Shared\Acl\AclConstants;
use Spryker\Zed\ShipmentGui\Communication\Controller\SalesController as SprykerSalesController;
use Spryker\Zed\ShipmentGui\Communication\Exception\OrderNotFoundException;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\ShipmentGui\Communication\ShipmentGuiCommunicationFactory getFactory()
 */
class SalesController extends SprykerSalesController
{
    protected const MAX_ITEMS_PER_PAGE = 100;
    protected const ITEMS_PER_PAGE_VALUES = [50, 100, 500];

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @throws \Spryker\Zed\ShipmentGui\Communication\Exception\OrderNotFoundException
     *
     * @return array
     */
    public function itemsAction(Request $request)
    {
        /** @var \Generated\Shared\Transfer\OrderTransfer|null $orderTransfer */
        $orderTransfer = $request->attributes->get('orderTransfer');
        $orderItemsCount = $this->getFactory()->getFacadeSales()->getOrderItemsCount($orderTransfer->getIdSalesOrder());

        if ($orderTransfer === null) {
            throw new OrderNotFoundException();
        }

        $shipmentGroupsCollection = $this->getFactory()
            ->getShipmentService()
            ->groupItemsByShipment($orderTransfer->getItems());

        $itemGroups = $this->getFactory()
            ->createProductBundleGrouper()
            ->groupBundleItemsByShipmentGroupHash($shipmentGroupsCollection, $orderTransfer);

        $currentUser = $this->isCurrentUserAdmin();

        return $this->viewResponse([
            'events' => $request->attributes->get('events', []),
            'eventsGroupedByShipment' => $request->attributes->get('eventsGroupedByShipment', []),
            'eventsGroupedByItem' => $request->attributes->get('eventsGroupedByItem', []),
            'order' => $orderTransfer,
            'orderItemsCount' => $orderItemsCount,
            'groupedOrderItemsByShipment' => $shipmentGroupsCollection,
            'changeStatusRedirectUrl' => $request->attributes->get('changeStatusRedirectUrl'),
            'itemGroups' => $itemGroups,
            'tableColumnHeaders' => $request->attributes->get('tableColumnHeaders'),
            'tableColumnCellsContent' => $request->attributes->get('tableColumnCellsContent'),
            'templates' => $this->getFactory()->createShipmentOrderItemTemplateProvider()->provide($orderTransfer->getItems()),
            'isAdmin' => $this->isCurrentUserAdmin(),
            'maxItemsPerPage' => static::MAX_ITEMS_PER_PAGE,
            'itemsPerPageValues' => static::ITEMS_PER_PAGE_VALUES,
        ]);
    }

    /**
     * @return bool
     */
    protected function isCurrentUserAdmin(): bool
    {
        $userFacade = $this->getFactory()->getUserFacade();

        $idUser = $userFacade->getCurrentUser()->getIdUser();
        $userGroups = $this->getFactory()->getAclFacade()->getUserGroups($idUser);

        foreach ($userGroups->getGroups() as $group) {
            if ($group->getName() === AclConstants::ROOT_GROUP) {
                return true;
            }
        }

        return false;
    }
}
