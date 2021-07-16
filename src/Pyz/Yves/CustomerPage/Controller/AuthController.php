<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Pyz\Yves\CustomerPage\Form\LoginForm;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientAccount;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientCookie;
use SprykerShop\Yves\CustomerPage\Controller\AuthController as SprykerAuthControllerAlias;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 * @method \Spryker\Client\Customer\CustomerClientInterface getClient()
 */
class AuthController extends SprykerAuthControllerAlias
{
    /**
     * @return array
     */
    protected function executeLoginAction(): array
    {
        $this->getFactory()
            ->getCsrfTokenManager()
            ->refreshToken(LoginForm::FORM_NAME);

        return parent::executeLoginAction();
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function callAvaliabilityTestAction(Request $request)
    {
        $id = $request->request->get("id");
        $customerUserProvider = $this->getFactory()->createCustomerUserProvider();
        $result = $customerUserProvider->checkEmailOrCardAvailability($id);

        return new JsonResponse($result);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function globusLoginAction(Request $request)
    {
        if (!isset($_SESSION["failedLogins"])) {
            $_SESSION["failedLogins"] = 0;
        }

        $email = $request->request->get("id");
        $password = $request->request->get("password");
        $captchaToken = $request->request->get("captchaToken");

        $customerUserProvider = $this->getFactory()->createCustomerUserProvider();

        if ($_SESSION["failedLogins"] >= 4) {
            $secret = $customerUserProvider->getCaptchaSecretKey();
            $captchaResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $secret . "&response=" . $captchaToken);
            $decodedResponse = json_decode($captchaResponse);
            if ($decodedResponse->success == true) {
                $_SESSION["failedLogins"] = 0;
            } else {
                $_SESSION["failedLogins"] += 1;

                return new JsonResponse('{"successfullyLoggedIn": false, "showCaptcha": false}');
            }
        }

        $result = $customerUserProvider->globusLogin($email, $password);
        $response = json_decode($result);

        $this->getFactory()->getSessionClient()->set("id_token", $response->id_token ?? '');
        if (property_exists($response, "code") == false) {
            $response->successfullyLoggedIn = true;
            $_SESSION["failedLogins"] = 0;
            $response->showCaptcha = false;
            $cook = new GlobusRestApiClientCookie();
            $cookie = $cook->createLoginCookie($result, $this->getFactory()->getSessionClient());
            $cookieConfirm = $cook->createLoginConfirmedCookie();
        } else {
            $response->successfullyLoggedIn = false;
            $_SESSION["failedLogins"] += 1;
            if ($_SESSION["failedLogins"] > 3) {
                $response->showCaptcha = true;
            } else {
                $response->showCaptcha = false;
            }
        }

        $resp = new JsonResponse(json_encode($response));
        if (isset($cookie) && isset($cookieConfirm)) {
            $resp->headers->setCookie($cookie);
            $resp->headers->setCookie($cookieConfirm);
        }

        return $resp;
    }

    /**
     * https://www.shop.globus.local/login/globus-cookie-login
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function globusLoginWithCookieAction(Request $request)
    {
        $result = ["UID" => "0"];
        if (!GlobusRestApiClientCookie::isLoginConfirmed()) {
            if (GlobusRestApiClientCookie::isTokenCookieSet()) {
                $customerUserProvider = $this->getFactory()->createCustomerUserProvider();
                $result = $customerUserProvider->globusLoginWithCookie();
                $user = json_decode($result);
                if (isset($user->email)) {
                    $customerTransfer = $customerUserProvider->loadCustomerByProfileData($result);
                    $cook = new GlobusRestApiClientCookie();
                    $cookie = $cook->createLoginCookie($result, $this->getFactory()->getSessionClient());
                    $cookieConfirm = $cook->createLoginConfirmedCookie();
                } else {
                    $this->logout();
                }
            }
        }
        $resp = new JsonResponse(json_encode($result));
        if (isset($cookie) && isset($cookieConfirm) && isset($customerTransfer)) {
            $resp->headers->setCookie($cookie);
            $resp->headers->setCookie($cookieConfirm);
            $customerAuthenticator = $this->getFactory()->createCustomerAuthenticator();
            $token = $this->getFactory()->createUsernamePasswordToken($customerTransfer);
            $customerAuthenticator->authenticateCustomer($customerTransfer, $token);
        }

        return $resp;
    }

    /**
     * @return bool
     */
    private function logout()
    {
        if ($this->isLoggedInCustomer()) {
            $this->getFactory()->getCustomerClient()->logout();
        }
        GlobusRestApiClientAccount::logoutWithCookie();
        GlobusRestApiClientCookie::clearCookies();

        return true;
    }
}
