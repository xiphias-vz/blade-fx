<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesCZ\Communication\Controller;

use Aws\S3\Exception\S3Exception;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Orm\Zed\Sales\Persistence\SpySalesOrderAddress;
use Pyz\Zed\Sales\Communication\Controller\DetailController as IntDetailController;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Zed\Sales\SalesConfig;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 * @method \Pyz\Zed\CashierOrderExport\Business\Exporter\CashierOrderExporter exportCashier()
 */
class DetailController extends IntDetailController
{
    protected const LOCAL_AWS_CONFIG_CREDENTIALS = 'globus_s3_cashier_file_credentials';
    protected const LOCAL_AWS_CONFIG_CREDENTIALS_KEY = 'key';
    protected const LOCAL_AWS_CONFIG_CREDENTIALS_SECRET = 'secret';
    protected const EXPORT_ARCHIVE_FILE_PATH = '../../src/Pyz/Zed/Sales/Communication/CashierFiles/';
    protected const EXPORT_XML_FILE_NAME_DATE_FORMAT = 'Ymd';
    protected const LOCAL_SCHEDULER_NAME = 'scheduler.globus.local';
    protected const SEARCH_TXT_FILE_NAME_CZ = '_update.log';
    protected const DOWNLOAD_TXT_FILE_NAME_CZ = '_update.zip';
    protected const SEARCH_XML_FILE_NAME = '_order.xml';

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
        $merchantTransfer = $this->getFactory()
            ->getMerchantFacade()
            ->findMerchantTransferFromMerchantReference($orderTransfer->getMerchantReference());
        $isCashierTxt = $merchantTransfer->getIsCashierTxt();
        $orderTransfer->setCartNote(json_decode($orderTransfer->getCartNote()));
        $cellPhone = $orderTransfer->getBillingAddress()->getCellPhone();
        $userFacade = $this->getFactory()->getUserFacade();
        $idUser = $userFacade->getCurrentUser()->getIdUser();
        $userGroup = $this->getFactory()->getAclFacade()->getUserGroups($idUser)->getGroups()[0]->getName();
        $distinctOrderStates = $this->getFacade()->getDistinctOrderStates($idSalesOrder);
        $eventsGroupedByShipment = $this->getFactory()->getOmsFacade()->getGroupedDistinctManualEventsByIdSalesOrder($idSalesOrder);
        $eventsGroupedByItem = $this->getFactory()->getOmsFacade()->getManualEventsByIdSalesOrder($idSalesOrder);
        $orderItemSplitFormCollection = $this->getFactory()->createOrderItemSplitFormCollection($orderTransfer->getItems());
        $events = $this->getFactory()->getOmsFacade()->getDistinctManualEventsByIdSalesOrder($idSalesOrder);
        $customerTransfer = $orderTransfer->getCustomer();
        $groupedOrderItems = $this->getFacade()
            ->getUniqueItemsFromOrder($orderTransfer);
        $requestDeliveryDate = $groupedOrderItems[0]->getShipment()->getRequestedDeliveryDate();
        $address = $groupedOrderItems[0]->getShipment()->getShippingAddress();
        $payments = $orderTransfer->getPayments();
        $orderState = $groupedOrderItems[0]["state"]["name"];
        $dateAndTimeSlot = explode('_', $requestDeliveryDate);
        $deliveryDate = $dateAndTimeSlot[0];
        $deliveryTimeSlot = $dateAndTimeSlot[1];
        $merchantReference = $orderTransfer->getMerchantReference();
        $pickingZonesForContainers = $this->getPickingZones();
        $containers = $orderTransfer->getPickingSalesOrderCollection()->getPickingSalesOrders()->getArrayCopy();
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
        $blocksToRenderForCustomer['discount'] = strip_tags($blocksToRenderForCustomer['discount'], '<br>');
        $isCurrentUserSupervisor = $this->isCurrentUserSupervisor();
        $isCurrentUserSupervisorOrAdmin = $this->isCurrentUserSupervisorOrAdmin();
        $shipping = $groupedOrderItems[0]->getShipment();
        $orderReference = $orderTransfer->getOrderReference();
        $orderCreateDate = $this->getFilenameDate($orderTransfer->getCreatedAt());

