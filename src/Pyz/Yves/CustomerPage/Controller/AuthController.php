<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Pyz\Yves\CustomerPage\Form\LoginForm;
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
        $result = $customerUserProvider->checkEmailOrCardAvaliability($id);

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

//        if($_SESSION["failedLogins"] > 3){
//            $_SESSION["failedLogins"] = 0;
//
//        }

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
        if (property_exists($response, "code") == false) {
            $response->successfullyLoggedIn = true;
            $_SESSION["failedLogins"] = 0;
            $response->showCaptcha = false;
        } else {
            $response->successfullyLoggedIn = false;
            $_SESSION["failedLogins"] += 1;
            if ($_SESSION["failedLogins"] > 3) {
                $response->showCaptcha = true;
            } else {
                $response->showCaptcha = false;
            }
        }

        return new JsonResponse(json_encode($response));
    }
}
