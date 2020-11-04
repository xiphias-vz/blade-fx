<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Acl\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Acl\Business\AclFacade getFacade()
 */
class IndexController extends AbstractController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deniedAction(Request $request)
    {
        $redirectUrl = $this->getFacade()
            ->getRedirectByLoggedInUser();

        if ($redirectUrl !== null && $this->isRequestHasMerchant($request)) {
            return new RedirectResponse($redirectUrl);
        }

        return [];
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool
     */
    protected function isRequestHasMerchant(Request $request): bool
    {
        return $request->attributes->has(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_MERCHANT);
    }
}
