<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerReorderWidget\Controller;

use Pyz\Shared\Messages\MessagesConfig;
use SprykerShop\Yves\CustomerReorderWidget\Controller\OrderController as SprykerOrderController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;

/**
 * @method \Pyz\Yves\CustomerReorderWidget\CustomerReorderWidgetFactory getFactory()
 */
class OrderController extends SprykerOrderController
{
    private const REQUEST_PARAM_CSRF_TOKEN = 'token';

    public const REORDER_CSRF_TOKEN_NAME = 'reorder-cart';
    public const REORDER_ITEMS_CSRF_TOKEN_NAME = 'reorder-items';

    /**
     * @param int $idSalesOrder
     * @param \Symfony\Component\HttpFoundation\Request|null $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function reorderAction(int $idSalesOrder, ?Request $request = null): RedirectResponse
    {
        if (!$this->isCsrfTokenValid(static::REORDER_CSRF_TOKEN_NAME, $request)) {
            $this->getFactory()
                ->getMessengerClient()
                ->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->getFailureRedirect();
        }

        $orderReader = $this->getFactory()
            ->createOrderReader();

        $orderTransfer = $orderReader->getOrderTransfer($idSalesOrder);
        if ($orderReader->hasIncompatibleItems($orderTransfer)) {
            $this->getFactory()
                ->getMessengerClient()
                ->addErrorMessage(static::GLOSSARY_KEY_ERROR_MESSAGE_UNABLE_TO_REORDER_ITEMS);

            return $this->getFailureRedirect();
        }

        $this->getFactory()
            ->createCartFiller()
            ->fillFromOrder($orderTransfer);

        $this->getFactory()
            ->getZedRequestClient()
            ->addResponseMessagesToMessenger();

        $this->getFactory()
            ->getBaseMessengerClient()
            ->cleanFlashMessages();

        return $this->getSuccessRedirect();
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function reorderItemsAction(Request $request): RedirectResponse
    {
        if (!$this->isCsrfTokenValid(static::REORDER_ITEMS_CSRF_TOKEN_NAME, $request)) {
            $this->getFactory()
                ->getMessengerClient()
                ->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->getFailureRedirect();
        }

        $idSalesOrder = $request->request->getInt(static::PARAM_ID_ORDER);
        $idItems = (array)$request->request->get(static::PARAM_ITEMS);

        $orderReader = $this->getFactory()
            ->createOrderReader();

        $orderTransfer = $orderReader->getOrderTransfer($idSalesOrder);

        if ($orderReader->hasIncompatibleItems($orderTransfer)) {
            $this->getFactory()
                ->getMessengerClient()
                ->addErrorMessage(static::GLOSSARY_KEY_ERROR_MESSAGE_UNABLE_TO_REORDER_ITEMS);

            return $this->getFailureRedirect();
        }

        $this->getFactory()
            ->createCartFiller()
            ->fillSelectedFromOrder($orderTransfer, $idItems);

        $this->getFactory()
            ->getZedRequestClient()
            ->addResponseMessagesToMessenger();

        return $this->getSuccessRedirect();
    }

    /**
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function getSuccessRedirect(): RedirectResponse
    {
        $url = $this->getApplication()->path(static::ROUTE_SUCCESSFUL_REDIRECT, []);

        return new RedirectResponse($url, 302);
    }

    /**
     * @param string $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool
     */
    protected function isCsrfTokenValid(string $id, Request $request): bool
    {
        return $this->getFactory()->getCsrfTokenManager()
            ->isTokenValid(new CsrfToken($id, $request->request->get(self::REQUEST_PARAM_CSRF_TOKEN)));
    }
}