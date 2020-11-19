<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Deleter;

use Generated\Shared\Transfer\FileSystemDeleteTransfer;
use Pyz\Zed\CashierOrderExport\CashierOrderExportConfig;
use Spryker\Service\FileSystem\FileSystemServiceInterface;

class CashierOrderDeleter implements CashierOrderDeleterInterface
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
     * @param string $filePath
     *
     * @return void
     */
    public function delete(string $filePath): void
    {
        $this->fileSystemService->delete((new FileSystemDeleteTransfer())
            ->setFileSystemName($this->cashierOrderExportConfig->getLocalFileSystemServiceProviderKey())
            ->setPath($filePath));
    }
}
