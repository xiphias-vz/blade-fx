<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Generated\Shared\Transfer\UserTransfer;
use Pyz\Shared\Messages\MessagesConfig;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use StoreApp\Shared\Picker\PickerConfig;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransferMockData;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class PosListeController extends AbstractController
{
    protected const REQUEST_PARAM_CSRF_TOKEN = 'token';
    protected const REQUEST_PARAM_ID_ORDER = 'idOrder';
    protected const REQUEST_PARAM_SKU = 'sku';
    protected const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';
    protected const FORMAT_POS_LISTE_TOKEN_NAME = 'pos-liste-%d';
    protected const PICKING_ORDER_ITEM_TRANSFER = [
        [
                'idOrder' => 1,
                'idOrderItem' => 5,
                'idProduct' => 15,
                'ean' => '6549871265',
                'quantity' => 2,
                'quantityPicked' => 0,
                'price' => 120,
                'color' =>
                    [
                      'id' => 1,
                      'fore_color' => '#4287f5',
                      'back_color' => '#f5ef42',
                      'circle_color' => '#83cc29',
                    ],
                'name' => 'Magermilchjoghurt',
                'weight' => '1',
                'isPaused' => false,
                'pictureUrl' => "https://globus-staging-product-images.s3.eu-central-1.amazonaws.com/2000094951422_20000172376.jpg",
                'sequence' => '207001005',
                'shelf' => '087',
                'shelf_floor' => '02',
                'shelf_field' => '04',
                'aisle' => '2',
                'status' => 'ready for picking',
                'idContainer' => '15946573',
                'lastPickedAt' => '2021/02/16 08:30:45',
                'minWeight' => '0,9',
                'maxWeight' => '1,2',
                'averageWeight' => '1',
                'totalWeight' => '2',
                'orderNumber' => '1',
                'doubleDigits' => false,
                ],
                [
                    'idOrder' => 1,
                    'idOrderItem' => 6,
                    'idProduct' => 17,
                    'ean' => '95432549',
                    'quantity' => 7,
                    'quantityPicked' => 3,
                    'price' => 150,
                    'color' =>
                        [
                            'id' => 1,
                            'fore_color' => '#7ca5cf',
                            'back_color' => '#007d80',
                            'circle_color' => '#b3472e',
                        ],
                        [
                            'id' => 3,
                            'fore_color' => '#7ca5cf',
                            'back_color' => '#007d80',
                            'circle_color' => '#b3472e',
                        ],
                        [
                            'id' => 4,
                            'fore_color' => '#7ca5cf',
                            'back_color' => '#007d80',
                            'circle_color' => '#b3472e',
                        ],
                        [
                            'id' => 10,
                            'fore_color' => '#7ca5cf',
                            'back_color' => '#007d80',
                            'circle_color' => '#b3472e',
                        ],
                    'name' => 'Phyto-Coffein Tonikum',
                    'weight' => '3',
                    'isPaused' => true,
                    'pictureUrl' => "https://globus-staging-product-images.s3.eu-central-1.amazonaws.com/2000094951422_20000172376.jpg",
                    'sequence' => '207001030',
                    'shelf' => '088',
                    'shelf_floor' => '02',
                    'shelf_field' => '05',
                    'aisle' => '3',
                    'status' => 'ready for picking',
                    'idContainer' => '15946573',
                    'lastPickedAt' => '2021/02/16 08:30:45',
                    'minWeight' => '2',
                    'maxWeight' => '4',
                    'averageWeight' => '3',
                    'totalWeight' => '21',
                    'orderNumber' => '10',
                    'doubleDigits' => true,
                ],
    ];

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();
        $userTransfer = $this->getCurrentUser($request);
        $orderTransfer = $this->getOrderTransferMock();
        $dataAisleTransfer = $orderTransfer->getData()->getOrderItemsByAisle();

        $result = $this->groupItemsByOrder($dataAisleTransfer);
        $idOrder = $request->get(static::REQUEST_PARAM_ID_ORDER);
        $sku = $request->get(static::REQUEST_PARAM_SKU);

        $csfrTokenName = sprintf(static::FORMAT_POS_LISTE_TOKEN_NAME, $idOrder);

        if (!$this->isCsrfTokenValid($csfrTokenName, $request)) {
            $this->addErrorMessage(
                MessagesConfig::MESSAGE_PERMISSION_FAILED
            );

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $orderParams[] = [
                'pickZone' => $pickingZoneTransfer->getName(),
                'sku' => $sku,
            ];

        return $this->createIndexActionResponse($request, $orderParams, $dataAisleTransfer);
    }

    /**
     * @param string $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool
     */
    protected function isCsrfTokenValid(string $id, Request $request): bool
    {
        $tokenValue = $request->get(static::REQUEST_PARAM_CSRF_TOKEN);

        $csrfToken = new CsrfToken($id, $tokenValue);

        return $this->getCsrfTokenManager()->isTokenValid($csrfToken);
    }

    /**
     * @return \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface
     */
    protected function getCsrfTokenManager(): CsrfTokenManagerInterface
    {
        return $this->getApplication()->get(static::SERVICE_FORM_CSRF_PROVIDER);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Generated\Shared\Transfer\UserTransfer
     */
    protected function getCurrentUser(Request $request): UserTransfer
    {
        return $request->attributes->get(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_USER);
    }

    /**
     * @return \StoreApp\Zed\Picker\Business\Transfer\PickingHeaderTransferMockData
     */
    protected function getOrderTransferMock(): PickingHeaderTransferMockData
    {
        return new PickingHeaderTransferMockData(10, 4);
    }

//    protected function getOrderTransfer(): PickingHeaderTransferData
//    {
//        return new PickingHeaderTransferData();
//    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param array $orderParams
     * @param array $orderItemsByAisle
     *
     * @return array
     */
    protected function createIndexActionResponse(
        Request $request,
        array $orderParams,
        array $orderItemsByAisle
    ): array {
        return [
            'pickZone' => $orderParams[0]['pickZone'],
            'sku' => $orderParams[0]['sku'],
            'orders' => static::PICKING_ORDER_ITEM_TRANSFER,
            'orderItemsByAisle' => $orderItemsByAisle,
        ];
    }

    /**
     * @param array $itemsPerZone
     *
     * @return array
     */
    protected function groupItemsByOrder(array $itemsPerZone): array
    {
        return $itemsPerZone;
    }
}
