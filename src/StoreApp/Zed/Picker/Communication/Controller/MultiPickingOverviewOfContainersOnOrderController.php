<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Pyz\Shared\Messages\MessagesConfig;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use StoreApp\Shared\Picker\PickerConfig;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class MultiPickingOverviewOfContainersOnOrderController extends AbstractController
{
    protected const REQUEST_PARAM_CSRF_TOKEN = 'token';
    protected const REQUEST_PARAM_ID_ORDER = 'idOrder';
    protected const REQUEST_PARAM_SKU = 'sku';
    protected const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';
    protected const FORMAT_OVERVIEW_TOKEN_NAME = 'overview-%d';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $dataWithContainers = $transfer->getOrderList();

        $idOrder = $request->get(static::REQUEST_PARAM_ID_ORDER);
        $sku = $request->get(static::REQUEST_PARAM_SKU);
        $csrfTokenName = sprintf(static::FORMAT_OVERVIEW_TOKEN_NAME, $idOrder);

        if ($_SERVER['REQUEST_METHOD'] == 'POST' && !$this->isCsrfTokenValid($csrfTokenName, $request)) {
            $this->addErrorMessage(
                MessagesConfig::MESSAGE_PERMISSION_FAILED
            );

            return $this->redirectResponse(PickerConfig::URL_MULTI_PICKING_START_PICKING);
        }

        return [
            'pickingOrderTransfer' => $dataWithContainers,
            'urlContainerSelect' => PickerConfig::URL_SELECT_CONTAINERS,
            'urlMultiPickingOverview' => PickerConfig::URL_MULTI_PICKING_OVERVIEW,
            'urlPosListe' => PickerConfig::URL_POS_LISTE,
        ];
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
}
