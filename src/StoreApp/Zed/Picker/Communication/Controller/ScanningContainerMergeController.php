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
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class ScanningContainerMergeController extends AbstractController
{
    public const REQUEST_FROM_ADD_CONTAINER_IN_SKU = 'formAddContainerSku';
    public const REDIRECT_TO_PICKING_ARTICLES = 'redirectToPickingArticles';
    public const CONTAINERS_ID = 'idContainers';
    public const ORDER_ITEM_SKU = 'itemSku';
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
        $factory = $this->getFactory();
        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $transfer->setParents(true);
        $pickZoneById = $factory->getPickingZoneFacade()->findPickingZoneById($transfer->getIdZone());

        $currentPosition = $request->get('addOrderPosition') ?? 0;
        $orderForScanningContainer = $transfer->getOrder($currentPosition);

        $isScanFromPickingProcess = "0";
        if (isset($_REQUEST['add_multiple_containers'])) {
            $isScanFromPickingProcess = $_REQUEST['add_multiple_containers'];
        }

        $ordersContainers = [];
        foreach ($transfer->getContainersArray() as $cont1) {
            foreach ($cont1 as $cont) {
                $ordersContainers[] = $cont->getContainerID();
            }
        }

        return $this->viewResponse([
            'itemSku' => $request->get(static::ORDER_ITEM_SKU),
            'requestFromPickingArticles' => $request->get(static::REQUEST_FROM_ADD_CONTAINER_IN_SKU),
            'redirectToPickingArticles' => $request->get(static::REQUEST_FROM_ADD_CONTAINER_IN_SKU) == 1,
            'orderPosition' => $request->get(static::ORDER_POSITION),
            'orderItemPosition' => $request->get(static::ORDER_ITEM_POSITION),
            'merchant' => $this->getMerchantFromRequest($request),
            'isMultiPickingProcess' => '1',
            'isScanFromPickingProcess' => $isScanFromPickingProcess,
            'pickZoneName' => $pickZoneById->getName(),
            'orderForScanningContainer' => $orderForScanningContainer,
            'ordersContainers' => json_encode($ordersContainers),
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
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getContainerInfoAction(Request $request): JsonResponse
    {
        $container = $request->request->get('container');

        $container = $this->removeScannerInput($container);

        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $transfer->setParents(true);
        $result = $transfer->getPickingOrderByContainer($container);

        $encodedJson = json_encode($result);
        $jsonResponse = new JsonResponse($encodedJson);

        return $jsonResponse;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function mergingContainerScanAction(Request $request): JsonResponse
    {
        $containerToMove = $request->request->get('containerToMove');
        $containerToMove = $this->removeScannerInput($containerToMove);

        $containerToFill = $request->request->get('containerToFill');
        $containerToFill = $this->removeScannerInput($containerToFill);

        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $result = $this->getFacade()->moveContainerToContainer($transfer, $containerToMove, $containerToFill);

        $encodedJson = json_encode($result);
        $jsonResponse = new JsonResponse($encodedJson);

        return $jsonResponse;
    }

    /**
     * @param string $input
     *
     * @return string
     */
    protected function removeScannerInput(string $input): string
    {
        if (str_contains($input, '/x11')) {
            $input = str_replace('/x11', '', $input);
        } elseif (str_contains($input, '/X11')) {
            $input = str_replace('/X11', '', $input);
        }

        return $input;
    }
}
