<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\WishlistPage\Controller;

use Generated\Shared\Transfer\ProductOptionTransfer;
use Generated\Shared\Transfer\TrackingItemTransfer;
use Generated\Shared\Transfer\WishlistItemMetaTransfer;
use Generated\Shared\Transfer\WishlistItemTransfer;
use Generated\Shared\Transfer\WishlistOverviewResponseTransfer;
use Pyz\Shared\Matomo\MatomoConfig;
use SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerPageControllerProvider;
use SprykerShop\Yves\WishlistPage\Controller\WishlistController as SprykerWishlistController;
use SprykerShop\Yves\WishlistPage\Form\AddAllAvailableProductsToCartFormType;
use SprykerShop\Yves\WishlistPage\Plugin\Provider\WishlistPageControllerProvider;
use SprykerShop\Yves\WishlistPage\Plugin\Router\WishlistPageRouteProviderPlugin;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * @method \Pyz\Yves\WishlistPage\WishlistPageFactory getFactory()
 */
class WishlistController extends SprykerWishlistController
{
    public const SERVICE_FORM_CSRF_PROVIDER = 'form.csrf_provider';
    public const MESSAGE_PERMISSION_FAILED = 'global.permission.failed';
    private const REQUEST_PARAM_CSRF_TOKEN = 'token';

    public const DEFAULT_NAME = 'Meine Einkaufsliste';
    public const REQUEST_HEADER_REFERER = 'referer';
    public const PARAM_WISHLIST_QUANTITY = 'quantity';
    public const PARAM_ID_PRODUCT_ABSTRACT = 'idProductAbstract';
    public const KEY_WISHLIST_NAME = 'wishlistName';

    public const CHANGE_CART_CSRF_TOKEN_NAME = 'change-cart';
    public const ADD_ITEMS_TO_CART_CSRF_TOKEN_NAME = 'add-items-to-cart';
    public const REMOVE_ITEMS_FROM_WISHLIST_CSRF_TOKEN_NAME = 'remove-items-from-wishlist';

