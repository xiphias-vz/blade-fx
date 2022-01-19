<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\GsoaRestApiClient\Communication\Console;

use DateInterval;
use DateTime;
use Exception;
use Orm\Zed\DataImport\Persistence\PyzImpSceduleQuery;
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
    public const OPTION_LIMIT = 'limit';
    public const OPTION_LIMIT_SHORT = 'l';
    private const COLUMN_FICTIVE_STOCK = 'hasFictiveStock';
    private const REQUEST_MAX_ARRAY_LENGTH = 100;
    private const DATA_IMPORT_FOLDER = "//data/data/import/spryker/";

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
        $this->addOption(self::OPTION_LIMIT, self::OPTION_LIMIT_SHORT, InputOption::VALUE_OPTIONAL);

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
        $limit = $this->getOptionValue($input, self::OPTION_LIMIT, self::OPTION_LIMIT_SHORT, '');
        if (empty($limit)) {
            $limit = 0;
        } else {
            $limit = (int)$limit;
        }
        $dateTo = (new DateTime('NOW'))->format('Y-m-d H:i');
        $counter = 0;
        if (empty($store)) {
            $store = 4007;
        }

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
                case "updateProducts":
                    if (empty($modifiedFrom)) {
                        $modifiedFrom = $this->getLastImportDate("product", null);
                    }
                    $fileArticlePath = $this->getImportFilePathAndName("2.globusCZ_articles", true);
                    $fileAlternativeEanPath = $this->getImportFilePathAndName("99.globusCZ_article_gtins", true);
                    file_put_contents($fileAlternativeEanPath, implode('|', array_keys(AlternativeEanMapping::$dataSetSchema)) . PHP_EOL);
                    file_put_contents($fileArticlePath, implode('|', array_keys(ProductMapping::$dataSetSchema)) . PHP_EOL);

                    $map = new ProductMapping();
                    $mapAlternativeEan = new AlternativeEanMapping();
                    $pageSize = 200;
                    $pageCounter = 0;
                    $returnablePackagingsPrices = [];

                    $qry = new SpyProductQuery();
                    $products = $qry->select([SpyProductTableMap::COL_SAP_NUMBER, SpyProductTableMap::COL_IS_ACTIVE])
                        ->find()->getArrayCopy('spy_product.sap_number');

                    try {
                        $result = $client->getProductsModified($modifiedFrom, true);
                        if (count($result) > 0) {
                            $modifiedProducts = array_unique($result["modifiedProducts"]);
                            $productsToRequest = array_slice($modifiedProducts, 0, static::REQUEST_MAX_ARRAY_LENGTH);
                            $output->writeln("Modified products: " . count($modifiedProducts) . " from " . $modifiedFrom);
                            while (count($productsToRequest) > 0) {
                                $sapFilter = "WamasNr:in " . implode(",", $productsToRequest);
                                $result = $client->getProducts($sapFilter, true, $page, $pageSize);
                                if (isset($result["products"])) {
                                    $result["products"] = $this->getPlacementsInStock($output, $client, $result["products"], 0, $store);
                                    foreach ($result["products"] as $item) {
                                        $this->setReturnablePackagins($item, $returnablePackagingsPrices, $client, $store);
                                        $d = $map->mapValues($item);
                                        if ($d["active"] === "1" || array_key_exists($d["sapnumber"], $products)) {
                                            $counter++;
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
                                }
                                $pageCounter++;
                                $output->writeln('Pages done ' . $pageCounter . ', rows ' . $counter);
                                $modifiedProducts = array_slice($modifiedProducts, static::REQUEST_MAX_ARRAY_LENGTH);
                                $productsToRequest = array_slice($modifiedProducts, 0, static::REQUEST_MAX_ARRAY_LENGTH);
                            }
                        } else {
                            $output->writeln('No modified products!');
                        }
                        $this->setLastImportDate("product", null, $modifiedFrom, $dateTo);
                    } catch (Exception $ex) {
                        $output->writeln("ERROR: " . $ex->getMessage());
                    }
                    if ($map->getProductCountWithOutEan() > 0) {
                        $output->writeln("Product count with no EAN code: " . $map->getProductCountWithOutEan());
                    }
                    $output->writeln("imported: " . $counter . " rows");

                    break;
                case "getProductPricesByHouse":
                    $result = $client->getProductPricesByHouse($store, true, 'DEFAULT', $validFrom, $filter, $page, $pageSize);
                    break;
                case "getProductPricesByHouseModified":
                    if (empty($modifiedFrom)) {
                        $modifiedFrom = $this->getLastImportDate("product-price");
                    }
                    $result = $client->getProductPricesByHouseModified($store, $modifiedFrom, true);
                    break;
                case "getProductStocksByHouse":
                    $result = $client->getProductStocksByHouse($store, true, $filter, $page, $pageSize);
                    break;
                case "getProductStocksByHouseModified":
                    if (empty($modifiedFrom)) {
                        $modifiedFrom = $this->getLastImportDate("product-stock");
                    }
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
                    $fileArticlePath = $this->getImportFilePathAndName("2.globusCZ_articles", false);
                    $fileAlternativeEanPath = $this->getImportFilePathAndName("99.globusCZ_article_gtins", false);
                    file_put_contents($fileAlternativeEanPath, implode('|', array_keys(AlternativeEanMapping::$dataSetSchema)) . PHP_EOL);
                    file_put_contents($fileArticlePath, implode('|', array_keys(ProductMapping::$dataSetSchema)) . PHP_EOL);

                    $map = new ProductMapping();
                    $mapAlternativeEan = new AlternativeEanMapping();
                    $pageSize = 2000;
                    $page = 0;
                    $returnablePackagingsPrices = [];
                    try {
                        while ($page > -1 && $page < 1000) {
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
                            $result["products"] = $this->getPlacementsInStock($output, $client, $result["products"], 0, $store);
                            foreach ($result["products"] as $item) {
                                if (count($item["eshopCategories"]) > 0 && !empty($item["vatRate"])) {
                                    $counter++;
                                    $this->setReturnablePackagins($item, $returnablePackagingsPrices, $client, $store);
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
                                if ($limit > 0 && $limit === $counter) {
                                    $page = 2000;
                                    break;
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
                    $fileCategoryPath = $this->getImportFilePathAndName("1.globusCZ_categories", false);
                    $result = $client->getProductCategories($page, 20000);
                    file_put_contents($fileCategoryPath, "categoryIdStibo|parentIdCategoryStibo|name|metatitle|metadescription" . PHP_EOL);
                    $categories = [];
                    foreach ($result["productCategoriesEshop"] as $item) {
                        if (!str_starts_with($item["categoryId"], 'cls_czc_')) {
                            if ($item["categoryId"] != 'cls_czr_click_and_collect') {
                                if ($item["isActive"] === true && $item["isHidden"] === false) {
                                    $categories[] = $item;
                                    $counter++;
                                }
                            }
                        }
                    }
                    $sortedCategories = $this->getCategoriesByParentId($categories, "cls_czr_click_and_collect", 0);
                    ksort($sortedCategories);
                    foreach ($sortedCategories as $item) {
                        $cat["categoryIdStibo"] = $item["categoryId"];
                        $cat["parentIdCategoryStibo"] = $item["parentId"];
                        $cat["name"] = $item["categoryName"];
                        $cat["metatitle"] = "";
                        $cat["metadescription"] = "";
                        file_put_contents($fileCategoryPath, implode('|', $cat) . PHP_EOL, FILE_APPEND);
                    }
                    break;
                case "importProductPrice":
                    $this->generateProductPriceFile($output, $client, $store, $counter, $result, null);
                    break;
                case "importProductStock":
                    $this->generateProductStockFile($output, $client, $store, $counter, $result, null);
                    break;
                case "updateCategories":
                    if (empty($modifiedFrom)) {
                        $modifiedFrom = $this->getLastImportDate("category", null);
                    }
                    $result = $client->getProductCategoriesModified($modifiedFrom);
                    $modifiedCategories = array_unique($result["modifiedProductCategoriesEshop"]);
                    $output->writeln("Modified categories: " . count($modifiedCategories) . " from " . $modifiedFrom);
                    if (count($modifiedCategories) > 0) {
                        $this->setLastImportDate("category", null, $modifiedFrom, $dateTo);
                    }
                    break;
                case "updatePrices":
                    if (empty($modifiedFrom)) {
                        $modifiedFrom = $this->getLastImportDate("product-price", $store);
                    }
                    $result = $client->getProductPricesByHouseModified($store, $modifiedFrom, true);
                    if (count($result) > 0) {
                        $modifiedProducts = array_unique($result["modifiedProducts"]);
                        $output->writeln("Modified product prices: " . count($modifiedProducts) . " from " . $modifiedFrom);

                        if (count($modifiedProducts) > 0) {
                            $this->generateProductPriceFile($output, $client, $store, $counter, $result, $result["modifiedProducts"]);
                            $this->setLastImportDate("product-price", $store, $modifiedFrom, $dateTo);
                        }
                    } else {
                        $output->writeln("No modified product prices from " . $modifiedFrom);
                    }
                    break;
                case "updateStock":
                    if (empty($modifiedFrom)) {
                        $modifiedFrom = $this->getLastImportDate("product-stock", $store);
                    }
                    $result = $client->getProductStocksByHouseModified($store, $modifiedFrom, true);
                    if (isset($result["modifiedProducts"])) {
                        $modifiedProducts = array_unique($result["modifiedProducts"]);
                        $output->writeln("Modified product stocks: " . count($modifiedProducts) . " from " . $modifiedFrom);

                        if (count($modifiedProducts) > 0) {
                            $this->generateProductStockFile($output, $client, $store, $counter, $result, $modifiedProducts);
                            $this->setLastImportDate("product-stock", $store, $modifiedFrom, $dateTo);
                        }
                    } else {
                        $output->writeln("Product stocks not modified since " . $modifiedFrom);
                    }

                    break;
            }
            if ($counter > 0) {
                $output->writeln("Data rows returned: " . $counter);

                return Console::CODE_SUCCESS;
            } elseif (empty($result)) {
                $output->writeln('No data returned');

                return Console::CODE_ERROR;
            } elseif (count($result) >> 0) {
                $output->writeln("Data returned: " . count($result));
                //$output->write(json_encode($result)); //TODO make optional parameter for console output

                return Console::CODE_SUCCESS;
            } else {
                $output->writeln('No data returned');

                return Console::CODE_ERROR;
            }
        } catch (Exception $ex) {
            $output->writeln($ex->getMessage());

            return Console::CODE_ERROR;
        }
    }

    /**
     * @param array $items
     * @param string $parentId
     * @param int $deep
     *
     * @return array
     */
    protected function getCategoriesByParentId(array $items, string $parentId, int $deep): array
    {
        $categories = [];
        $count = 0;
        $deep++;
        foreach ($items as $item) {
            if ($item["parentId"] === $parentId) {
                $count++;
                if ($item["rank"] == null) {
                    $item["rank"] = str_pad(substr($item["categoryName"], 0, 20), 20, '0', STR_PAD_RIGHT);
                }
                $categories[sprintf("%'.09d", $deep) . "!" . $parentId . "-" . str_pad($item["rank"], 20, '0', STR_PAD_LEFT)] = $item;
                $categories = array_merge($categories, $this->getCategoriesByParentId($items, $item["categoryId"], $deep));
            }
        }

        return $categories;
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
            "shelffield" => "000",
            "shelffloor" => "00",
        ];
    }

    /**
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     * @param \Pyz\Shared\GsoaRestApiClient\Provider\ProductCatalogProvider $client
     * @param array $products
     * @param int $index
     * @param string $store
     *
     * @return array
     */
    private function getPlacementsInStock(OutputInterface $output, ProductCatalogProvider $client, array $products, int $index, string $store): array
    {
        $limit = 100;
        $counter = 0;
        $sortOrderFilter = [];
        $productCount = count($products);
        for ($i = $index; $i < $productCount; $i++) {
            if (count($products[$i]["eshopCategories"]) > 0 && !empty($products[$i]["vatRate"])) {
                $sortOrderFilter[] = $products[$i]['wamasNr'];
                $counter++;
                if ($counter > $limit) {
                    break;
                }
            }
        }
        try {
            $resultSortOrder = $client->getPlacementsByHouse($store, 'ProductWamasNr:in ' . implode(",", $sortOrderFilter), 0, 2000);
            $counter = 0;
            for ($i = $index; $i < $productCount; $i++) {
                $wNr = $products[$i]['wamasNr'];
                $key = array_search($wNr, array_column($resultSortOrder, 'productWamasNr'));
                $sortOrder = 0;
                if ($key > 0) {
                    if (isset($resultSortOrder[$key]["placements"][0]["presentationStock"])) {
                        $sortOrder = $resultSortOrder[$key]["placements"][0]["presentationStock"];
                    } elseif (isset($resultSortOrder[$key]["placement"][0]["presentationStock"])) {
                        $sortOrder = $resultSortOrder[$key]["placement"][0]["presentationStock"];
                    }
                    $sortOrder = is_numeric($sortOrder) ? abs($sortOrder) * (-1) : $sortOrder;
                }
                $products[$i]["sortingorder"] = $sortOrder;
                $counter++;
                if ($counter > $limit) {
                    break;
                }
            }
            $index = $i;
        } catch (Exception $ex) {
            $index = $index + $limit;
            $output->write($ex->getMessage());
        }
        if ($index < $productCount) {
            return $this->getPlacementsInStock($output, $client, $products, $index, $store);
        }

        return $products;
    }

    /**
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     * @param \Pyz\Shared\GsoaRestApiClient\Provider\ProductCatalogProvider $client
     * @param array $products
     * @param int $index
     * @param string $store
     *
     * @return array
     */
    private function getPresentationStock(OutputInterface $output, ProductCatalogProvider $client, array $products, int $index, string $store): array
    {
        $limit = 100;
        $counter = 0;
        $sortOrderFilter = [];
        $productCount = count($products);
        for ($i = $index; $i < $productCount; $i++) {
            if (count($products[$i]["eshopCategories"]) > 0 && !empty($products[$i]["vatRate"])) {
                $sortOrderFilter[] = $products[$i]['wamasNr'];
                $counter++;
                if ($counter > $limit) {
                    break;
                }
            }
        }
        try {
            $resultSortOrder = $client->getProductsByHouse($store, 'vanr:in ' . implode(",", $sortOrderFilter), 'vanr;ean;productInHouse', 0, 2000);
            $counter = 0;
            for ($i = $index; $i < $productCount; $i++) {
                $wNr = $products[$i]['wamasNr'];
                $key = array_search($wNr, array_column($resultSortOrder, 'vanr'));
                $sortOrder = 0;
                if ($key > 0) {
                    if (isset($resultSortOrder[$key]["productInHouse"]["placements"][0]["presentationStock"])) {
                        $sortOrder = $resultSortOrder[$key]["productInHouse"]["placements"][0]["presentationStock"];
                    } elseif (isset($resultSortOrder[$key]["productInHouse"]["placement"][0]["presentationStock"])) {
                        $sortOrder = $resultSortOrder[$key]["productInHouse"]["placement"][0]["presentationStock"];
                    }
                    $sortOrder = is_numeric($sortOrder) ? abs($sortOrder) * (-1) : $sortOrder;
                }
                $products[$i]["sortingorder"] = $sortOrder;
                $counter++;
                if ($counter > $limit) {
                    break;
                }
            }
            $index = $i;
        } catch (Exception $ex) {
            $index = $index + $limit;
            $output->write($ex->getMessage());
        }
        if ($index < $productCount) {
            return $this->getPresentationStock($output, $client, $products, $index, $store);
        }

        return $products;
    }

    /**
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     * @param \Pyz\Shared\GsoaRestApiClient\Provider\ProductCatalogProvider $client
     * @param string $store
     * @param int $counter
     * @param mixed $result
     * @param array|null $sapNumberArray
     *
     * @return void
     */
    private function generateProductPriceFile(
        OutputInterface $output,
        ProductCatalogProvider $client,
        string $store,
        int &$counter,
        &$result,
        ?array $sapNumberArray
    ) {
        $qry = new SpyProductQuery();
        $products = $qry->select(SpyProductTableMap::COL_SAP_NUMBER)->where(SpyProductTableMap::COL_IS_ACTIVE . ' = 1')->find();
        $productCount = count($products);
        $page = 0;
        $pageSize = 130;
        $counter = 0;
        $progressCounter = 0;
        $fileName = $this->getImportFilePathAndName("4.globus_article_prices." . $store, !empty($sapNumberArray));
        file_put_contents($fileName, "sapnumber;price;pseudoprice;store;promotion;promotionstart;promotionend" . PHP_EOL);
        $p = [];
        $c = 0;
        foreach ($products->getData() as $sapNumber) {
            $progressCounter++;
            if (empty($sapNumberArray) || in_array($sapNumber, $sapNumberArray)) {
                $p[] = $sapNumber;
                $c++;
                if ($c === $pageSize || $progressCounter == $productCount) {
                    $filter = "ProductWamasNr:in " . implode(",", $p);
                    $c = 0;
                    $p = [];
                    $result = $client->getProductPricesByHouse($store, true, 'ESHOP', '', $filter, 0, $pageSize);
                    if ((is_array($result))
                        && (count($result) > 0)
                        && (is_array($result["productPrices"]) && count($result["productPrices"]) > 0)) {
                        foreach ($result["productPrices"] as $item) {
                            $counter++;
                            $d = $this->getProductPriceArray();
                            $d["sapnumber"] = $item["productWamasNr"];
                            $d["store"] = $store;
                            if (count($item["prices"]) > 1) {
                                $price = $this->getValidPrice($item["prices"]);
                            } else {
                                $price = $item["prices"][0];
                            }
                            $priceVal = (float)($price["actualPrice"]);
                            $priceOrgVal = (float)($price["originalPrice"]);

                            $d["price"] = str_replace(".", ",", $price["actualPrice"]);
                            if (empty($price["actionNumber"]) && $priceVal < $priceOrgVal) {
                                $price["actionNumber"] = 'undefinedAction';
                            }
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
        }
    }

    /**
     * @param array $prices
     *
     * @return mixed|null
     */
    private function getValidPrice(array $prices)
    {
        $price = $this->getPriceByType($prices, "VKA0", null, null);
        if ($price == null) {
            $price = $this->getPriceByType($prices, "ZTP0", ["20", "40", "22", "24"], null);
        }
        if ($price == null) {
            $price = $this->getPriceByType($prices, "ZTP0", null, ["20", "40", "22", "24", null]);
        }
        if ($price == null) {
            $price = $this->getPriceByType($prices, "VKP0", ["10", "60"], null);
        }
        if ($price == null) {
            $price = $this->getPriceByType($prices, "VKP0", null, ["10", "60", null]);
        }
        if ($price == null) {
            $price = $prices[0];
        }

        return $price;
    }

    /**
     * @param array $prices
     * @param string $priceType
     * @param array|null $validChangeReason
     * @param array|null $nonValidChangeReason
     *
     * @return mixed|null
     */
    private function getPriceByType(array $prices, string $priceType, ?array $validChangeReason, ?array $nonValidChangeReason)
    {
        foreach ($prices as $price) {
            if ($price["priceType"] === $priceType) {
                $changeReason = $price["changeReason"];
                $isValid = true;
                if (!empty($validChangeReason)) {
                    $isValid = false;
                    foreach ($validChangeReason as $reason) {
                        if ($reason === $changeReason || $reason == null) {
                            $isValid = true;
                            break;
                        }
                    }
                }
                if (!empty($nonValidChangeReason)) {
                    $isValid = true;
                    foreach ($nonValidChangeReason as $reason) {
                        if ($reason == null) {
                            break;
                        }
                        if ($reason === $changeReason) {
                            $isValid = false;
                            break;
                        }
                    }
                }

                return $isValid ? $price : null;
            }
        }

        return null;
    }

    /**
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     * @param \Pyz\Shared\GsoaRestApiClient\Provider\ProductCatalogProvider $client
     * @param string $store
     * @param int $counter
     * @param mixed $result
     * @param array|null $sapNumberArray
     *
     * @return void
     */
    private function generateProductStockFile(
        OutputInterface $output,
        ProductCatalogProvider $client,
        string $store,
        int &$counter,
        &$result,
        ?array $sapNumberArray
    ) {
        $qry = new SpyProductQuery();
        $products = $qry->select(SpyProductTableMap::COL_SAP_NUMBER)->where(SpyProductTableMap::COL_IS_ACTIVE . ' = 1')->find();
        $productCount = count($products);
        $page = 0;
        $pageSize = 130;
        $fileName = $this->getImportFilePathAndName("5.globus_article_instock." . $store, empty($sapNumberArray));
        file_put_contents($fileName, "sapnumber;instock;store;shelf;shelffield;shelffloor" . PHP_EOL);
        $p = [];
        $c = 0;
        $counter = 0;
        $progressCounter = 0;
        $data = $products->getData();
        $isEmptyArray = empty($sapNumberArray);
        if (!$isEmptyArray) {
            $s = [];
            foreach ($sapNumberArray as $item) {
                $s[$item] = $item;
            }
            $sapNumberArray = $s;
        }
        foreach ($data as $sapNumber) {
            $progressCounter++;
            if ($isEmptyArray || isset($sapNumberArray[$sapNumber])) {
                $p[] = $sapNumber;
                $c++;
                if ($c === $pageSize || $progressCounter == $productCount) {
                    $filter = "vanr:in " . implode(",", $p);
                    $filterStock = "ProductWamasNr:in " . implode(",", $p);
                    $c = 0;
                    $p = [];
                    $result = $client->getProductsByHouse($store, $filter, '', 0, $pageSize);
                    $resultStock = $client->getProductStocksByHouse($store, true, $filterStock, 0, $pageSize)['productStocks'];
                    if ((is_array($result)) && (count($result) > 0)) {
                        foreach ($result as $item) {
                            $counter++;
                            $d = $this->getProductStockArray();
                            $d["sapnumber"] = $item["vanr"];
                            $key = array_search($item["vanr"], array_column($resultStock, 'productWamasNr'));
                            if ($key) {
                                $d["instock"] = str_replace(",", ".", $resultStock[$key]["availableAmount"]);
                                if ($resultStock[$key][static::COLUMN_FICTIVE_STOCK] === true) {
                                    $d["instock"] = 999999;
                                }
                            } else {
                                $d["instock"] = str_replace(",", ".", $item["productInHouse"]["stockAmount"]);
                            }
                            $d["store"] = $store;
                            if (isset($item["productInHouse"]["placement"])) {
                                if ((is_array($item["productInHouse"]["placement"])) && (count($item["productInHouse"]["placement"]) > 0)) {
                                    $d["shelf"] = substr($item["productInHouse"]["placement"][0]["placement"], 0, 3);
                                    $d["shelffield"] = substr($item["productInHouse"]["placement"][0]["placement"], 3, 2);
                                    $d["shelffloor"] = substr($item["productInHouse"]["placement"][0]["placement"], 5, 1);
                                }
                            } elseif (isset($item["productInHouse"]["placements"])) {
                                if ((is_array($item["productInHouse"]["placements"])) && (count($item["productInHouse"]["placements"]) > 0)) {
                                    $d["shelf"] = substr($item["productInHouse"]["placements"][0]["placement"], 0, 3);
                                    $d["shelffield"] = substr($item["productInHouse"]["placements"][0]["placement"], 3, 2);
                                    $d["shelffloor"] = substr($item["productInHouse"]["placements"][0]["placement"], 5, 1);
                                }
                            } else {
                                $d["shelf"] = '000';
                                $d["shelffield"] = '000';
                                $d["shelffloor"] = '00';
                            }
                            $d["shelf"] = str_replace('\\', "", $d["shelf"]);
                            $d["shelffield"] = str_replace('\\', "", $d["shelffield"]);
                            $d["shelffloor"] = str_replace('\\', "", $d["shelffloor"]);

                            file_put_contents($fileName, implode(';', $d) . PHP_EOL, FILE_APPEND);
                        }
                        $output->writeln('Pages done ' . $page . ', products ' . $progressCounter . ', rows ' . $counter);
                        $page = $page + 1;
                    }
                }
            }
        }
    }

    /**
     * @param array $item
     * @param array $returnablePackagingsPrices
     * @param \Pyz\Shared\GsoaRestApiClient\Provider\ProductCatalogProvider $client
     * @param string $store
     *
     * @return void
     */
    protected function setReturnablePackagins(array &$item, array &$returnablePackagingsPrices, ProductCatalogProvider $client, string $store)
    {
        if (is_array($item["returnablePackagings"])) {
            $returnableCount = 0;
            foreach ($item["returnablePackagings"] as $packaging) {
                $returnablePackagingsWamasNr = $packaging["productWamasNr"];
                $price = null;
                $plu = null;
                if (!array_key_exists($returnablePackagingsWamasNr, $returnablePackagingsPrices)) {
                    $packageProduct = $client->getProducts("WamasNr:in " . $returnablePackagingsWamasNr);
                    if (isset($packageProduct["products"][0]["eanCodes"][0]["code"])) {
                        $plu = $packageProduct["products"][0]["eanCodes"][0]["code"];
                    }
                    $prices = $client->getProductPricesByHouse($store, true, 'ESHOP', "", "ProductWamasNr:in " . $returnablePackagingsWamasNr, 0, 10);
                    if (isset($prices["productPrices"])) {
                        $price = $this->getValidPrice($prices["productPrices"][0]["prices"]);
                    }
                    $returnablePackagingsPrices[$returnablePackagingsWamasNr] = ["price" => $price, "plu" => $plu];
                } else {
                    $price = $returnablePackagingsPrices[$returnablePackagingsWamasNr]["price"];
                    $plu = $returnablePackagingsPrices[$returnablePackagingsWamasNr]["plu"];
                }
                $item["returnablePackagings"][$returnableCount]["price"] = $price;
                $item["returnablePackagings"][$returnableCount]["plu"] = $plu;
                $returnableCount++;
            }
        }
    }

    /**
     * @param string $fileName
     * @param bool $isPartial
     *
     * @return string
     */
    protected function getImportFilePathAndName(string $fileName, bool $isPartial): string
    {
        $partial = $isPartial ? "_partial" : "";

        return static::DATA_IMPORT_FOLDER . $fileName . $partial . ".csv";
    }

    /**
     * @param string $importName
     * @param string|null $store
     *
     * @return string
     */
    protected function getLastImportDate(string $importName, ?string $store): string
    {
        $qry = PyzImpSceduleQuery::create();
        if ($store) {
            $ent = $qry->filterByStore($store)->findOneByImportName($importName);
        } else {
            $ent = $qry->findOneByImportName($importName);
        }
        $date = new DateTime('NOW');
        if ($ent == null) {
            $date = $date->sub(DateInterval::createFromDateString('1 days'));
        } else {
            $date = $ent->getUpdatedAt();
        }

        return $date->format('Y-m-d H:i');
    }

    /**
     * @param string $importName
     * @param string|null $store
     * @param string $modifiedFrom
     * @param string $modifiedTo
     *
     * @return int
     */
    protected function setLastImportDate(string $importName, ?string $store, string $modifiedFrom, string $modifiedTo): int
    {
        $qry = PyzImpSceduleQuery::create();
        if ($store) {
            $ent = $qry->filterByStore($store)->filterByImportName($importName)->findOneOrCreate();
        } else {
            $ent = $qry->filterByImportName($importName)->findOneOrCreate();
        }
        $ent->setUpdatedAt($modifiedTo);
        $ent->setModifiedFrom($modifiedFrom);
        $ent->setStore($store);

        return $ent->save();
    }
}
