<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\StoreSwitcherWidget\Controller;

use Pyz\Shared\Store\StoreConstants;
use Spryker\Shared\Config\Config;
use SprykerShop\Yves\ShopApplication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
    public const FILLIAL_NUMBER = 'fillialNumber';
    public const SHOP_PASSWORD = 'shopPassword';
    public const IS_PASSWORD_PROTECTED = 'isPasswordProtected';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function switchStoreAction(Request $request)
    {
        $store = $request->query->get(static::URL_PARAM_STORE);
        $checkStore = $request->query->get(static::IS_PASSWORD_PROTECTED);
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

        $visibleMerchants = $this->getFactory()->getMerchantStorageClient()->getMerchantsList()->getMerchants()[0]->getVisibleStoresArray();
        $merchantsFromConfig = Config::get(StoreConstants::SAP_STORE_ID_TO_STORE_MAP);
        $isPwdProtected = false;
        foreach ($visibleMerchants as $visibleStore) {
            if (isset($merchantsFromConfig[$visibleStore[static::FILLIAL_NUMBER]])) {
                $storeFromDB = $merchantsFromConfig[$visibleStore[static::FILLIAL_NUMBER]];
                if ($storeFromDB !== $store) {
                    continue;
                }
                $isPwdProtected = $visibleStore[static::IS_PASSWORD_PROTECTED];
            }
        }
        if ($checkStore == null && $isPwdProtected == true) {
            return $response;
        }

        return $this->getFactory()
            ->getStoreSwitcher()
            ->switchStore($store, $response, $isPwdProtected);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function checkStoreAction(Request $request)
    {
        $password = $request->request->get('password');
        $url = $request->request->get('url');
        $visibleMerchants = $this->getFactory()->getStoreSwitcherClient()->getVisibleStores()->getVisibleStoresArray();
        $merchantsFromConfig = Config::get(StoreConstants::SAP_STORE_ID_TO_STORE_MAP);

        $urlParams = explode(static::URL_PARAM_STORE . '=', $url);
        $store = explode('&', $urlParams[1]);

        $merchantPassword = "";
        $isPwdProtected = false;
        foreach ($visibleMerchants as $visibleStore) {
            if (isset($merchantsFromConfig[$visibleStore[static::FILLIAL_NUMBER]])) {
                $storeFromDB = $merchantsFromConfig[$visibleStore[static::FILLIAL_NUMBER]];
                if ($storeFromDB !== $store[0]) {
                    continue;
                }
                $merchantPassword = $visibleStore[static::SHOP_PASSWORD];
                $isPwdProtected = $visibleStore[static::IS_PASSWORD_PROTECTED];
            }
        }

        $urlForJson = explode('switch?', $url);
        $urlForJsonWithParam = $urlForJson[0] . 'switch?isPasswordProtected=' . $isPwdProtected . '&' . $urlForJson[1];

        if ($isPwdProtected == true) {
            if ($merchantPassword === $password) {
                return new JsonResponse(['success' => true, 'message' => '', 'url' => $urlForJsonWithParam ]);
            } else {
                return new JsonResponse(['success' => false, 'message' => 'Aktuelles Passwort ist falsch']);
            }
        } else {
            return new JsonResponse(['success' => false, 'message' => 'Etwas ist schief gelaufen.']);
        }
    }
}