    public const ADD_ITEM_TO_WISHLIST_CSRF_TOKEN_NAME = 'add-to-wishlist';
    public const MESSAGE_ADD_ITEM_ACTION_FAILED = 'wishlist.add-item.error.message.add-item-to-wish-list-failed';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function addItemAction(Request $request)
    {
        $wishlistItemTransfer = $this->getWishlistItemTransferFromRequest($request);
        if (!$wishlistItemTransfer) {
            return $this->redirectResponseInternal(CustomerPageControllerProvider::ROUTE_LOGIN);
        }

        if (!$this->isCsrfTokenValid(static::ADD_ITEM_TO_WISHLIST_CSRF_TOKEN_NAME, $request)) {
            $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseExternal($request->headers->get(static::REQUEST_HEADER_REFERER));
        }

        $wishlistItemTransfer = $this->getFactory()
            ->getWishlistClient()
            ->addItem($wishlistItemTransfer);
        if (!$wishlistItemTransfer->getIdWishlistItem()) {
            $this->addErrorMessage('customer.account.wishlist.item.not_added');
        } else {
            $this->addSuccessMessage('customer.account.wishlist.item.added');
        }

        if ($request->headers->has(static::REQUEST_HEADER_REFERER)) {
            return $this->redirectResponseExternal($request->headers->get(static::REQUEST_HEADER_REFERER));
        }

        return $this->redirectResponseInternal(WishlistPageControllerProvider::ROUTE_WISHLIST_DETAILS, [
            self::KEY_WISHLIST_NAME => $wishlistItemTransfer->getWishlistName(),
        ]);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function removeItemAction(Request $request)
    {
        $wishlistItemTransfer = $this->getWishlistItemTransferFromRequest($request);
        if (!$wishlistItemTransfer) {
            return $this->redirectResponseInternal(CustomerPageControllerProvider::ROUTE_LOGIN);
        }

        if (!$this->isCsrfTokenValid(static::REMOVE_ITEMS_FROM_WISHLIST_CSRF_TOKEN_NAME, $request)) {
            $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseInternal(WishlistPageControllerProvider::ROUTE_WISHLIST_DETAILS, [
                'wishlistName' => $wishlistItemTransfer->getWishlistName(),
            ]);
        }

        $this->getFactory()
            ->getWishlistClient()
            ->removeItem($wishlistItemTransfer);

        $this->addSuccessMessage('customer.account.wishlist.item.removed');

        return $this->redirectResponseInternal(WishlistPageControllerProvider::ROUTE_WISHLIST_DETAILS, [
            'wishlistName' => $wishlistItemTransfer->getWishlistName(),
        ]);
    }

    /**
     * @param \Generated\Shared\Transfer\WishlistOverviewResponseTransfer|null $wishlistOverviewResponse
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    protected function createAddAllAvailableProductsToCartForm(?WishlistOverviewResponseTransfer $wishlistOverviewResponse = null): FormInterface
    {
        $addAllAvailableProductsToCartFormDataProvider = $this->getFactory()->createAddAllAvailableProductsToCartFormDataProvider();
        $addAllAvailableProductsToCartForm = $this->getFactory()->getAddAllAvailableProductsToCartForm(
            $addAllAvailableProductsToCartFormDataProvider->getData($wishlistOverviewResponse)
        );

        return $addAllAvailableProductsToCartForm;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Generated\Shared\Transfer\WishlistItemTransfer|null
     */
    protected function getWishlistItemTransferFromRequest(Request $request)
    {
        $wishlistItemTransfer = parent::getWishlistItemTransferFromRequest($request);

        if ($wishlistItemTransfer) {
            $wishlistItemTransfer->setWishlistName($request->get(self::PARAM_WISHLIST_NAME) ?: static::DEFAULT_NAME);
            $wishlistItemTransfer->setQuantity($this->getWishlistItemQuantityFromRequest($request));
            $wishlistItemTransfer->setIdProductAbstract($this->getIdProductAbstractFromRequest($request));

            $wishlistItemTransfer = $this->expandWishlistItemTransferWithDepositProductOptions($wishlistItemTransfer);
        }

        return $wishlistItemTransfer;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function moveToCartAction(Request $request): RedirectResponse
    {
        $wishlistItemTransfer = $this->getWishlistItemTransferFromRequest($request);

        if (!$wishlistItemTransfer) {
            return $this->redirectResponseInternal(CustomerPageControllerProvider::ROUTE_LOGIN);
        }

        if (!$this->isCsrfTokenValid(static::ADD_ITEMS_TO_CART_CSRF_TOKEN_NAME, $request)) {
            $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseInternal(WishlistPageControllerProvider::ROUTE_WISHLIST_DETAILS, [
                'wishlistName' => $wishlistItemTransfer->getWishlistName(),
            ]);
        }

        $wishlistItemMetaTransferCollection = [
            (new WishlistItemMetaTransfer())
                ->setSku($wishlistItemTransfer->getSku())
                ->setQuantity($wishlistItemTransfer->getQuantity())
                ->setProductOptions($wishlistItemTransfer->getProductOptions()),
        ];

        $result = $this->getFactory()
            ->createMoveToCartHandler()
            ->moveAllAvailableToCart(
                $wishlistItemTransfer->getWishlistName(),
                $wishlistItemMetaTransferCollection
            );

        $messageTransfers = $this->getFactory()
            ->getZedRequestClient()
            ->getResponsesErrorMessages();

        if (count($messageTransfers) !== 0) {
            foreach ($messageTransfers as $messageTransfer) {
                $this->addErrorMessage($messageTransfer->getValue());
            }

            return $this->handleErrorWishlistRedirect($wishlistItemTransfer);
        }

        if ($result->getRequests()->count()) {
            $this->addErrorMessage('customer.account.wishlist.item.added_to_cart.failed');

            return $this->handleErrorWishlistRedirect($wishlistItemTransfer);
        }

        $this->addSuccessMessage('customer.account.wishlist.item.added_to_cart');

        $trackingItemTransfer = (new TrackingItemTransfer())
            ->setType(MatomoConfig::ACTION_WISHLIST_ADD)
            ->setSku($wishlistItemTransfer->getSku())
            ->setQuantity($wishlistItemTransfer->getQuantity())
            ->setDimension1(MatomoConfig::LOCATION_WISHLIST);

        return $this->redirect(
            $request,
            $wishlistItemTransfer->getWishlistName()
        );
    }

    /**
     * @param string $wishlistName
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function moveAllAvailableToCartAction($wishlistName, Request $request): RedirectResponse
    {
        $addAllAvailableProductsToCartForm = $this
            ->createAddAllAvailableProductsToCartForm()
            ->handleRequest($request);

        if ($addAllAvailableProductsToCartForm->isSubmitted()) {
            if ($addAllAvailableProductsToCartForm->isValid()) {
                $wishlistItemMetaTransferCollection = $addAllAvailableProductsToCartForm
                    ->get(AddAllAvailableProductsToCartFormType::WISHLIST_ITEM_META_COLLECTION)
                    ->getData();

                foreach ($wishlistItemMetaTransferCollection as &$wishlistItemMetaTransfer) {
                    $this->expandWishlistItemMetaTransferWithDepositProductOptions($wishlistItemMetaTransfer);
                }

                $result = $this->getFactory()
                    ->createMoveToCartHandler()
                    ->moveAllAvailableToCart($wishlistName, $wishlistItemMetaTransferCollection);

                $messageTransfers = $this->getFactory()
                    ->getZedRequestClient()
                    ->getResponsesErrorMessages();

                if (count($messageTransfers) !== 0) {
                    foreach ($messageTransfers as $messageTransfer) {
                        $this->addErrorMessage($messageTransfer->getValue());
                    }

                    return $this->redirectResponseInternal(WishlistPageControllerProvider::ROUTE_WISHLIST_DETAILS, [
                        'wishlistName' => $wishlistName,
                    ]);
                }

                if ($result->getRequests()->count()) {
                    $this->addErrorMessage('customer.account.wishlist.item.moved_all_available_to_cart.failed');

                    if ($result->getRequests()->count() === count($wishlistItemMetaTransferCollection)) {
                        return $this->redirectResponseInternal(WishlistPageControllerProvider::ROUTE_WISHLIST_DETAILS, [
                            'wishlistName' => $wishlistName,
                        ]);
                    }
                }

                $this->addSuccessMessage('customer.account.wishlist.item.moved_all_available_to_cart');
            } else {
                $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);
            }
        }

        return $this->redirect(
            $request,
            $wishlistName
        );
    }

    /**
     * @param \Generated\Shared\Transfer\WishlistItemTransfer $wishlistItemTransfer
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function handleErrorWishlistRedirect(WishlistItemTransfer $wishlistItemTransfer): RedirectResponse
    {
        return $this->redirectResponseInternal(
            WishlistPageControllerProvider::ROUTE_WISHLIST_DETAILS,
            [ self::KEY_WISHLIST_NAME => $wishlistItemTransfer->getWishlistName() ]
        );
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function changeQuantityAction(Request $request): RedirectResponse
    {
        $wishlistItemTransfer = $this->getWishlistItemTransferFromRequest($request);
        if (!$wishlistItemTransfer) {
            return $this->redirectResponseInternal(CustomerPageControllerProvider::ROUTE_LOGIN);
        }

        if (!$this->isCsrfTokenValid(static::CHANGE_CART_CSRF_TOKEN_NAME, $request)) {
            $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseInternal(WishlistPageControllerProvider::ROUTE_WISHLIST_DETAILS, [
                'wishlistName' => $wishlistItemTransfer->getWishlistName(),
            ]);
        }

        $this->getFactory()
            ->getBaseWishlistClient()
            ->changeQuantity($wishlistItemTransfer);

        $this->addSuccessMessage('customer.account.wishlist.item.updated');

        return $this->redirectResponseInternal(WishlistPageControllerProvider::ROUTE_WISHLIST_DETAILS, [
            self::KEY_WISHLIST_NAME => $wishlistItemTransfer->getWishlistName(),
        ]);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return int
     */
    protected function getWishlistItemQuantityFromRequest(Request $request): int
    {
        $quantity = (int)$request->get(self::PARAM_WISHLIST_QUANTITY);

        return ($quantity > 0) ? $quantity : 1;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return int|null
     */
    protected function getIdProductAbstractFromRequest(Request $request): ?int
    {
        $idProductAbstract = (int)$request->get(self::PARAM_ID_PRODUCT_ABSTRACT);

        return ($idProductAbstract > 0) ? $idProductAbstract : null;
    }

    /**
     * @param \Generated\Shared\Transfer\WishlistItemTransfer $wishlistItemTransfer
     *
     * @return \Generated\Shared\Transfer\ProductViewTransfer
     */
    protected function createProductView(WishlistItemTransfer $wishlistItemTransfer)
    {
        $productViewTransfer = parent::createProductView($wishlistItemTransfer);
        $productViewTransfer->setQuantity($wishlistItemTransfer->getQuantity());

        return $productViewTransfer;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string $wishListName
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function redirect(Request $request, string $wishListName): RedirectResponse
    {
        if ($request->headers->has(static::REQUEST_HEADER_REFERER)) {
            return $this->redirectResponseExternal(
                $request->headers->get(static::REQUEST_HEADER_REFERER)
            );
        }

        return $this->redirectResponseInternal(WishlistPageRouteProviderPlugin::ROUTE_NAME_WISHLIST_DETAILS, [
            'wishlistName' => $wishListName,
        ]);
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
     * @param \Generated\Shared\Transfer\WishlistItemTransfer $wishlistItemTransfer
     *
     * @return \Generated\Shared\Transfer\WishlistItemTransfer
     */
    protected function expandWishlistItemTransferWithDepositProductOptions(WishlistItemTransfer $wishlistItemTransfer): WishlistItemTransfer
    {
        if ($wishlistItemTransfer->getIdProductAbstract() === null) {
            return $wishlistItemTransfer;
        }

        $depositProductOptionCollection = $this->getDepositProductOptionsByIdProductAbstract($wishlistItemTransfer->getIdProductAbstract());

        foreach ($depositProductOptionCollection as $productOptionTransfer) {
            $wishlistItemTransfer->addProductOption($productOptionTransfer);
        }

        return $wishlistItemTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\WishlistItemMetaTransfer $wishlistItemMetaTransfer
     *
     * @return \Generated\Shared\Transfer\WishlistItemMetaTransfer
     */
    protected function expandWishlistItemMetaTransferWithDepositProductOptions(WishlistItemMetaTransfer $wishlistItemMetaTransfer): WishlistItemMetaTransfer
    {
        if ($wishlistItemMetaTransfer->getIdProductAbstract() === null) {
            return $wishlistItemMetaTransfer;
        }

        $depositProductOptionCollection = $this->getDepositProductOptionsByIdProductAbstract($wishlistItemMetaTransfer->getIdProductAbstract());

        foreach ($depositProductOptionCollection as $productOptionTransfer) {
            $wishlistItemMetaTransfer->addProductOption($productOptionTransfer);
        }

        return $wishlistItemMetaTransfer;
    }

    /**
     * @param int $idProductAbstract
     *
     * @return \Generated\Shared\Transfer\ProductOptionTransfer[]
     */
    protected function getDepositProductOptionsByIdProductAbstract(int $idProductAbstract): array
    {
        $depositProductOptionCollection = [];
        $depositProductOptions = $this->getFactory()
            ->getDepositProductOptionClient()
            ->getDepositProductOptionsByIdProductAbstract($idProductAbstract);

        foreach ($depositProductOptions as $idOptionValueUsage) {
            if (!$idOptionValueUsage) {
                continue;
            }

            $productOptionTransfer = new ProductOptionTransfer();
            $productOptionTransfer->setIdProductOptionValue($idOptionValueUsage);

            $depositProductOptionCollection[] = $productOptionTransfer;
        }

        return $depositProductOptionCollection;
    }
}
