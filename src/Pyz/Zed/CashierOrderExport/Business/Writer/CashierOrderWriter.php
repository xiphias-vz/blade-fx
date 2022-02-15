<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Writer;

use Aws\Command;
use Aws\S3\ObjectUploader;
use Aws\S3\S3Client;
use DateTime;
use Exception;
use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Shared\S3Constants\S3Constants;
use Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderFileCheckerInterface;
use Pyz\Zed\CashierOrderExport\Business\Deleter\CashierOrderDeleterInterface;
use Pyz\Zed\CashierOrderExport\Business\Resolver\CashierOrderFileNameResolverInterface;
use Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepositoryInterface;
use Spryker\Shared\Config\Config;
use Spryker\Shared\Log\LoggerTrait;
use Symfony\Component\Config\Definition\Exception\Exception as SymfonyException;
use XMLWriter;

class CashierOrderWriter implements CashierOrderWriterInterface
{
    use LoggerTrait;

    protected const FILE_CREATE_FAIL_MESSAGE = 'failed to create cashier order archive with file name: ';
    protected const FILE_EXIST_FAIL_MESSAGE = 'failed to create cashier order archive, file already exist. File name: ';
    protected const LOCAL_AWS_CONFIG_CREDENTIALS = 'globus_s3_cashier_file_credentials';
    protected const LOCAL_AWS_CONFIG_CREDENTIALS_KEY = 'key';
    protected const LOCAL_AWS_CONFIG_CREDENTIALS_SECRET = 'secret';
    protected const LOCAL_AWS_CONFIG_CREDENTIALS_BUCKET = 'bucket';
    protected const EXPORT_XML_FILE_NAME_DATE_FORMAT = 'Ymd';

    protected const EXPORT_ARCHIVE_FILE_PATH = '../../src/Pyz/Zed/CashierOrderExport/Communication/CashierFiles/';

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
     * @var \Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepositoryInterface
     */
    protected $cashierOrderExportRepository;

    /**
     * @param \Pyz\Zed\CashierOrderExport\Business\Resolver\CashierOrderFileNameResolverInterface $cashierOrderFilePathResolver
     * @param \Pyz\Zed\CashierOrderExport\Business\Checker\CashierOrderFileCheckerInterface $cashierOrderFileChecker
     * @param \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderArchiveWriterInterface $cashierOrderArchiveWriter
     * @param \Pyz\Zed\CashierOrderExport\Business\Writer\CashierOrderSftpWriterInterface $cashierOrderSftpWriter
     * @param \Pyz\Zed\CashierOrderExport\Business\Deleter\CashierOrderDeleterInterface $cashierOrderDeleter
     * @param \Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportRepositoryInterface $cashierOrderExportRepository
     */
    public function __construct(
        CashierOrderFileNameResolverInterface $cashierOrderFilePathResolver,
        CashierOrderFileCheckerInterface $cashierOrderFileChecker,
        CashierOrderArchiveWriterInterface $cashierOrderArchiveWriter,
        CashierOrderSftpWriterInterface $cashierOrderSftpWriter,
        CashierOrderDeleterInterface $cashierOrderDeleter,
        CashierOrderExportRepositoryInterface $cashierOrderExportRepository
    ) {
        $this->cashierOrderFilePathResolver = $cashierOrderFilePathResolver;
        $this->cashierOrderArchiveWriter = $cashierOrderArchiveWriter;
        $this->cashierOrderSftpWriter = $cashierOrderSftpWriter;
        $this->cashierOrderDeleter = $cashierOrderDeleter;
        $this->cashierOrderFileChecker = $cashierOrderFileChecker;
        $this->cashierOrderExportRepository = $cashierOrderExportRepository;
    }

