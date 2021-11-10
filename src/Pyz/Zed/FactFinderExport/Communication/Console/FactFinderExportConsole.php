<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport\Communication\Console;

use Exception;
use Pyz\Shared\FactFinder\FactFinderConstants;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\FactFinderExport\Business\FactFinderExportBusinessFactory getFactory()
 */
class FactFinderExportConsole extends Console
{
    public const COMMAND_NAME = 'export:fact-finder-to-ftp';
    public const COMMAND_DESCRIPTION = 'exporting fact finder csv file to ftp';

    protected const EXPORT_FILE_REMOTE_FILE_PATH_FORMAT = '%s/%s';

    /**
     * @return void
     */
    public function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    public function execute(InputInterface $input, OutputInterface $output): int
    {
        foreach (FactFinderConstants::FILE_NAMES as $fileName) {
            try {
                $pathToFile = APPLICATION_ROOT_DIR . FactFinderConstants::TARGET_DIRECTORY_FOR_EXTRACTED_FILES . $fileName;
                $archiveRemoteFilePath = sprintf(
                    static::EXPORT_FILE_REMOTE_FILE_PATH_FORMAT,
                    $this->getFactory()->getConfig()->getDefaultOrderExportDirectoryPath(),
                    $fileName
                );

                $ex = file_exists($pathToFile);
                if ($ex) {
                    $fp = fopen($pathToFile, 'r');
                    $contentStockData = '';
                    while (true) {
                        $data = fgetcsv($fp);
                        if (gettype($data) == 'boolean') {
                            break;
                        } else {
                            $contentStockData .= $data[0] . "\n";
                        }
                    }

                    $this->getFactory()
                        ->createFactFinderExportWriter()
                        ->sendFileToFtp($contentStockData, $archiveRemoteFilePath, $fileName);
                } else {
                    dump('File: ' . $fileName . ', can not be found on path: ' . $pathToFile);

                    return static::CODE_ERROR;
                }
            } catch (Exception $e) {
                dump($e);

                return static::CODE_ERROR;
            }
        }

        return static::CODE_SUCCESS;
    }
}
