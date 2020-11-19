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
    protected const EXPORT_FILE_REMOTE_FILE_PATH_FORMAT = '%s/%s';
    protected const EXPORT_ARCHIVE_FILE_NAME_FORMAT = '%s%s%s';
    protected const EXPORT_ARCHIVE_FILE_EXTENSION = '.zip';

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
     * @return string
     */
    public function resolveCashierOrderExportArchiveFileName(): string
    {
        return sprintf(
            static::EXPORT_ARCHIVE_FILE_NAME_FORMAT,
            static::EXPORT_FILE_NAME_DEFAULT_PREFIX,
            (new DateTime())->format(static::EXPORT_FILE_NAME_DATE_FORMAT),
            static::EXPORT_ARCHIVE_FILE_EXTENSION
        );
    }

    /**
     * @param string $fileName
     *
     * @return string
     */
    public function resolveCashierOrderExportArchiveRemoteFilePath(string $fileName): string
    {
        return sprintf(
            static::EXPORT_FILE_REMOTE_FILE_PATH_FORMAT,
            $this->cashierOrderExportConfig->getDefaultRemoteCashierExportDirectoryPath(),
            $fileName
        );
    }
}
