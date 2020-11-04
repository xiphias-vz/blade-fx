<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CollectNumber\Business;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SaveOrderTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\CollectNumber\Business\CollectNumberBusinessFactory getFactory()
 * @method \Pyz\Zed\CollectNumber\Persistence\CollectNumberEntityManagerInterface getEntityManager()
 */
class CollectNumberFacade extends AbstractFacade implements CollectNumberFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\SaveOrderTransfer $saveOrderTransfer
     *
     * @return void
     */
    public function generateCollectNumber(QuoteTransfer $quoteTransfer, SaveOrderTransfer $saveOrderTransfer): void
    {
        $this->getFactory()
            ->createCollectNumberSaver()
            ->generateCollectNumber($quoteTransfer, $saveOrderTransfer);
    }
}
