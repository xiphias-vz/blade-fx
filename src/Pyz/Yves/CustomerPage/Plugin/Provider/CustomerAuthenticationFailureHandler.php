<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Provider;

use Pyz\Shared\DataDog\DataDogConfig;
use Spryker\Yves\Messenger\FlashMessenger\FlashMessengerInterface;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\BaseCustomerAuthenticationHandler;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;

/**
 * @method \Spryker\Client\Customer\CustomerClientInterface getClient()
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class CustomerAuthenticationFailureHandler extends BaseCustomerAuthenticationHandler implements AuthenticationFailureHandlerInterface
{
    protected const MESSAGE_CUSTOMER_AUTHENTICATION_FAILED = 'customer.authentication.failed';

    /**
     * @uses \Pyz\Yves\Messenger\Plugin\Application\FlashMessengerApplicationPlugin::SERVICE_FLASH_MESSENGER
     */
    protected const SERVICE_FLASH_MESSENGER = 'flash_messenger';

    /**
     * @var string|null
     */
    protected $targetUrl;

    /**
     * @param string|null $targetUrl
     */
    public function __construct(?string $targetUrl = null)
    {
        $this->targetUrl = $targetUrl;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Symfony\Component\Security\Core\Exception\AuthenticationException $exception
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        $this->getFlashMessenger()->addErrorMessage(static::MESSAGE_CUSTOMER_AUTHENTICATION_FAILED);

        $this->getFactory()->getDataDogService()->increment([
            DataDogConfig::DATA_DOG_USER_AUTH_LOGIN_ERROR_STAT,
        ], [DataDogConfig::DATA_DOG_REGION_SCOPE => APPLICATION_STORE]);

        return $this->createRefererRedirectResponse($request, $this->targetUrl);
    }

    /**
     * @return \Spryker\Yves\Messenger\FlashMessenger\FlashMessengerInterface
     */
    public function getFlashMessenger(): FlashMessengerInterface
    {
        return $this->getFactory()->getFlashMessenger();
    }
}
