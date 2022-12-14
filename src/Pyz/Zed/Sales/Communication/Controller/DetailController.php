<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Controller;

use Aws\S3\Exception\S3Exception;
use Aws\S3\S3Client;
use DateTime;
use Exception;
use Generated\Shared\Transfer\TimeSlotsDefinitionTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Orm\Zed\Sales\Persistence\SpySalesOrderAddress;
use Pyz\Shared\Acl\AclConstants;
use Pyz\Shared\S3Constants\S3Constants;
use Pyz\Zed\Sales\SalesConfig;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Shared\Config\Config;
use Spryker\Zed\Sales\Communication\Controller\DetailController as SprykerDetailController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 * @method \Pyz\Zed\CashierOrderExport\Business\Exporter\CashierOrderExporter exportCashier()
 */
class DetailController extends SprykerDetailController
{
    protected const LOCAL_AWS_CONFIG_CREDENTIALS = 'globus_s3_cashier_file_credentials';
    protected const LOCAL_AWS_CONFIG_CREDENTIALS_KEY = 'key';
    protected const LOCAL_AWS_CONFIG_CREDENTIALS_SECRET = 'secret';
    protected const EXPORT_ARCHIVE_FILE_PATH = '../../src/Pyz/Zed/Sales/Communication/CashierFiles/';
    protected const EXPORT_XML_FILE_NAME_DATE_FORMAT = 'Ymd';
    protected const SEARCH_TXT_FILE_NAME = '_order.txt';
    protected const DOWNLOAD_TXT_FILE_NAME = '_order.zip';
    protected const SEARCH_XML_FILE_NAME = '_order.xml';

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
        $itemsPerPage = $request->query->getInt(SalesConfig::PARAM_ID_ITEMS_PER_PAGE, SalesConfig::DEFAULT_ITEMS_PER_PAGE);
        $pageNumber = $request->query->getInt(SalesConfig::PARAM_ID_PAGE_NUMBER, 1);

        // $minId = min($this->getFacade()->findIdOrderItemsByIdSalesOrders([$idSalesOrder]));

        $startingPoint = (($pageNumber - 1) * $itemsPerPage);
        $endPoint = $startingPoint + $itemsPerPage - 1;

        $salesOrderIdFilterRange = ['min' => $startingPoint, 'max' => $endPoint, 'itemsPerPage' => $itemsPerPage];

        $orderTransfer = $this
            ->getFacade()
            ->findOrderWithPickingSalesOrdersByIdSalesOrderFilterByItemId($idSalesOrder, $salesOrderIdFilterRange);

