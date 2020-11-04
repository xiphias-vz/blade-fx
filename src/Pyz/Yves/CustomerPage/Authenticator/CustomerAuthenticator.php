<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Authenticator;

use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Yves\MerchantSwitcherWidget\Plugin\SelectedMerchantCookiePlugin;
use Spryker\Client\Session\SessionClientInterface;
use SprykerShop\Yves\CustomerPage\Authenticator\CustomerAuthenticator as SprykerCustomerAuthenticator;
use SprykerShop\Yves\CustomerPage\Dependency\Client\CustomerPageToCustomerClientInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class CustomerAuthenticator extends SprykerCustomerAuthenticator
{
    /**
     * @var \Pyz\Yves\MerchantSwitcherWidget\Plugin\SelectedMerchantCookiePlugin
     */
    private $selectedMerchantCookiePlugin;

    /**
     * @var \Spryker\Client\Session\SessionClientInterface
     */
    private $sessionClient;

    /**
     * @param \SprykerShop\Yves\CustomerPage\Dependency\Client\CustomerPageToCustomerClientInterface $customerClient
     * @param \Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface $tokenStorage
     * @param \Pyz\Yves\MerchantSwitcherWidget\Plugin\SelectedMerchantCookiePlugin $selectedMerchantCookie
     * @param \Spryker\Client\Session\SessionClientInterface $sessionClient
     */
    public function __construct(
        CustomerPageToCustomerClientInterface $customerClient,
        TokenStorageInterface $tokenStorage,
        SelectedMerchantCookiePlugin $selectedMerchantCookie,
        SessionClientInterface $sessionClient
    ) {
        parent::__construct($customerClient, $tokenStorage);
        $this->selectedMerchantCookiePlugin = $selectedMerchantCookie;
        $this->sessionClient = $sessionClient;
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     * @param \Symfony\Component\Security\Core\Authentication\Token\TokenInterface $token
     *
     * @return void
     */
    public function authenticateCustomer(CustomerTransfer $customerTransfer, TokenInterface $token): void
    {
        parent::authenticateCustomer($customerTransfer, $token);

        $this->sessionClient->migrate(true);

        $this->setMerchantReferenceCookie($customerTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return void
     */
    protected function setMerchantReferenceCookie(CustomerTransfer $customerTransfer): void
    {
        if (!$customerTransfer->getMerchantReference()) {
            return;
        }

        $this->selectedMerchantCookiePlugin->setMerchantReference($customerTransfer->getMerchantReference());
    }
}
