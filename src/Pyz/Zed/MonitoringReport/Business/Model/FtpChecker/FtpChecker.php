<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Business\Model\FtpChecker;

use DateTime;
use Generated\Shared\Transfer\FileSystemListTransfer;
use Generated\Shared\Transfer\FileSystemQueryTransfer;
use Orm\Zed\MonitoringReport\Persistence\PyzMonitorEmailDefinitionQuery;
use PDO;
use Propel\Runtime\Propel;
use Pyz\Zed\MonitoringReport\MonitoringReportConfig;
use Spryker\Service\FileSystem\Dependency\Exception\FileSystemReadException;
use Spryker\Service\FileSystem\FileSystemService;
use Spryker\Shared\Log\LoggerTrait;

class FtpChecker
{
    use LoggerTrait;

    /**
     * @var \Spryker\Service\FileSystem\FileSystemService
     */
    protected $fileSystemService;

    /**
     * @var \Pyz\Zed\MonitoringReport\MonitoringReportConfig
     */
    protected $monitoringConfig;

    /**
     * @var array
     */
    protected $files;

    protected const SFTP_FILE_SYSTEM_NAME = 'globus_sftp';
    protected const IS_XML = 'xml_file';
    protected const FILIAL_NUMBER = 'merchant_filial_number';
    protected const MAX_CREATED_AT = 'max_created_at';
    protected const ORDER_REFERENCE = 'order_reference';
    protected const ID_ORDER = 'id_sales_order';
    protected const EXPORT_FILE_NAME_DEFAULT_PREFIX = 'GN_';
    protected const EXPORT_ARCHIVE_FILE_EXTENSION = '.zip';
    protected const EXPORT_ARCHIVE_XML_FILE_NAME_FORMAT = '%s%s_%s_%s%s';
    protected const EXPORT_ARCHIVE_FILE_NAME_FORMAT = '%s%s_%s%s';
    protected const EXPORT_XML_FILE_NAME_DEFAULT_PREFIX = 'cc_';
    protected const EXPORT_XML_FILE_NAME_DATE_FORMAT = 'ymd_His';
    protected const EXPORT_ARCHIVE_XML_FILE_EXTENSION = '.xml';
    protected const ROLE_NAME = 'CashierExportMail';
    protected const DEFAULT_EMAIL = 'domagoj.krizanec@kps.com';

    /**
     * @param \Spryker\Service\FileSystem\FileSystemService $fileSystemService
     * @param \Pyz\Zed\MonitoringReport\MonitoringReportConfig $monitoringConfig
     */
    public function __construct(
        FileSystemService $fileSystemService,
        MonitoringReportConfig $monitoringConfig
    ) {
        $this->fileSystemService = $fileSystemService;
        $this->monitoringConfig = $monitoringConfig;
    }

    /**
     * @return void
     */
    public function checkExportOnFtp()
    {
        $this->files = $this->getFileNames();
        foreach ($this->files as $key => $files) {
            if (reset($files)[static::IS_XML]) {
                $path = '/' . $this->monitoringConfig->getCashierOrderXmlSFTPFolder() . '/archiv';
            } else {
                $path = '/' . $this->monitoringConfig->getCashierOrderTxtSFTPFolder() . '/archiv';
            }
            $this->removeFilesFromArray($path, $key, $files);
        }
        if (count($this->files) > 0) {
            foreach ($this->files as $key => $files) {
                if (reset($files)[static::IS_XML]) {
                    $path = '/' . $this->monitoringConfig->getCashierOrderXmlSFTPFolder();
                } else {
                    $path = '/' . $this->monitoringConfig->getCashierOrderTxtSFTPFolder();
                }
                $this->removeFilesFromArray($path, $key, $files);
                break;
            }
        }
        if (count($this->files) > 0) {
            $this->sendAlertMail();
        }
    }

    /**
     * @return array
     */
    protected function getFileNames(): array
    {
        $resultArray = [];
        $sql = 'call pyzx_monitoring_cashier()';
        $propelConnection = Propel::getConnection();
        $preparedStatement = $propelConnection->prepare($sql);
        $preparedStatement->execute();
        $data = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);
        foreach ($data as $order) {
            $resultArray[$order[static::FILIAL_NUMBER]][$order[static::ORDER_REFERENCE]] = $order;
        }

