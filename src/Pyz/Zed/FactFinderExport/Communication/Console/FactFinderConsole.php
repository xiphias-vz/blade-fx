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
            $headers = ["ArticleNumber", "MasterArticleNumber", "Title", "Description", "Brand", "ReleaseDate", "Availability", "BrandUrl", "CategoryPath", "ProductUrl", "ImageUrl", "MultiAttributeText", "Attribute", "SalesRanking", "ArticleType", "BadgeText", "Deposit", "SapNumber", "PackUnit", 'IdProductAbstract' ];
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
                    if ($key != 'Title' && $key != 'description' && $key != 'Deposit' && $key != 'CategoryPath') {
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
        return "SELECT sp.sku as ArticleNumber
  , sp.product_number as MasterArticleNumber
  , spala.name as Title
  , spala.description
  , json_extract(sp.`attributes`, '$.supplier') as Brand
  , sp.created_at as ReleaseDate
  , null as Availability
  , null as BrandURL
  , CONCAT(
  		REPLACE(REPLACE(GROUP_CONCAT(CONCAT_WS( '/', sca5.name, sca4.name, sca3.name, sca2.name, sca.name, '|')), '/|,', '|'), '/|', ''),
  		CASE WHEN NOT price.fk_product_abstract IS NULL THEN '|Angebote' ELSE '' END) as CategoryPath
  , su.url as ProductURL
  , img.external_url_large as ImageURL
  , img.rbr
  , null as MultiAttributeText
  , null as Attribute
  , ifnull(spc.product_order, 0) * -1 as SalesRanking
  , null as ArticleType
  , null as BadgeText
  , json_extract(sp.`attributes`, '$.pfandbetrag') as Deposit
  , sp.sap_number as SapNumber
  , null as PackUnit
  , sp.fk_product_abstract as id_product_abstract
FROM spy_product sp
    INNER JOIN spy_product_abstract_localized_attributes spala on sp.fk_product_abstract = spala.fk_product_abstract
    INNER JOIN spy_url su on su.fk_resource_product_abstract = sp.fk_product_abstract
        AND spala.fk_locale = su.fk_locale
    LEFT OUTER JOIN
    (
    	SELECT spis.fk_locale, spis.fk_product_abstract, MAX(spi.external_url_large) as external_url_large
    		, ROW_NUMBER() OVER(partition by spis.fk_product_abstract order by spistpi.sort_order) as rbr
    	FROM spy_product_image_set spis
    	LEFT OUTER JOIN spy_product_image_set_to_product_image spistpi on spistpi.fk_product_image_set = spis.id_product_image_set
    	LEFT OUTER JOIN spy_product_image spi on spi.id_product_image = spistpi.fk_product_image
    ) img ON sp.fk_product_abstract = img.fk_product_abstract AND spala.fk_locale = img.fk_locale AND img.rbr = 1
    LEFT OUTER JOIN
    (
	    SELECT spp.fk_product_abstract
		FROM spy_price_product spp
		INNER JOIN spy_price_product_store spps ON spp.id_price_product = spps.fk_price_product AND spp.fk_price_type = 1
		INNER JOIN spy_price_product spp2 ON spp.fk_product_abstract = spp2.fk_product_abstract AND spp2.fk_price_type  = 2
		INNER JOIN spy_price_product_store spps2 ON spp2.id_price_product = spps2.fk_price_product
		WHERE spps.gross_price < spps2.gross_price
		GROUP BY spp.fk_product_abstract
    ) 	price ON sp.fk_product_abstract = price.fk_product_abstract
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
 GROUP BY sp.sku, sp.product_number";
    }
}
