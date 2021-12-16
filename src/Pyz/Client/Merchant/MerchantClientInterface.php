<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Merchant;

interface MerchantClientInterface
{
    /**
     * Specification:
     * - Returns the stored merchant from session.
     *
     * @api
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function getMerchant();
}
