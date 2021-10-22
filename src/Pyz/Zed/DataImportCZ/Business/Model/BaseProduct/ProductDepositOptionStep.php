<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImportCZ\Business\Model\BaseProduct;

use Pyz\Zed\DataImport\Business\Model\BaseProduct\ProductDepositOptionStep as LocalProductDepositOptionStep;

class ProductDepositOptionStep extends LocalProductDepositOptionStep
{
    protected const LOCALE_NAME = 'cs_CZ';
    protected const DEFAULT_CURRENCY = 'CZK';
    protected const DEPOSITS_TAX_SET = 'ZERO';
}
