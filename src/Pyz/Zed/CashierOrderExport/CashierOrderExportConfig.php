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
    protected const TAX_RATE_TO_SAP_ITEM_TAX_ID_MAP = [
        '16.00' => '1',
        '5.00' => '2',
        '0' => '0',
    ];

    protected const SERVICE_FEE_TO_SERVICE_FEE_CASHIER_NUMBER = [
        '199' => '00000002070000549869',
        '299' => '00000002070000578456',
        '0' => '00000002070000573031',
    ];

    protected const SFTP_STORE_TO_FOLDER_NAME_MAP = [
        'KMD' => '/1031',
        'EIN' => '/1004',
        'LPZ' => '/1042',
        'HAD' => '/1057',
    ];

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
     * @return array
     */
    public function getTaxRateToSapItemTaxIdMap(): array
    {
        return static::TAX_RATE_TO_SAP_ITEM_TAX_ID_MAP;
    }

    /**
     * @return array
     */
    public function getSftpStoreToFolderNameMap(): array
    {
        return static::SFTP_STORE_TO_FOLDER_NAME_MAP;
    }

    /**
     * @return mixed
     */
    public function getSapStoreIdToStoreMap()
    {
        return $this->get(StoreConstants::SAP_STORE_ID_TO_STORE_MAP);
    }

    /**
     * @return string[]
     */
    public function getServiceFeeToServiceFeeCashierNumber(): array
    {
        return static::SERVICE_FEE_TO_SERVICE_FEE_CASHIER_NUMBER;
    }
}
