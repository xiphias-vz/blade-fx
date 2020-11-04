<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantRegion;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Pyz\Shared\DataImport\DataImportConfig as SharedDataImportConfig;
use Spryker\Zed\DataImport\DataImportConfig;

class MerchantRegionConfig extends DataImportConfig
{
    public const IMPORT_TYPE_MERCHANT_REGION = 'merchant-region';

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getMerchantDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        $moduleDataImportDirectory = APPLICATION_ROOT_DIR . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'import' . DIRECTORY_SEPARATOR;

        $dataImporterConfigurationTransfer = $this->buildImporterConfiguration($moduleDataImportDirectory . 'spryker/merchant_region.csv', static::IMPORT_TYPE_MERCHANT_REGION);
        $dataImporterConfigurationTransfer->getReaderConfiguration()
            ->setCsvDelimiter(SharedDataImportConfig::IMPORT_CSV_DELIMITER);

        return $dataImporterConfigurationTransfer;
    }
}
