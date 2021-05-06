<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\Import;

use DateTime;
use Exception;
use Orm\Zed\Cms\Persistence\SpyImportLog;
use Propel\Runtime\Propel;

class ImportLogWriter
{
    /**
     * @param string $importName
     * @param string|null $importDesc
     * @param string|null $logText
     * @param string|null $fileName
     * @param int|null $fileRowsCount
     * @param int|null $importedRowsCount
     *
     * @return \Orm\Zed\Cms\Persistence\SpyImportLog|null
     */
    public static function createLogEntry(
        string $importName,
        ?string $importDesc,
        ?string $logText,
        ?string $fileName,
        ?int $fileRowsCount,
        ?int $importedRowsCount
    ): ?SpyImportLog {
        $log = new SpyImportLog();
        $log->setCreatedAt(new DateTime())
            ->setImportName($importName)
            ->setImportDesc($importDesc)
            ->setLogText($logText)
            ->setFileName($fileName)
            ->setFileRowsCount($fileRowsCount)
            ->setImportedRowsCount($importedRowsCount);

        return static::saveLog($log);
    }

    /**
     * @param \Orm\Zed\Cms\Persistence\SpyImportLog $log
     *
     * @return \Orm\Zed\Cms\Persistence\SpyImportLog|null
     */
    private static function saveLog(SpyImportLog $log): ?SpyImportLog
    {
        try {
            $con = Propel::getConnection();
            if ($con && $con->getName() != null) {
                //$con->beginTransaction();
                if ($log->save($con) > 0) {
                    //$con->commit();

                    return $log;
                }
                //$con->rollBack();
            }
        } catch (Exception $ex) {
        }

        return null;
    }
}
