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

            foreach ($result as $fields) {
                fputcsv($fp, $fields, $delimeter, $enclosure);
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
        return "SELECT DISTINCT sc.id_category AS Facet
    , CONCAT_WS( '/', sca5.name, sca4.name, sca3.name, sca2.name, sca.name) AS FacetValue
    , su.url  AS URL
FROM spy_category sc
INNER JOIN spy_category_attribute sca on sc.id_category = sca.fk_category
LEFT OUTER JOIN spy_category_node scn on sc.id_category = scn.fk_category
INNER JOIN spy_url su on scn.id_category_node = su.fk_resource_categorynode
LEFT OUTER JOIN spy_category sc2 on scn.fk_parent_category_node = sc2.id_category AND sc2.is_active = 1 AND sc2.is_in_menu = 1
LEFT OUTER JOIN spy_category_attribute sca2 on sc2.id_category = sca2.fk_category
LEFT OUTER JOIN spy_category_node scn2 on sc2.id_category = scn2.fk_category
LEFT OUTER JOIN spy_category sc3 on scn2.fk_parent_category_node = sc3.id_category AND sc3.is_active = 1 AND sc3.is_in_menu = 1
LEFT OUTER JOIN spy_category_attribute sca3 on sc3.id_category = sca3.fk_category
LEFT OUTER JOIN spy_category_node scn3 on sc3.id_category = scn3.fk_category
LEFT OUTER JOIN spy_category sc4 on scn3.fk_parent_category_node = sc4.id_category AND sc4.is_active = 1 AND sc4.is_in_menu = 1
LEFT OUTER JOIN spy_category_attribute sca4 on sc4.id_category = sca4.fk_category
LEFT OUTER JOIN spy_category_node scn4 on sc4.id_category = scn4.fk_category
LEFT OUTER JOIN spy_category sc5 on scn4.fk_parent_category_node = sc5.id_category AND sc5.is_active = 1 AND sc5.is_in_menu = 1
LEFT OUTER JOIN spy_category_attribute sca5 on sc5.id_category = sca5.fk_category
LEFT OUTER JOIN spy_category_node scn5 on sc5.id_category = scn5.fk_category
WHERE sc.is_active = 1 AND sc.is_in_menu = 1
ORDER BY scn.node_order;";
    }
}
