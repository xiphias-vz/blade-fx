<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\GsoaRestApiClient\Import;

use Orm\Zed\Country\Persistence\SpyCountryQuery;
use Orm\Zed\Locale\Persistence\SpyLocaleQuery;
use Orm\Zed\PriceProduct\Persistence\PyzUnitComparisonsQuery;
use Orm\Zed\Product\Persistence\Map\SpyProductTableMap;
use Orm\Zed\Product\Persistence\SpyProductQuery;
use Orm\Zed\Sales\Persistence\PyzCountryLocalizedQuery;

class ProductMapping
{
    private const LOCALE_NAME = 'cs_CZ';

    /**
     * @var int $localeId
     */
    private $localeId = 0;

    /**
     * @var array $localeArray
     */
    private $localeArray = [];

    /**
     * @var \Propel\Runtime\Collection\ObjectCollection $conversionUnits
     */
    private static $conversionUnits;

    /**
     * @var string[]
     */
    public static $dataSetSchema = [
        'ordernumber' => '',
        'sapnumber' => '',
        'sap_unit' => '',
        'name' => '',
        'description_long' => '',
        'supplier' => '',
        'tax' => '',
        'ballaststoffe' => '',
        'fettefettungsaeurenp100gml' => '',
        'eiweissp100gml' => '',
        'energiekcalp100gml' => '',
        'energiekjp100gml' => '',
        'fettp100gml' => '',
        'fettefettgsaeurenp100gml' => '',
        'kohlhyalkp100gml' => '',
        'kohlstrp100gml' => '',
        'kohlzkrp100gml' => '',
        'kohlp100gml' => '',
        'fettefettmgsaeurenp100gml' => '',
        'salz100gml' => '',
        'alkgeh' => '',
        'mainimage_filename' => '',
        'entallerg' => '',
        'mentallerg' => '',
        'zutaten' => '',
        'bio' => '',
        'vegan' => '',
        'vegetarisch' => '',
        'laktosefrei' => '',
        'glutenfrei' => '',
        'fairtrade' => '',
        'pfandpflicht' => '',
        'pfandbetrag' => '',
        'artikeltyp' => '',
        'fsk' => '',
        'inverkehrbringer' => '',
        'grundpreispflicht' => '',
        'grundpreisinhalt' => '',
        'grundpreismasseinheit' => '',
        'grundeinheit' => '',
        'verpackungseinheit' => '',
        'groupid' => '',
        'active' => '',
        'bontext' => '',
        'sapwgr' => '',
        'herkunftsland' => '',
        'pfand_1_sapnumber' => '',
        'pfand_1_plu' => '',
        'pfand_1_count' => '',
        'pfand_1_amount' => '',
        'pfand_2_sapnumber' => '',
        'pfand_2_plu' => '',
        'pfand_2_count' => '',
        'pfand_2_amount' => '',
        'handelsklasse' => '',
        'einzelgewicht' => '',
        'herkunftsland_o_g' => '',
        'nonfoodingredients' => '',
        'warnhinweise' => '',
        'verwendungshinweise' => '',
        'temperaturecondition' => '',
        'assortmentzone' => '',
        'orderlimit' => '',
        'pet_feeding_table' => '',
        'SAP-WGR' => '',
        'Zusatzkategorie' => '',
        'Altersempfehlung' => '',
        'NOS Artikel' => '',
        'Classification_ID' => '',
        'wine_quality_classification' => '',
    ];

    /**
     * @var string[][]
     */
    protected $importSchemaPropertyNameMap = [
        'wamasNr' => ['sapnumber'],
        'saleUnit' => ['sap_unit', 'verpackungseinheit', 'grundpreismasseinheit'],
        'name' => ['name'],
        'description' => ['description_long'],
        'supplierName' => ['supplier'],
        'vatRate' => ['tax'],
        'contains' => ['zutaten'],
        'isActive' => ['active'],
        'safetyInformation' => ['warnhinweise'],
        'userGuide' => ['verwendungshinweise'],
        'storageInstructions' => ['temperaturecondition'],
        'fsk' => ['ageLimitation'],
        'ageLimitation' => ['Altersempfehlung'],
        'maximumSalesQuantity' => ['orderlimit'],
        'productGroup' => ['groupid'],
        'bruttoWeightKg' => ['einzelgewicht'],
        'amount' => ['grundpreisinhalt'],
        'wineQualityClassification' => ['wine_quality_classification'],
    ];

