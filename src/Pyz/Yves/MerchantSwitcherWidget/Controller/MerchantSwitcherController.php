<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\Controller;

use Pyz\Shared\Messages\MessagesConfig;
use SprykerShop\Yves\MerchantSwitcherWidget\Controller\MerchantSwitcherController as SprykerMerchantSwitcherController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Csrf\CsrfToken;

/**
 * @method \Pyz\Yves\MerchantSwitcherWidget\MerchantSwitcherWidgetFactory getFactory()
 */
class MerchantSwitcherController extends SprykerMerchantSwitcherController
{
    private const REQUEST_HEADER_REFERER = 'referer';
    private const REQUEST_PARAM_CSRF_TOKEN = 'token';
    private const CSRF_TOKEN_MERCHANT_CHANGE = 'merchant-change';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function switchMerchantAction(Request $request): Response
    {
        if (!$this->isCsrfTokenValid(static::CSRF_TOKEN_MERCHANT_CHANGE, $request)) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseExternal(
                $request->headers->get(static::REQUEST_HEADER_REFERER, '/')
            );
        }

        $merchantReference = $request->get('merchant-reference');

        $this->getFactory()->createMerchantSwitcher()->switchMerchantInQuoteAndCustomer($merchantReference);
        $this->getFactory()->createSelectedMerchantCookie()->setMerchantReference($merchantReference);

        if ($this->getFactory()->createMerchantCapacityChecker()->hasMerchantCapacityForDelivery()) {
            $this->addSuccessMessage('customer.profile.customer.shipment.profile.delivery_and_picking_available');
        } else {
            $this->addSuccessMessage('customer.profile.shipment.only_picking_available');
        }

        return $this->redirectResponseExternal(
            $request->headers->get(static::REQUEST_HEADER_REFERER, '/')
        );
    }

    /**
     * @param string $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool
     */
    protected function isCsrfTokenValid(string $id, Request $request): bool
    {
        return $this->getFactory()->getCsrfTokenManager()
            ->isTokenValid(new CsrfToken($id, $request->request->get(static::REQUEST_PARAM_CSRF_TOKEN)));
    }
}
