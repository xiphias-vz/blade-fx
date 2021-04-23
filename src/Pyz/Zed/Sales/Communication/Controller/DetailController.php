<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Controller;

use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Orm\Zed\Sales\Persistence\SpySalesOrderAddress;
use Pyz\Shared\Acl\AclConstants;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Zed\Sales\Communication\Controller\DetailController as SprykerDetailController;
use Spryker\Zed\Sales\SalesConfig;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 */
class DetailController extends SprykerDetailController
{
    private const TIMESLOTS_DATA = [
        '10:00-12:00' => '10:00-12:00',
        '12:00-14:00' => '12:00-14:00',
        '14:00-16:00' => '14:00-16:00',
        '16:00-18:00' => '16:00-18:00',
        '18:00-20:00' => '18:00-20:00',
    ];

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $idSalesOrder = $this->castId($request->query->getInt(SalesConfig::PARAM_ID_SALES_ORDER));

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (isset($_POST['pickingZones']) && isset($_POST['frmContainerShelf_idSalesOrder']) && isset($_POST['inputContainer']) && isset($_POST['inputShelf'])) {
                $this->getFactory()->setZoneContainerShelf($_POST['frmContainerShelf_idSalesOrder'], $_POST['pickingZones'], $_POST['inputContainer'], $_POST['inputShelf']);
            }
        }

        $orderTransfer = $this->getFacade()->findOrderWithPickingSalesOrdersByIdSalesOrder($idSalesOrder);
        $orderTransfer->setCartNote(json_decode($orderTransfer->getCartNote()));

        if ($orderTransfer === null) {
            $this->addErrorMessage('Sales order #%d not found.', ['%d' => $idSalesOrder]);

            return $this->redirectResponse(Url::generate('/sales')->build());
        }

        if ($request->get("isTimeslotsFormSubmit") == true) {
            $pickupDate = $request->get("pickupDate");
            $pickupTimeSlot = $request->get("pickupTimeSlot");

            $requestedDeliveryDate = $pickupDate . '_' . $pickupTimeSlot;

            $this->getFacade()->updateRequstedDeliveryDateForOrder($orderTransfer, $requestedDeliveryDate);

            $orderTransfer = $this->getFacade()->findOrderWithPickingSalesOrdersByIdSalesOrder($idSalesOrder);
            $orderTransfer->setCartNote(json_decode($orderTransfer->getCartNote()));

            $spySalesOrder = new SpySalesOrder();
            $spySalesOrderAddress = new SpySalesOrderAddress();
            $spySalesOrder->fromArray($orderTransfer->toArray());
            $spySalesOrderAddress->fromArray($orderTransfer->getBillingAddress()->toArray());

            $spySalesOrder->setBillingAddress($spySalesOrderAddress);

            $this->getFacade()->checkAndUpdateTimeSlotsCapacity();
            $this->getFacade()->sendOrderConfirmationMail($spySalesOrder);
        }

        $userFacade = $this->getFactory()->getUserFacade();
        $idUser = $userFacade->getCurrentUser()->getIdUser();
        $userGroup = $this->getFactory()->getAclFacade()->getUserGroups($idUser)->getGroups()[0]->getName();
        $distinctOrderStates = $this->getFacade()->getDistinctOrderStates($idSalesOrder);
        $eventsGroupedByShipment = $this->getFactory()->getOmsFacade()->getGroupedDistinctManualEventsByIdSalesOrder($idSalesOrder);
        $eventsGroupedByItem = $this->getFactory()->getOmsFacade()->getManualEventsByIdSalesOrder($idSalesOrder);
        $orderItemSplitFormCollection = $this->getFactory()->createOrderItemSplitFormCollection($orderTransfer->getItems());
        $events = $this->getFactory()->getOmsFacade()->getDistinctManualEventsByIdSalesOrder($idSalesOrder);
        $blockResponseData = $this->renderSalesDetailBlocks($request, $orderTransfer);
        $blocksToRenderForCustomer = $this->renderMultipleActions(
            $request,
            [
                'discount' => '/discount/sales/list',
                'refund' => '/refund/sales/list',
            ],
            $orderTransfer
        );

        $blocksToRenderForCustomer['refund'] = strip_tags($blocksToRenderForCustomer['refund']);
        $blocksToRenderForCustomer['discount'] = strip_tags($blocksToRenderForCustomer['discount']);
        $isCurrentUserSupervisor = $this->isCurrentUserSupervisor();
        $isCurrentUserSupervisorOrAdmin = $this->isCurrentUserSupervisorOrAdmin();

        if ($blockResponseData instanceof RedirectResponse) {
            return $blockResponseData;
        }

        $groupedOrderItems = $this->getFacade()
            ->getUniqueItemsFromOrder($orderTransfer);

        $customerTransfer = $orderTransfer->getCustomer();
        $requestDeliveryDate = $groupedOrderItems[0]->getShipment()->getRequestedDeliveryDate();
        $address = $groupedOrderItems[0]->getShipment()->getShippingAddress();
        $shipping = $groupedOrderItems[0]->getShipment();
        $payments = $orderTransfer->getPayments();
        $orderState = $groupedOrderItems[0]["state"]["name"];
        $dateAndTimeSlot = explode('_', $requestDeliveryDate);
        $deliveryDate = $dateAndTimeSlot[0];
        $deliveryTimeSlot = $dateAndTimeSlot[1];

        $pickZones = [];
        $itemDataArray = [];
        $itemStatusArray = [];

        foreach ($groupedOrderItems as $key => $orderItem) {
            if (!in_array($orderItem->getPickZone(), $pickZones)) {
                array_push($pickZones, $orderItem->getPickZone());
            }

            if ($orderItem->getItemPaused() != null && $orderItem->getItemPaused() != 0) {
                $itemStatusArray[array_search($orderItem->getPickZone(), $pickZones)][$key] = $orderItem->getState()->getName() . ' (paused)';
                $orderItem->getState()->setName($orderItem->getState()->getName() . ' (paused)');
            } else {
                $itemStatusArray[array_search($orderItem->getPickZone(), $pickZones)][$key] = $orderItem->getState()->getName();
            }
            $itemDataArray[array_search($orderItem->getPickZone(), $pickZones)][$key] = $orderItem;
        }

        if ($userGroup == "support_center_group") {
            $eventsGroupedByItem = $this->eventsAllowedForSupportUser($eventsGroupedByItem);
            $eventsGroupedByShipment = $this->eventsAllowedForSupportUser($eventsGroupedByShipment);

            foreach ($events as $key => $event) {
                if ($event != 'cancel due to not in stock') {
                    unset($events[$key]);
                }
            }
        }

        $timeSlotsData = self::TIMESLOTS_DATA;

        $pickingZonesForContainers = $this->getPickingZones();
        $containers = $orderTransfer->getPickingSalesOrderCollection()->getPickingSalesOrders()->getArrayCopy();
        foreach ($containers as $container) {
            $idZone = $container->getIdPickingZone();
            $container["zoneName"] = $pickingZonesForContainers[$idZone];
        }

        return array_merge([
            'eventsGroupedByItem' => $eventsGroupedByItem,
            'events' => $events,
            'eventsGroupedByShipment' => $eventsGroupedByShipment,
            'distinctOrderStates' => $distinctOrderStates,
            'order' => $orderTransfer,
            'customerTransfer' => $customerTransfer,
            'shipping' => $shipping,
            'address' => $address,
            'payments' => $payments,
            'isCurrentUserSupervisor' => $isCurrentUserSupervisor,
            'isCurrentUserSupervisorOrAdmin' => $isCurrentUserSupervisorOrAdmin,
            'blocksToRenderForCustomer' => $blocksToRenderForCustomer,
            'requestDeliveryDate' => $requestDeliveryDate,
            'deliveryDate' => $deliveryDate,
            'deliveryTimeSlot' => $deliveryTimeSlot,
            'orderItemSplitFormCollection' => $orderItemSplitFormCollection,
            'groupedOrderItems' => $groupedOrderItems,
            'changeStatusRedirectUrl' => $this->createRedirectLink($idSalesOrder),
            'pickZones' => $pickZones,
            'itemStatusArray' => $itemStatusArray,
            'itemDataArray' => $itemDataArray,
            'userGroup' => $userGroup,
            'orderState' => $orderState,
            'pickingZonesForContainers' => $pickingZonesForContainers,
            'containers' => $containers,
        ], $blockResponseData);
    }

    /**
     * @param array $events
     *
     * @return array
     */
    public function eventsAllowedForSupportUser(array $events): array
    {
        foreach ($events as $key => $groupItem) {
            foreach ($events[$key] as $subKey => $item) {
                if ($item != 'cancel due to not in stock') {
                    unset($events[$key][$subKey]);
                }
            }
        }

        return $events;
    }

    /**
     * @return bool
     */
    protected function isCurrentUserSupervisorOrAdmin(): bool
    {
        $userFacade = $this->getFactory()->getUserFacade();

        $idUser = $userFacade->getCurrentUser()->getIdUser();
        $userGroups = $this->getFactory()->getAclFacade()->getUserGroups($idUser);

        foreach ($userGroups->getGroups() as $group) {
            if ($group->getName() === AclConstants::SUPERVISOR_GROUP) {
                return true;
            } elseif ($group->getName() === AclConstants::ROOT_GROUP) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return bool
     */
    protected function isCurrentUserSupervisor(): bool
    {
        $userFacade = $this->getFactory()->getUserFacade();

        $idUser = $userFacade->getCurrentUser()->getIdUser();
        $userGroups = $this->getFactory()->getAclFacade()->getUserGroups($idUser);

        foreach ($userGroups->getGroups() as $group) {
            if ($group->getName() === AclConstants::SUPERVISOR_GROUP) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return array
     */
    private function getPickingZones(): array
    {
        $qry = $this->getFactory()->getPickingZoneQuery();
        $zones = $qry->find();

        $pickingZones = [];
        foreach ($zones as $zone) {
            $pickingZones[$zone->getIdPickingZone()] = $zone->getName();
        }

        return $pickingZones;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function setJsonContainerToZoneAction(Request $request)
    {
        $error = false;
        if (isset($_GET['containerID'])) {
            $containerID = $request->query->get("containerID");
            $checkContainer = $this->getFactory()->checkUsedContainer($containerID);

            if ($checkContainer === true) {
                $error = true;
            } else {
                if (isset($_GET['idSalesOrder']) && isset($_GET['idZone'])) {
                    $this->getFactory()->setZoneContainerShelf($_GET['idSalesOrder'], $_GET['idZone'], $_GET['containerID'], '');
                }
            }
        } else {
            $error = true;
        }

        $responseArray = [
            'error' => $error,
        ];

        return new JsonResponse($responseArray);
    }
}
