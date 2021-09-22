<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Shared\Customer\CustomerConfig;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Shared\DataDog\DataDogConfig;
use Pyz\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
use Pyz\Yves\CustomerPage\Form\RegisterForm;
use Pyz\Yves\CustomerPage\Plugin\Router\CustomerPageRouteProviderPlugin;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientDigitalCard;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientValidation;
use Spryker\Shared\Config\Config;
use Spryker\Shared\Customer\Code\Messages;
use SprykerShop\Yves\CustomerPage\Controller\RegisterController as SprykerShopRegisterController;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerPageControllerProvider;
use Symfony\Component\Form\FormView;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 * @method \Spryker\Client\Customer\CustomerClientInterface getClient()
 */
class RegisterController extends SprykerShopRegisterController
{
    public const FIRST_NAME = 'firstName';
    public const LAST_NAME = 'lastName';
    public const STREET = 'street';
    public const HOUSE_NUMBER = 'houseNumber';
    public const ZIP = 'zip';
    public const CITY = 'city';
    public const WE = 'we';
    public const MEIN_GLOBUS = 'meinGlobus';

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
                $customerResponseTransfer = $this->registerCustomer($registerForm->getData());

                if ($customerResponseTransfer->getIsSuccess()) {
                    $this->getFactory()->getDataDogService()->increment([
                        DataDogConfig::DATA_DOG_REGISTRATION_SUCCESS_STAT,
                    ], [DataDogConfig::DATA_DOG_REGION_SCOPE => APPLICATION_STORE]);

                    return $this->redirectResponseInternal(CustomerPageRouteProviderPlugin::ROUTE_CUSTOMER_REGISTER_SUCCESS);
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
        $customer = new FormView();
        $customer->vars = array_merge(
            $customer->vars,
            (new CustomerTransfer())->toArray(),
            ['full_name' => '', 'unique_block_prefix' => '', 'block_prefixes' => '']
        );

        $registerFormView = $registerForm->createView();

        return [
            'loginForm' => $loginForm->createView(),
            'registerForm' => $registerFormView,
            'customer' => $customer,
        ];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function registerSuccessAction(Request $request)
    {
        $customerTransfer = $this->getFactory()->getCustomerClient()->getCustomer();
        $firstName = $customerTransfer->getFirstName();
        $lastName = $customerTransfer->getLastName();
        $zip = $customerTransfer->getZipCode();
        $houseNo = $customerTransfer->getAddress2();
        $street = $customerTransfer->getAddress1();
        $city = $customerTransfer->getCity();
        $we = $customerTransfer->getIsAdvertise();
        $meinGlobus = $customerTransfer->getIsMeinGlobus();

        if (isset($we) && $we == "true") {
            $we = true;
        } else {
            $we = false;
        }
        if (isset($meinGlobus) && $meinGlobus == "true") {
            $meinGlobus = true;
        } else {
            $meinGlobus = false;
        }

        $validAddress = GlobusRestApiClientValidation::addressValidation($firstName, $lastName, $zip, $houseNo, $street, $city, $meinGlobus, $we);
        $customerData["data"] = $validAddress;

        return $this->view(
            ['customer' => $customerData],
            [],
            '@CustomerPage/views/register-success/register-success.twig'
        );
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
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getCustomerDataAPIAction(Request $request)
    {
        $firstName = $request->request->get(static::FIRST_NAME);
        $lastName = $request->request->get(static::LAST_NAME);
        $street = $request->request->get(static::STREET);
        $houseNumber = $request->request->get(static::HOUSE_NUMBER);
        $zip = $request->request->get(static::ZIP);
        $city = $request->request->get(static::CITY);
        $meinGlobus = $request->request->get(static::MEIN_GLOBUS);
        $we = $request->request->get(static::WE);

        if (isset($we) && $we == "true") {
            $we = true;
        } else {
            $we = false;
        }
        if (isset($meinGlobus) && $meinGlobus == "true") {
            $meinGlobus = true;
        } else {
            $meinGlobus = false;
        }

        $result = GlobusRestApiClientValidation::addressValidation($firstName, $lastName, $zip, $houseNumber, $street, $city, $meinGlobus, $we);

        return new JsonResponse($result);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function checkGlobusCardAction(Request $request)
    {
        $id = $request->request->get("id");
        $customerUserProvider = $this->getFactory()->createCustomerUserProvider();
        $result = $customerUserProvider->checkCardNumberAvailability($id);
        $result = json_decode($result);

        $cardNumberToSend = $id;

        $dataToSend = ['cardNumber' => $cardNumberToSend, 'is_physical' => true];

        if ($result->status === 'USED') {
            $dataToSend['is_physical'] = false;
            $dataToSend['cardNumber'] = 'used_card_error';
        } elseif ($result->status === 'INVALID' || $result->status === 'BLOCKED') {
            $dataToSend['is_physical'] = false;
            $dataToSend['cardNumber'] = GlobusRestApiClientDigitalCard::getNewGlobusCardNumber();
        }

        return new JsonResponse($dataToSend);
    }

    /**
     * @return string
     */
    protected function getGlobusApiKey(): string
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
