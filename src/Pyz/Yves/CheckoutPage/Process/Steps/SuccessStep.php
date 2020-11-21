<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process\Steps;

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
     * @return array
     */
    public function getTemplateVariables(AbstractTransfer $quoteTransfer): array
    {
        $data = parent::getTemplateVariables($quoteTransfer);

        $data['collectNumber'] = $this->copyQuoteTransfer->getCollectNumber();
        $data['requestedDeliveryDate'] = $this->copyQuoteTransfer->getShipment()->getRequestedDeliveryDate();
        $data['deliveryMethodKey'] = $this->copyQuoteTransfer->getShipment()->getMethod()->getShipmentMethodKey();
        $data['orderReference'] = $this->copyQuoteTransfer->getOrderReference();

        return $data;
    }
}