<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Yves\StoreSwitcherWidget\Controller;

use Generated\Shared\Search\PageIndexMap;
use Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\FacetResultFormatterPlugin;
use Spryker\Shared\Storage\StorageConstants;
use Spryker\Yves\Kernel\PermissionAwareTrait;
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

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function switchStoreAction(Request $request)
    {
        $store = $request->query->get(static::URL_PARAM_STORE);
        $refererUrl = $request->query->get(static::URL_PARAM_REFERER_URL);

        $response = $refererUrl ? $this->redirectResponseExternal($refererUrl) : new RedirectResponse('/');

        if (!in_array($store, $this->getFactory()->getStore()->getAllowedStores())) {
            return $response;
        }

        return $this->getFactory()
            ->getStoreSwitcher()
            ->switchStore($store, $response);
    }
}
