<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport\Communication\Console;

use PDO;
use Propel\Runtime\Propel;
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

            $fileName = "export.productData.Spryker.csv";
            $pathToFile = 'data/export/files/' . $fileName;
            $fp = fopen($pathToFile, 'w');
            $delimeter = ";";
            $headers = ["ArticleNumber", "MasterArticleNumber", "Title", "Description", "Brand", "ReleaseDate", "Availability", "BrandURL", "CategoryPath", "ProductURL", "ImageURL", "MultiAttributeText", "Attribute", "SalesRanking", "Deposit", "BadgeText"];
            fputcsv($fp, $headers, $delimeter);
            $i = 0;
            $numberOfResults = count($result);
            for ($z = 0; $z < $numberOfResults; $z++) {
                foreach ($result[$z] as $key => $row) {
                    $result[$z][$key] = transliterator_transliterate('Any-Latin; Latin-ASCII; [\u0080-\u7fff] remove', $row);
                    if ($z < 100) {
                        //var_dump("transliterator_transliterate function: " . print_r($result[$z][$key]));
                        //dump("transliterator_transliterate function: " . print_r($result[$z][$key]));
                    }
                    if (json_decode($row) !== null) {
                        $result[$z][$key] = json_decode($row);
                        if ($z < 100) {
                            var_dump("json decode function: " . print_r($result[$z][$key]));
                            //dump("json decode function: " . print_r($result[$z][$key]));
                        }
                    }
                }
                $result[$z] = preg_replace('/^(\'(.*)\'|"(.*)")$/', '$2$3', $result[$z]);
                if ($z < 100) {
                    var_dump("Preg replace function: " . print_r($result[$z]));
                    //dump("Preg replace function: " . print_r($result[$z]));
                }
                $i++;
            }

            foreach ($result as $fields) {
                $fields = str_replace('<br>', '', $fields);
                if ($z < 100) {
                    var_dump("Replacing br: " . print_r($fields));
                    //dump("Replacing br: " . print_r($fields));
                }
                $fields = str_replace(",,", ",", $fields);
                $fields = str_replace(',', '', $fields);

                if ($z < 100) {
                    var_dump("Replacing double commas: " . print_r($fields));
                    //dump("Replacing double commas: " . print_r($fields));
                }
                $fields = preg_replace("/<.+>/sU", "", $fields);
                if ($z < 100) {
                    var_dump("Replacing html tags: " . print_r($fields));
                    //dump("Replacing html tags: " . print_r($fields));
                }
                fputcsv($fp, $fields, $delimeter);
                if ($z < 100) {
                    var_dump($fp);
                    var_dump($fields);
                    var_dump($delimeter);
                }
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
     * @return string
     */
    public function selectSqlQuery(): string
    {
        return "SELECT *
FROM
 (
 SELECT sp.sku as ArticleNumber
  , sp.product_number as MasterArticleNumber
  , spala.name as Title
  , spala.description
  , json_extract(sp.`attributes`, '$.supplier') as Brand
  , sp.created_at as ReleaseDate
  , null as Availability
  , null as BrandURL
  , CONCAT_WS( ' - ', sca5.name, sca4.name, sca3.name, sca2.name, sca.name) as CategoryPath
  , su.url as ProductURL
  , spi.external_url_large as ImageURL
  , ROW_NUMBER() OVER(partition by sp.id_product order by spistpi.sort_order) as rbr
  , null as MultiAttributeText
  , null as Attribute
  , ifnull(spc.product_order, 0) * -1 as SalesRanking
  , null as ArticleType
  , json_extract(sp.`attributes`, '$.pfand_1_amount') as Deposit
  , null as BadgeText
FROM spy_product sp
    INNER JOIN spy_product_abstract_localized_attributes spala on sp.fk_product_abstract = spala.fk_product_abstract
    INNER JOIN spy_url su on su.fk_resource_product_abstract = sp.fk_product_abstract
        AND spala.fk_locale = su.fk_locale
    LEFT OUTER JOIN spy_product_image_set spis on spis.fk_product_abstract = sp.fk_product_abstract
        AND spis.fk_locale = spala.fk_locale
    LEFT OUTER JOIN spy_product_image_set_to_product_image spistpi on spistpi.fk_product_image_set = spis.id_product_image_set
    LEFT OUTER JOIN spy_product_image spi on spi.id_product_image = spistpi.fk_product_image
    LEFT OUTER JOIN spy_product_category spc on sp.fk_product_abstract = spc.fk_product_abstract
    LEFT OUTER JOIN spy_category sc on spc.fk_category = sc.id_category AND sc.is_active = 1 AND sc.is_in_menu = 1
    LEFT OUTER JOIN spy_category_attribute sca on sc.id_category = sca.fk_category
    LEFT OUTER JOIN spy_category_node scn on sc.id_category = scn.fk_category
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
 WHERE sp.is_active = 1
  ) a
WHERE a.rbr = 1";
    }
}