    /**
     * @var string[]
     */
    protected $nutritionMap = [
        'atr_czr_fiber_os' => 'ballaststoffe',
        'atr_czr_fats_os' => 'fettefettungsaeurenp100gml',
        'atr_czr_proteins_os' => 'eiweissp100gml',
        'atr_czr_energy_kcal_os' => 'energiekcalp100gml',
        'atr_czr_energy_kj_os' => 'energiekjp100gml',
        'atr_czr_carbohydrates_os' => 'kohlhyalkp100gml',
        'atr_czr_saturated_fatty_acids_os' => 'fettefettmgsaeurenp100gml',
        'atr_czr_salt_os' => 'salz100gml',
        'atr_czr_alcohol_percentage' => 'alkgeh',
        'atr_czr_sugars_os' => 'kohlzkrp100gml',
        ];

    /**
     * @var int
     */
    private $productWithOutEan = 0;

    /**
     * @var array
     */
    private static $productList;

    /**
     * @param array $item
     *
     * @return string[]
     */
    public function mapValues(array $item)
    {
        if (static::$productList == null) {
            static::$productList = SpyProductQuery::create()
                ->select([SpyProductTableMap::COL_SAP_NUMBER, SpyProductTableMap::COL_ASSORTMENT_ZONE])
                ->find()
                ->toArray(SpyProductTableMap::COL_SAP_NUMBER);
        }
        if ($item["articleType"] === 4) {
            if (empty($item['saleUnit'])) {
                $item['saleUnit'] = 'kg';
            }
        }
        $d = ProductMapping::$dataSetSchema;
        foreach (array_keys($item) as $key) {
            if (array_key_exists($key, $this->importSchemaPropertyNameMap)) {
                foreach ($this->importSchemaPropertyNameMap[$key] as $key1) {
                    $d[$key1] = $this->trimValue($item[$key]);
                }
                if ($key == 'supplierName') {
                    if (empty($item[$key])) {
                        $d[$this->importSchemaPropertyNameMap[$key][0]] = 'keine';
                    }
                }
                if ($key == 'bruttoWeightKg') {
                    if ($item["articleType"] === 1 || $item["articleType"] === 4) {
                        $d[$this->importSchemaPropertyNameMap[$key][0]] = $item[$key];
                    } else {
                        $d[$this->importSchemaPropertyNameMap[$key][0]] = null;
                    }
                }
            }
        }

        $d['grundpreispflicht'] = 1;
        if (isset(static::$productList[$d["sapnumber"]])) {
            $d['assortmentzone'] = static::$productList[$d["sapnumber"]][SpyProductTableMap::COL_ASSORTMENT_ZONE];
        } else {
            $d['assortmentzone'] = 'no_az';
        }
        $this->setBaseUnits($d);
        $this->setNutritionValues($d, $item);
        $this->setAssets($d, $item);
        $this->setProductTags($d, $item);
        $this->setEanCode($d, $item);
        $this->setDepositPrice($d, $item);
        if (is_array($item["countriesOfOrigin"])) {
            $countries = [];
            foreach ($item["countriesOfOrigin"] as $country) {
                $countries[] = $this->getCountryNameByIso2Code($country);
            }
            $d["herkunftsland"] = implode(",", $countries);
            $d["herkunftsland_o_g"] = implode(",", $countries);
        }
        $d["inverkehrbringer"] = $this->trimValue($item["producerName"] . " " . $item["producerAddress"]);
        if (is_array($item["allergens"])) {
            $d["entallerg"] = $this->trimValue(implode(",", $item["allergens"]));
        }
        if ($d['active'] === "1") {
            $d['active'] = $item['activeForOnline'] ? "1" : "0";
        }

        return $d;
    }

