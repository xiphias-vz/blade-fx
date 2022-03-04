<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Checkout\Business\Workflow;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SaveOrderTransfer;
use Spryker\Zed\Checkout\Business\Workflow\CheckoutWorkflow as SpykerCheckoutWorkflow;

class CheckoutWorkflow extends SpykerCheckoutWorkflow implements CheckoutWorkflowInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\CheckoutResponseTransfer
     */
    public function placeOrder(QuoteTransfer $quoteTransfer)
    {
        $checkoutResponseTransfer = $this->createCheckoutResponseTransfer();

        if (!$this->checkPreConditions($quoteTransfer, $checkoutResponseTransfer)) {
            return $checkoutResponseTransfer;
        }

        $quoteTransfer = $this->doPreSave($quoteTransfer, $checkoutResponseTransfer);
        $quoteTransfer = $this->doSaveOrder($quoteTransfer, $checkoutResponseTransfer);

        $this->runStateMachine($checkoutResponseTransfer->getSaveOrder());

        $this->doPostSave($quoteTransfer, $checkoutResponseTransfer);

        return $checkoutResponseTransfer;
    }

    /**
     * @return \Generated\Shared\Transfer\CheckoutResponseTransfer
     */
    protected function createCheckoutResponseTransfer()
    {
        return (new CheckoutResponseTransfer())
            ->setSaveOrder(new SaveOrderTransfer())
            ->setIsSuccess(true);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\CheckoutResponseTransfer
     */
    public function addCheckoutResponseTransfer(QuoteTransfer $quoteTransfer, OrderTransfer $orderTransfer)
    {
        $checkoutResponseTransfer = $this->createCheckoutResponseTransfer();

        $idSalesOrder = $orderTransfer->getIdSalesOrder();
        $orderReference = $orderTransfer->getOrderReference();
        $collectNumber = $orderTransfer->getCollectNumber();
        $orderItems = $orderTransfer->getItems();
        $orderExpenses = $orderTransfer->getExpenses();
        $newSaveOrderTransfer = new SaveOrderTransfer();
        $newSaveOrderTransfer->setIdSalesOrder($idSalesOrder);
        $newSaveOrderTransfer->setOrderReference($orderReference);
        $newSaveOrderTransfer->setCollectNumber($collectNumber);
        $newSaveOrderTransfer->setOrderItems($orderItems);
        $newSaveOrderTransfer->setOrderExpenses($orderExpenses);
        $checkoutResponseTransfer->setSaveOrder($newSaveOrderTransfer);

        return $checkoutResponseTransfer;
    }
}
