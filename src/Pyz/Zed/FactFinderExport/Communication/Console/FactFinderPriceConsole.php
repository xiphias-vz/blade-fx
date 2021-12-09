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
class FactFinderPriceConsole extends Console
{
    public const COMMAND_NAME = 'export:stock-data';
    public const COMMAND_DESCRIPTION = 'export prices/stock to csv';

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
            $fileName = FactFinderConstants::FILE_NAMES[FactFinderConstants::GEO_STOCK_FILE_NAME];
            $pathToFile = 'data/export/files/' . $fileName;

            $fp = fopen($pathToFile, 'w');
            $delimeter = ";";
            $enclosure = "\"";
            // ShelfInfo and DiscountText are empty elements
            $headers = ["ArticleNumber", "StoreId", "Price", "PseudoPrice", "Stock", "Sale", "ShelfInfo", "DiscountText", "BasePrice"];
            fputcsv($fp, $headers, $delimeter, $enclosure);

            $i = 0;
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
        return "SELECT sp.sku as ean, sm.filial_number as storeID
     , ROUND(MAX(sppsDef.gross_price) / 100, 2) as price
     , ROUND(MAX(sppsOrig.gross_price) / 100, 2) as pseudoPrice
     , ROUND(MAX(sa.quantity)) as quantity
     , CASE WHEN MAX(sppsDef.gross_price) < MAX(sppsOrig.gross_price) THEN 1 else 0 end as sale
     , null as ShelfInfo
     , CASE WHEN MAX(sppsDef.gross_price) < MAX(sppsOrig.gross_price) THEN CONCAT('-',FORMAT((1-(ROUND(MAX(sppsDef.gross_price) / 100, 2)/ROUND(MAX(sppsOrig.gross_price) / 100, 2))) * 100,0),'%') ELSE NULL END as DicountText
     , sppsDef.price_per_kg as pricePerKG
     , MAX(CASE
               WHEN sppsDef.price_per_kg > 0 THEN
                   REPLACE(CONCAT(ROUND(sppsDef.price_per_kg / 100, 2),
                                  ' ', sc.symbol ,'/', JSON_VALUE(spa.`attributes`, '$.grundpreismasseinheit[0]')), '.', ',')
               WHEN JSON_VALUE(spa.`attributes`, '$.grundpreisinhalt[0]') > 0 AND JSON_VALUE(spa.`attributes`, '$.grundeinheit[0]') > 0 THEN
                   REPLACE(CONCAT((ROUND(sppsDef.gross_price / 100 / JSON_VALUE(spa.`attributes`, '$.grundpreisinhalt[0]') * JSON_VALUE(spa.`attributes`, '$.grundeinheit[0]'), 2)),
                                  ' ', sc.symbol ,'/', JSON_VALUE(spa.`attributes`, '$.grundeinheit[0]'), ' ', JSON_VALUE(spa.`attributes`, '$.grundpreismasseinheit[0]')), '.', ',')
               ELSE
                   REPLACE(CONCAT(ROUND(sppsDef.gross_price / 100, 2), ' ', sc.symbol, '/1 ',  JSON_VALUE(spa.`attributes`, '$.grundpreismasseinheit[0]')), '.', ',')
    END) as basePrice
FROM spy_product sp
         INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
         INNER JOIN spy_price_product spp on spp.fk_product_abstract = sp.fk_product_abstract
         LEFT JOIN spy_price_product_store sppsDef on sppsDef.fk_price_product = spp.id_price_product
    AND spp.fk_price_type = 1
         LEFT JOIN spy_currency sc on sppsDef.fk_currency = sc.id_currency
         LEFT JOIN spy_price_product_default sppd on sppd.fk_price_product_store = sppsDef.id_price_product_store
         LEFT JOIN spy_availability sa on sa.sku = sp.sku
    AND sa.fk_store = sppsDef.fk_store
         LEFT JOIN spy_price_product sppOrig on sppOrig.fk_product_abstract = sp.fk_product_abstract
         LEFT JOIN spy_price_product_store sppsOrig on sppsOrig.fk_price_product = sppOrig.id_price_product
    AND sppOrig.fk_price_type = 2
         LEFT JOIN spy_price_product_default sppdOrig on sppdOrig.fk_price_product_store = sppsOrig.id_price_product_store
         LEFT JOIN spy_merchant sm on sm.fk_store = sppsDef.fk_store
WHERE IFNULL(sa.quantity, 0) > 0
  AND sppsDef.gross_price > 0
  AND sp.is_active = 1
GROUP BY sp.sku, sp.id_product, sm.filial_number";
    }
}
