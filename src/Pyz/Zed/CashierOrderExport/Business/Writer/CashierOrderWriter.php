<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Writer;

use Exception;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderFileCheckerInterface;
use Pyz\Zed\CashierOrderExport\Business\Deleter\CashierOrderDeleterInterface;
use Pyz\Zed\CashierOrderExport\Business\Resolver\CashierOrderFileNameResolverInterface;
use Spryker\Shared\Log\LoggerTrait;

class CashierOrderWriter implements CashierOrderWriterInterface
{
    use LoggerTrait;

    protected const FILE_CREATE_FAIL_MESSAGE = 'failed to create cashier order archive with file name: ';
    protected const FILE_EXIST_FAIL_MESSAGE = 'failed to create cashier order archive, file already exist. File name: ';

    /**
     * @var \Pyz\Zed\CashierOrderExport\Business\Resolver\CashierOrderFileNameResolverInterface
     */
    protected $cashierOrderFilePathResolver;

    /**
     * @var \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderSftpWriterInterface
     */
    protected $cashierOrderSftpWriter;

    /**
     * @var \Pyz\Zed\CashierOrderExport\Business\Deleter\CashierOrderDeleterInterface
     */
    protected $cashierOrderDeleter;

    /**
     * @var \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderArchiveWriterInterface
     */
    protected $cashierOrderArchiveWriter;

    /**
     * @var \Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderFileCheckerInterface
     */
    protected $cashierOrderFileChecker;

    /**
     * @param \Pyz\Zed\CashierOrderExport\Business\Resolver\CashierOrderFileNameResolverInterface $cashierOrderFilePathResolver
     * @param \Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderFileCheckerInterface $cashierOrderFileChecker
     * @param \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderArchiveWriterInterface $cashierOrderArchiveWriter
     * @param \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderSftpWriterInterface $cashierOrderSftpWriter
     * @param \Pyz\Zed\CashierOrderExport\Business\Deleter\CashierOrderDeleterInterface $cashierOrderDeleter
     */
    public function __construct(
        CashierOrderFileNameResolverInterface $cashierOrderFilePathResolver,
        CashierOrderFileCheckerInterface $cashierOrderFileChecker,
        CashierOrderArchiveWriterInterface $cashierOrderArchiveWriter,
        CashierOrderSftpWriterInterface $cashierOrderSftpWriter,
        CashierOrderDeleterInterface $cashierOrderDeleter
    ) {
        $this->cashierOrderFilePathResolver = $cashierOrderFilePathResolver;
        $this->cashierOrderArchiveWriter = $cashierOrderArchiveWriter;
        $this->cashierOrderSftpWriter = $cashierOrderSftpWriter;
        $this->cashierOrderDeleter = $cashierOrderDeleter;
        $this->cashierOrderFileChecker = $cashierOrderFileChecker;
    }

    /**
     * @param string $content
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return void
     */
    public function write(string $content, OrderTransfer $orderTransfer): void
    {
        $archiveFileName = $this->cashierOrderFilePathResolver->resolveCashierOrderExportArchiveFileName();
        $archiveFilePath = $this->cashierOrderFilePathResolver->resolveCashierOrderExportArchiveFilePath($archiveFileName);
        $fileName = $this->cashierOrderFilePathResolver->resolveCashierOrderExportFileName();
        $archiveRemoteFilePat = $this->cashierOrderFilePathResolver
            ->resolveCashierOrderExportArchiveRemoteFilePath($archiveFileName);

        if ($this->cashierOrderFileChecker->isFileExist($archiveFilePath)) {
            $this->logError(static::FILE_EXIST_FAIL_MESSAGE, $archiveFileName);
        }

        try {
            $this->cashierOrderArchiveWriter->addContentToArchive($archiveFilePath, $fileName, $content);
            $this->cashierOrderSftpWriter->sendFileToFtp($archiveFileName, $archiveRemoteFilePat);
            $this->cashierOrderDeleter->delete($archiveFileName);
        } catch (Exception $exception) {
            $this->logError(static::FILE_CREATE_FAIL_MESSAGE, $archiveFileName, $exception->getTrace());
        }
    }

    /**
     * @param string $message
     * @param string $archiveFileName
     * @param array $trace
     *
     * @return void
     */
    protected function logError(string $message, string $archiveFileName, array $trace = [])
    {
        $this->getLogger()->error(
            sprintf('%s%s', $message, $archiveFileName),
            $trace
        );
    }
}
