<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Elastica\JSON;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientAccount;
use Spryker\Shared\Customer\Code\Messages;
use SprykerShop\Yves\CustomerPage\Controller\PasswordController as SprykerPasswordController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class PasswordController extends SprykerPasswordController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    protected function executeForgottenPasswordAction(Request $request): array
    {
        $form = $this
            ->getFactory()
            ->createCustomerFormFactory()
            ->getForgottenPasswordForm()
            ->handleRequest($request);

        $apiKey = $this->getFactory()->createCustomerUserProvider()->getCdcApiKey();
        $apiSecretKey = $this->getFactory()->createCustomerUserProvider()->getCdcSecretKey();
        $urlPrefix = $this->getFactory()->createCustomerUserProvider()->getCdcUrlPrefix();
        $username = $form->getViewData()["email"];

        $url = $urlPrefix . "accounts.resetPassword?apiKey=" . $apiKey . "&sec=" . $apiSecretKey;
        $data = ['loginID' => $username];
        if ($data['loginID'] != null) {
            $options = [
                'http' => [
                    'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method' => 'POST',
                    'content' => http_build_query($data),
                ],
            ];
            $context = stream_context_create($options);
            $result = file_get_contents($url, false, $context);
            $result = JSON::parse($result);

            if ($result["errorCode"] == 0) {
                $this->addSuccessMessage(Messages::CUSTOMER_PASSWORD_RECOVERY_MAIL_SENT);
            } else {
                $this->addErrorMessage(Messages::CUSTOMER_EMAIL_INVALID);
            }
        }

        return [
            'form' => $form->createView(),
        ];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function passwordChangeAction(Request $request)
    {
        return $this->view([
            'customerDeleteForm' => [],
        ], [], '@CustomerPage/views/password-change/password-change.twig');
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function passwordResetAction(Request $request): JsonResponse
    {
        $email = $request->request->get('id');
        $result = GlobusRestApiClientAccount::passwordReset($email);
        $jsonResponse = new JsonResponse($result);

        return $jsonResponse;
    }
}
