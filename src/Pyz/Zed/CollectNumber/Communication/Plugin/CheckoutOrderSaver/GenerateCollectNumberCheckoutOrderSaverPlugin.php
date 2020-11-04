<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CollectNumber\Communication\Plugin\CheckoutOrderSaver;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SaveOrderTransfer;
use Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDoSaveOrderInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\CollectNumber\Business\CollectNumberFacadeInterface getFacade()
 * @method \Pyz\Zed\CollectNumber\CollectNumberConfig getConfig()
 */
class GenerateCollectNumberCheckoutOrderSaverPlugin extends AbstractPlugin implements CheckoutDoSaveOrderInterface
{
    /**
     * @inheritDoc
     */
    public function saveOrder(QuoteTransfer $quoteTransfer, SaveOrderTransfer $saveOrderTransfer)
    {
        $this->getFacade()
            ->generateCollectNumber($quoteTransfer, $saveOrderTransfer);
    }
}
