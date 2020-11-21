<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Generated\Shared\Transfer\OrderDetailRequestTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Client\OrderDetail\OrderDetailClientInterface;
use Pyz\Shared\OrderDetail\OrderDetailConstants;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerShop\Yves\CheckoutPage\CheckoutPageConfig;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCheckoutClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToProductBundleClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Service\CheckoutPageToShipmentServiceInterface;
use SprykerShop\Yves\CheckoutPage\Process\Steps\SummaryStep as SprykerSummaryStep;

class SummaryStep extends SprykerSummaryStep
{
    /**
     * @var \Pyz\Client\OrderDetail\OrderDetailClientInterface
     */
    private $orderDetailClient;

    /**
     * @param \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToProductBundleClientInterface $productBundleClient
     * @param \SprykerShop\Yves\CheckoutPage\Dependency\Service\CheckoutPageToShipmentServiceInterface $shipmentService
     * @param \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig $checkoutPageConfig
     * @param string $stepRoute
     * @param string|null $escapeRoute
     * @param \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCheckoutClientInterface $checkoutClient
     * @param \Pyz\Client\OrderDetail\OrderDetailClientInterface $orderDetailClient
     */
    public function __construct(
        CheckoutPageToProductBundleClientInterface $productBundleClient,
        CheckoutPageToShipmentServiceInterface $shipmentService,
        CheckoutPageConfig $checkoutPageConfig,
        $stepRoute,
        $escapeRoute,
        CheckoutPageToCheckoutClientInterface $checkoutClient,
        OrderDetailClientInterface $orderDetailClient
    ) {
        parent::__construct($productBundleClient, $shipmentService, $checkoutPageConfig, $stepRoute, $escapeRoute, $checkoutClient);

        $this->orderDetailClient = $orderDetailClient;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return array
     */
    public function getTemplateVariables(AbstractTransfer $quoteTransfer)
    {
        $data = parent::getTemplateVariables($quoteTransfer);

        $orderDetailRequestTransfer = $this->getOrderDetailRequestTransfer($quoteTransfer);
        $orderDetails = $this->orderDetailClient->getInvoiceOrderDetailDataFromOrder($orderDetailRequestTransfer);

        $data['taxPayments'] = $orderDetails[OrderDetailConstants::KEY_TAX_PAYMENTS_EXPENSES];
        $data['totalItems'] = $this->getTotalItems($data['cartItems']);

        return $data;
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $cartItems
     *
     * @return int
     */
    protected function getTotalItems(array $cartItems): int
    {
        $totalItems = 0;
        foreach ($cartItems as $cartItem) {
            $totalItems += $cartItem->getQuantity();
        }

        return $totalItems;
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
            ->setExpenses($quoteTransfer->getExpenses())
            ->setTotals($quoteTransfer->getTotals());
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function preCondition(AbstractTransfer $quoteTransfer)
    {
        $quoteTransfer->setTermsApproval(false);

        return true;
    }

    /**
     * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $quoteTransfer
     *
     * @return bool
     */
    public function postCondition(AbstractTransfer $quoteTransfer)
    {
        return parent::postCondition($quoteTransfer) && $this->isTermsApprovalSet($quoteTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    protected function isTermsApprovalSet(QuoteTransfer $quoteTransfer): bool
    {
        return $quoteTransfer->getTermsApproval() !== false;
    }
}