    /**
     * @param string|null $val
     *
     * @return string|string[]|null
     */
    protected function trimValue(?string $val)
    {
        if (empty($val)) {
            return null;
        }
        $val = html_entity_decode(str_replace("\"", "'", $val));

        return str_replace(["\r\n", "\n", "\r", "|"], ', ', $val);
    }

    /**
     * @param array $item
     *
     * @return void
     */
    protected function setBaseUnits(array &$item): void
    {
        if (static::$conversionUnits == null) {
            static::$conversionUnits = PyzUnitComparisonsQuery::create()->find();
        }

        /** @var string $unit */
        $unit = $item['grundpreismasseinheit'];
        $conversionUnitValue = 1;
        if (!empty($unit)) {
            /** @var \Orm\Zed\PriceProduct\Persistence\PyzUnitComparisons $conversionUnit */
            foreach (static::$conversionUnits as $conversionUnit) {
                if (strtolower($unit) == strtolower($conversionUnit->getUnitFrom())) {
                    $conversionUnitValue = $conversionUnit->getRatio();
                    $unit = $conversionUnit->getUnitTo();
                    break;
                }
            }
        }
        $item['grundeinheit'] = $conversionUnitValue;
        $item['grundpreismasseinheit'] = $unit;
    }

    /**
     * @param array $value
     * @param array $item
     *
     * @return void
     */
    protected function setOtherValues(array &$value, array $item): void
    {
        $value["herkunftsland"] = implode(",", $item["countriesOfOrigin"]);
        $value["inverkehrbringer"] = $this["producerName"] . " " . $item["producerAddress"];
    }

    /**
     * @param array $value
     * @param array $item
     *
     * @return void
     */
    protected function setNutritionValues(array &$value, array $item): void
    {
        if (is_array($item["nutritionValues"])) {
            foreach ($item["nutritionValues"] as $nutritionValue) {
                $code = $nutritionValue["code"];
                if (array_key_exists($code, $this->nutritionMap)) {
                    $key = $this->nutritionMap[$code];
                    $value[$key] = $this->trimValue($nutritionValue["value"]);
                }
            }
        }
    }

    /**
     * @param array $value
     * @param array $item
     *
     * @return void
     */
    protected function setAssets(array &$value, array $item): void
    {
        if (is_array($item["assets"])) {
            $image = "";
            foreach ($item["assets"] as $asset) {
                if ($asset["type"] == "ref_czr_online_image") {
                    if (!empty($image)) {
                        $image = $image . ";";
                    }
                    $image = $image . $asset["id"] . "&type=1";
                }
            }
            $value["mainimage_filename"] = $image;
        }
    }

    /**
     * @var string[]
     */
    protected $productTagMap = [
        'CMW01' => 'bio',
        'CMW18' => 'vegan',
        'CMW21' => 'vegetarisch',
        'CMW04' => 'laktosefrei',
        'CMW02' => 'glutenfrei',
        'CMW11' => 'fairtrade',
    ];

