<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CartPage\Controller;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderDetailRequestTransfer;
use Generated\Shared\Transfer\ProductViewTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Shared\Messages\MessagesConfig;
use Pyz\Shared\OrderDetail\OrderDetailConstants;
use Spryker\Shared\Messenger\MessengerConfig;
use Spryker\Yves\Kernel\View\View;
use SprykerShop\Yves\CartPage\Controller\CartController as SprykerCartController;
use SprykerShop\Yves\CartPage\Plugin\Provider\CartControllerProvider;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;

/**
 * @method \Pyz\Yves\CartPage\CartPageFactory getFactory()
 */
class CartController extends SprykerCartController
{
    public const REQUEST_HEADER_REFERER = 'referer';
    public const ADD_ITEMS_SUCCESS = 'cart.add.items.success';

    protected const ADD_TO_CART_CSRF_TOKEN_NAME = 'add-to-cart';
    protected const ADD_TO_CART_AJAX_CSRF_TOKEN_NAME = 'add-to-cart-ajax';
    protected const CHANGE_CART_CSRF_TOKEN_NAME = 'change-cart';
    protected const CLEAR_CART_CSRF_TOKEN_NAME = 'clear-cart';
    protected const REQUEST_PARAM_CSRF_TOKEN = 'token';

    protected const DEFAULT_QUANTITY = 1;

    protected const MESSAGE_AJAX_ADD_TO_CART_INVALID_ACTION = 'catalog.add_to_cart.invalid_action';

    /**
     * @param array $selectedAttributes
     *
     * @return array
     */
    public function executeIndexAction(array $selectedAttributes = []): array
    {
        $data = parent::executeIndexAction($selectedAttributes);
        $quoteTransfer = $data['cart'];

        if (count($quoteTransfer->getItems()) > 0 && $data['isQuoteValid'] == false) {
            $amountToPay = $quoteTransfer->getTotals()->getPriceToPay() / 100;
            if ($amountToPay > 15) {
                $data['isQuoteValid'] = true;
            }
        }

        $orderDetailRequestTransfer = $this->getOrderDetailRequestTransfer($quoteTransfer);
        $orderDetails = $this->getFactory()
            ->getOrderDetailClient()
            ->getInvoiceOrderDetailDataFromOrder($orderDetailRequestTransfer);

        $data['taxPayments'] = $orderDetails[OrderDetailConstants::KEY_TAX_PAYMENTS] ?? [];
        $data['orderLimitationMessage'] = $this->getCartLimitationMessage();

        return $data;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string $sku
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function addAction(Request $request, $sku)
    {
        if ($this->isCsrfTokenValid(static::ADD_TO_CART_CSRF_TOKEN_NAME, $request)) {
            $this->addItemFromPdp($request, $sku);
        } else {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);
        }

        return $this->redirect($request);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function clearAction(Request $request): RedirectResponse
    {
        if ($this->isCsrfTokenValid(static::CLEAR_CART_CSRF_TOKEN_NAME, $request)) {
            $this->executeClearAction();
        } else {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);
        }

        return $this->redirect($request);
    }

