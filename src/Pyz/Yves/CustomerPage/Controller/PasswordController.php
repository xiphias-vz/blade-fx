<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Elastica\JSON;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\CustomerPage\Form\ForgottenPasswordForm;
use Spryker\Shared\Config\Config;
use Spryker\Shared\Customer\Code\Messages;
use SprykerShop\Yves\CustomerPage\Controller\PasswordController as SprykerPasswordController;
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

        $apiKey = Config::get(CustomerConstants::CDC_API_KEY);
        $apiSecretKey = Config::get(CustomerConstants::CDC_API_SECRET_KEY);
        $urlPrefix = Config::get(CustomerConstants::CDC_API_URL);
        $username = $form->getViewData()["email"];

        $url = array_shift($urlPrefix) . "accounts.resetPassword?apiKey=" . array_shift($apiKey) . "&sec=" . array_shift($apiSecretKey);
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

                return [
                    'form' => $form->createView(),
                ];
            } else {
                if ($form->isSubmitted()) {
                    if ($form->isValid()) {
                        $customerTransfer = new CustomerTransfer();
                        $customerTransfer->fromArray($form->getData());

                        $customerResponseTransfer = $this->sendPasswordRestoreMail($customerTransfer);
                        $this->processResponseErrors($customerResponseTransfer);

                        if ($customerResponseTransfer->getIsSuccess()) {
                            $this->addSuccessMessage(Messages::CUSTOMER_PASSWORD_RECOVERY_MAIL_SENT);
                        }
                    }

                    $this->getFactory()
                        ->getCsrfTokenManager()
                        ->refreshToken(ForgottenPasswordForm::FORM_NAME);
                }

                return [
                    'form' => $form->createView(),
                ];
            }
        } else {
            return [
                'form' => $form->createView(),
            ];
        }
    }
}
