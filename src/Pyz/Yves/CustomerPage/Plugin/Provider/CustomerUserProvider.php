<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Provider;

use ArrayObject;
use Elastica\JSON;
use Exception;
use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\RecoTransfer;
use Generated\Shared\Transfer\ScenarioTransfer;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\CustomerPage\Controller\ProfileController;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientAccount;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult;
use Spryker\Shared\Config\Config;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerUserProvider as SprykerCustomerUserProvider;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class CustomerUserProvider extends SprykerCustomerUserProvider implements CustomerUserProviderInterface
{
    public const ERROR_NOT_VERIFIED_CUSTOMER = 'ERROR_NOT_VERIFIED_CUSTOMER';
    public const INITIAL_PASSWORD = '$#$%J%R%$)O%t43t';

    public const LOCAL_STORAGE_COOKIE_NAME = 'local_storage_cookie';

    /**
     * @param string $email
     *
     * @throws \Symfony\Component\Security\Core\Exception\AuthenticationException
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    protected function loadCustomerByEmail($email)
    {
        $customerTransfer = null;
        $pass = '';
        $accountInfo = [];
        $email = $this->getFactory()->getAntiXss()->xss_clean($email);

        if (isset($_POST["loginForm"]["password"])) {
            $pass = $_POST["loginForm"]["password"];
            $pass = $this->getFactory()->getAntiXss()->xss_clean($pass);
        }
        $uid = $this->getFactory()->getSessionClient()->get('cdcUID');
        if ($uid == null) {
            $authCheck = $this->globusLogin($email, $pass);
        } else {
            $authCheck = $this->getAccountInfo($uid);
        }
        if (!is_array($authCheck)) {
            if (!str_contains($authCheck, 'id_token')) {
                $authCheck = $this->addTokenInfo($authCheck);
            }
        }

        $unparsedAuth = $authCheck;
        $authCheck = JSON::parse($authCheck);

        if (isset($authCheck["statusCode"])) {
            if ($authCheck["statusCode"] === 403) {
                $result = $this->globusLoginWithCookie();
                if (!empty($result)) {
                    $customerTransfer = $this->loadCustomerByProfileData($result);
                    $profile = $this->getFactory()->createProfileController();
                    $profile->processProfileUpdateByTransfer($customerTransfer, false);

                    return $customerTransfer;
                }
            }
        }
        if (isset($authCheck["UID"])) {
            $this->getFactory()->getSessionClient()->set("cdcUID", $authCheck["UID"]);
            $data = $authCheck;
            try {
                $customerTransfer = parent::loadCustomerByEmail($email);
                $customerTransfer = $this->updateCustomerData($data, $pass, $customerTransfer);
                $profile = $this->getFactory()->createProfileController();
                $profile->processProfileUpdateByTransfer($customerTransfer, false);
            } catch (AuthenticationException $e) {
                $customerTransfer = $this->createNewCustomer($authCheck, $email, $pass);
            }

            try {
                if (is_array($data)) {
                    $token = $data["id_token"];

                    $recoTransfer = $this->getFactory()->getStorageClient()->getIsRecommendationsEnabled(new RecoTransfer());
                    $recoTransfer->setCustomer($customerTransfer);

                    if ($recoTransfer->getRecommendationsEnabled() === 'true') {
                        $nameActiveScenario = $this->getFactory()->getSessionClient()->get('nameActiveScenario');
                        if ($nameActiveScenario === null) {
                            $scenarioTransfer = $this->getFactory()->getRecommendationsClient()->getActiveScenarioName(new ScenarioTransfer());
                            $nameActiveScenario = $scenarioTransfer->getScenarioId();
                            $this->getFactory()->getSessionClient()->set('nameActiveScenario', $scenarioTransfer->getScenarioId());
                        }
                        $recommendationsResult = $this->globusRecommendationsData($authCheck["UID"], false, $token, $nameActiveScenario);

                        $recoTransfer = $this->getFactory()->createRecommendationsMapper()->mapResultAndTokenToRecoTransfer($recommendationsResult, $token, $recoTransfer);

                        if ($this->checkIfRecommendationsResponseIsGood($recoTransfer)) {
                            $recoTransfer = $this->addRecommendationResultsToDataTable($recommendationsResult, $token, $recoTransfer);
                        } else {
                            $recoTransfer = $this->getExistingRecoData($recoTransfer);
                        }
                    } else {
                        $recoTransfer = $this->getFactory()->getRecommendationsClient()->clearRecoData($recoTransfer);
                    }

                    if (strlen($recoTransfer->getData()) > 0) {
                        $customerTransfer->setRecoData($recoTransfer->getData());
                    }

                    $this->getFactory()->getSessionClient()->set("recoData", $customerTransfer->getRecoData());

                    $cook = $this->getFactory()->createGlobusRestApiClientCookie();
                    $cook->setLoginCookiePhp($unparsedAuth, $this->getFactory()->getSessionClient());
                    $cook->setLoginConfirmedCookiePhp();

                    $this->createQuoteCookie();
                }
            } catch (Exception $ex) {
            }
        } else {
            throw new AuthenticationException(self::ERROR_NOT_VERIFIED_CUSTOMER);
        }

        return $customerTransfer;
    }

    /**
     * @param string $data
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    public function loadCustomerByProfileData(string $data): CustomerTransfer
    {
        $user = json_decode($data, true);
        try {
            $customerTransfer = parent::loadCustomerByEmail($user["email"]);
            $customerTransfer = $this->updateCustomerData($user, static::INITIAL_PASSWORD, $customerTransfer);
        } catch (Exception $ex) {
            $customerTransfer = $this->createNewCustomer($user, $user["email"], static::INITIAL_PASSWORD);
        }

        return $customerTransfer;
    }

    /**
     * @param mixed $data
     * @param string $password
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    private function updateCustomerData($data, string $password, CustomerTransfer $customerTransfer): CustomerTransfer
    {
        $customerTransfer = $this->getFactory()->createCustomerTransferCustom()->fromProfileEvent($data, $customerTransfer);
        if (empty($customerTransfer->getCity())) {
            $customerTransfer = $this->populateCustomerAddress($customerTransfer);
        }
        $user = $this->getFactory()->createSecurityUser($customerTransfer);

        $encoder = $this->getContainer()->get('security.encoder_factory');
        $encodedPass = $encoder->getEncoder($user)->encodePassword($password, $user->getSalt());
        if ($customerTransfer->getPassword() != $encodedPass) {
            $customerTransfer->setPassword($encodedPass);
        }
        $this->getFactory()->getCustomerClient()->updateCustomer($customerTransfer);

        return $customerTransfer;
    }

    /**
     * @param mixed $data
     * @param string $email
     * @param string $password
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    private function createNewCustomer($data, string $email, string $password): CustomerTransfer
    {
        $email = $this->getFactory()->getAntiXss()->xss_clean($email);
        $password = $this->getFactory()->getAntiXss()->xss_clean($password);
        $customerTransfer = $this->getFactory()->createCustomerTransferCustom()->fromProfileEvent($data);
        $customerTransfer->setUsername($email);
        $customerTransfer->setPassword($password);
        $customerTransfer->setCustomerReference($this->getFactory()->getStore()->getStoreName());
        $this->registerCustomer($customerTransfer);

        $customerTransfer = parent::loadCustomerByEmail($email);
        $customerTransfer->setRegistered(date('yy-m-d'));
        $customerTransfer->setRegistrationKey(null);
        $customerTransfer = $this->populateCustomerAddress($customerTransfer);
        $this->getFactory()->getCustomerClient()->updateCustomer($customerTransfer);

        return $customerTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    private function populateCustomerAddress(CustomerTransfer $customerTransfer): CustomerTransfer
    {
        $addresses = $this->getFactory()->getCustomerClient()->getAddresses($customerTransfer);
        foreach ($addresses->getAddresses() as $address) {
            if ($address->getIdCustomerAddress() == $customerTransfer->getDefaultBillingAddress()) {
                $customerTransfer->setBillingAddress(new ArrayObject([$address]));
                $customerTransfer
                    ->setCity($address->getCity())
                    ->setAddress1($address->getAddress1())
                    ->setAddress2($address->getAddress2())
                    ->setZipCode($address->getZipCode());
            }
            if ($address->getIdCustomerAddress() == $customerTransfer->getDefaultShippingAddress()) {
                $customerTransfer->setShippingAddress(new ArrayObject([$address]));
            }
        }

        return $customerTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return mixed
     */
    public function updateAccountInfo(CustomerTransfer $customerTransfer)
    {
        $uid = $this->getFactory()->getSessionClient()->get("cdcUID");
        $idToken = $this->getFactory()->getSessionClient()->get("id_token");
        if (!$uid || !$idToken) {
            return null;
        }
        $data = [
            'profile' => '{"phones": [{"type":"landLine", "number":"' . $customerTransfer->getPhone() . '"}, {"type":"mobile", "number":"' . $customerTransfer->getMobilePhoneNumber() . '"}]}',
        ];

        $result = GlobusRestApiClientAccount::changeAccountData($uid, $data, $idToken);

        $profile = new ProfileController();
        $profile->processProfileUpdateByTransfer($customerTransfer, false);

        return $result->resultToJson();
    }

    /**
     * @param string $uid
     *
     * @return array|string
     */
    public function getAccountInfo(string $uid)
    {
        $idToken = $this->getFactory()->getSessionClient()->get("id_token");

        if ($uid == null || $idToken == null) {
            return [];
        }

        return GlobusRestApiClientAccount::getAccountInfo($uid, $idToken);
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerResponseTransfer
     */
    protected function registerCustomer(CustomerTransfer $customerTransfer)
    {
        return $this
            ->getFactory()
            ->getAuthenticationHandler()
            ->registerCustomer($customerTransfer);
    }

    /**
     * @return string
     */
    public function getCdcApiKey(): string
    {
        $globus_cdc_credentials = Config::get(CustomerConstants::CDC_CONSTANTS);

        $apiKey = '';
        if (isset($globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_KEY])) {
            $apiKey = $globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_KEY];
        }

        return $apiKey;
    }

    /**
     * @return string
     */
    public function getCdcSecretKey(): string
    {
        $globus_cdc_credentials = Config::get(CustomerConstants::CDC_CONSTANTS);

        $apiSecretKey = '';
        if (isset($globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_SECRET_KEY])) {
            $apiSecretKey = $globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_SECRET_KEY];
        }

        return $apiSecretKey;
    }

    /**
     * @return string
     */
    public function getCdcUserKey(): string
    {
        $globus_cdc_credentials = Config::get(CustomerConstants::CDC_CONSTANTS);

        $apiUserKey = '';
        if (isset($globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_USER_KEY])) {
            $apiUserKey = $globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_USER_KEY];
        }

        return $apiUserKey;
    }

    /**
     * @return string
     */
    public function getCdcUrlPrefix(): string
    {
        $globus_cdc_credentials = Config::get(CustomerConstants::CDC_CONSTANTS);

        $urlPrefix = '';
        if (isset($globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_URL])) {
            $urlPrefix = $globus_cdc_credentials[CustomerConstants::CDC_LOCAL_CREDENTIALS][CustomerConstants::CDC_API_URL];
        }

        return $urlPrefix;
    }

     /**
      * @return string
      */
    public function getCaptchaSecretKey(): string
    {
        $globus_api_credentials = Config::get(CustomerConstants::GOOGLE_CAPTCHA_CONSTANTS);

        $apiSecretKey = '';
        if (isset($globus_api_credentials[CustomerConstants::GOOGLE_CAPTCHA_CREDENTIALS][CustomerConstants::GOOGLE_CAPTCHA_SECRET])) {
            $apiSecretKey = $globus_api_credentials[CustomerConstants::GOOGLE_CAPTCHA_CREDENTIALS][CustomerConstants::GOOGLE_CAPTCHA_SECRET];
        }

        return $apiSecretKey;
    }

    /**
     * @param string $emailOrCardNumber
     *
     * @return string
     */
    public function checkEmailOrCardAvailability(string $emailOrCardNumber): string
    {
        return GlobusRestApiClientAccount::checkEmailOrCardAvailability($emailOrCardNumber);
    }

    /**
     * @param string|null $cardNumber
     *
     * @return string
     */
    public function checkCardNumberAvailability(?string $cardNumber): string
    {
        return GlobusRestApiClientAccount::checkCardNumberAvailability($cardNumber);
    }

    /**
     * @param string $emailOrCardNumber
     * @param string $password
     *
     * @return string
     */
    public function globusLogin(string $emailOrCardNumber, string $password): string
    {
        return GlobusRestApiClientAccount::login($emailOrCardNumber, $password);
    }

    /**
     * @param string $uid
     * @param bool $remoteTracking
     * @param string $bearerToken
     *
     * @return \Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult
     */
    public function globusRecommendationsData(string $uid, bool $remoteTracking, string $bearerToken, string $nameActiveScenario): GlobusRestApiResult
    {
        $recommendation = $this->getFactory()->createGlobusRestApiRecommendations();

        $recommendation->createRecommendation($uid, $remoteTracking, $bearerToken);

        $recommendation->createScenario($nameActiveScenario, '');

        $recommendation->addLeadingObject('1', 'productLeading');
        $recommendation->addBasketObject('1', 'productBasket');

        $recommendation->addScenario();

        return $recommendation->postRecommendations();
    }

    /**
     * @param \Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult $result
     * @param string $token
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    protected function addRecommendationResultsToDataTable(GlobusRestApiResult $result, string $token, RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFactory()->getRecommendationsClient()->insertRecoData($recoTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return bool
     */
    protected function checkIfRecommendationsResponseIsGood(RecoTransfer $recoTransfer): bool
    {
        $parsedResult = JSON::parse($recoTransfer->getApiResult());
        if (isset($parsedResult['code']) && $parsedResult['code'] === '200') {
            return true;
        }

        return false;
    }

    /**
     * @param \Generated\Shared\Transfer\RecoTransfer $recoTransfer
     *
     * @return \Generated\Shared\Transfer\RecoTransfer
     */
    protected function getExistingRecoData(RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFactory()->getRecommendationsClient()->getExistingRecoData($recoTransfer);
    }

    /**
     * @return string
     */
    public function globusLoginWithCookie(): string
    {
        return GlobusRestApiClientAccount::loginWithCookie();
    }

    /**
     * @return void
     */
    protected function createQuoteCookie()
    {
        $cookieTransfer = $this->getFactory()->createLocalStorageCookieTransfer();

        $listOfItemsForCookie = [];
        $items = $this->getFactory()->getQuoteClient()->getQuote()->getItems() ?? null;
        foreach ($items as $item) {
            $listOfItemsForCookie[] = [$item->getSku(), $item->getQuantity(), true];
        }

        $cookieTransfer->setName(static::LOCAL_STORAGE_COOKIE_NAME);
        $cookieTransfer->setExpires((time() + (86400 * 30)));
        $cookieTransfer->setPath('/');
        $cookieTransfer->setData(trim(JSON::stringify($listOfItemsForCookie)));
        $cookieTransfer->setCookieStringValue("Set-cookie: " . $cookieTransfer->getName() . "=" . $cookieTransfer->getData() . "; expires=" . $cookieTransfer->getExpires() . "; path=" . $cookieTransfer->getPath()/* . "; domain=" . $cookieTransfer->getDomain()*/);

        header($cookieTransfer->getCookieStringValue());
    }

    /**
     * @param string $authCheck
     *
     * @return string
     */
    protected function addTokenInfo(string $authCheck): string
    {
        $authCheck = trim($authCheck);
        $authCheck = substr($authCheck, 0, strlen($authCheck) - 1);
        $authCheck .= ',' . '"id_token":"' . $this->getFactory()->getSessionClient()->get("id_token") . '"';
        $authCheck .= ',' . '"strongToken":false';
        $authCheck .= ',' . '"tokenIssuedAt":"2022-06-03T13:30:18.000+0000"';
        $authCheck .= ',' . '"tokenExpiresAt":"2032-06-03T13:30:18.000+0000"}';

        return $authCheck;
    }
}
