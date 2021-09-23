<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
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
