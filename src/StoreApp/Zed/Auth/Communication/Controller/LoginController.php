<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Auth\Communication\Controller;

use Pyz\Zed\Auth\Communication\Form\LoginForm;
use Spryker\Shared\Auth\AuthConstants;
use Spryker\Zed\Auth\Communication\Controller\LoginController as SprykerLoginController;
use StoreApp\Zed\Auth\AuthConfig;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * @method \Spryker\Zed\Auth\Communication\AuthCommunicationFactory getFactory()
 * @method \Spryker\Zed\Auth\Business\AuthFacadeInterface getFacade()
 * @method \Spryker\Zed\Auth\Persistence\AuthQueryContainerInterface getQueryContainer()
 */
class LoginController extends SprykerLoginController
{
    protected const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $tokenInfo = $request->request->get('auth');

        if ($tokenInfo != null) {
            $tokenValidation = $this->isCsrfTokenValid('auth', $request);
            if ($tokenValidation === false) {
                $refreshedToken = $this->getCsrfTokenManager()->refreshToken('auth');
                $tokenInfo['_token'] = $refreshedToken->getValue();
                $request->request->set('auth', $tokenInfo);
            }
        }

        $form = $this
            ->getFactory()
            ->createLoginForm()
            ->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $isLogged = $this->getFacade()->login(
                $formData[LoginForm::FIELD_USERNAME],
                $formData[LoginForm::FIELD_PASSWORD]
            );

            if ($isLogged) {
                return $this->redirectResponse(AuthConfig::DEFAULT_URL_REDIRECT);
            }

            $this->addErrorMessage('Authentication failed!');
        } else {
            $token = null;
            if ($this->getFacade()->hasCurrentUser()) {
                $token = $this->getFacade()->getCurrentUserToken();
            }

            if ($request->headers->get(AuthConstants::AUTH_TOKEN)) {
                $token = $request->headers->get(AuthConstants::AUTH_TOKEN);
            }

            if ($this->getFacade()->isAuthenticated($token)) {
                return $this->redirectResponse(AuthConfig::DEFAULT_URL_REDIRECT);
            }
        }

        return $this->viewResponse([
            'form' => $form->createView(),
        ]);
    }

    /**
     * @param string $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool
     */
    protected function isCsrfTokenValid(string $id, Request $request): bool
    {
        $tokenValue = $request->get('auth')["_token"];

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
