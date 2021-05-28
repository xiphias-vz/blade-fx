<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Elastica\JSON;
use Pyz\Shared\Customer\CustomerConstants;
use Spryker\Shared\Config\Config;
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

            return [
                'form' => $form->createView(),
            ];
        } else {
            return [
                'form' => $form->createView(),
            ];
        }
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function passwordChangeAction(Request $request)
    {
        return $this->view([], [], '@CustomerPage/views/password-change/password-change.twig');
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function passwordResetAction(Request $request)
    {
        $email = $request->request->get('id');
        $apiKey = $this->getGlobusApiKey();
        $apiSecret = $this->getGlobusApiSecretKey();
        $urlPrefix = $this->getGlobusApiUrlPrefix();
        $url = "v2/meinglobus/accounts/password/reset";
        $fullUrl = $urlPrefix . $url;
        $data = '{"id": "' . $email . '"}';

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $fullUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => [
                'APIKey: ' . $apiKey,
                'APISecret: ' . $apiSecret,
                'Content-Type: application/json',
            ],
        ]);

        $result = curl_exec($curl);
        curl_close($curl);

        return new JsonResponse($result);
    }

    /**
     * @return string
     */
    public function getGlobusApiKey(): string
    {
        $globus_api_credentials = Config::get(CustomerConstants::GLOBUS_API_CONSTANTS);
        $apiKey = '';
        if (isset($globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_KEY])) {
            $apiKey = $globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_KEY];
        }

        return $apiKey;
    }

    /**
     * @return string
     */
    public function getGlobusApiSecretKey(): string
    {
        $globus_api_credentials = Config::get(CustomerConstants::GLOBUS_API_CONSTANTS);
        $apiSecretKey = '';
        if (isset($globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_SECRET_KEY])) {
            $apiSecretKey = $globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_SECRET_KEY];
        }

        return $apiSecretKey;
    }

    /**
     * @return string
     */
    public function getGlobusApiUrlPrefix(): string
    {
        $globus_api_credentials = Config::get(CustomerConstants::GLOBUS_API_CONSTANTS);
        $urlPrefix = '';
        if (isset($globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_URL])) {
            $urlPrefix = $globus_api_credentials[CustomerConstants::GLOBUS_API_CREDENTIALS][CustomerConstants::GLOBUS_API_URL];
        }

        return $urlPrefix;
    }
}
