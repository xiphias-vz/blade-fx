<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Checker;

use Generated\Shared\Transfer\FileSystemQueryTransfer;
use Pyz\Zed\CashierOrderExport\CashierOrderExportConfig;
use Spryker\Service\FileSystem\FileSystemServiceInterface;

class CashierOrderFileChecker implements CashierOrderFileCheckerInterface
{
    /**
     * @var \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    protected $fileSystemService;

    /**
     * @var \Pyz\Zed\CashierOrderExport\Business\Resolver\CashierOrderFileNameResolverInterface
     */
    protected $cashierOrderFilePathResolver;

    /**
     * @var \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig
     */
    protected $cashierOrderExportConfig;

    /**
     * @var \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderSftpWriterInterface
     */
    protected $cashierOrderSftpWriter;

    /**
     * @param \Spryker\Service\FileSystem\FileSystemServiceInterface $fileSystemService
     * @param \Pyz\Zed\CashierOrderExport\CashierOrderExportConfig $cashierOrderExportConfig
     */
    public function __construct(
        FileSystemServiceInterface $fileSystemService,
        CashierOrderExportConfig $cashierOrderExportConfig
    ) {
        $this->fileSystemService = $fileSystemService;
        $this->cashierOrderExportConfig = $cashierOrderExportConfig;
    }

    /**
     * @param string $archiveFilePath
     *
     * @return bool
     */
    public function isFileExist(string $archiveFilePath): bool
    {
        return $this->fileSystemService->has(
            (new FileSystemQueryTransfer())
                ->setPath($archiveFilePath)
                ->setFileSystemName($this->cashierOrderExportConfig->getLocalFileSystemServiceProviderKey())
        );
    }
}
