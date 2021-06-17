<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace  Pyz\Zed\MerchantDataImportCZ;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\MerchantDataImport\MerchantDataImportConfig as SpryMerchantDataImportConfig;

class MerchantDataImportConfig extends SpryMerchantDataImportConfig
{
    public const IMPORT_TYPE_MERCHANT = 'merchant';

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getMerchantDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        $moduleDataImportDirectory = $this->getModuleRoot() . 'data' . DIRECTORY_SEPARATOR . 'import' . DIRECTORY_SEPARATOR;

        return $this->buildImporterConfiguration($moduleDataImportDirectory . 'merchant_CZ.csv', static::IMPORT_TYPE_MERCHANT);
    }

    /**
     * @return string
     */
    protected function getModuleRoot(): string
    {
        $moduleRoot = realpath(
            __DIR__
            . DIRECTORY_SEPARATOR . '..'
            . DIRECTORY_SEPARATOR . '..'
            . DIRECTORY_SEPARATOR . '..'
            . DIRECTORY_SEPARATOR . '..'
        );

        return $moduleRoot . DIRECTORY_SEPARATOR;
    }
}
