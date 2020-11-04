<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Pyz\Yves\CustomerPage\Form\LoginForm;
use Pyz\Yves\CustomerPage\Form\RegisterForm;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCustomerClientInterface;
use SprykerShop\Yves\CheckoutPage\Process\Steps\CustomerStep as SprykerShopCustomerStep;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class CustomerStep extends SprykerShopCustomerStep
{
    /**
     * @var \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface
     */
    private $csrfTokenManager;

    /**
     * @param \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCustomerClientInterface $customerClient
     * @param \Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginInterface $customerStepHandler
     * @param string $stepRoute
     * @param string $escapeRoute
     * @param string $logoutRoute
     * @param \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface $csrfTokenManager
     */
    public function __construct(
        CheckoutPageToCustomerClientInterface $customerClient,
        StepHandlerPluginInterface $customerStepHandler,
        $stepRoute,
        $escapeRoute,
        $logoutRoute,
        CsrfTokenManagerInterface $csrfTokenManager
    ) {
        parent::__construct($customerClient, $customerStepHandler, $stepRoute, $escapeRoute, $logoutRoute);

        $this->csrfTokenManager = $csrfTokenManager;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function postCondition(AbstractTransfer $quoteTransfer): bool
    {
        if ($this->isCustomerInQuote($quoteTransfer) === false) {
            return false;
        }

        //todo: remove Test guest orders
        if ($quoteTransfer->getCustomer()->getFirstName() === 'test order') {
            return true;
        }

        $customerTransfer = $this->customerClient->getCustomer();
        if (!$customerTransfer) {
            $this->externalRedirect = $this->logoutRoute;

            return false;
        }

        return true;
    }

    /**
     * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $dataTransfer
     *
     * @return array
     */
    public function getTemplateVariables(AbstractTransfer $dataTransfer)
    {
        $this->csrfTokenManager->refreshToken(RegisterForm::FORM_NAME);
        $this->csrfTokenManager->refreshToken(LoginForm::FORM_NAME);

        return parent::getTemplateVariables($dataTransfer);
    }
}
