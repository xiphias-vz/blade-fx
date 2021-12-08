<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Generated\Shared\Transfer\CartOrCheckoutEventTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerShop\Yves\CheckoutPage\Process\Steps\SuccessStep as SprykerSuccessStep;
use Symfony\Component\HttpFoundation\Request;

class SuccessStep extends SprykerSuccessStep
{
    /**
     * @var \Generated\Shared\Transfer\QuoteTransfer
     */
    private $copyQuoteTransfer;

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function execute(Request $request, AbstractTransfer $quoteTransfer)
    {
        $this->copyQuoteTransfer = $quoteTransfer;

        return parent::execute($request, $quoteTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\CartOrCheckoutEventTransfer[]
     */
    protected function preparedCheckoutEventTransfer(QuoteTransfer $quoteTransfer): array
    {
        $eventTransfers = [];
        foreach ($quoteTransfer->getItems() as $itemTransfer) {
            $eventTransfer = new CartOrCheckoutEventTransfer();
            $eventTransfer->setCount($itemTransfer->getQuantity());
            $eventTransfer->setId($itemTransfer->getSku());
            $eventTransfer->setMasterId($itemTransfer->getAbstractSku());
            $eventTransfer->setPrice($itemTransfer->getUnitPriceToPayAggregation());
            $eventTransfer->setSid(uniqid());

            $eventTransfers[] = $eventTransfer;
        }

        return $eventTransfers;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return array
     */
    public function getTemplateVariables(AbstractTransfer $quoteTransfer): array
    {
        $data = parent::getTemplateVariables($quoteTransfer);

        $data['collectNumber'] = $this->copyQuoteTransfer->getCollectNumber();
        $data['requestedDeliveryDate'] = $this->copyQuoteTransfer->getShipment()->getRequestedDeliveryDate();
        $data['deliveryMethodKey'] = $this->copyQuoteTransfer->getShipment()->getMethod()->getShipmentMethodKey();
        $data['orderReference'] = $this->copyQuoteTransfer->getOrderReference();
        $data['items'] = $this->copyQuoteTransfer->getItems();
        $data['totals'] = $this->copyQuoteTransfer->getTotals();
        $data['payments'] = $this->copyQuoteTransfer->getPayments();
        $data['isAccountConnectedWithPayback'] = (int)$this->copyQuoteTransfer->getCustomer()->getIsAccountConnected();

        return $data;
    }
}
