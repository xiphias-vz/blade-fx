<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Pyz\Shared\Messages\MessagesConfig;
use SprykerShop\Yves\CustomerPage\Controller\AbstractCustomerController;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerPageControllerProvider;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class DeleteController extends AbstractCustomerController
{
    private const REQUEST_HEADER_REFERER = 'referer';
    private const REQUEST_PARAM_CSRF_TOKEN = 'token';
    private const CSRF_TOKEN_CUSTOMER_DELETE = 'customer-delete';

    /**
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexAction()
    {
        return $this->view([], [], '@CustomerPage/views/profile-delete/profile-delete.twig');
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function confirmAction(Request $request)
    {
        if (!$this->isCsrfTokenValid(static::CSRF_TOKEN_CUSTOMER_DELETE, $request)) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseExternal(
                $request->headers->get(static::REQUEST_HEADER_REFERER, '/')
            );
        }

        $loggedInCustomerTransfer = $this->getLoggedInCustomerTransfer();

        $this->getFactory()
            ->getCustomerClient()
            ->anonymizeCustomer($loggedInCustomerTransfer);

        return $this->redirectResponseInternal(CustomerPageControllerProvider::ROUTE_LOGOUT);
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
