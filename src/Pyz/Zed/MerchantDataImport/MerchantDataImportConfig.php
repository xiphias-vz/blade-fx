<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace  Pyz\Zed\MerchantDataImport;

use Spryker\Zed\MerchantDataImport\MerchantDataImportConfig as SprykerMerchantDataImportConfigAlias;

class MerchantDataImportConfig extends SprykerMerchantDataImportConfigAlias
{
    /**
     * @return string
     */
    protected function getModuleRoot(): string
    {
        $moduleRoot = realpath(APPLICATION_ROOT_DIR);

        return $moduleRoot . DIRECTORY_SEPARATOR;
    }
}
