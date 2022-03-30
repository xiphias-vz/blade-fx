<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\PickingOrderTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class ScanningContainerController extends AbstractController
{
    public const REQUEST_FROM_ADD_CONTAINER_IN_SKU = 'formAddContainerSku';
    public const REDIRECT_TO_PICKING_ARTICLES = 'redirectToPickingArticles';
    public const CONTAINERS_ID = 'idContainers';
    public const ORDER_ITEM_SKU = 'itemSku';
    public const ITEM_SKU = 'sku';
    public const NEXT_ORDER_POSITION = 'nextOrderPosition';
    public const IS_CONTAINER_USED = 'isContainerUsed';
    public const ORDER_POSITION = 'orderPosition';
    public const REDIRECT_SKIP_TOKEN = 'skipToken';

    public const ORDER_ITEM_POSITION = 'orderItemPosition';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $transfer->setParents(true);
        $addContainerToSubstitutedItem = false;

        if (isset($_REQUEST['flag'])) {
            if ($_REQUEST['flag'] === 'substitution') {
                $addContainerToSubstitutedItem = true;
            }
        }

        $itemSku = $request->get(static::ORDER_ITEM_SKU) ?? $request->get(static::ITEM_SKU) ?? '';
        $orderPosition = $request->get(static::ORDER_POSITION) ?? '';
        $orderItemPosition = $request->get(static::ORDER_ITEM_POSITION) ?? '';
        $requestFromPickingArticles = $request->get(static::REQUEST_FROM_ADD_CONTAINER_IN_SKU) ?? '';
        $redirectToPickingArticles = $request->get(static::REQUEST_FROM_ADD_CONTAINER_IN_SKU) == 1;

        if ($addContainerToSubstitutedItem === true) {
            $itemSku = $transfer->getOrderItem($transfer->getLastPickingItemPosition())->getEan();
            $orderPosition = $transfer->getCurrentOrder()->getPickingPosition();
            $orderItemPosition = $transfer->getLastPickingItemPosition();
        }

        $factory = $this->getFactory();

        $nextOrderPosition = $request->get(static::NEXT_ORDER_POSITION) == null ?
            0 : (int)$request->get(static::NEXT_ORDER_POSITION);
        $isContainerUsed = $request->get(static::IS_CONTAINER_USED) == null ?
            0 : (int)$request->get(static::IS_CONTAINER_USED);
        $submittedContainers = json_decode($request->get(static::CONTAINERS_ID)) ?? [];
        $merchant = $this->getMerchantFromRequest($request)->getMerchantReference();

        $pickZoneById = $factory->getPickingZoneFacade()->findPickingZoneById($transfer->getIdZone());
        $usedError = '';
        $isContainerUsed = 0;
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $orderForScanningContainer = $this->handleRequestFromPickingArticlesAndGetOrder($request, $transfer);

            if ($request->get(static::REDIRECT_TO_PICKING_ARTICLES)) {
                foreach ($submittedContainers as $container) {
                    foreach ($container->containers as $containerId) {
                        $usedError = $this->getFacade()->checkContainerUsage($containerId, $merchant, $orderForScanningContainer->getIdOrder());
                        if (!empty($usedError)) {
                            $isContainerUsed = 1;
                            $usedError = $this->getFacade()->formatErrorMessage($usedError, $containerId);

                            $isScanFromPickingProcess = "0";
                            if (isset($_REQUEST['add_multiple_containers'])) {
                                $isScanFromPickingProcess = $_REQUEST['add_multiple_containers'];
                            }

                            return $this->viewResponse([
                                'isContainerUsed' => $isContainerUsed,
                                'orderForScanningContainer' => $orderForScanningContainer,
                                'itemSku' => $itemSku,
                                'requestFromPickingArticles' => $requestFromPickingArticles,
                                'redirectToPickingArticles' => $redirectToPickingArticles,
                                'orderPosition' => $orderPosition,
                                'orderItemPosition' => $orderItemPosition,
                                'nextOrderPosition' => $nextOrderPosition,
                                'merchant' => $this->getMerchantFromRequest($request),
                                'isUsedContainerMessage' => $usedError,
                                'addContainerToSubstitutedItem' => $addContainerToSubstitutedItem,
                                'isDepositAllowed' => $orderForScanningContainer->getIsDepositAllowed(),
                                'isScanFromPickingProcess' => $isScanFromPickingProcess,
                                'isMultiPickingProcess' => '1',
                            ]);
                        }
                    }
                }

                return $this->setContainersToOrderAndRedirectToPickingArticles($request, $transfer);
            }

            if ($orderForScanningContainer == null) {
                if (count($submittedContainers)) {
                    if ($addContainerToSubstitutedItem === true) {
                        $orderForScanningContainer = $transfer->getOrderById($transfer->getOrderItem($transfer->getLastPickingItemPosition())->getIdOrder());
                    } else {
                        $orderForScanningContainer = $transfer->getOrder($nextOrderPosition);
                    }
                    foreach ($submittedContainers as $container) {
                        foreach ($container->containers as $containerId) {
                            $usedError = $this->getFacade()->checkContainerUsage($containerId, $merchant, $orderForScanningContainer->getIdOrder());

                            $substituteContainer = false;
                            if ($request->request->get('addContainerToSubstitutedItem')) {
                                $substituteContainer = true;
                            }
                            if (!empty($usedError)) {
                                $isContainerUsed = 1;
                                $usedError = $this->getFacade()->formatErrorMessage($usedError, $containerId);

                                $isScanFromPickingProcess = "0";
                                if (isset($_REQUEST['add_multiple_containers'])) {
                                    $isScanFromPickingProcess = $_REQUEST['add_multiple_containers'];
                                }

                                return $this->viewResponse([
                                    'isContainerUsed' => $isContainerUsed,
                                    'orderForScanningContainer' => $orderForScanningContainer,
                                    'itemSku' => $itemSku,
                                    'requestFromPickingArticles' => $requestFromPickingArticles,
                                    'redirectToPickingArticles' => $redirectToPickingArticles,
                                    'orderPosition' => $orderPosition,
                                    'orderItemPosition' => $orderItemPosition,
                                    'nextOrderPosition' => $nextOrderPosition,
                                    'merchant' => $this->getMerchantFromRequest($request),
                                    'isUsedContainerMessage' => $usedError,
                                    'addContainerToSubstitutedItem' => $addContainerToSubstitutedItem,
                                    'isDepositAllowed' => $orderForScanningContainer->getIsDepositAllowed(),
                                    'isScanFromPickingProcess' => $isScanFromPickingProcess,
                                    'isMultiPickingProcess' => '1',
                                ]);
                            } else {
                                $this->getFacade()->setContainerToOrder($orderForScanningContainer, $containerId, '', $substituteContainer);
                                if ($isContainerUsed == 1) {
                                    $isContainerUsed = 0;
                                }
                            }
                        }
                    }
                }
                if ($addContainerToSubstitutedItem) {
                    $orderForScanningContainer = null;
                } else {
                    $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);
                }
            }

            if ($addContainerToSubstitutedItem === true) {
                $itemPosition = $transfer->setLastPickingItemPosition($transfer->getLastPickingItemPosition());
                if ($itemPosition->getLastPickingItemPosition() === $itemPosition->getMaxPickingItemPosition()) {
                    $itemPosition = $transfer->setLastPickingItemPosition($transfer->getLastPickingItemPosition());
                } elseif ($itemPosition->getLastPickingItemPosition() === 1) {
                    $itemPosition = $transfer->setLastPickingItemPosition($transfer->getLastPickingItemPosition() - 1);
                } else {
                    $itemPosition = $transfer->setLastPickingItemPosition($transfer->getLastPickingItemPosition());
                }
                $this->getFacade()->setTransferToSession($itemPosition);
            }

            if ($orderForScanningContainer == null) {
                if (!$addContainerToSubstitutedItem) {
                    $urlOverview = $factory->getConfig()->getOverviewUri();
                } else {
                    $transfer->getOrderItem($transfer->getLastPickingItemPosition())->setIsSubstitutionFound(true);
                    $urlOverview = $factory->getConfig()->getMultiPicking();
                }

                $urlOverview .= '?skipToken=' . static::REDIRECT_SKIP_TOKEN;

                return $this->redirectResponse($urlOverview);
            }
        } elseif ($addContainerToSubstitutedItem === true) {
            if ($transfer->getLastPickingItemPosition() !== null) {
                $orderForScanningContainer = $transfer->getOrderById($transfer->getOrderItem($transfer->getLastPickingItemPosition())->getIdOrder());
            } else {
                $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);
            }
        } else {
            $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);
        }

        $isScanFromPickingProcess = "0";
        if (isset($_REQUEST['add_multiple_containers'])) {
            $isScanFromPickingProcess = $_REQUEST['add_multiple_containers'];
        }

        return $this->viewResponse([
            'orderForScanningContainer' => $orderForScanningContainer,
            'itemSku' => $itemSku,
            'requestFromPickingArticles' => $requestFromPickingArticles,
            'redirectToPickingArticles' => $redirectToPickingArticles,
            'orderPosition' => $orderPosition,
            'orderItemPosition' => $orderItemPosition,
            'nextOrderPosition' => $nextOrderPosition,
            'merchant' => $this->getMerchantFromRequest($request),
            'isContainerUsed' => $isContainerUsed,
            'isUsedContainerMessage' => $usedError,
            'isScanFromPickingProcess' => $isScanFromPickingProcess,
            'isMultiPickingProcess' => '1',
            'pickZoneName' => $pickZoneById->getName(),
            'isDepositAllowed' => $orderForScanningContainer->getIsDepositAllowed(),
            'addContainerToSubstitutedItem' => $addContainerToSubstitutedItem,
        ]);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    protected function getMerchantFromRequest(Request $request): MerchantTransfer
    {
        return $request->attributes->get(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_MERCHANT);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     *
     * @return \Generated\Shared\Transfer\PickingOrderTransfer|null
     */
    public function handleRequestFromPickingArticlesAndGetOrder(Request $request, PickingHeaderTransfer $transfer): ?PickingOrderTransfer
    {
        if ($request->get(static::REQUEST_FROM_ADD_CONTAINER_IN_SKU)) {
            $orderPosition = $request->get(static::ORDER_POSITION);

            return $transfer->getOrder($orderPosition);
        }

        return null;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransfer $transfer
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function setContainersToOrderAndRedirectToPickingArticles(Request $request, PickingHeaderTransfer $transfer): SymfonyRedirectResponse
    {
        $substituteContainer = false;
        if ($request->request->get('addContainerToSubstitutedItem')) {
            $substituteContainer = true;
        }
        $submittedContainers = json_decode($request->get(static::CONTAINERS_ID)) ?? [];
        $orderForScanningContainer = $transfer->getOrder($request->get(static::ORDER_POSITION));
        $position = $request->get(static::ORDER_ITEM_POSITION);
        $sku = $request->get(static::ORDER_ITEM_SKU);
        if (count($submittedContainers)) {
            foreach ($submittedContainers as $container) {
                foreach ($container->containers as $containerId) {
                    $this->getFacade()->setContainerToOrder($orderForScanningContainer, $containerId, '', $substituteContainer);
                }
            }
        }
        $buildUrlResponse = '/picker/multi-picking/multi-order-picking?position=' . $position . '&sku=' . $sku . '';

        return $this->redirectResponse($buildUrlResponse);
    }
}
