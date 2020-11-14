<?php

namespace Pyz\Zed\DataImport\Business\Model\FileDownload;

use Generated\Shared\Transfer\FileSystemCopyTransfer;
use Generated\Shared\Transfer\FileSystemDeleteTransfer;
use Generated\Shared\Transfer\FileSystemListTransfer;
use Generated\Shared\Transfer\FileSystemQueryTransfer;
use Generated\Shared\Transfer\FileSystemResourceTransfer;
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Service\FileSystem\FileSystemService;

class SFTPDataImportFileDownloader
{
    /**
     * @var \Spryker\Service\FileSystem\FileSystemService
     */
    protected $fileSystemService;

    /**
     * @var \Pyz\Zed\DataImport\DataImportConfig
     */
    protected $dataImportConfig;

    protected const SFTP_PATH = '/OUT/RK';
    protected const SFTP_ARCHIVE_PATH = self::SFTP_PATH . '/archiv/';
    protected const SFTP_FILE_SYSTEM_NAME = 'globus_sftp';
    protected const IMPORT_FILES_LOCATION_PATH = '/data/import/spryker/';

    /**
     * @param \Spryker\Service\FileSystem\FileSystemService $fileSystemService
     * @param \Pyz\Zed\DataImport\DataImportConfig $dataImportConfig
     */
    public function __construct(
        FileSystemService $fileSystemService,
        DataImportConfig $dataImportConfig
    ) {
        $this->fileSystemService = $fileSystemService;
        $this->dataImportConfig = $dataImportConfig;
    }

    public function downloadDataImportFiles()
    {
        $listContents = $this->fileSystemService->listContents(
            (new FileSystemListTransfer())
                ->setPath(static::SFTP_PATH)
                ->setFileSystemName(static::SFTP_FILE_SYSTEM_NAME)
        );

        foreach ($listContents as $content) {
            foreach ($this->dataImportConfig->getRegexToSprykerFileNameMap() as $regex => $fileName) {
                if (preg_match($regex, $content->getFilename(), $matches)) {
                    $csvFileSavingStatus = $this->downloadFile($content, $fileName);

                    if (!$csvFileSavingStatus) {
                        continue;
                    }

                    $this->moveDownloadedFilesToArchive($content);
                }
            }
        }
    }

    /**
     * @param \Generated\Shared\Transfer\FileSystemResourceTransfer $resourceTransfer
     * @param $destinationFileName
     *
     * @return bool
     */
    protected function downloadFile(FileSystemResourceTransfer $resourceTransfer, $destinationFileName): bool
    {
        $csvFileBody = $this->fileSystemService->read(
            (new FileSystemQueryTransfer())
                ->setPath($resourceTransfer->getPath())
                ->setFileSystemName(static::SFTP_FILE_SYSTEM_NAME)
        );

         return (bool)file_put_contents(APPLICATION_ROOT_DIR . static::IMPORT_FILES_LOCATION_PATH . $destinationFileName, $csvFileBody);
    }

    /**
     * @param \Generated\Shared\Transfer\FileSystemResourceTransfer $resourceTransfer
     */
    protected function moveDownloadedFilesToArchive(FileSystemResourceTransfer $resourceTransfer): void
    {

        $this->fileSystemService->copy(
            (new FileSystemCopyTransfer)
                ->setFileSystemName(static::SFTP_FILE_SYSTEM_NAME)
                ->setDestinationPath(static::SFTP_ARCHIVE_PATH . $resourceTransfer->getBasename())
                ->setSourcePath($resourceTransfer->getPath())
        );

        $this->fileSystemService->delete(
            (new FileSystemDeleteTransfer())
                ->setFileSystemName(static::SFTP_FILE_SYSTEM_NAME)
                ->setPath($resourceTransfer->getPath())
        );
    }
}
