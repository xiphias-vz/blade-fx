<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage;

use Generated\Shared\Transfer\PdfParametersTransfer;
use Pyz\Client\Customer\CustomerClientInterface;
use Pyz\Client\MerchantSearch\MerchantSearchClientInterface;
use Pyz\Client\MerchantStorage\MerchantStorageClientInterface;
use Pyz\Client\OrderDetail\OrderDetailClientInterface;
use Pyz\Client\Pdf\PdfClientInterface;
use Pyz\Client\SalesOrderActions\SalesOrderActionsClientInterface;
use Pyz\Service\DataDog\DataDogServiceInterface;
use Pyz\Service\User\UserServiceInterface;
use Pyz\Shared\Pdf\PdfConfig;
use Pyz\Yves\CustomerPage\Authenticator\CustomerAuthenticator;
use Pyz\Yves\CustomerPage\Form\Constraints\PasswordConstraint;
use Pyz\Yves\CustomerPage\Form\FormFactory;
use Pyz\Yves\CustomerPage\Plugin\Provider\CustomerAuthenticationFailureHandler;
use Pyz\Yves\CustomerPage\Plugin\Provider\CustomerAuthenticationSuccessHandler;
use Pyz\Yves\CustomerPage\Plugin\Provider\CustomerUserProvider;
use Pyz\Yves\MerchantSwitcherWidget\Plugin\SelectedMerchantCookiePlugin;
use Pyz\Yves\MerchantSwitcherWidget\Reader\MerchantShopContextReader;
use Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver;
use Pyz\Yves\ShopApplication\ShopApplicationDependencyProvider;
use Spryker\Client\Session\SessionClientInterface;
use Spryker\Yves\Kernel\Plugin\Pimple;
use SprykerShop\Yves\CustomerPage\Authenticator\CustomerAuthenticatorInterface;
use SprykerShop\Yves\CustomerPage\CustomerPageFactory as SprykerShopCustomerPageFactory;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Twig\Environment;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageConfig getConfig()
 */
class CustomerPageFactory extends SprykerShopCustomerPageFactory
{
    /**
     * @param string|null $targetUrl
     *
     * @return \Pyz\Yves\CustomerPage\Plugin\Provider\CustomerAuthenticationFailureHandler|\SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerAuthenticationFailureHandler
     */
    public function createCustomerAuthenticationFailureHandler(?string $targetUrl = null)
    {
        return new CustomerAuthenticationFailureHandler($targetUrl);
    }

    /**
     * @return \SprykerShop\Yves\CustomerPage\Form\FormFactory
     */
    public function createCustomerFormFactory()
    {
        return new FormFactory();
    }

    /**
     * @return \SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerAuthenticationSuccessHandler
     */
    public function createCustomerAuthenticationSuccessHandler()
    {
        return new CustomerAuthenticationSuccessHandler();
    }

    /**
     * @return \Pyz\Client\Customer\CustomerClientInterface
     */
    public function getBaseCustomerClient(): CustomerClientInterface
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::CLIENT_BASE_CUSTOMER);
    }

    /**
     * @return \SprykerShop\Yves\CustomerPage\Plugin\CheckoutAuthenticationHandlerPluginInterface[]
     */
    public function getCustomerAuthenticationHandlerPlugins()
    {
        return [
            $this->getLoginCheckoutAuthenticationHandlerPlugin(),
            $this->getRegistrationAuthenticationHandlerPlugin(),
        ];
    }

    /**
     * @return \SprykerShop\Yves\CustomerPage\Authenticator\CustomerAuthenticatorInterface
     */
    public function createCustomerAuthenticator(): CustomerAuthenticatorInterface
    {
        return new CustomerAuthenticator(
            $this->getCustomerClient(),
            $this->getTokenStorage(),
            $this->getSelectedMerchantCookiePlugin(),
            $this->getSessionClient()
        );
    }

    /**
     * @return \Twig\Environment
     */
    public function getTwigEnvironment(): Environment
    {
        return (new Pimple())->getApplication()['twig'];
    }

    /**
     * @return \Pyz\Yves\CustomerPage\Form\Constraints\PasswordConstraint
     */
    public function createPasswordConstraint(): PasswordConstraint
    {
        return new PasswordConstraint([PasswordConstraint::OPTION_USER_SERVICE => $this->getUserService()]);
    }

    /**
     * @return \Pyz\Client\Pdf\PdfClientInterface
     */
    public function getPdfClient(): PdfClientInterface
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::CLIENT_PDF);
    }

    /**
     * @return \Generated\Shared\Transfer\PdfParametersTransfer
     */
    public function getPdfInvoiceConfig(): PdfParametersTransfer
    {
        return (new PdfParametersTransfer())
            ->setMode(PdfConfig::PDF_MODE_UTF8)
            ->setOrientation(PdfConfig::PDF_ORIENTATION_PORTRAIT);
    }

    /**
     * @return \Pyz\Client\OrderDetail\OrderDetailClientInterface
     */
    public function getOrderDetailClient(): OrderDetailClientInterface
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::CLIENT_ORDER_DETAIL);
    }

    /**
     * @return \Pyz\Client\SalesOrderActions\SalesOrderActionsClientInterface
     */
    public function getSalesOrderActionsClient(): SalesOrderActionsClientInterface
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::CLIENT_SALES_ORDER_ACTIONS);
    }

    /**
     * @return \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface
     */
    public function getCsrfTokenManager(): CsrfTokenManagerInterface
    {
        return $this->getApplication()->get(ShopApplicationDependencyProvider::SERVICE_FORM_CSRF_PROVIDER);
    }

    /**
     * @return \Pyz\Client\MerchantSearch\MerchantSearchClientInterface
     */
    public function getMerchantSearchClient(): MerchantSearchClientInterface
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::CLIENT_MERCHANT_SEARCH);
    }

    /**
     * @return \Pyz\Yves\MerchantSwitcherWidget\Plugin\SelectedMerchantCookiePlugin
     */
    private function getSelectedMerchantCookiePlugin(): SelectedMerchantCookiePlugin
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::SELECTED_MERCHANT_COOKIE_PLUGIN);
    }

    /**
     * @return \Spryker\Client\Session\SessionClientInterface
     */
    private function getSessionClient(): SessionClientInterface
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::CLIENT_SESSION);
    }

    /**
     * @return \Pyz\Service\DataDog\DataDogServiceInterface
     */
    public function getDataDogService(): DataDogServiceInterface
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::SERVICE_DATA_DOG);
    }

    /**
     * @return \Pyz\Service\User\UserServiceInterface
     */
    public function getUserService(): UserServiceInterface
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::SERVICE_USER);
    }

    /**
     * @return \Symfony\Component\Security\Core\User\UserProviderInterface
     */
    public function createCustomerUserProvider()
    {
        return new CustomerUserProvider($this->createShopContextResolver());
    }

    public function createMerchantShopContextReader(): MerchantShopContextReader
    {
        return new MerchantShopContextReader(
            $this->createShopContextResolver(),
            $this->getMerchantStorageClient()
        );
    }
    /**
     * @return \Pyz\Yves\MerchantSwitcherWidget\Resolver\ShopContextResolver
     */
    public function createShopContextResolver(): ShopContextResolver
    {
        return new ShopContextResolver($this->getApplication());
    }

    public function getMerchantStorageClient(): MerchantStorageClientInterface
    {
        return $this->getProvidedDependency(MerchantSwitcherWidgetDependencyProvider::CLIENT_MERCHANT_STORAGE);
    }
}

