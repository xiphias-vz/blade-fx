<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport;

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\Store\StoreConstants;
use Spryker\Shared\FileSystem\FileSystemConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class CashierOrderExportConfig extends AbstractBundleConfig
{
    protected const LOCAL_FILE_SYSTEM_SERVICE_PROVIDER_KEY = 'cashier_order_local';
    protected const SFTP_FILE_SYSTEM_SERVICE_PROVIDER_KEY = 'globus_sftp';
    protected const LOCAL_FILE_SYSTEM_SERVICE_PATH_KEY = 'path';
    protected const LOCAL_FILE_SYSTEM_SERVICE_ROOT_KEY = 'root';

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
    public function getLocalFileSystemServiceProviderKey()
    {
        return static::LOCAL_FILE_SYSTEM_SERVICE_PROVIDER_KEY;
    }

    /**
     * @return string
     */
    public function getDefaultCashierExportArchiveFilePath(): string
    {
        return $this->get(FileSystemConstants::FILESYSTEM_SERVICE)[static::LOCAL_FILE_SYSTEM_SERVICE_PROVIDER_KEY][static::LOCAL_FILE_SYSTEM_SERVICE_PATH_KEY];
    }

    /**
     * @return string
     */
    public function getDefaultCashierExportArchiveDirectoryRoot(): string
    {
        return $this->get(FileSystemConstants::FILESYSTEM_SERVICE)[static::LOCAL_FILE_SYSTEM_SERVICE_PROVIDER_KEY][static::LOCAL_FILE_SYSTEM_SERVICE_ROOT_KEY];
    }

    /**
     * @return string
     */
    public function getDefaultRemoteCashierExportDirectoryPath(): string
    {
        return $this->get(CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY);
    }

    /**
     * @return mixed
     */
    public function getSapStoreIdToStoreMap()
    {
        return $this->get(StoreConstants::SAP_STORE_ID_TO_STORE_MAP);
    }
}
