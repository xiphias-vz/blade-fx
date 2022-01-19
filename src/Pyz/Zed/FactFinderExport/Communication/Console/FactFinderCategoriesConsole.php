<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport\Communication\Console;

use PDO;
use Propel\Runtime\Propel;
use Pyz\Shared\FactFinder\FactFinderConstants;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\FactFinderExport\Communication\FactFinderExportCommunicationFactory getFactory()
 */
class FactFinderCategoriesConsole extends Console
{
    public const COMMAND_NAME = 'export:categories';
    public const COMMAND_DESCRIPTION = 'export categories to csv';

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
    public function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            $selectSql = $this->selectSqlQuery();

            $result = $this->getResult($selectSql);

            $fileName = FactFinderConstants::FILE_NAMES[FactFinderConstants::CATEGORIES_FILE_NAME];
            $pathToFile = 'data/export/files/' . $fileName;
            $fp = fopen($pathToFile, 'w');
            $delimeter = ";";
            $enclosure = "\"";
            $headers = ["Facet", "FacetValue", "URL"];
            fputcsv($fp, $headers, $delimeter, $enclosure);

            $fileNameSequence = FactFinderConstants::FILE_NAMES[FactFinderConstants::SEQUENCES_FILE_NAME];
            $pathToFileSequence = 'data/export/files/' . $fileNameSequence;
            $fpSequence = fopen($pathToFileSequence, 'w');
            $headersSequence = ["GroupName", "GroupElement"];
            fputcsv($fpSequence, $headersSequence, $delimeter, $enclosure);

            foreach ($result as $fields) {
                fputcsv($fp, $fields, $delimeter, $enclosure);
                fputcsv($fpSequence, ["Kategorie", $fields["FacetValue"]], $delimeter, $enclosure);
            }
            fclose($fp);
            fclose($fpSequence);
        } catch (Exception $e) {
            dump($e);

            return static::CODE_ERROR;
        }

        return static::CODE_SUCCESS;
    }

    /**
     * @param string $sql
     *
     * @return array
     */
    public function getResult(string $sql)
    {
        $connection = Propel::getConnection();
        $stmt = $connection->prepare($sql);
        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    /**
     * @return string
     */
    public function selectSqlQuery()
    {
        return "call pyzx_ff_export_categories()";
    }
}
