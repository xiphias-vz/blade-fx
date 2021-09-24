<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductLabelDataImport;

use Spryker\Zed\ProductLabelDataImport\ProductLabelDataImportConfig as SprykerDataImportConfig;

class ProductLabelDataImportConfig extends SprykerDataImportConfig
{
    /**
     * @return string
     */
    protected function getModuleRoot(): string
    {
        return realpath(
            dirname(__DIR__, static::MODULE_ROOT_DIRECTORY_LEVEL)
        ) . DIRECTORY_SEPARATOR;
    }
}