    /**
     * @return void
     */
    protected function executeClearAction(): void
    {
        $this->getFactory()
            ->getBaseQuoteClient()
            ->clearQuote();
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param int $productAbstractId
     *
     * @return \Spryker\Yves\Kernel\View\View|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function addAjaxAction(Request $request, $productAbstractId)
    {
        if ($request->getMethod() !== Request::METHOD_POST) {
            $this->addErrorMessage(static::MESSAGE_AJAX_ADD_TO_CART_INVALID_ACTION);

            return $this->redirectResponseExternal($request->headers->get(static::REQUEST_HEADER_REFERER, '/'));
        }

        $data = [];
        if (!$this->isCsrfTokenValid(static::ADD_TO_CART_AJAX_CSRF_TOKEN_NAME, $request)) {
            return $this->buildAddAjaxResponse([
                'error' => MessagesConfig::MESSAGE_PERMISSION_FAILED,
            ]);
        }

        if (!$productAbstractId || !$this->canAddCartItem()) {
            return $this->buildAddAjaxResponse($data);
        }

        $quantity = $request->get('quantity', 1);
        $productViewTransfer = $this->getFactory()
            ->getProductStorageClient()
            ->findProductAbstractViewTransfer($productAbstractId, $this->getLocale());

        $productConcreteSku = $this->resolveProductConcreteSkuFromProductAbstractId($productViewTransfer);
        $itemTransfer = (new ItemTransfer())
            ->setSku($productConcreteSku)
            ->setQuantity($quantity);

        $depositProductOptions = $this->getFactory()
            ->getDepositProductOptionClient()
            ->getDepositProductOptionsByIdProductAbstract($productAbstractId, $productViewTransfer);

        $this->addProductOptions($depositProductOptions, $itemTransfer);
        $itemTransfer = $this->executePreAddToCartPlugins($itemTransfer, $request->request->all());

        $this->getFactory()->getCartClient()->addItem($itemTransfer, $request->request->all());

        $messageTransfers = $this->getFactory()
            ->getZedRequestClient()
            ->getResponsesErrorMessages();

        if (count($messageTransfers) !== 0) {
            $data['error'] = $messageTransfers[0]->getValue();
        }

        return $this->buildAddAjaxResponse($data);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string $sku
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function changeAction(Request $request, $sku)
    {
        if (!$this->isCsrfTokenValid(static::CHANGE_CART_CSRF_TOKEN_NAME, $request)) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseInternal(CartControllerProvider::ROUTE_CART);
        }

        $quantity = $request->request->getInt('quantity', static::DEFAULT_QUANTITY);

        if (!$quantity) {
            $quantity = static::DEFAULT_QUANTITY;
        }

        if (!$this->canChangeCartItem($quantity)) {
            $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponseInternal(CartControllerProvider::ROUTE_CART);
        }

        $this->getFactory()
            ->getCartClient()
            ->changeItemQuantity($sku, $request->get('groupKey'), $quantity);

        $this->getFactory()
            ->getZedRequestClient()
            ->addResponseMessagesToMessenger();

        return $this->redirectResponseInternal(CartControllerProvider::ROUTE_CART);
    }

    /**
     * @param array $data
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    protected function buildAddAjaxResponse(array $data = []): View
    {
        return $this->view(
            $data,
            $this->getFactory()->getCartPageWidgetPlugins(),
            '@CartPage/views/cart/cart-ajax.twig'
        );
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string $sku
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function removeAction(Request $request, $sku)
    {
        if ($this->isCsrfTokenValid(static::CHANGE_CART_CSRF_TOKEN_NAME, $request)) {
            parent::removeAction($request, $sku);
        } else {
            $this->addErrorMessage(static::MESSAGE_PERMISSION_FAILED);
        }

        return $this->redirect($request);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function redirect(Request $request)
    {
        if ($request->headers->has(static::REQUEST_HEADER_REFERER)) {
            return $this->redirectResponseExternal($request->headers->get(static::REQUEST_HEADER_REFERER));
        }

        return $this->redirectResponseInternal(CartControllerProvider::ROUTE_CART);
    }

    /**
     * @param string $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool
     */
    protected function isCsrfTokenValid(string $id, Request $request): bool
    {
        return $this->getFactory()
            ->getCsrfTokenManager()
            ->isTokenValid(new CsrfToken($id, $request->request->get(static::REQUEST_PARAM_CSRF_TOKEN)));
    }

    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     *
     * @return string|null
     */
    protected function resolveProductConcreteSkuFromProductAbstractId(ProductViewTransfer $productViewTransfer): ?string
    {
        $productConcreteIds = $productViewTransfer->getAttributeMap()->getProductConcreteIds();

        if (count($productConcreteIds) === 1) {
            return $productViewTransfer->getSku();
        }

        return array_key_first($productConcreteIds);
    }

    /**
     * @return string
     */
    private function getCartLimitationMessage(): string
    {
        /** @var \Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface $flashBag */
        $flashBag = $this->getFactory()->getFlashBag();

        /** @var string[] $infoMessages */
        $infoMessages = $flashBag->get(MessengerConfig::FLASH_MESSAGES_INFO);

        $infoMessages = array_unique($infoMessages);

        return implode("\n", $infoMessages);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\OrderDetailRequestTransfer
     */
    private function getOrderDetailRequestTransfer(QuoteTransfer $quoteTransfer): OrderDetailRequestTransfer
    {
        return (new OrderDetailRequestTransfer())
            ->setItems($quoteTransfer->getItems())
            ->setTotals($quoteTransfer->getTotals());
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string $productAbstractId
     *
     * @return void
     */
    public function addItemFromPdp(Request $request, string $productAbstractId)
    {
        $data = [];

        $quantity = $request->get('quantity', 1);
        $productViewTransfer = $this->getFactory()
            ->getProductStorageClient()
            ->findProductAbstractViewTransfer($productAbstractId, $this->getLocale());

        $productConcreteSku = $this->resolveProductConcreteSkuFromProductAbstractId($productViewTransfer);
        $itemTransfer = (new ItemTransfer())
            ->setSku($productConcreteSku)
            ->setQuantity($quantity);

        $depositProductOptions = $this->getFactory()
            ->getDepositProductOptionClient()
            ->getDepositProductOptionsByIdProductAbstract($productAbstractId, $productViewTransfer);

        $this->addProductOptions($depositProductOptions, $itemTransfer);
        $itemTransfer = $this->executePreAddToCartPlugins($itemTransfer, $request->request->all());

        $this->getFactory()->getCartClient()->addItem($itemTransfer, $request->request->all());

        $messageTransfers = $this->getFactory()
            ->getZedRequestClient()
            ->getResponsesErrorMessages();

        if (count($messageTransfers) !== 0) {
            $this->addErrorMessage($messageTransfers[0]->getValue());
        } else {
            $this->addSuccessMessage(static::ADD_ITEMS_SUCCESS);
        }
    }
}
