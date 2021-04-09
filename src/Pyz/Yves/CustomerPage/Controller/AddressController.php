<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Generated\Shared\Transfer\AddressTransfer;
use Pyz\Shared\Messages\MessagesConfig;
use Spryker\Shared\Customer\Code\Messages;
use SprykerShop\Yves\CustomerPage\Controller\AddressController as SprykerAddressController;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerPageControllerProvider;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class AddressController extends SprykerAddressController
{
    private const REQUEST_HEADER_REFERER = 'referer';
    private const REQUEST_PARAM_CSRF_TOKEN = 'token';
    private const CSRF_TOKEN_ADDRESS_DELETE = 'address-delete';
    private const KEY_ADDRESS_ID = 'id';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteAction(Request $request)
    {
        if (!$this->isCsrfTokenValid(static::CSRF_TOKEN_ADDRESS_DELETE, $request)) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseExternal(
                $request->headers->get(static::REQUEST_HEADER_REFERER, '/')
            );
        }

        $customerTransfer = $this->getLoggedInCustomerTransfer();

        $addressTransfer = new AddressTransfer();
        $addressTransfer
            ->setIdCustomerAddress($request->request->getInt(static::KEY_ADDRESS_ID))
            ->setFkCustomer($customerTransfer->getIdCustomer());

        $addressTransfer = $this
            ->getFactory()
            ->getCustomerClient()
            ->deleteAddress($addressTransfer);

        if ($addressTransfer !== null) {
            $this->getFactory()
                ->getCustomerClient()
                ->markCustomerAsDirty();

            $this->addSuccessMessage(Messages::CUSTOMER_ADDRESS_DELETE_SUCCESS);

            return $this->redirectResponseInternal(CustomerPageControllerProvider::ROUTE_CUSTOMER_REFRESH_ADDRESS);
        }

//        $this->addErrorMessage(Messages::CUSTOMER_ADDRESS_DELETE_FAILED);
//
//        return $this->redirectResponseInternal(CustomerPageControllerProvider::ROUTE_CUSTOMER_ADDRESS);
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
