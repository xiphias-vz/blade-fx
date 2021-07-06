<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport;

use Spryker\Zed\SalesDataExport\SalesDataExportConfig as SpySalesDataExportConfig;

class SalesDataExportConfig extends SpySalesDataExportConfig
{
    protected const MODULE_ROOT_DIRECTORY_LEVEL = 4;
    protected const SFTP_FILE_SYSTEM_SERVICE_PROVIDER_KEY = 'globus_sftp';
    public const SFTP_ORDER_EXPORT_FILES_FOLDER_KEY = 'SFTP_ORDER_EXPORT_FILES_FOLDER_KEY';

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
        return $this->get(SalesDataExportConfig::SFTP_ORDER_EXPORT_FILES_FOLDER_KEY);
    }
}
