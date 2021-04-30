<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderSummaryExport;

use Spryker\Zed\Kernel\AbstractBundleConfig;

class SalesOrderSummaryExportConfig extends AbstractBundleConfig
{
    protected const MODULE_ROOT_DIRECTORY_LEVEL = 4;
    protected const SFTP_FILE_SYSTEM_SERVICE_PROVIDER_KEY = 'globus_sftp';
    public const SFTP_ORDER_EXPORT_FILES_FOLDER_KEY = 'SFTP_ORDER_EXPORT_FILES_FOLDER_KEY';
    public const SFTP_PRODUCT_DEEPLINK_EXPORT_FILES_FOLDER_KEY = 'SFTP_PRODUCT_DEEPLINK_EXPORT_FILES_FOLDER_KEY';

    /**
     * Specification:
     * - Returns the fully qualified file path that contains the module data export configurations.
     *
     * @api
     *
     * @return string
     */
    public function getModuleDataExportConfigurationsFilePath(): string
    {
        return $this->getModuleDataExportConfigurationPath() . 'sales_export_config.yml';
    }

    /**
     * @return string
     */
    protected function getModuleDataExportConfigurationPath(): string
    {
        $moduleRoot = realpath(
            dirname(__DIR__, static::MODULE_ROOT_DIRECTORY_LEVEL)
        );

        return $moduleRoot . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'export' . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR;
    }

    /**
     * @return string
     */
    public function getSftpFileSystemServiceProviderKey()
    {
        return static::SFTP_FILE_SYSTEM_SERVICE_PROVIDER_KEY;
    }

    /**
     * @return string
     */
    public function getDefaultOrderExportDirectoryPath(): string
    {
        return $this->get(SalesOrderSummaryExportConfig::SFTP_ORDER_EXPORT_FILES_FOLDER_KEY);
    }

    /**
     * @return string
     */
    public function getDefaultDeeplinkExportDirectoryPath(): string
    {
        return $this->get(SalesOrderSummaryExportConfig::SFTP_PRODUCT_DEEPLINK_EXPORT_FILES_FOLDER_KEY);
    }
}
