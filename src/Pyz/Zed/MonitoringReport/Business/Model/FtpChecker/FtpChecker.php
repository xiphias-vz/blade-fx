<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Business\Model\FtpChecker;

use DateTime;
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
     * @var
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

        foreach ($this->files as $file) {
            if ($file[static::IS_XML]) {
                $path = '/' . $this->monitoringConfig->getCashierOrderXmlSFTPFolder() . '/archiv';
            } else {
                $path = '/' . $this->monitoringConfig->getCashierOrderTxtSFTPFolder() . '/archiv';
            }
            $this->checkIfFileExists($path);
            if (count($this->files) > 0) {
                if ($file[static::IS_XML]) {
                    $path = '/' . $this->monitoringConfig->getCashierOrderXmlSFTPFolder() . '/' . $file[static::FILIAL_NUMBER];
                } else {
                    $path = '/' . $this->monitoringConfig->getCashierOrderTxtSFTPFolder() . '/' . $file[static::FILIAL_NUMBER];
                }
                $this->checkIfFileExists($path);
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
        $sql = 'call pyzx_monitoring_cashier()';
        $propelConnection = Propel::getConnection();
        $preparedStatement = $propelConnection->prepare($sql);
        $preparedStatement->execute();
        $data = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);

        return (array)$data;
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
        foreach ($this->files as $fileKey => $file) {
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
        $this->createRoleIfNotSet();
        $subject = 'Cashier export failed to FTP';
        $header = 'Cashier export to the ftp failed for the orders [id_order]: ';
        foreach ($this->files as $file) {
            $header = $header . $file[static::ID_ORDER] . ', ';
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
     * @return void
     */
    protected function createRoleIfNotSet(): void
    {
        $query = PyzMonitorEmailDefinitionQuery::create()
            ->filterByRoleName(static::ROLE_NAME)
            ->findOneOrCreate();
        $query->setRoleName(static::ROLE_NAME);
        $query->setSendToEmail(static::DEFAULT_EMAIL);

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
}
