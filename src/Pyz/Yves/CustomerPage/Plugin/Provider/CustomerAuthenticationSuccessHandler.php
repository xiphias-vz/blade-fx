<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Provider;

use Pyz\Shared\DataDog\DataDogConfig;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerAuthenticationSuccessHandler as SprykerShopCustomerAuthenticationSuccessHandler;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class CustomerAuthenticationSuccessHandler extends SprykerShopCustomerAuthenticationSuccessHandler
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Symfony\Component\Security\Core\Authentication\Token\TokenInterface $token
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        $response = parent::onAuthenticationSuccess($request, $token);

        $this->getFactory()->getDataDogService()->increment([
            DataDogConfig::DATA_DOG_USER_AUTH_STAT,
            DataDogConfig::DATA_DOG_USER_AUTH_LOGIN_SUCCESS_STAT,
        ], [DataDogConfig::DATA_DOG_REGION_SCOPE => APPLICATION_STORE]);

        return $response;
    }
}
