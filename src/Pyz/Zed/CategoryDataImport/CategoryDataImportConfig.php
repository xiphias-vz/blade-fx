<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryDataImport;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Pyz\Shared\DataImport\DataImportConfig;
use Spryker\Zed\CategoryDataImport\CategoryDataImportConfig as SprykerCategoryDataImportConfig;

class CategoryDataImportConfig extends SprykerCategoryDataImportConfig
{
    public const IMPORT_TYPE_CATEGORY = 'category';

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCategoryDataImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration(
            'spryker/categories.csv',
            static::IMPORT_TYPE_CATEGORY
        );
    }

    /**
     * @param string $file
     * @param string $importType
     *
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    protected function buildBaseImporterConfiguration(string $file, string $importType): DataImporterConfigurationTransfer
    {
        $dataImporterConfigurationTransfer = $this->buildImporterConfiguration($file, $importType);

        $dataImporterConfigurationTransfer
            ->getReaderConfiguration()
            ->setCsvDelimiter(DataImportConfig::IMPORT_CSV_BASE_DELIMITER);

        return $dataImporterConfigurationTransfer;
    }
}
