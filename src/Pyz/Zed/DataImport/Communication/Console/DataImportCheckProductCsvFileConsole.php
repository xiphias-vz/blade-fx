<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console;

use Exception;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\DataImport\Communication\DataImportCommunicationFactory getFactory()
 */
class DataImportCheckProductCsvFileConsole extends Console
{
    public const COMMAND_NAME = 'import:checkCsvFile';
    public const COMMAND_DESCRIPTION = 'Check csv file';
    public const ARGUMENT_FILE_NAME = 'file_name';
    public const ARGUMENT_FILE_NAME_DESCRIPTION = 'file name';

    /**
     * @var \Spryker\Zed\Event\Business\EventFacadeInterface|null
     */
    protected static $eventFacade;

    /**
     * @var array
     */
    protected $eventBulk = [];

    /**
     * @var int
     */
    protected $eventBulkCounter = 0;

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this
            ->setDescription(static::COMMAND_DESCRIPTION)
            ->addArgument(
                self::ARGUMENT_FILE_NAME,
                InputArgument::REQUIRED,
                self::ARGUMENT_FILE_NAME_DESCRIPTION
            );

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int|null
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $fileName = $input->getArgument(self::ARGUMENT_FILE_NAME);
        $filePath = "//data/data/import/spryker/" . $fileName;
        $row = 1;
        $returnCode = Console::CODE_SUCCESS;

        try {
            $columnCount = 0;
            if (($handle = fopen($filePath, "r")) !== false) {
                while (($data = fgetcsv($handle, 0, "|")) !== false) {
                    $num = count($data);
                    if ($columnCount == 0) {
                        $columnCount = $num;
                        $output->writeln("************************ HEADER line " . $row . ") " . $num . " columns in line ************************");
                        $output->writeln(implode("|", $data));
                    }
                    $line = implode("|", $data);
                    if ($columnCount != $num) {
                        $output->writeln("************************ line " . $row . ") " . $num . " columns in line ************************ sku:" . $data[0]);
                        $returnCode = Console::CODE_ERROR;
                    } elseif (str_contains($line, "\r") || str_contains($line, "\n")) {
                        $output->writeln("************************ line " . $row . ") " . $num . " columns in line ************************ sku:" . $data[0] . " *** CONTAINS LINE FEED");
                        $output->writeln("************************ Check for unclosed quote ");
                        $returnCode = Console::CODE_ERROR;
                    }
                    $row++;
                }
                fclose($handle);
            }
        } catch (Exception $ex) {
            $output->writeln($ex->getMessage());
        }

        return $returnCode;
    }
}
