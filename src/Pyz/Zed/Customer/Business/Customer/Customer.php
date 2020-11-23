<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Business\Customer;

use DateTime;
use Generated\Shared\Transfer\CustomerErrorTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\MailTransfer;
use Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface;
use Pyz\Shared\Cms\CmsBlockConfig;
use Pyz\Shared\Customer\CustomerConfig as SharedCustomerConfig;
use Pyz\Zed\CustomerConfirmationPage\Communication\Plugin\Mail\RegistrationMailTypePlugin;
use Pyz\Zed\MerchantRegion\Business\MerchantRegionFacadeInterface;
use Spryker\Shared\Customer\Code\Messages;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Customer\Business\Customer\Customer as SprykerCustomer;
use Spryker\Zed\Customer\Business\Customer\EmailValidatorInterface;
use Spryker\Zed\Customer\Business\CustomerExpander\CustomerExpanderInterface;
use Spryker\Zed\Customer\Business\Exception\CustomerNotFoundException;
use Spryker\Zed\Customer\Business\ReferenceGenerator\CustomerReferenceGeneratorInterface;
use Spryker\Zed\Customer\Communication\Plugin\Mail\CustomerRestoredPasswordConfirmationMailTypePlugin;
use Spryker\Zed\Customer\Communication\Plugin\Mail\CustomerRestorePasswordMailTypePlugin;
use Spryker\Zed\Customer\CustomerConfig;
use Spryker\Zed\Customer\Dependency\Facade\CustomerToMailInterface;
use Spryker\Zed\Customer\Persistence\CustomerQueryContainerInterface;
use Spryker\Zed\Locale\Persistence\LocaleQueryContainerInterface;

class Customer extends SprykerCustomer
{
    private const DEFAULT_MERCHANT_REFERENCE = 'Berlin_83_10115';

    /**
     * @var \Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface
     */
    private $mailCmsBlockService;

    /**
     * @var \Pyz\Zed\MerchantRegion\Business\MerchantRegionFacadeInterface
     */
    private $merchantRegionFacade;

    /**
     * @var \Pyz\Zed\Customer\CustomerConfig
     */
    protected $customerConfig;