    /**
     * "id": "CMW01", "name": "BIO VÝROBEK", --ORGANIC PRODUCT
    "id": "CMW02", "name": "BEZLEPKOVÝ VÝROBEK", --GLUTEN - FREE PRODUCT
    "id": "CMW03", "name": "SNÍŽENÝ OBSAH LAKTÓZY", --REDUCED LACTOSE
    "id": "CMW04", "name": "ČERSTVÉ Z NAŠÍ VÝROBY", --FRESH FROM OUR PRODUCTION
    "id": "CMW05", "name": "MIMI KLUB",
    "id": "CMW06", "name": "SE SNÍŽENÝM OBSAHEM CUKRU", --WITH REDUCED SUGAR
    "id": "CMW07", "name": "ZDRAVÁ VÝŽIVA", --HEALTHY NUTRITION
    "id": "CMW09", "name": "NOVINKA",
    "id": "CMW10", "name": "ČESKÁ POTRAVINA", --CZECH FOOD
    "id": "CMW08", "name": "EKO PRODUKT",
    "id": "CMW11", "name": "FAIRTRADE",
    "id": "CMW12", "name": "TOP 1000",
    "id": "CMW13", "name": "SUCHÁ VÍNA", --DRY WINES
    "id": "CMW14", "name": "POLOSUCHÁ VÍNA", --SEMI-DRY WINES
    "id": "CMW15", "name": "POLOSLADKÁ VÍNA", --SEMI - SWEET WINES
    "id": "CMW16", "name": "SLADKÁ VÍNA", --SWEET WINES
    "id": "CMW17", "name": "ČESKÁ VLAJKA", --CZECH FLAG
    "id": "CMW18", "name": "VEGAN",
    "id": "CMW19", "name": "RAW",
    "id": "CMW20", "name": "BEZ PALMOVÉHO OLEJE", --WITHOUT PALM OIL
    "id": "CMW21", "name": "VEGETARIÁN", --VEGETARIAN
    "id": "CMW22", "name": "POCTIVÁ VÝROBA GLOBUS", --HONEST GLOBUS PRODUCTION
    "id": "CMW23", "name": "ŠETRNÝ K PŘÍRODĚ", --NATURE FRIENDLY
     *
     * @param array $value
     * @param array $item
     *
     * @return void
     */
    protected function setProductTags(array &$value, array $item): void
    {
        foreach ($this->productTagMap as $map) {
            $value[$map] = 0;
        }
        if (is_array($item["productTagIds"])) {
            foreach ($item["productTagIds"] as $productTag) {
                if (array_key_exists($productTag, $this->productTagMap)) {
                    $value[$this->productTagMap[$productTag]] = 1;
                }
            }
        }
    }

    /**
     * @param array $value
     * @param array $item
     *
     * @return void
     */
    protected function setEanCode(array &$value, array $item): void
    {
        if (is_array($item["eanCodes"])) {
            foreach ($item["eanCodes"] as $eanCode) {
                if ($eanCode["eanType"] == "EAN") {
                    $value["ordernumber"] = $eanCode["code"];
                    break;
                }
            }
        }
        if (empty($value["ordernumber"])) {
            $value["ordernumber"] = $item["wamasNr"];
            $this->productWithOutEan++;
        }
    }

    /**
     * @param array $value
     * @param array $item
     *
     * @return void
     */
    protected function setDepositPrice(array &$value, array $item): void
    {
        if (is_array($item["returnablePackagings"])) {
            if (isset($item["returnablePackagings"]["price"]["actualPrice"])) {
                $value["pfandbetrag"] = $item["returnablePackagings"]["price"]["actualPrice"];
            }
        }
    }

    /**
     * @return int
     */
    public function getProductCountWithOutEan(): int
    {
        return $this->productWithOutEan;
    }

    /**
     * @param string $code

     * @return string
     */
    private function getCountryNameByIso2Code(string $code): string
    {
        if (empty($code)) {
            return '';
        }
        if (!array_key_exists($code, $this->localeArray)) {
            if ($this->localeId === 0) {
                $this->localeId = SpyLocaleQuery::create()
                    ->findOneByLocaleName(static::LOCALE_NAME)
                    ->getIdLocale();
            }
            $country = SpyCountryQuery::create()->findOneByIso2Code($code);
            if ($country != null) {
                $countryLocale = PyzCountryLocalizedQuery::create()
                    ->filterByFkCountry($country->getIdCountry())
                    ->findOneByFkLocale($this->localeId);
                if ($countryLocale != null) {
                    if (!empty($countryLocale->getNameLocalized())) {
                        $this->localeArray[$code] = $countryLocale->getNameLocalized();
                    }
                }
                if (!isset($this->localeArray[$code])) {
                    $this->localeArray[$code] = $country->getName();
                }
            }
            if (!isset($this->localeArray[$code])) {
                $this->localeArray[$code] = $code;
            }
        }

        return $this->localeArray[$code];
    }
}
