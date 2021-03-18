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
    protected const REQUEST_PARAM_POSITION = 'position';
    protected const REQUEST_PARAM_FROM_MODAL = 'fromModal';
    protected const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';
    protected const FORMAT_POS_LISTE_TOKEN_NAME = 'pos-liste-%d';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();
        $userTransfer = $this->getCurrentUser($request);
        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $orderItemTransfer = $transfer->getGroupedOrderItems();

        $idOrder = $request->get(static::REQUEST_PARAM_ID_ORDER);
        $sku = $request->get(static::REQUEST_PARAM_SKU) ?? '';
        $position = $request->get(static::REQUEST_PARAM_POSITION) ?? '';
        $fromModal = $request->get(static::REQUEST_PARAM_FROM_MODAL) ?? 'false';

        $csrfTokenName = sprintf(static::FORMAT_POS_LISTE_TOKEN_NAME, $idOrder);

        if (!$this->isCsrfTokenValid($csrfTokenName, $request)) {
            $this->addErrorMessage(
                MessagesConfig::MESSAGE_PERMISSION_FAILED
            );

            return $this->redirectResponse(PickerConfig::URL_DIFF_SECTIONS);
        }
        if ($fromModal == 'true') {
            $pickingRedirect = PickerConfig::URL_MULTI_PICKING_START_PICKING . '?sku=' . $sku . '&position=' . $position . '&fromModal=true';
            $overviewRedirect = PickerConfig::URL_MULTI_PICKING_OVERVIEW . '?sku=' . $sku . '&position=' . $position . '&addFromModal1=true&skipToken=backToItem';
        } else {
            $pickingRedirect = PickerConfig::URL_MULTI_PICKING_START_PICKING . '?sku=' . $sku . '&position=' . $position;
            $overviewRedirect = PickerConfig::URL_MULTI_PICKING_OVERVIEW . '?sku=' . $sku . '&position=' . $position . '&skipToken=backToItem';
        }

        $orderParams[] = [
                'pickZone' => $pickingZoneTransfer->getName(),
                'sku' => $sku,
                'position' => $position,
                'fromModal' => $fromModal,
            ];

        return $this->createIndexActionResponse($request, $orderParams, $orderItemTransfer, $pickingRedirect, $overviewRedirect);
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

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param array $orderParams
     * @param array $orderItems
     * @param string $backButtonUrl
     * @param string $overviewRedirect
     *
     * @return array
     */
    protected function createIndexActionResponse(
        Request $request,
        array $orderParams,
        array $orderItems,
        string $backButtonUrl,
        string $overviewRedirect
    ): array {
        return [
            'pickZone' => $orderParams[0]['pickZone'],
            'sku' => $orderParams[0]['sku'],
            'fromModal' => $orderParams[0]['fromModal'],
            'position' => $orderParams[0]['position'],
            'orders' => $orderItems,
            'backButtonUrl' => $backButtonUrl,
            'overviewButtonUrl' => $overviewRedirect,
        ];
    }
}
