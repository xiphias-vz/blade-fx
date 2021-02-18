<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataExport;

use Pyz\Shared\SalesDataExport\SalesDataExportConstants;
use Spryker\Service\DataExport\DataExportConfig as SpryDataExportConfig;

class DataExportConfig extends SpryDataExportConfig
{
    protected const LOCAL_FILE_SYSTEM_SERVICE_PROVIDER_KEY = 'data_export_order_local';
    protected const SFTP_FILE_SYSTEM_SERVICE_PROVIDER_KEY = 'globus_sftp';
    protected const MODULE_ROOT_DIRECTORY_LEVEL = 4;

    /**
     * Specification:
     * - Returns the path that contains the module independent configuration defaults.
     *
     * @api
     *
     * @return string
     */
    public function getExportConfigurationDefaultsPath(): string
    {
        return $this->getModuleExportConfigurationPath() . 'defaults_config.yml';
    }

    /**
     * Specification:
     * - Returns the path that contains the project specific data export configurations.
     *
     * @api
     *
     * @return string
     */
    public function getExportConfigurationsPath(): string
    {
        return realpath(
            APPLICATION_ROOT_DIR . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'export' . DIRECTORY_SEPARATOR . 'config'
        );
    }

    /**
     * @return string
     */
    protected function getModuleExportConfigurationPath(): string
    {
        $moduleRoot = realpath(
            dirname(__DIR__, static::MODULE_ROOT_DIRECTORY_LEVEL)
        );

        return $moduleRoot . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'export' . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR;
    }

    /**
     * @return string
     */
    public function getLocalFileSystemServiceProviderKey()
    {
        return static::LOCAL_FILE_SYSTEM_SERVICE_PROVIDER_KEY;
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
        return $this->get(SalesDataExportConstants::SFTP_ORDER_EXPORT_FILES_FOLDER_KEY);
    }
}
