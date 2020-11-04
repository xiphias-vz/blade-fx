<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerReorderWidget;

use Pyz\Client\Messenger\MessengerClientInterface;
use Spryker\Yves\Kernel\Application;
use SprykerShop\Yves\CustomerReorderWidget\CustomerReorderWidgetFactory as SprykerCustomerReorderWidgetFactory;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class CustomerReorderWidgetFactory extends SprykerCustomerReorderWidgetFactory
{
    public const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';

    /**
     * @return \Pyz\Client\Messenger\MessengerClientInterface
     */
    public function getBaseMessengerClient(): MessengerClientInterface
    {
        return $this->getProvidedDependency(CustomerReorderWidgetDependencyProvider::BASE_CLIENT_MESSENGER);
    }

    /**
     * @return \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface
     */
    public function getCsrfTokenManager(): CsrfTokenManagerInterface
    {
        return $this->getApplication()->get(static::SERVICE_FORM_CSRF_PROVIDER);
    }

    /**
     * @return \Spryker\Yves\Kernel\Application
     */
    protected function getApplication(): Application
    {
        return $this->getProvidedDependency(CustomerReorderWidgetDependencyProvider::PLUGIN_APPLICATION);
    }
}