        return $resultArray;
    }

    /**
     * @param array $file
     *
     * @return array
     */
    protected function structureFileXmlName(array $file): array
    {
        $fileNames = [];
        for ($i = 0; $i < 10; $i++) {
            $dateTime = (new DateTime($file[static::MAX_CREATED_AT]))->modify('- ' . $i . ' second')->format(static::EXPORT_XML_FILE_NAME_DATE_FORMAT);
            $fileNames[$i] = sprintf(
                static::EXPORT_ARCHIVE_XML_FILE_NAME_FORMAT,
                static::EXPORT_XML_FILE_NAME_DEFAULT_PREFIX,
                $file[static::FILIAL_NUMBER],
                $dateTime,
                $this->calculateOrderNumberInFileName($file[static::ID_ORDER]),
                static::EXPORT_ARCHIVE_XML_FILE_EXTENSION
            );
        }

        return $fileNames;
    }

    /**
     * @param array $file
     *
     * @return array
     */
    protected function structureFileTxtName(array $file): array
    {
        $fileNames = [];
        for ($i = 0; $i < 10; $i++) {
            $dateTime = (new DateTime($file[static::MAX_CREATED_AT]))->modify('- ' . $i . ' second')->format(static::EXPORT_XML_FILE_NAME_DATE_FORMAT);
            $fileNames[$i] = sprintf(
                static::EXPORT_ARCHIVE_FILE_NAME_FORMAT,
                static::EXPORT_FILE_NAME_DEFAULT_PREFIX,
                $dateTime,
                $file[static::ID_ORDER],
                static::EXPORT_ARCHIVE_FILE_EXTENSION
            );
        }

        return $fileNames;
    }

    /**
     * @param string $path
     *
     * @return void
     */
    protected function checkIfFileExists(string $path)
    {
        $i = 0;
        foreach ($this->files as $fileKey => $file) {
            if (!strpos($path, 'archiv')) {
                if ($i > 0) {
                    $path = substr($path, 0, -5);
                }
                $path .= '/' . $file[static::FILIAL_NUMBER];
                $i++;
            }

            if ($file[static::IS_XML]) {
                $fileNames = $this->structureFileXmlName($file);
            } else {
                $fileNames = $this->structureFileTxtName($file);
            }
            foreach ($fileNames as $fileName) {
                try {
                    $this->fileSystemService->read(
                        (new FileSystemQueryTransfer())
                            ->setPath($path . '/' . $fileName)
                            ->setFileSystemName(static::SFTP_FILE_SYSTEM_NAME)
                    );
                    unset($this->files[$fileKey]);
                    break;
                } catch (FileSystemReadException $e) {
                    dump($e->getMessage());
                }
            }
        }
    }

    /**
     * @return void
     */
    protected function sendAlertMail(): void
    {
        $subject = 'Cashier export failed to FTP';
        $header = 'Cashier export to the ftp failed for the orders [id_order]: ';
        foreach ($this->files as $merchant) {
            foreach ($merchant as $file) {
                $header = $header . $file[static::ID_ORDER] . ', ';
            }
        }
        $mails = PyzMonitorEmailDefinitionQuery::create()
            ->filterByRoleName(static::ROLE_NAME)
            ->find();

        foreach ($mails as $mail) {
            $sql = "INSERT INTO pyz_email_send (sender_job_description, send_to_email, subject, body_description)
                    VALUES ('Cashier_export_fails', '" . $mail->getSendToEmail() . "','" . $subject . "','" . $header . "')";
            $connection = Propel::getConnection();
            $statement = $connection->prepare($sql);
            $statement->execute();
        }
    }

    /**
     * @param string $path
     * @param string $merchant
     *
     * @return array
     */
    protected function listAllFilesInDirectory(string $path, string $merchant): array
    {
        $i = 0;
        if (!strpos($path, 'archiv')) {
            if ($i > 0) {
                $path = substr($path, 0, -5);
            }
        }
        $path .= '/' . $merchant;
        $i++;

        return $this->fileSystemService->listContents(
            (new FileSystemListTransfer())
                ->setPath($path)
                ->setFileSystemName(static::SFTP_FILE_SYSTEM_NAME)
        );
    }

    /**
     * @return void
     */
    protected function createRoleIfNotSet(): void
    {
        $query = PyzMonitorEmailDefinitionQuery::create()
            ->filterByRoleName(static::ROLE_NAME)
            ->findOneOrCreate();
        $query->setRoleName(static::ROLE_NAME);

        if ($query->isNew()) {
            $query->save();
        }
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
     * @param string $path
     * @param string $key
     * @param array $files
     *
     * @return void
     */
    protected function removeFilesFromArray(string $path, string $key, array $files): void
    {
        $listedFiles = $this->listAllFilesInDirectory($path, $key);
        foreach ($files as $file) {
            foreach ($listedFiles as $listedFile) {
                $fileName = $listedFile->getFilename();
                if (str_contains($fileName, $file[static::ORDER_REFERENCE])) {
                    unset($this->files[$file[static::FILIAL_NUMBER]][$file[static::ORDER_REFERENCE]]);
                    if (count($this->files[$file[static::FILIAL_NUMBER]]) == 0) {
                        unset($this->files[$file[static::FILIAL_NUMBER]]);
                    }
                    break;
                }
            }
        }
    }
}
