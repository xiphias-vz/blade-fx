<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Communication\Controller;

use Spryker\Zed\Customer\Communication\Controller\DeleteController as SprykerDeleteController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * @method \Spryker\Zed\Customer\Business\CustomerFacadeInterface getFacade()
 * @method \Spryker\Zed\Customer\Communication\CustomerCommunicationFactory getFactory()
 * @method \Spryker\Zed\Customer\Persistence\CustomerQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Customer\Persistence\CustomerRepositoryInterface getRepository()
 */
class DeleteController extends SprykerDeleteController
{
    public const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';

    public const CONFIRM_DELETION_CSRF_TOKEN_NAME = 'confirm-deletion';

    public const MESSAGE_PERMISSION_FAILED = 'global.permission.failed';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function confirmAction(Request $request)
    {
        if (!$request->isMethod(Request::METHOD_POST)) {
            $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponse('/customer');
        }

        if (!$this->isCsrfTokenValid(static::CONFIRM_DELETION_CSRF_TOKEN_NAME, $request->get('token'))) {
            $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponse('/customer');
        }

        return parent::confirmAction($request);
    }

    /**
     * @param string $id
     * @param string|null $token
     *
     * @return bool
     */
    protected function isCsrfTokenValid(string $id, ?string $token): bool
    {
        return $this->getCsrfTokenManager()->isTokenValid(new CsrfToken($id, $token));
    }

    /**
     * @return \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface
     */
    protected function getCsrfTokenManager(): CsrfTokenManagerInterface
    {
        return $this->getApplication()->get(static::SERVICE_FORM_CSRF_PROVIDER);
    }
}
