<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\GsoaRestApiClient\Communication\Console;

use Exception;
use Orm\Zed\Product\Persistence\Map\SpyProductTableMap;
use Orm\Zed\Product\Persistence\SpyProductQuery;
use Pyz\Shared\GsoaRestApiClient\Provider\ProductCatalogProvider;
use Pyz\Zed\GsoaRestApiClient\Import\AlternativeEanMapping;
use Pyz\Zed\GsoaRestApiClient\Import\ProductMapping;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class GsoaProductConsole extends Console
{
    public const COMMAND_NAME = 'gsoa:product';
    public const COMMAND_DESCRIPTION = 'Retrive product related information from GSOA rest API';
    public const OPTION_COMMAND = 'command';
    public const OPTION_COMMAND_SHORT = 'c';
    public const OPTION_STORE = 'store';
    public const OPTION_STORE_SHORT = 's';
    public const OPTION_FILTER = 'filter';
    public const OPTION_FILTER_SHORT = 'f';
    public const OPTION_PAGE = 'page';
    public const OPTION_PAGE_SHORT = 'p';
    public const OPTION_PAGE_SIZE = 'page_size';
    public const OPTION_PAGE_SIZE_SHORT = 'ps';
    public const OPTION_MODIFIED_FROM = 'modified_from';
    public const OPTION_MODIFIED_FROM_SHORT = 'm';
    public const OPTION_VALID_FROM = 'valid_from';
    public const OPTION_VALID_FROM_SHORT = 'vf';

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);
        $this->addOption(self::OPTION_COMMAND, self::OPTION_COMMAND_SHORT, InputOption::VALUE_REQUIRED);
        $this->addOption(self::OPTION_STORE, self::OPTION_STORE_SHORT, InputOption::VALUE_OPTIONAL);
        $this->addOption(self::OPTION_PAGE, self::OPTION_PAGE_SHORT, InputOption::VALUE_OPTIONAL);
        $this->addOption(self::OPTION_VALID_FROM, self::OPTION_VALID_FROM_SHORT, InputOption::VALUE_OPTIONAL);
        $this->addOption(self::OPTION_PAGE_SIZE, self::OPTION_PAGE_SIZE_SHORT, InputOption::VALUE_OPTIONAL);
        $this->addOption(self::OPTION_FILTER, self::OPTION_FILTER_SHORT, InputOption::VALUE_OPTIONAL);
        $this->addOption(self::OPTION_MODIFIED_FROM, self::OPTION_MODIFIED_FROM_SHORT, InputOption::VALUE_OPTIONAL);

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
        $command = $this->getOptionValue($input, self::OPTION_COMMAND, self::OPTION_COMMAND_SHORT, '');
        $store = $this->getOptionValue($input, self::OPTION_STORE, self::OPTION_STORE_SHORT, '');
        $page = $this->getOptionValue($input, self::OPTION_PAGE, self::OPTION_PAGE_SHORT, 0);
        $pageSize = $this->getOptionValue($input, self::OPTION_PAGE_SIZE, self::OPTION_PAGE_SIZE_SHORT, 50);
        $filter = $this->getOptionValue($input, self::OPTION_FILTER, self::OPTION_FILTER_SHORT, '');
        $modifiedFrom = $this->getOptionValue($input, self::OPTION_MODIFIED_FROM, self::OPTION_MODIFIED_FROM_SHORT, '');
        $validFrom = $this->getOptionValue($input, self::OPTION_VALID_FROM, self::OPTION_VALID_FROM_SHORT, '');
        $counter = 0;

        try {
            $client = new ProductCatalogProvider();
            switch ($command) {
                case "getProductCategories":
                    $result = $client->getProductCategories($page, $pageSize);
                    break;
                case "getProductCategoriesModified":
                    $result = $client->getProductCategoriesModified($modifiedFrom);
                    break;
                case "getProducts":
                    $result = $client->getProducts($filter, true, $page, $pageSize);
                    break;
                case "getProductsModified":
                    $result = $client->getProductsModified($modifiedFrom, true);
                    break;
                case "getProductPricesByHouse":
                    $result = $client->getProductPricesByHouse($store, true, 'DEFAULT', $validFrom, $filter, $page, $pageSize);
                    break;
                case "getProductPricesByHouseModified":
                    $result = $client->getProductPricesByHouseModified($store, $modifiedFrom, true);
                    break;
                case "getProductStocksByHouse":
                    $result = $client->getProductStocksByHouse($store, true, $filter, $page, $pageSize);
                    break;
                case "getProductStocksByHouseModified":
                    $result = $client->getProductStocksByHouseModified($store, $modifiedFrom, true);
                    break;
                case "getProductRebatesByHouse":
                    $result = $client->getProductRebatesByHouse($store, true, $filter, $page, $pageSize);
                    break;
                case "getProductRebatesByHouseModified":
                    $result = $client->getProductRebatesByHouseModified($store, $modifiedFrom, true);
                    break;
                case "getBrands":
                    $result = $client->getBrands($filter, $page, $pageSize);
                    break;
                case "getProductTags":
                    $result = $client->getProductTags($filter, $page, $pageSize);
                    break;
                case "getPriceTags":
                    $result = $client->getPriceTags($filter, $page, $pageSize);
                    break;
                case "importProducts":
                    //$data = [];
                    $fileArticlePath = "//data/data/import/spryker/2.globusCZ_articles.csv";
                    $fileAlternativeEanPath = "//data/data/import/spryker/99.globusCZ_article_gtins.csv";
                    file_put_contents($fileAlternativeEanPath, implode('|', array_keys(AlternativeEanMapping::$dataSetSchema)) . PHP_EOL);
                    file_put_contents($fileArticlePath, implode('|', array_keys(ProductMapping::$dataSetSchema)) . PHP_EOL);

                    $map = new ProductMapping();
                    $mapAlternativeEan = new AlternativeEanMapping();
                    $counter = 0;
                    $pageSize = 2000;
                    $page = 0;
                    try {
                        while ($page > -1 && $page < 200) {
                            $result = $client->getProducts($filter, true, $page, $pageSize);
                            if (!is_array($result)) {
                                break;
                            }
                            if (count($result) < 1) {
                                break;
                            }
                            if (is_array($result["products"]) && count($result["products"]) < 1) {
                                break;
                            }
                            foreach ($result["products"] as $item) {
                                if (count($item["eshopCategories"]) > 0 && !empty($item["vatRate"])) {
                                    $counter++;
                                    $d = $map->mapValues($item);
                                    $d["Classification_ID"] = implode(";", $item["eshopCategories"]);
                                    file_put_contents($fileArticlePath, implode('|', $d) . PHP_EOL, FILE_APPEND);
                                    $linesAlternativeEan = $mapAlternativeEan->getEanLines($item);
                                    if (count($linesAlternativeEan) > 1) {
                                        foreach ($linesAlternativeEan as $line) {
                                            file_put_contents($fileAlternativeEanPath, implode('|', $line) . PHP_EOL, FILE_APPEND);
                                        }
                                    }
                                }
                            }
                            $output->writeln('Pages done ' . $page . ', rows ' . $counter);
                            $page = $page + 1;
                        }
                    } catch (Exception $ex) {
                        $output->writeln("ERROR: " . $ex->getMessage());
                    }
                    if ($map->getProductCountWithOutEan() > 0) {
                        $output->writeln("Product count with no EAN code: " . $map->getProductCountWithOutEan());
                    }
                    $output->writeln("imported: " . $counter . " rows");
                    break;
                case "importCategories":
                    $result = $client->getProductCategories($page, 20000);
                    $counter = 0;
                    file_put_contents("//data/data/import/spryker/1.globusCZ_categories.csv", "categoryIdStibo|parentIdCategoryStibo|name|metatitle|metadescription" . PHP_EOL);
                    foreach ($result["productCategoriesEshop"] as $item) {
                        if (!str_starts_with($item["categoryId"], 'cls_czc_')) {
                            if ($item["categoryId"] != 'cls_czr_click_and_collect') {
                                $cat["categoryIdStibo"] = $item["categoryId"];
                                $cat["parentIdCategoryStibo"] = $item["parentId"];
                                $cat["name"] = $item["categoryName"];
                                $cat["metatitle"] = "";
                                $cat["metadescription"] = "";
                                file_put_contents("//data/data/import/spryker/1.globusCZ_categories.csv", implode('|', $cat) . PHP_EOL, FILE_APPEND);
                                $counter++;
                            }
                        }
                    }
                    break;
                case "importProductPrice":
                    $qry = new SpyProductQuery();
                    $products = $qry->select(SpyProductTableMap::COL_SAP_NUMBER)->find();
                    $page = 0;
                    $pageSize = 50;
                    $counter = 0;
                    $fileName = "//data/data/import/spryker/4.globus_article_prices." . $store . ".csv";
                    file_put_contents($fileName, "sapnumber;price;pseudoprice;store;promotion;promotionstart;promotionend" . PHP_EOL);
                    $p = [];
                    $c = 0;
                    foreach ($products->getData() as $sapNumber) {
                        $p[] = $sapNumber;
                        $c++;
                        if ($c === 20) {
                            $filter = "ProductWamasNr:in " . implode(",", $p);
                            $c = 0;
                            $p = [];
                            $result = $client->getProductPricesByHouse($store, true, 'ESHOP', "2021-05-01", $filter, 0, $pageSize);
                            if ((is_array($result))
                             && (count($result) > 0)
                             && (is_array($result["productPrices"]) && count($result["productPrices"]) > 0)) {
                                foreach ($result["productPrices"] as $item) {
                                    $counter++;
                                    $d = $this->getProductPriceArray();
                                    $d["sapnumber"] = $item["productWamasNr"];
                                    $d["store"] = $store;
                                    $price = $item["prices"][0];
                                    $d["price"] = str_replace(".", ",", $price["actualPrice"]);
                                    if (empty($price["actionNumber"])) {
                                        $d["pseudoprice"] = "0,00";
                                    } else {
                                        $d["pseudoprice"] = str_replace(".", ",", $price["originalPrice"]);
                                        $d["promotion"] = $price["actionNumber"];
                                        $d["promotionstart"] = $price["priceValidFrom"];
                                        $d["promotionend"] = $price["priceValidTo"];
                                    }
                                    file_put_contents($fileName, implode(';', $d) . PHP_EOL, FILE_APPEND);
                                }
                                $output->writeln('Pages done ' . $page . ', rows ' . $counter);
                                $page = $page + 1;
                            }
                        }
                    }
                    break;
                case "importProductStock":
                    $qry = new SpyProductQuery();
                    $products = $qry->select(SpyProductTableMap::COL_SAP_NUMBER)->find();
                    $page = 0;
                    $pageSize = 100;
                    $counter = 0;
                    $fileName = "//data/data/import/spryker/5.globus_article_instock." . $store . ".csv";
                    file_put_contents($fileName, "sapnumber;instock;store;shelf;shelffield;shelffloor" . PHP_EOL);
                    $p = [];
                    $c = 0;
                    foreach ($products->getData() as $sapNumber) {
                        $p[] = $sapNumber;
                        $c++;
                        if ($c === $pageSize) {
                            $filter = "vanr:in " . implode(",", $p);
                            $c = 0;
                            $p = [];
                            $result = $client->getProductsByHouse($store, $filter, '', 0, $pageSize);
                            if ((is_array($result)) && (count($result) > 0)) {
                                foreach ($result as $item) {
                                    $counter++;
                                    $d = $this->getProductStockArray();
                                    $d["sapnumber"] = $item["vanr"];
                                    if (!empty($item["productInHouse"]["stockAmount"])) {
                                        $d["instock"] = str_replace(",", ".", $item["productInHouse"]["stockAmount"]);
                                    }
                                    $d["store"] = $store;
                                    if ((is_array($item["productInHouse"]["placements"])) && (count($item["productInHouse"]["placements"]) > 0)) {
                                        $d["shelf"] = $item["productInHouse"]["placements"][0]["placement"];
                                        $d["shelffield"] = $item["productInHouse"]["placements"][0]["facing"];
                                        $d["shelffloor"] = $item["productInHouse"]["placements"][0]["presentationStock"];
                                    }
                                    file_put_contents($fileName, implode(';', $d) . PHP_EOL, FILE_APPEND);
                                }
                                $output->writeln('Pages done ' . $page . ', rows ' . $counter);
                                $page = $page + 1;
                            }
                        }
                    }
                    break;
            }
            if ($counter > 0) {
                $output->writeln("Data rows returned: " . $counter);

                return 0;
            } elseif (empty($result)) {
                $output->writeln('No data returned');

                return 1;
            } elseif (count($result) > 0) {
                $output->writeln("Data returned: " . count($result));

                return 0;
            } else {
                $output->writeln('No data returned');

                return 1;
            }
        } catch (Exception $ex) {
            $output->writeln($ex->getMessage());
        }

        return null;
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param string $option
     * @param string $optionShort
     * @param mixed $defValue
     *
     * @return bool|string|string[]|null
     */
    private function getOptionValue(InputInterface $input, string $option, string $optionShort, $defValue)
    {
        $val = $defValue;
        if ($input->hasParameterOption('-' . $option) || $input->hasParameterOption('-' . $optionShort)) {
            $val = $input->getOption($option);
        }

        return $val;
    }

    /**
     * @return string[]
     */
    private function getProductPriceArray(): array
    {
        return [
            "sapnumber" => "",
            "price" => "",
            "pseudoprice" => "",
            "store" => "",
            "promotion" => "",
            "promotionstart" => "",
            "promotionend" => "",
        ];
    }

    /**
     * @return string[]
     */
    private function getProductStockArray(): array
    {
        return [
            "sapnumber" => "",
            "instock" => "0",
            "store" => "",
            "shelf" => "000",
            "shelffield" => "00",
            "shelffloor" => "00",
        ];
    }
}