    /**
     * @param \Spryker\Zed\Customer\Persistence\CustomerQueryContainerInterface $queryContainer
     * @param \Spryker\Zed\Customer\Business\ReferenceGenerator\CustomerReferenceGeneratorInterface $customerReferenceGenerator
     * @param \Spryker\Zed\Customer\CustomerConfig $customerConfig
     * @param \Spryker\Zed\Customer\Business\Customer\EmailValidatorInterface $emailValidator
     * @param \Spryker\Zed\Customer\Dependency\Facade\CustomerToMailInterface $mailFacade
     * @param \Spryker\Zed\Locale\Persistence\LocaleQueryContainerInterface $localeQueryContainer
     * @param \Spryker\Shared\Kernel\Store $store
     * @param \Spryker\Zed\Customer\Business\CustomerExpander\CustomerExpanderInterface $customerExpander
     * @param array $postCustomerRegistrationPlugins
     * @param \Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface $mailCmsBlockService
     * @param \Pyz\Zed\MerchantRegion\Business\MerchantRegionFacadeInterface $merchantRegionFacade
     */
    public function __construct(
        CustomerQueryContainerInterface $queryContainer,
        CustomerReferenceGeneratorInterface $customerReferenceGenerator,
        CustomerConfig $customerConfig,
        EmailValidatorInterface $emailValidator,
        CustomerToMailInterface $mailFacade,
        LocaleQueryContainerInterface $localeQueryContainer,
        Store $store,
        CustomerExpanderInterface $customerExpander,
        array $postCustomerRegistrationPlugins,
        MailCmsBlockServiceInterface $mailCmsBlockService,
        MerchantRegionFacadeInterface $merchantRegionFacade
    ) {
        parent::__construct(
            $queryContainer,
            $customerReferenceGenerator,
            $customerConfig,
            $emailValidator,
            $mailFacade,
            $localeQueryContainer,
            $store,
            $customerExpander,
            $postCustomerRegistrationPlugins
        );

        $this->mailCmsBlockService = $mailCmsBlockService;
        $this->merchantRegionFacade = $merchantRegionFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return bool
     */
    protected function sendRegistrationToken(CustomerTransfer $customerTransfer): bool
    {
        if ($this->isTestCustomer($customerTransfer) || $this->isThirdPartyRegistration($customerTransfer)) {
            return true;
        }

        $customerTransfer = $this->get($customerTransfer);
        $storePrefix = $this->getStorePrefix($customerTransfer);
        $confirmationLink = $this->customerConfig
            ->getRegisterConfirmTokenUrl($customerTransfer->getRegistrationKey(), $storePrefix);

        if ($customerTransfer->getRegisterFromCheckout()) {
            $confirmationLink .= '&' . SharedCustomerConfig::PARAM_CONTINUE_CHECKOUT . '=1';
        }

        $customerTransfer->setConfirmationLink($confirmationLink);

        $mailTransfer = new MailTransfer();
        $mailTransfer->setType(RegistrationMailTypePlugin::MAIL_TYPE)
            ->setCmsBlockName(CmsBlockConfig::CMS_BLOCK_EMAIL_REGISTRATION)
            ->setCmsBlockPlaceholders(
                $this->mailCmsBlockService->convertArrayToPlaceholders($this->getCmsBlockPlaceholders($customerTransfer))
            )
            ->setCustomer($customerTransfer)
            ->setLocale($customerTransfer->getLocale());

        $this->mailFacade->handleMail($mailTransfer);

        return true;
    }

    /**
     * todo: Remove Test Orders
     *
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return bool
     */
    protected function isTestCustomer(CustomerTransfer $customerTransfer)
    {
        return $customerTransfer->getFirstName() === 'test order';
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return bool
     */
    protected function isThirdPartyRegistration(CustomerTransfer $customerTransfer): bool
    {
        return $customerTransfer->getThirdPartyRegistration() === true;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return void
     */
    protected function sendPasswordRestoreToken(CustomerTransfer $customerTransfer)
    {
        $customerTransfer = $this->get($customerTransfer);
        $storePrefix = $this->getStorePrefix($customerTransfer);
        $restorePasswordLink = $this->customerConfig
            ->getCustomerPasswordRestoreTokenUrl($customerTransfer->getRestorePasswordKey(), $storePrefix);

        $customerTransfer->setRestorePasswordLink($restorePasswordLink);

        $mailTransfer = new MailTransfer();
        $mailTransfer->setType(CustomerRestorePasswordMailTypePlugin::MAIL_TYPE)
            ->setCmsBlockName(CmsBlockConfig::CMS_BLOCK_EMAIL_RESTORE_PASSWORD)
            ->setCmsBlockPlaceholders(
                $this->mailCmsBlockService->convertArrayToPlaceholders($this->getCmsBlockPlaceholders($customerTransfer))
            )
            ->setCustomer($customerTransfer)
            ->setLocale($customerTransfer->getLocale());

        $this->mailFacade->handleMail($mailTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return void
     */
    protected function sendPasswordRestoreConfirmation(CustomerTransfer $customerTransfer)
    {
        $customerTransfer = $this->get($customerTransfer);

        $mailTransfer = new MailTransfer();
        $mailTransfer->setType(CustomerRestoredPasswordConfirmationMailTypePlugin::MAIL_TYPE)
            ->setCmsBlockName(CmsBlockConfig::CMS_BLOCK_EMAIL_RESTORED_PASSWORD)
            ->setCmsBlockPlaceholders(
                $this->mailCmsBlockService->convertArrayToPlaceholders($this->getCmsBlockPlaceholders($customerTransfer))
            )
            ->setCustomer($customerTransfer)
            ->setLocale($customerTransfer->getLocale());

        $this->mailFacade->handleMail($mailTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return array
     */
    protected function getCmsBlockPlaceholders(CustomerTransfer $customerTransfer): array
    {
        $placeholders = $customerTransfer->modifiedToArray(true, true);

        $merchantReference = $customerTransfer->getMerchantReference() ?? self::DEFAULT_MERCHANT_REFERENCE;

        $merchantRegionTransfer = $this->merchantRegionFacade->getByMerchantReference($merchantReference);

        $placeholders['divisionSubDomain'] =
            $placeholders['baseUrlYves'] = $this->customerConfig->getHostYves();
        $placeholders['divisionLongName'] = $merchantRegionTransfer->getRegionName();
        $placeholders['divisionStreet'] = $merchantRegionTransfer->getStreet();
        $placeholders['divisionZipCode'] = $merchantRegionTransfer->getZipCode();
        $placeholders['divisionTown'] = $merchantRegionTransfer->getCity();
        $placeholders['divisionFooter'] = $this->mailCmsBlockService->convertNewLineToBr($merchantRegionTransfer->getFooterText());

        return $placeholders;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    public function confirmRegistration(CustomerTransfer $customerTransfer)
    {
        try {
            $customerTransfer = parent::confirmRegistration($customerTransfer);

            return $this->get($customerTransfer);
        } catch (CustomerNotFoundException $e) {
            return $customerTransfer;
        }
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerResponseTransfer
     */
    public function restorePassword(CustomerTransfer $customerTransfer)
    {
        $customerTransfer = $this->encryptPassword($customerTransfer);

        $customerResponseTransfer = $this->createCustomerResponseTransfer();

        try {
            $customerEntity = $this->getCustomer($customerTransfer);
        } catch (CustomerNotFoundException $e) {
            $customerError = new CustomerErrorTransfer();
            $customerError->setMessage(Messages::CUSTOMER_TOKEN_INVALID);

            $customerResponseTransfer
                ->setIsSuccess(false)
                ->addError($customerError);

            return $customerResponseTransfer;
        }

        $customerEntity->setRestorePasswordDate(null);
        $customerEntity->setRestorePasswordKey(null);
        $customerEntity->setRegistrationKey(null);

        if (!$customerEntity->getRegistered()) {
            $customerEntity->setRegistered(new DateTime());
        }

        $customerEntity->setPassword($customerTransfer->getPassword());

        $customerEntity->save();
        $customerTransfer->fromArray($customerEntity->toArray(), true);
        $this->sendPasswordRestoreConfirmation($customerTransfer);

        $customerResponseTransfer->setCustomerTransfer($customerTransfer);

        return $customerResponseTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return string|null
     */
    protected function getStorePrefix(CustomerTransfer $customerTransfer): ?string
    {
        if ($customerTransfer->getLocale() === null) {
            return null;
        }

        return array_search($customerTransfer->getLocale()->getLocaleName(), $this->store->getLocales());
    }
}
