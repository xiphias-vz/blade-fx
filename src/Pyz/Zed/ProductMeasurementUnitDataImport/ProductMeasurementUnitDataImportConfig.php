<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductMeasurementUnitDataImport;

use Spryker\Zed\ProductMeasurementUnitDataImport\ProductMeasurementUnitDataImportConfig as SprykerProductMeasurementUnitDataImportConfig;

class ProductMeasurementUnitDataImportConfig extends SprykerProductMeasurementUnitDataImportConfig
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
