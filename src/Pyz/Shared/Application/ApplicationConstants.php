<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Application;

use Spryker\Shared\Application\ApplicationConstants as SpryApplicationConstants;

/**
 * Declares global environment configuration keys. Do not use it for other class constants.
 */
interface ApplicationConstants extends SpryApplicationConstants
{
    /**
     * Currency code
     */
    public const CURRENCY_CODE = 'CURRENCY_CODE';
}
