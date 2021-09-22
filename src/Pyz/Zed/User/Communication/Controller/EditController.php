<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Communication\Controller;

use Spryker\Zed\User\Communication\Controller\EditController as SprykerEditController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * @method \Pyz\Zed\User\Business\UserFacadeInterface getFacade()
 * @method \Pyz\Zed\User\Communication\UserCommunicationFactory getFactory()
 * @method \Pyz\Zed\User\Persistence\UserQueryContainerInterface getQueryContainer()
 */
class EditController extends SprykerEditController
{
    public const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';
    public const BUTTON_CSRF_TOKEN_NAME = 'button';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function activateUserAction(Request $request): RedirectResponse
    {
        if (!$this->isCsrfTokenValid(static::BUTTON_CSRF_TOKEN_NAME, $request->get('token'))) {
            $this->addErrorMessage(static::MESSAGE_USER_ACTIVATE_ERROR);

            return $this->redirectResponse(static::USER_LISTING_URL);
        }

        return parent::activateUserAction($request);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deactivateUserAction(Request $request): RedirectResponse
    {
        if (!$this->isCsrfTokenValid(static::BUTTON_CSRF_TOKEN_NAME, $request->get('token'))) {
            $this->addErrorMessage(static::MESSAGE_USER_DEACTIVATE_ERROR);

            return $this->redirectResponse(static::USER_LISTING_URL);
        }

        return parent::deactivateUserAction($request);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function updateAction(Request $request)
    {
        $isCurrentUserSupervisor = $this->getFacade()->isCurrentUserSupervisor();
        $response = parent::updateAction($request);

        if (!is_array($response)) {
            return $response;
        }

        return $this->viewResponse([
            'isCurrentUserSupervisor' => $isCurrentUserSupervisor,
            'userForm' => $response['userForm'],
        ]);
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
