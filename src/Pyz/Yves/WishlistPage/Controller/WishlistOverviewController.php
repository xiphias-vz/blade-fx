<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\WishlistPage\Controller;

use Pyz\Yves\WishlistPage\Plugin\Router\WishlistPageRouteProviderPlugin;
use SprykerShop\Yves\WishlistPage\Controller\WishlistOverviewController as SprykerWishlistOverviewController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * @method \Pyz\Yves\WishlistPage\WishlistPageFactory getFactory()
 */
class WishlistOverviewController extends SprykerWishlistOverviewController
{
    public const REQUEST_HEADER_REFERER = 'referer';

    public const MESSAGE_PERMISSION_FAILED = 'global.permission.failed';
    private const REQUEST_PARAM_CSRF_TOKEN = 'token';

    public const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';
    public const DELETE_WISHLIST_CSRF_TOKEN_NAME = 'delete-wishlist';

    /**
     * @param string $wishlistName
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function safeDeleteAction(string $wishlistName, Request $request): RedirectResponse
    {
        return parent::deleteAction($wishlistName, $request);
    }

    /**
     * @param string $wishlistName
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function updateAction($wishlistName, Request $request)
    {
        if ($wishlistName === '{{ attributes.ImageUrl }}') {
            $response = [];
        } else {
            $response = $this->executeUpdateAction($wishlistName, $request);

            if (!is_array($response)) {
                return $response;
            }
        }

        return $this->view($response, [], '@WishlistPage/views/wishlist-overview-update/wishlist-overview-update.twig');
    }

    /**
     * @param string $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool
     */
    protected function isCsrfTokenValid(string $id, Request $request): bool
    {
        return $this->getCsrfTokenManager()
            ->isTokenValid(new CsrfToken($id, $request->request->get(static::REQUEST_PARAM_CSRF_TOKEN)));
    }

    /**
     * @return \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface
     */
    protected function getCsrfTokenManager(): CsrfTokenManagerInterface
    {
        return $this->getFactory()->getCsrfTokenManager();
    }

    /**
     * @param string $wishlistName
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function redirectInvalidAction(string $wishlistName, Request $request): RedirectResponse
    {
        if ($request->headers->has(static::REQUEST_HEADER_REFERER)) {
            return $this->redirectResponseExternal($request->headers->get(static::REQUEST_HEADER_REFERER));
        }

        return $this->redirectResponseInternal(
            WishlistPageRouteProviderPlugin::ROUTE_NAME_WISHLIST_DETAILS,
            [
                'wishlistName' => $wishlistName,
            ]
        );
    }
}
