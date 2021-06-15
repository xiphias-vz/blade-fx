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
    protected const CASHIER_FILE_SUPPORTED_ENCODING = 'ASCII';
    protected const TAX_RATE_TO_SAP_ITEM_TAX_ID_MAP = [
        '19.00' => '1',
        '7.00' => '2',
        '0' => '0',
    ];

    protected const SERVICE_FEE_TO_SERVICE_FEE_CASHIER_NUMBER = [
        '199' => '00000002070000549869',
        '299' => '00000002070000578456',
        '0' => '00000002070000573031',
    ];

    protected const SERVICE_FEE_XML_BARCODE_NUMBER = [
        '199' => '2070000549869',
        '299' => '2070000578456',
        '0' => '2070000573031',
    ];

    protected const SERVICE_FEE_XML_ITEM_NUMBER = [
        '199' => '7158855',
        '299' => '7373112',
        '0' => '7331534',
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
     * @return string
     */
    public function getDefaultRemoteCashierExportXmlDirectoryPath(): string
    {
        return $this->get(CashierOrderExportConstants::SFTP_CASHIER_ORDER_XML_FILES_FOLDER_KEY);
    }

    /**
     * @return array
     */
    public function getTaxRateToSapItemTaxIdMap(): array
    {
        return static::TAX_RATE_TO_SAP_ITEM_TAX_ID_MAP;
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

    /**
     * @return string
     */
    public function getCashierFileSupportedEncoding(): string
    {
        return static::CASHIER_FILE_SUPPORTED_ENCODING;
    }

    /**
     * @return string
     */
    public function getCashierFileDownloadUrl(): string
    {
        return $this->get(CashierOrderExportConstants::CASHIER_FILE_DOWNLOAD_URL);
    }

    /**
     * @return string[]
     */
    public function getServiceFeeXmlBarcodeNumber(): array
    {
        return static::SERVICE_FEE_XML_BARCODE_NUMBER;
    }

    /**
     * @return string[]
     */
    public function getServiceFeeXmlItemNumber(): array
    {
        return static::SERVICE_FEE_XML_ITEM_NUMBER;
    }
}
