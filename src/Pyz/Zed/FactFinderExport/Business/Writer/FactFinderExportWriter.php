<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport\Business\Writer;

use Exception;
use Generated\Shared\Transfer\FileSystemContentTransfer;
use Generated\Shared\Transfer\FileSystemQueryTransfer;
use Pyz\Shared\FactFinder\FactFinderConstants;
use Pyz\Zed\FactFinderExport\FactFinderExportConfig;
use Spryker\Service\FileSystem\Dependency\Exception\FileSystemReadException;
use Spryker\Service\FileSystem\Dependency\Exception\FileSystemWriteException;
use Spryker\Service\FileSystem\FileSystemServiceInterface;

class FactFinderExportWriter implements FactFinderExportWriterInterface
{
    /**
     * @var \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    protected $fileSystemService;

    /**
     * @var \Pyz\Zed\FactFinderExport\FactFinderExportConfig
     */
    protected $exportConfig;

    /**
     * @param \Spryker\Service\FileSystem\FileSystemServiceInterface $fileSystemService
     * @param \Pyz\Zed\FactFinderExport\FactFinderExportConfig $factFinderExportConsoleConfig
     */
    public function __construct(
        FileSystemServiceInterface $fileSystemService,
        FactFinderExportConfig $factFinderExportConsoleConfig
    ) {
        $this->fileSystemService = $fileSystemService;
        $this->exportConfig = $factFinderExportConsoleConfig;
    }

    /**
     * @param string $content
     * @param string $archiveRemoteFilePath
     * @param string $fileName
     *
     * @return void
     */
    public function sendFileToFtp(string $content, string $archiveRemoteFilePath, string $fileName): void
    {
        $transfer = new FileSystemContentTransfer();
        $queryTransfer = new FileSystemQueryTransfer();
        $queryTransfer
            ->setPath($archiveRemoteFilePath)
            ->setFileSystemName($this->exportConfig->getFtpFileSystemServiceProviderKey());

        $transfer
            ->setContent($content)
            ->setPath($archiveRemoteFilePath)
            ->setFileSystemName($this->exportConfig->getFtpFileSystemServiceProviderKey());

        try {
            if ($this->fileSystemService->has($queryTransfer)) {
                $this->updateFtp($transfer);
            } else {
                $this->writeFtp($transfer);
            }
            $this->deleteExportFileLocally($fileName);
        } catch (FileSystemReadException $fileSystemReadException) {
            $this->writeFtp($transfer);
            $this->deleteExportFileLocally($fileName);
        } catch (Exception $exception) {
            dump('fileSystemName: ' . $transfer->getFileSystemName() . ', path:' . $transfer->getPath());
            dump($exception);
        }
    }

    /**
     * @param \Generated\Shared\Transfer\FileSystemContentTransfer $transfer
     *
     * @return void
     */
    private function updateFtp(FileSystemContentTransfer $transfer)
    {
        try {
            $this->fileSystemService->update($transfer);
        } catch (FileSystemWriteException $updateEx) {
            dump('fileSystemName: ' . $transfer->getFileSystemName() . ', path:' . $transfer->getPath() . '. With message: ' . $updateEx->getMessage());
            dump($updateEx);
        }
    }

    /**
     * @param \Generated\Shared\Transfer\FileSystemContentTransfer $transfer
     *
     * @return void
     */
    private function writeFtp(FileSystemContentTransfer $transfer)
    {
        try {
            $this->fileSystemService->write($transfer);
        } catch (FileSystemWriteException $writeEx) {
            dump('fileSystemName: ' . $transfer->getFileSystemName() . ', path:' . $transfer->getPath() . '. With message: ' . $writeEx->getMessage());
            dump($writeEx);
        }
    }

    /**
     * @param string $fileName
     *
     * @return void
     */
    protected function deleteExportFileLocally(string $fileName): void
    {
        $pathToFile = APPLICATION_ROOT_DIR . FactFinderConstants::TARGET_DIRECTORY_FOR_EXTRACTED_FILES . $fileName;
        if (file_exists($pathToFile)) {
            unlink($pathToFile);
        } else {
            dump('File: ' . $fileName . ' was not deleted because it can not be found on path: ' . $pathToFile);
        }
    }
}
