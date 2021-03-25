<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\StoreSwitcherWidget\Controller;

use SprykerShop\Yves\ShopApplication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Yves\StoreSwitcherWidget\StoreSwitcherWidgetFactory getFactory()
 */
class IndexController extends AbstractController
{
    public const URL_PARAM_STORE = 'store';
    public const URL_PARAM_REFERER_URL = 'referer-url';
    public const URL_PARAM_PATH = 'path';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function switchStoreAction(Request $request)
    {
        $store = $request->query->get(static::URL_PARAM_STORE);
        $refererUrl = $request->query->get(static::URL_PARAM_REFERER_URL);
        if (str_contains($refererUrl, "AND")) {
            $refererUrl = str_replace("AND", "-&-", $refererUrl);
        }
        $path = $request->query->get(static::URL_PARAM_PATH);
        $refererUrl = $refererUrl . $path;

        $response = $refererUrl ? $this->redirectResponseExternal($refererUrl) : new RedirectResponse('/');

        if (!in_array($store, $this->getFactory()->getStore()->getAllowedStores())) {
            return $response;
        }

        return $this->getFactory()
            ->getStoreSwitcher()
            ->switchStore($store, $response);
    }
}
