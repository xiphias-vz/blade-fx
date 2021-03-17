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
    public const NEXT_ORDER_POSITION = 'nextOrderPosition';
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
        $factory = $this->getFactory();
        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $transfer->setParents(true);
        $nextOrderPosition = $request->get(static::NEXT_ORDER_POSITION) == null ?
            0 : (int)$request->get(static::NEXT_ORDER_POSITION);

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $orderForScanningContainer = $this->handleRequestFromPickingArticlesAndGetOrder($request, $transfer);

            if ($request->get(static::REDIRECT_TO_PICKING_ARTICLES)) {
                return $this->setContainersToOrderAndRedirectToPickingArticles($request, $transfer);
            }

            if ($orderForScanningContainer == null) {
                $submittedContainers = json_decode($request->get(static::CONTAINERS_ID)) ?? [];
                if (count($submittedContainers)) {
                    $orderForScanningContainer = $transfer->getOrder($nextOrderPosition);
                    foreach ($submittedContainers as $container) {
                        foreach ($container->containers as $containerId) {
                            $this->getFacade()->setContainerToOrder($orderForScanningContainer, $containerId, '');
                        }
                    }
                }
                $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);
            }

            if ($orderForScanningContainer == null) {
                $urlOverview = $factory->getConfig()->getOverviewUri();
                $urlOverview .= '?skipToken=' . static::REDIRECT_SKIP_TOKEN;

                return $this->redirectResponse($urlOverview);
            }
        } else {
            $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);
        }

        $listOfContainers = $factory
            ->getPickerBusinessFactory()
            ->createContainerReader()
            ->getUsedContainers();

        return $this->viewResponse([
            'orderForScanningContainer' => $orderForScanningContainer,
            'itemSku' => $request->get(static::ORDER_ITEM_SKU),
            'listOfContainers' => json_encode($listOfContainers),
            'requestFromPickingArticles' => $request->get(static::REQUEST_FROM_ADD_CONTAINER_IN_SKU),
            'redirectToPickingArticles' => $request->get(static::REQUEST_FROM_ADD_CONTAINER_IN_SKU) == 1,
            'orderPosition' => $request->get(static::ORDER_POSITION),
            'orderItemPosition' => $request->get(static::ORDER_ITEM_POSITION),
            'nextOrderPosition' => $nextOrderPosition,
            'merchant' => $this->getMerchantFromRequest($request),
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
        $submittedContainers = json_decode($request->get(static::CONTAINERS_ID)) ?? [];
        $orderForScanningContainer = $transfer->getOrder($request->get(static::ORDER_POSITION));
        $position = $request->get(static::ORDER_ITEM_POSITION);
        $sku = $request->get(static::ORDER_ITEM_SKU);
        if (count($submittedContainers)) {
            foreach ($submittedContainers as $container) {
                foreach ($container->containers as $containerId) {
                    $this->getFacade()->setContainerToOrder($orderForScanningContainer, $containerId, '');
                }
            }
        }
        $buildUrlResponse = '/picker/multi-picking/multi-order-picking?position=' . $position . '&sku=' . $sku . '';

        return $this->redirectResponse($buildUrlResponse);
    }
}
