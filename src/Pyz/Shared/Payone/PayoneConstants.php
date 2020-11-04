<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Payone;

use SprykerEco\Shared\Payone\PayoneConstants as SprykerEcoPayoneConstants;

interface PayoneConstants extends SprykerEcoPayoneConstants
{
    /**
     * Specification:
     * - Defines the aggregated Payone configuration section for all stores.
     *
     * @api
     */
    public const PAYONE_ALL_STORES = 'PAYONE_ALL_STORES';
}
