<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Communication\Mapper;

use Generated\Shared\Transfer\MerchantSalesOrderTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SaveOrderTransfer;

interface MerchantSalesOrderMapperInterface
{
    /**
     * @param \Generated\Shared\Transfer\SaveOrderTransfer $saveOrderTransfer
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantSalesOrderTransfer
     */
    public function mapFromSaveOrderTransfer(
        SaveOrderTransfer $saveOrderTransfer,
        QuoteTransfer $quoteTransfer
    ): MerchantSalesOrderTransfer;
}
