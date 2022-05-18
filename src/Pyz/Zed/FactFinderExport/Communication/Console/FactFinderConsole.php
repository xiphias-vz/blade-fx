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
class FactFinderConsole extends Console
{
    public const COMMAND_NAME = 'export:product-data';
    public const COMMAND_DESCRIPTION = 'importing data to csv';

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

            $fileName = FactFinderConstants::FILE_NAMES[FactFinderConstants::PRODUCT_DATA_FILE_NAME];
            $pathToFile = 'data/export/files/' . $fileName;
            $fp = fopen($pathToFile, 'w');
            $delimeter = ";";
            $enclosure = "\"";
            $headers = ["ArticleNumber", "MasterArticleNumber", "Title", "Description", "Brand", "ReleaseDate", "Availability", "BrandUrl", "CategoryPath", "ProductUrl", "ImageUrl", "MultiAttributeText", "Attribute", "SalesRanking", "ArticleType", "BadgeText", "Deposit", "SapNumber", "PackUnit", "IdProductAbstract", "popNameExtension", "Quality", "ValidUntil", "Incomplete", "SapWgr"];
            fputcsv($fp, $headers, $delimeter, $enclosure);

            $numberOfResults = count($result);
            for ($z = 0; $z < $numberOfResults; $z++) {
                if (isset($result[$z]['Deposit'])) {
                    $result[$z]['Deposit'] = 'zzgl. Pfand: ' . json_decode($result[$z]['Deposit']);
                }
                if (isset($result[$z]['ReleaseDate'])) {
                    $result[$z]['ReleaseDate'] = date("Y/m/d", strtotime($result[$z]['ReleaseDate']));
                }
                if (isset($result[$z]['CategoryPath'])) {
                    $result[$z]['CategoryPath'] = $this->customUrlEncode($result[$z]['CategoryPath']);
                }
                if (isset($result[$z]['SalesRanking']) && $result[$z]['SalesRanking'] < 0) {
                    $result[$z]['SalesRanking'] *= -1;
                }
                foreach ($result[$z] as $key => $row) {
                    if ($key === 'rbr') {
                        unset($result[$z][$key]);
                        continue;
                    }
                    if ($key != 'Title' && $key != 'description' && $key != 'Deposit' && $key != 'CategoryPath' && $key != 'popNameExtension') {
                        $result[$z][$key] = transliterator_transliterate('Any-Latin; Latin-ASCII; [\u0080-\u7fff] remove', $row);
                    }
                    if (json_decode($row) !== null) {
                        $result[$z][$key] = json_decode($row);
                    }
                }
                $result[$z] = preg_replace('/^(\'(.*)\'|"(.*)")$/', '$2$3', $result[$z]);
            }

            foreach ($result as $fields) {
                $fields = str_replace('<br>', '', $fields);
                $fields = str_replace(",,", ",", $fields);
                $fields = preg_replace("/<.+>/sU", "", $fields);
                fputcsv($fp, $fields, $delimeter, $enclosure);
                $z++;
            }
            fclose($fp);
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
    private function getResult(string $sql): array
    {
        $connection = Propel::getConnection();
        $stmt = $connection->prepare($sql);
        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    /**
     * @param string $string
     *
     * @return string|string[]
     */
    public function customUrlEncode(string $string)
    {
        $replacements = ['%25', '%21', '%2A', '%27', '%28', '%29', '%3B', '%3A', '%40', '%26', '%3D', '%2B', '%24', '%2C', '%3F', '%23', '%5B', '%5D', '+'];
        $entities = ['%', '!', '*', "'", "(", ")", ";", ":", "@", "&", "=", "+", "$", ",", "?", "#", "[", "]", " "];

        return str_replace($entities, $replacements, $string);
    }

    /**
     * @return string
     */
    public function selectSqlQuery(): string
    {
        return "call pyzx_ff_export_products()";
    }
}
