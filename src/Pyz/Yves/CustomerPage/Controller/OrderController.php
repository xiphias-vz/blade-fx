<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Generated\Shared\Transfer\CancelOrderRequestTransfer;
use Generated\Shared\Transfer\CancelOrderResponseTransfer;
use Generated\Shared\Transfer\OrderDetailRequestTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Shared\Messages\MessagesConfig;
use Pyz\Shared\OrderDetail\OrderDetailConstants;
use SprykerShop\Yves\CustomerPage\Controller\OrderController as SprykerOrderController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class OrderController extends SprykerOrderController
{
    private const REQUEST_HEADER_REFERER = 'referer';
    private const REQUEST_PARAM_ID = 'id';
    private const REQUEST_PARAM_CSRF_TOKEN = 'token';

    private const MESSAGE_ORDER_WAS_CANCELLED = 'customer.order.cancel.success.order_was_cancelled';

    private const MESSAGE_UNABLE_TO_CANCEL_ORDER = 'customer.order.cancel.error.unable_to_cancel_order';
    public const CANCEL_CUSTOMER_ORDER_CSRF_TOKEN_NAME = 'cancel-customer-order';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function cancelAction(Request $request)
    {
        if (!$this->isCsrfTokenValid(static::CANCEL_CUSTOMER_ORDER_CSRF_TOKEN_NAME, $request)) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);
        } else {
            $this->cancelOrder($request->get(self::REQUEST_PARAM_ID));
        }

        return $this->redirectResponseExternal(
            $request->headers->get(static::REQUEST_HEADER_REFERER, '/')
        );
    }

    /**
     * @param int $idSalesOrder
     *
     * @return \Generated\Shared\Transfer\CancelOrderResponseTransfer
     */
    protected function cancelOrder(int $idSalesOrder): CancelOrderResponseTransfer
    {
        $customerTransfer = $this->getLoggedInCustomerTransfer();
        $cancelOrderRequestTransfer = (new CancelOrderRequestTransfer())
            ->setCustomerReference($customerTransfer->getCustomerReference())
            ->setIdSalesOrder($idSalesOrder);

        $cancelOrderReturnTransfer = $this->getFactory()
            ->getSalesOrderActionsClient()
            ->cancelOrder($cancelOrderRequestTransfer);

        if ($cancelOrderReturnTransfer->getIsSuccess()) {
            $this->addSuccessMessage(self::MESSAGE_ORDER_WAS_CANCELLED);

            return $cancelOrderReturnTransfer;
        }

        $this->addErrorMessage(self::MESSAGE_UNABLE_TO_CANCEL_ORDER);

        return $cancelOrderReturnTransfer;
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
            ->isTokenValid(new CsrfToken($id, $request->request->get(static::REQUEST_PARAM_CSRF_TOKEN)));
    }

    /**
     * @param int $idSalesOrder
     *
     * @return array
     */
    protected function getOrderDetailsResponseData(int $idSalesOrder): array
    {
        $data = parent::getOrderDetailsResponseData($idSalesOrder);

        /** @var \Generated\Shared\Transfer\OrderTransfer $orderTransfer */
        $orderTransfer = $data['order'];

        $orderDetailRequestTransfer = $this->getOrderDetailRequestTransfer($orderTransfer);
        $orderDetails = $this->getFactory()
            ->getOrderDetailClient()
            ->getInvoiceOrderDetailDataFromOrder($orderDetailRequestTransfer);

        $data['taxPayments'] = $orderDetails[OrderDetailConstants::KEY_TAX_PAYMENTS_EXPENSES] ?? [];
        $data['canceledItems'] = [];
        $data['orderedItems'] = [];

        return $this->getOrderItems($data['shipmentGroups'], $data);
    }

    /**
     * @param \Generated\Shared\Transfer\ShipmentGroupTransfer[] $shipmentGroupCollection
     * @param array $data
     *
     * @return array
     */
    protected function getOrderItems($shipmentGroupCollection, $data)
    {
        foreach ($shipmentGroupCollection as $shipmentGroupTransfer) {
            /** @var \Generated\Shared\Transfer\ItemTransfer $itemTransfer */
            foreach ($shipmentGroupTransfer->getItems() as $itemTransfer) {
                if ($itemTransfer->getSumPriceToPayAggregation() === $itemTransfer->getCanceledAmount()) {
                    $data['canceledItems'][] = $itemTransfer;
                    continue;
                }

                $data['orderedItems'][] = $itemTransfer;
            }
        }

        return $data;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderDetailRequestTransfer
     */
    private function getOrderDetailRequestTransfer(OrderTransfer $orderTransfer): OrderDetailRequestTransfer
    {
        return (new OrderDetailRequestTransfer())
            ->setItems($orderTransfer->getItems())
            ->setTotals($orderTransfer->getTotals())
            ->setExpenses($orderTransfer->getExpenses());
    }
}