        if ($request->get("isDownloadCashierFile") == true) {
            $s3 = $this->getS3Client();
            $bucket = $this->getS3Bucket();
            $mrechantReference = $orderTransfer->getMerchantReference();
            if ($isCashierTxt) {
                $keyName = $mrechantReference . '_' . $idSalesOrder . static::SEARCH_TXT_FILE_NAME_CZ;
                $tempName = $mrechantReference . '_' . $idSalesOrder . static::DOWNLOAD_TXT_FILE_NAME_CZ;
            } else {
                $keyName = $mrechantReference . '_' . $orderCreateDate . '_' . $orderReference . static::SEARCH_XML_FILE_NAME;
                $tempName = $mrechantReference . '_' . $orderCreateDate . '_' . $orderReference . static::SEARCH_XML_FILE_NAME;
            }

            $tempFilePath = realpath(static::EXPORT_ARCHIVE_FILE_PATH) . $tempName;
            try {
                // Get the object.
                $result = $s3->getObject([
                    'Bucket' => $bucket,
                    'Key' => $keyName,
                ]);

                file_put_contents($tempFilePath, $result['Body']);
            } catch (S3Exception $e) {
                $this->addErrorMessage('Kassenfile existiert nicht für Bestell-ID' . ' %d', ['%d' => $idSalesOrder]);
            }

            $this->downloadFile($tempFilePath);
        }

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
            $this->executeTimeSlotCheckJenkinsJob($orderTransfer->getStore());
            $this->getFacade()->sendOrderConfirmationMail($spySalesOrder);
            $orderTransfer = $this->getFacade()->findOrderWithPickingSalesOrdersByIdSalesOrder($idSalesOrder);
            $groupedOrderItems = $this->getFacade()
                ->getUniqueItemsFromOrder($orderTransfer);
            $requestDeliveryDate = $groupedOrderItems[0]->getShipment()->getRequestedDeliveryDate();
            $dateAndTimeSlot = explode('_', $requestDeliveryDate);
            $deliveryDate = $dateAndTimeSlot[0];
            $deliveryTimeSlot = $dateAndTimeSlot[1];
        }

        $buttons = [];
        foreach ($events as $key => &$event) {
            if (stripos($event, "return") === 0 || stripos($event, "close") === 0 || stripos($event, "confirm selecting containers") === 0) {
                unset($events[$key]);
            } elseif (stripos($event, "cancel") === 0) {
                if ($isCurrentUserSupervisorOrAdmin) {
                    array_push($buttons, "Cancel");
                }
            } elseif (stripos($event, "Zurücksetzen") === 0) {
                if (in_array("picked", $distinctOrderStates) == false && in_array("picked, canceled", $distinctOrderStates) == false) {
                    unset($events[$key]);
                } else {
                    if ($isCurrentUserSupervisorOrAdmin) {
                        array_push($buttons, $event);
                    }
                }
            } else {
                if (stripos($event, "confirm picking") === 0) {
                    $event = "Picking bestätigen";
                    array_push($buttons, $event);
                } elseif (stripos($event, "confirm collection") === 0) {
                    $event = "Abholung bestätigen";
                    array_push($buttons, $event);
                } else {
                    array_push($buttons, $event);
                }
            }
        }

        if ($blockResponseData instanceof RedirectResponse) {
            return $blockResponseData;
        }

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
        if ($merchantReference === '1021') {
            $timeSlotsData['10:00-18:00'] = '10:00-18:00';
        }

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
            'orderItemSplitFormCollection' => $orderItemSplitFormCollection,
            'groupedOrderItems' => $groupedOrderItems,
            'changeStatusRedirectUrl' => $this->createRedirectLink($idSalesOrder),
            'tableColumnHeaders' => $this->getFactory()->createOrderItemsTableExpander()->getColumnHeaders(),
            'tableColumnCellsContent' => $this->getFactory()->createOrderItemsTableExpander()->getColumnCellsContent($orderTransfer->getItems()),
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
            'pickZones' => $pickZones,
            'itemStatusArray' => $itemStatusArray,
            'itemDataArray' => $itemDataArray,
            'userGroup' => $userGroup,
            'orderState' => $orderState,
            'buttons' => $buttons,
            'pickingZonesForContainers' => $pickingZonesForContainers,
            'containers' => $containers,
            'timeSlotsData' => $timeSlotsData,
            'cellPhone' => $cellPhone,
        ], $blockResponseData);
    }
}