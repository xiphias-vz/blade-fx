<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Pyz\Yves\CustomerPage\Form\LoginForm;
use SprykerShop\Yves\CustomerPage\Controller\AuthController as SprykerAuthControllerAlias;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 * @method \Spryker\Client\Customer\CustomerClientInterface getClient()
 */
class AuthController extends SprykerAuthControllerAlias
{
    /**
     * @return array
     */
    protected function executeLoginAction(): array
    {
        $this->getFactory()
            ->getCsrfTokenManager()
            ->refreshToken(LoginForm::FORM_NAME);

        return parent::executeLoginAction();
    }
}
