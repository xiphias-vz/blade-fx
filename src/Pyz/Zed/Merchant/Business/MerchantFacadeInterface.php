<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Business;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SpySalesOrderEntityTransfer;
use Generated\Shared\Transfer\UserTransfer;
use Spryker\Zed\Merchant\Business\MerchantFacadeInterface as SprykerMerchantFacadeInterface;

interface MerchantFacadeInterface extends SprykerMerchantFacadeInterface
{
    /**
     * Specification:
     * - Find a merchant based on a user.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer|null
     */
    public function findMerchantByUser(UserTransfer $userTransfer): ?MerchantTransfer;

    /**
     * Specification:
     *   - Sets merchant data to order.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\SpySalesOrderEntityTransfer $spySalesOrderEntityTransfer
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\SpySalesOrderEntityTransfer
     */
    public function expandOrderWithMerchant(SpySalesOrderEntityTransfer $spySalesOrderEntityTransfer, QuoteTransfer $quoteTransfer): SpySalesOrderEntityTransfer;
}
