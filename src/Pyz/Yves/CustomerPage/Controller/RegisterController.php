<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Shared\Customer\CustomerConfig;
use Pyz\Shared\DataDog\DataDogConfig;
use Pyz\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
use Pyz\Yves\CustomerPage\Form\RegisterForm;
use Pyz\Yves\CustomerPage\Plugin\Router\CustomerPageRouteProviderPlugin;
use Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver;
use Spryker\Shared\Customer\Code\Messages;
use SprykerShop\Yves\CustomerPage\Controller\RegisterController as SprykerShopRegisterController;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerPageControllerProvider;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 * @method \Spryker\Client\Customer\CustomerClientInterface getClient()
 */
class RegisterController extends SprykerShopRegisterController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function executeIndexAction(Request $request)
    {
        if ($this->isLoggedInCustomer()) {
            return $this->redirectResponseInternal(CustomerPageControllerProvider::ROUTE_CUSTOMER_OVERVIEW);
        }

        $registerForm = $this
            ->getFactory()
            ->createCustomerFormFactory()
            ->getRegisterForm()
            ->handleRequest($request);

        if ($registerForm->isSubmitted()) {
            if ($registerForm->isValid()) {
                $data = $registerForm->getData();
                $data['merchantReference'] = $this->createShopContextResolver()->resolve()->getMerchantReference();

                $customerResponseTransfer = $this->registerCustomer($data);

                if ($customerResponseTransfer->getIsSuccess()) {
                    $this->getFactory()->getDataDogService()->increment([
                        DataDogConfig::DATA_DOG_REGISTRATION_SUCCESS_STAT,
                    ], [DataDogConfig::DATA_DOG_REGION_SCOPE => APPLICATION_STORE]);

                    return $this->redirectResponseInternal(CustomerPageControllerProvider::ROUTE_CUSTOMER_OVERVIEW);
                }

                $this->getFactory()->getDataDogService()->increment([
                    DataDogConfig::DATA_DOG_REGISTRATION_ERROR_STAT,
                ], [DataDogConfig::DATA_DOG_REGION_SCOPE => APPLICATION_STORE]);

                $this->processResponseErrors($customerResponseTransfer);
            }

            $this->getFactory()
                ->getCsrfTokenManager()
                ->refreshToken(RegisterForm::FORM_NAME);
        }

        $loginForm = $this
            ->getFactory()
            ->createCustomerFormFactory()
            ->getLoginForm();

        return [
            'loginForm' => $loginForm->createView(),
            'registerForm' => $registerForm->createView(),
        ];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function confirmAction(Request $request)
    {
        $customerTransfer = $this->getCustomerFromRequest($request);

        if ($customerTransfer->getRegistrationKey()) {
            $customerTransfer = $this->getFactory()
                ->getBaseCustomerClient()
                ->confirmRegistration($customerTransfer);

            if ($customerTransfer->getIdCustomer()) {
                $token = $this->getFactory()->createUsernamePasswordToken($customerTransfer);

                $this->getFactory()
                    ->createCustomerAuthenticator()
                    ->authenticateCustomer($customerTransfer, $token);

                $this->getFactory()
                    ->getMessenger()
                    ->addSuccessMessage(Messages::CUSTOMER_REGISTRATION_SUCCESS);

                if ($request->get(CustomerConfig::PARAM_CONTINUE_CHECKOUT, false)) {
                    return $this->redirectResponseInternal(CheckoutPageRouteProviderPlugin::CHECKOUT_INDEX);
                }

                return $this->redirectResponseInternal(CustomerPageRouteProviderPlugin::ROUTE_CUSTOMER_OVERVIEW);
            }

            $this->getFactory()
                ->getMessenger()
                ->addErrorMessage(Messages::CUSTOMER_AUTHORIZATION_FAILED);
        }

        return new RedirectResponse('/');
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    private function getCustomerFromRequest(Request $request): CustomerTransfer
    {
        $customerTransfer = new CustomerTransfer();
        $customerTransfer->setRegistrationKey($request->get(CustomerConfig::PARAM_TOKEN, null));

        return $customerTransfer;
    }

    /**
     * @return \Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver
     */
    private function createShopContextResolver(): ShopContextResolver
    {
        return new ShopContextResolver($this->getApplication());
    }
}
