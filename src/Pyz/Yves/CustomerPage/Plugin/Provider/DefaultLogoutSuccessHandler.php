<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Provider;

use Pyz\Shared\DataDog\DataDogConfig;
use Pyz\Shared\LocalStorageCookie\LocalStorageCookie;
use Pyz\Shared\Quote\QuoteConstants;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientAccount;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientCookie;
use Spryker\Yves\Kernel\AbstractPlugin;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\HttpUtils;
use Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class DefaultLogoutSuccessHandler extends AbstractPlugin implements LogoutSuccessHandlerInterface
{
    /**
     * @var \Symfony\Component\Security\Http\HttpUtils
     */
    protected $httpUtils;

    /**
     * @var string
     */
    protected $targetUrl;

    /**
     * @param \Symfony\Component\Security\Http\HttpUtils $httpUtils
     * @param string $targetUrl
     */
    public function __construct(HttpUtils $httpUtils, string $targetUrl = '/')
    {
        $this->httpUtils = $httpUtils;
        $this->targetUrl = $targetUrl;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function onLogoutSuccess(Request $request)
    {
        $this->getFactory()->getDataDogService()->decrement([
            DataDogConfig::DATA_DOG_USER_AUTH_STAT,
        ], [DataDogConfig::DATA_DOG_REGION_SCOPE => APPLICATION_STORE]);
        GlobusRestApiClientAccount::logoutWithCookie();
        GlobusRestApiClientCookie::clearCookies();

        $this->getFactory()->getSessionClient()->set(QuoteConstants::QUOTE_COOKIE_NAME, '');
        LocalStorageCookie::deleteCookieData();

        return $this->httpUtils->createRedirectResponse($request, $this->targetUrl);
    }
}
