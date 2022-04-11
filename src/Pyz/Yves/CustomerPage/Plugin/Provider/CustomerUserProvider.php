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
use Pyz\Client\Recommendations\RecommendationsClient;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\CustomerPage\Controller\ProfileController;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientAccount;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientCookie;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult;
use Spryker\Shared\Config\Config;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerUserProvider as SprykerCustomerUserProvider;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 * @method RecommendationsClient getClient()
 */
class CustomerUserProvider extends SprykerCustomerUserProvider implements CustomerUserProviderInterface
{
    public const ERROR_NOT_VERIFIED_CUSTOMER = 'ERROR_NOT_VERIFIED_CUSTOMER';
    public const INITIAL_PASSWORD = '$#$%J%R%$)O%t43t';

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
        $authCheck = $this->globusLogin($email, $pass);
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
                    $res = GlobusRestApiClientAccount::loginWithToken($token);

                    $recoTransfer = $this->getFactory()->getStorageClient()->getIsRecommendationsEnabled(new RecoTransfer());
                    $recoTransfer->setCustomer($customerTransfer);

                    if ($recoTransfer->getRecommendationsEnabled() === "true") {
                        $recommendationsResult = $this->globusRecommendationsData($authCheck["UID"], false, $token);

                        // $recommendationsResult->result = '{"UserId": "931bed344d82471cba084791ca6b39a6", "UserType": "GIGYA_ID", "ExternalTracking": false, "ScenarioHashes": {"results": [{"ScenarioId": "TOPSELLER_60", "HashId": "2B188A50B02794B67F6CB4F50947E64E", "ExpiresOn": "/Date(1649128410479)/", "ResultScope": "G"}]}, "ResultObjects": {"results": [{"ScenarioId": "TOPSELLER_60", "ResultObjectType": "SAP_ERP_MATNR", "ResultObjectId": "4001432058030", "ResultObjectScore": "1.00000"},{"ScenarioId": "TOPSELLER_60", "ResultObjectType": "SAP_ERP_MATNR", "ResultObjectId": "4001432058040", "ResultObjectScore": "1.00000"}]}, "code": "200", "message": "success"}';

                        $recoTransfer = $this->getFactory()->createRecommendationsMapper()->mapResultAndTokenToRecoTransfer($recommendationsResult, $token, $recoTransfer);

                        if ($this->checkIfRecommendationsResponseIsGood($recoTransfer)) {
                            $recoTransfer = $this->addRecommendationResultsToDataTable($recommendationsResult, $token, $recoTransfer);
                        } else {
                            // when api call fails take what is written in database
                            $recoTransfer = $this->getExistingRecoData($recoTransfer);
                        }

                    } else {
                        // if recommendations are not enabled than clear reco field data
                        $recoTransfer = $this->getFactory()->getRecommendationsClient()->clearRecoData($recoTransfer);
                    }
                    $nekaj = $recoTransfer;
                    $cook = new GlobusRestApiClientCookie();
                    $cook->setLoginCookiePhp($res, $this->getFactory()->getSessionClient());
                    $cook->setLoginConfirmedCookiePhp();
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
     * @return GlobusRestApiResult
     */
    public function globusRecommendationsData(string $uid, bool $remoteTracking, string $bearerToken): GlobusRestApiResult
    {
        $recommendation = $this->getFactory()->createGlobusRestApiRecommendations();

        $recommendation->createRecommendation($uid, $remoteTracking, $bearerToken);

        $recommendation->createScenario('TOPSELLER_60', '');

        $recommendation->addLeadingObject('1', 'productLeading');
        $recommendation->addBasketObject('1', 'productBasket');

        $recommendation->addScenario();

        // $recommendation->addContextParam('TOPSELLER_60', 'context_Moj');
        // $recommendation->addScenarioHash('TOPSELLER_60', '24', '2022-05-05 23:59:59', 'all');
        // $recommendation->addResultObject('TOPSELLER_60', 'product', '15', '100');

        return $recommendation->postRecommendations();
    }

    /**
     * @param GlobusRestApiResult $result
     * @param string $token
     * @param RecoTransfer $recoTransfer
     *
     * @return void
     */
    protected function addRecommendationResultsToDataTable(GlobusRestApiResult $result, string $token, RecoTransfer $recoTransfer): RecoTransfer
    {
        return $this->getFactory()->getRecommendationsClient()->insertRecoData($recoTransfer);
    }

    /**
     * @param RecoTransfer $recoTransfer
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
     * @param RecoTransfer $recoTransfer
     *
     * @return RecoTransfer
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
}
