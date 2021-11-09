<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport\Business\Writer;

use Generated\Shared\Transfer\FileSystemContentTransfer;
use Generated\Shared\Transfer\FileSystemQueryTransfer;
use Pyz\Shared\FactFinder\FactFinderConstants;
use Pyz\Zed\FactFinderExport\FactFinderExportConfig;
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
            $this->fileSystemService->write($transfer);
            $this->deleteExportFileLocally($fileName);
        } catch (FileSystemWriteException $writerException) {
            dump('fileSystemName: ' . $transfer->getFileSystemName() . ', path: ' . $transfer->getPath());
            dump($writerException);
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
