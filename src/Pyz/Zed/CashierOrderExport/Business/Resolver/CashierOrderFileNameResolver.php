<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Resolver;

use DateTime;
use Pyz\Zed\CashierOrderExport\CashierOrderExportConfig;

class CashierOrderFileNameResolver implements CashierOrderFileNameResolverInterface
{
    protected const EXPORT_ARCHIVE_FILE_PATH_MASK = '%s%s%s';
    protected const EXPORT_FILE_NAME_DEFAULT_PREFIX = 'GN_';
    protected const EXPORT_FILE_NAME_DATE_FORMAT = 'Ymd-His';
    protected const EXPORT_FILE_DEFAULT_NAME = 'order.txt';
    protected const EXPORT_XML_FILE_DEFAULT_NAME = 'order.xml';
    protected const EXPORT_FILE_REMOTE_FILE_PATH_FORMAT = '%s/%s/%s';
    protected const EXPORT_ARCHIVE_FILE_NAME_FORMAT = '%s%s_%s%s';
    protected const EXPORT_ARCHIVE_FILE_EXTENSION = '.zip';

    protected const EXPORT_ARCHIVE_XML_FILE_NAME_FORMAT = '%s%s_%s_%s%s';
    protected const EXPORT_XML_FILE_NAME_DEFAULT_PREFIX = 'cc_';
    protected const EXPORT_XML_FILE_NAME_DATE_FORMAT = 'ymd_His';
    protected const EXPORT_ARCHIVE_XML_FILE_EXTENSION = '.xml';

    /**
     * @var \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig
     */
    protected $cashierOrderExportConfig;

    /**
     * @param \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig $cashierOrderExportConfig
     */
    public function __construct(
        CashierOrderExportConfig $cashierOrderExportConfig
    ) {
        $this->cashierOrderExportConfig = $cashierOrderExportConfig;
    }

    /**
     * @return string
     */
    public function resolveCashierOrderExportFileName(): string
    {
        return static::EXPORT_FILE_DEFAULT_NAME;
    }

    /**
     * @param string $cashierOrderExportArchiveFileName
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveFilePath(string $cashierOrderExportArchiveFileName): string
    {
        return sprintf(
            static::EXPORT_ARCHIVE_FILE_PATH_MASK,
            $this->cashierOrderExportConfig->getDefaultCashierExportArchiveDirectoryRoot(),
            $this->cashierOrderExportConfig->getDefaultCashierExportArchiveFilePath(),
            $cashierOrderExportArchiveFileName
        );
    }

    /**
     * @param int $idSalesOrder
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveFileName(int $idSalesOrder): string
    {
        return sprintf(
            static::EXPORT_ARCHIVE_FILE_NAME_FORMAT,
            static::EXPORT_FILE_NAME_DEFAULT_PREFIX,
            (new DateTime())->format(static::EXPORT_FILE_NAME_DATE_FORMAT),
            $idSalesOrder,
            static::EXPORT_ARCHIVE_FILE_EXTENSION
        );
    }

    /**
     * @param string $fileName
     * @param string $store
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveRemoteFilePath(string $fileName, string $store): string
    {
        return sprintf(
            static::EXPORT_FILE_REMOTE_FILE_PATH_FORMAT,
            $this->cashierOrderExportConfig->getDefaultRemoteCashierExportDirectoryPath(),
            $this->getSapStoreId($store),
            $fileName
        );
    }

    /**
     * @param string $store
     *
     * @return int
     */
    protected function getSapStoreId(string $store): int
    {
        $sapStoreIdToStoreMap = $this->cashierOrderExportConfig->getSapStoreIdToStoreMap();

        return array_search($store, $sapStoreIdToStoreMap);
    }

    /**
     * @param int $idSalesOrder
     * @param string $merchantReference
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveXmlFileName(int $idSalesOrder, string $merchantReference): string
    {
        return sprintf(
            static::EXPORT_ARCHIVE_XML_FILE_NAME_FORMAT,
            static::EXPORT_XML_FILE_NAME_DEFAULT_PREFIX,
            $merchantReference,
            (new DateTime())->format(static::EXPORT_XML_FILE_NAME_DATE_FORMAT),
            $this->calculateOrderNumberInFileName($idSalesOrder),
            static::EXPORT_ARCHIVE_XML_FILE_EXTENSION
        );
    }

    /**
     * @param string $idSalesOrder
     *
     * @return string
     */
    public function calculateOrderNumberInFileName(string $idSalesOrder)
    {
        $numlength = strlen((string)$idSalesOrder);
        $numberOfZeroes = 9 - $numlength;
        $result = str_repeat('0', $numberOfZeroes);
        $result .= $idSalesOrder;

        return $result;
    }

    /**
     * @return string
     */
    public function resolveCashierOrderExportXmlFileName(): string
    {
        return static::EXPORT_XML_FILE_DEFAULT_NAME;
    }

    /**
     * @param string $fileName
     * @param string $merchantReference
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveRemoteXmlFilePath(string $fileName, string $merchantReference): string
    {
        return sprintf(
            static::EXPORT_FILE_REMOTE_FILE_PATH_FORMAT,
            $this->cashierOrderExportConfig->getDefaultRemoteCashierExportXmlDirectoryPath(),
            $merchantReference,
            $fileName
        );
    }
}