        if ($orderTransfer === null) {
            $this->addErrorMessage('Sales order #%d not found.', ['%d' => $idSalesOrder]);

            return $this->redirectResponse(Url::generate('/sales')->build());
        }
        $merchantTransfer = $this->getFactory()
            ->getMerchantFacade()
            ->findMerchantTransferFromMerchantReference($orderTransfer->getMerchantReference());
        $isCashierTxt = $merchantTransfer->getIsCashierTxt();
        $isDepositAllowed = $orderTransfer->getIsDepositAllowed();
        $orderTransfer->setCartNote(json_decode($orderTransfer->getCartNote()));
        $userFacade = $this->getFactory()->getUserFacade();
        $idUser = $userFacade->getCurrentUser()->getIdUser();
        $userGroup = $this->getFactory()->getAclFacade()->getUserGroups($idUser)->getGroups()[0]->getName();
        $distinctOrderStates = $this->getFacade()->getDistinctOrderStates($idSalesOrder);
        $eventsGroupedByShipment = $this->getFactory()->getOmsFacade()->getGroupedDistinctManualEventsByIdSalesOrder($idSalesOrder);
        $eventsGroupedByItem = $this->getFactory()->getOmsFacade()->getManualEventsByIdSalesOrder($idSalesOrder);
        $orderItemSplitFormCollection = $this->getFactory()->createOrderItemSplitFormCollection($orderTransfer->getItems());
        $events = $this->getFactory()->getOmsFacade()->getDistinctManualEventsByIdSalesOrder($idSalesOrder);
        $customerTransfer = $orderTransfer->getCustomer();
        $cellPhone = $orderTransfer->getBillingAddress()->getCellPhone();
        $phone = $orderTransfer->getBillingAddress()->getPhone();
        $groupedOrderItems = $this->getFacade()
            ->getUniqueItemsFromOrder($orderTransfer);
        $requestDeliveryDate = $groupedOrderItems[0]->getShipment()->getRequestedDeliveryDate();
        $address = $groupedOrderItems[0]->getShipment()->getShippingAddress();
        if ($customerTransfer) {
            if (!$cellPhone) {
                foreach ($customerTransfer->getBillingAddress() as $billAddress) {
                    if ($billAddress->getCellPhone()) {
                        $cellPhone = $billAddress->getCellPhone();
                        break;
                    }
                }
            }
            if (!$phone) {
                foreach ($customerTransfer->getBillingAddress() as $billAddress) {
                    if ($billAddress->getPhone()) {
                        $phone = $billAddress->getPhone();
                        break;
                    }
                }
            }
        }

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
                $keyName = $mrechantReference . '_' . $idSalesOrder . static::SEARCH_TXT_FILE_NAME;
                $tempName = $mrechantReference . '_' . $idSalesOrder . static::DOWNLOAD_TXT_FILE_NAME;
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
                $this->addErrorMessage('Kassenfile existiert nicht f??r Bestell-ID' . ' %d', ['%d' => $idSalesOrder]);
            }

            $this->downloadFile($tempFilePath);
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
            $this->getFacade()->executeTimeSlotCheckJenkinsJob($orderTransfer->getStore());
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
            } elseif (stripos($event, "Reset") === 0) {
                if (in_array("picked", $distinctOrderStates) == false && in_array("picked, canceled", $distinctOrderStates) == false) {
                    unset($events[$key]);
                } else {
                    if ($isCurrentUserSupervisorOrAdmin) {
                        array_push($buttons, $event);
                    }
                }
            } else {
                if (stripos($event, "confirm picking") === 0) {
                    $event = "Picking best??tigen";
                    array_push($buttons, $event);
                } elseif (stripos($event, "confirm collection") === 0) {
                    $event = "Abholung best??tigen";
                    array_push($buttons, $event);
                } else {
                    array_push($buttons, $event);
                }
            }
        }

        $orderItems = $orderTransfer->getItems();

        foreach ($orderItems as $orderItem) {
            $this->removeHouseNumber($orderItem);
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

        $timeslotDefinitionTransfer = new TimeSlotsDefinitionTransfer();
        $timeslotDefinitionTransfer->setExactDate($deliveryDate);
        $timeslotDefinitionTransfer->setMerchantReference($merchantReference);
        $timeSlotsData = $this->getFactory()
            ->getTimeSlotsFacade()
            ->getTimeslotDefinition($timeslotDefinitionTransfer, "");
        $hardCodedTimeSlot = [
            'time_slot' => '10:00-18:00',
        ];

        $timeSlotsData[] = $hardCodedTimeSlot;

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
            'phone' => $phone,
            'cellPhone' => $cellPhone,
            'isTransportBoxEnabled' => $isDepositAllowed,
            'orderTabs' => $this->getFactory()->createSalesOrderFormTabs()->createView(),
            'salesOrderBladeFxReportsTable' => $this->getFactory()->createSalesOrderBladeFxReportsTable($orderReference, $idSalesOrder)->render(),
        ], $blockResponseData);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function orderBladeFxTableAction(Request $request): JsonResponse
    {
        $orderReference = $request->query->get(SalesConfig::PARAM_ORDER_REFERENCE);
        $idSalesOrder = $this->castId($request->query->get(SalesConfig::PARAM_ID_SALES_ORDER));

        $table = $this->getFactory()->createSalesOrderBladeFxReportsTable($orderReference, $idSalesOrder);

        return $this->jsonResponse(
            $table->fetchData()
        );
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
    public function getPickingZones(): array
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

    /**
     * @return \Aws\S3\S3Client
     */
    protected function getS3Client(): S3Client
    {
        $credentials = Config::get(S3Constants::S3_CONSTANTS_CASHIER_FILE);
        $key = '';
        $secret = '';
        if (isset($credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_KEY])) {
            $key = $credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_KEY];
        }

        if (isset($credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_SECRET])) {
            $secret = $credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_SECRET];
        }

        return new S3Client([
            'region' => 'eu-central-1',
            'version' => 'latest',
            'credentials' => [
                'key' => $key,
                'secret' => $secret,
            ],
        ]);
    }

    /**
     * @return string
     */
    protected function getS3Bucket(): string
    {
        return Config::get(S3Constants::S3_CASHIER_FILE_BUCKETS);
    }

    /**
     * @param string $fileLink
     *
     * @return void
     */
    protected function downloadFile(string $fileLink)
    {
        try {
            if (file_exists($fileLink)) {
                header('Content-Description: File Transfer');
                header('Content-Type: application/octet-stream');
                header('Content-Disposition: attachment; filename=' . basename($fileLink));
                header('Expires: 0');
                header('Cache-Control: must-revalidate');
                header('Pragma: public');
                header('Content-Length: ' . filesize($fileLink));
                ob_clean();
                flush();
                readfile($fileLink);

                unlink($fileLink);
                exit;
            }
        } catch (Exception $exception) {
            $this->addErrorMessage($exception->getMessage());
        }
    }

    /**
     * @param string $orderDate
     *
     * @return string
     */
    protected function getFilenameDate(string $orderDate): string
    {
        $date = new DateTime($orderDate);

        return $date->format(static::EXPORT_XML_FILE_NAME_DATE_FORMAT);
    }

    /**
     * @param object $orderItem
     *
     * @return void
     */
    protected function removeHouseNumber(object $orderItem)
    {
        $newSku = $orderItem->getSku();

        if (strpos($newSku, '_')) {
            $underscorePosition = strpos($newSku, '_');
            $houseNumber = substr($newSku, $underscorePosition, 5);
            $withoutHouseNumber = str_replace($houseNumber, '', $newSku);
            $orderItem->setSku($withoutHouseNumber);
        }
    }
}
