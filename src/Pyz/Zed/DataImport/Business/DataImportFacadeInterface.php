<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business;

use Spryker\Zed\DataImport\Business\DataImportFacadeInterface as SprykerDataImportFacadeInterface;

interface DataImportFacadeInterface extends SprykerDataImportFacadeInterface
{
    /**
     * @return void
     */
    public function updateProductAvailability(): void;
}
