<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Yves\CustomerPage\Form\ForgottenPasswordForm;
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
}