    /**
     * @param string $content
     * @param \XMLWriter $contentXml
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function write(string $content, XMLWriter $contentXml, OrderTransfer $orderTransfer): OrderTransfer
    {
        $orderTransfer->setIsCashierExportSuccess(false);
        $merchantReference = $orderTransfer->getMerchantReference();
        $merchantTransfer = $this->cashierOrderExportRepository->findMerchantByMerchantReference($merchantReference);
        $archiveFileName = $this->cashierOrderFilePathResolver->resolveCashierOrderExportArchiveFileName($orderTransfer->getIdSalesOrder());
        $archiveFilePath = $this->cashierOrderFilePathResolver->resolveCashierOrderExportArchiveFilePath($archiveFileName);
        $fileName = $this->cashierOrderFilePathResolver->resolveCashierOrderExportFileName();
        $orderId = $orderTransfer->getIdSalesOrder();
        $orderReference = $orderTransfer->getOrderReference();
        $orderCreateDate = $this->getFilenameDate($orderTransfer->getCreatedAt());

        $fileNameForS3 = $merchantReference . '_' . $orderId . '_' . $fileName;
        $archiveRemoteFilePath = $this->cashierOrderFilePathResolver
            ->resolveCashierOrderExportArchiveRemoteFilePath($archiveFileName, $orderTransfer->getStore());

        $xmlFileName = $this->cashierOrderFilePathResolver->resolveCashierOrderExportArchiveXmlFileName($orderId, $merchantReference);
        $archiveXmlFilePath = $this->cashierOrderFilePathResolver->resolveCashierOrderExportArchiveFilePath($xmlFileName);
        $archiveRemoteXmlFilePath = $this->cashierOrderFilePathResolver
            ->resolveCashierOrderExportArchiveRemoteXmlFilePath($xmlFileName, $merchantReference);
        $xmlFileNameS3 = $this->cashierOrderFilePathResolver->resolveCashierOrderExportXmlFileName();
        $xmlFileNameForS3 = $merchantReference . '_' . $orderCreateDate . '_' . $orderReference . '_' . $xmlFileNameS3;

        if ($this->cashierOrderFileChecker->isFileExist($archiveFilePath)) {
            $this->logError(static::FILE_EXIST_FAIL_MESSAGE, $archiveFileName);

            return $orderTransfer;
        }

        try {
            $this->cashierOrderArchiveWriter->addContentToArchive($archiveFilePath, $fileName, $content);
            file_put_contents($archiveXmlFilePath, $contentXml->outputMemory());
            unset($contentXml);
        } catch (Exception $exceptionSaveFile) {
            $this->logError($exceptionSaveFile->getMessage(), $archiveFileName);
        }

        try {
            if ($merchantTransfer->getIsCashierTxt() == true) {
                $this->cashierOrderSftpWriter->sendFileToFtp($archiveFileName, $archiveRemoteFilePath);
            } else {
                $this->cashierOrderSftpWriter->sendFileToFtp($xmlFileName, $archiveRemoteXmlFilePath);
            }
            gc_collect_cycles();
            try {
                $this->uploadCashierFileToAws($archiveFilePath, $fileNameForS3);
                $this->uploadCashierFileToAws($archiveXmlFilePath, $xmlFileNameForS3);
            } catch (Exception $exception) {
                $this->logError($exception->getMessage(), $archiveFileName);
            }
            $this->cashierOrderDeleter->delete($archiveFileName);
            $this->cashierOrderDeleter->delete($xmlFileName);
        } catch (Exception $exception) {
            $this->logError(static::FILE_CREATE_FAIL_MESSAGE, $archiveFileName, [$exception->getMessage()]);

            return $orderTransfer;
        }

        return $orderTransfer->setIsCashierExportSuccess(true);
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

    /**
     * @param string $archiveFilePath
     * @param string $fileNameForS3
     *
     * @return void
     */
    protected function uploadCashierFileToAws(string $archiveFilePath, string $fileNameForS3): void
    {
        $s3 = $this->getS3Client();
        $bucket = $this->getS3Bucket();
        $cashierFile = fopen($archiveFilePath, 'r+');
        try {
            $options = [
                'before_upload' => function (Command $command) {
                    gc_collect_cycles();
                },
            ];
            $uploader = new ObjectUploader(
                $s3,
                $bucket,
                $fileNameForS3,
                $cashierFile,
                'private',
                $options
            );
            $uploader->upload();
        } catch (SymfonyException $e) {
            var_dump('Error while saving to S3 :  ' . $e->getMessage());
        }
        fclose($cashierFile);
    }

    /**
     * @return \Aws\S3\S3Client
     */
    protected function getS3Client(): S3Client
    {
        $credentials = Config::get(S3Constants::S3_CONSTANTS_CASHIER_FILE);
        $key = '';
        $secret = '';
        if (isset($credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_KEY])) {
            $key = $credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_KEY];
        }

        if (isset($credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_SECRET])) {
            $secret = $credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_SECRET];
        }

        return new S3Client([
            'region' => 'eu-central-1',
            'version' => 'latest',
            'credentials' => [
                'key' => $key,
                'secret' => $secret,
            ],
        ]);
    }

    /**
     * @return string
     */
    protected function getS3Bucket(): string
    {
        return Config::get(S3Constants::S3_CASHIER_FILE_BUCKETS);
    }

    /**
     * @param string $orderDate
     *
     * @return string
     */
    protected function getFilenameDate(string $orderDate): string
    {
        $date = new DateTime($orderDate);

        return $date->format(static::EXPORT_XML_FILE_NAME_DATE_FORMAT);
    }
}
