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

class FactFinderPriceConsole extends Console
{
    public const COMMAND_NAME = 'price-console:export';
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
            $fileName = "export.geoStockData.Spryker.csv";
            $pathToFile = 'data/EIN/export/files/' . $fileName;

            $fp = fopen($pathToFile, 'w');
            $delimeter = ";";
            // ShelfInfo and DiscountText are empty elements
            $headers = ["ArticleNumber", "StoreId", "Price", "PseudoPrice", "Stock", "Sale", "ShelfInfo", "DiscountText", "BasePrice"];
            fputcsv($fp, $headers, $delimeter);

            $i = 0;
            foreach ($result as $fields) {
                fputcsv($fp, $fields, $delimeter);
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
	, MAX(sppsDef.gross_price) as price
	, MAX(sppsOrig.gross_price) as pseudoPrice
	, MAX(sa.quantity) as quantity
	, CASE WHEN MAX(sppsDef.gross_price) < MAX(sppsOrig.gross_price) THEN 1 else 0 end as sale
	, null as ShelfInfo
	, null as DicountText
	, max(sppsDef.price_per_kg) as basePrice
FROM spy_product sp
	INNER JOIN spy_price_product spp on spp.fk_product_abstract = sp.fk_product_abstract
	LEFT JOIN spy_price_product_store sppsDef on sppsDef.fk_price_product = spp.id_price_product
		AND spp.fk_price_type = 1
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
