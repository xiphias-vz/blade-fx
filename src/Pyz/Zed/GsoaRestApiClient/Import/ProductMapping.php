<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\GsoaRestApiClient\Import;

class ProductMapping
{
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
     * @param array $item
     *
     * @return string[]
     */
    public function mapValues(array $item)
    {
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
                    if ($item["articleType"] === 1) {
                        $d[$this->importSchemaPropertyNameMap[$key][0]] = $item[$key];
                    } else {
                        $d[$this->importSchemaPropertyNameMap[$key][0]] = null;
                    }
                }
            }
        }
        $d['grundpreispflicht'] = 1;
        $d['grundeinheit'] = 1;
        $d['assortmentzone'] = 'Trocken';
        $this->setNutritionValues($d, $item);
        $this->setAssets($d, $item);
        $this->setProductTags($d, $item);
        $this->setEanCode($d, $item);
        if (is_array($item["countriesOfOrigin"])) {
            $d["herkunftsland"] = implode(",", $item["countriesOfOrigin"]);
        }
        $d["inverkehrbringer"] = $this->trimValue($item["producerName"] . " " . $item["producerAddress"]);
        if (is_array($item["allergens"])) {
            $d["entallerg"] = $this->trimValue(implode(",", $item["allergens"]));
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
        $val = str_replace("\"", "'", $val);

        return str_replace(["\r\n", "\n", "\r", "|"], ', ', $val);
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
                    $value[$key] = $nutritionValue["value"];
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
            foreach ($item["assets"] as $asset) {
                if ($asset["type"] == "ref_czr_online_image") {
                    $value["mainimage_filename"] = $asset["id"] . "&type=1";
                }
            }
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
     * @return int
     */
    public function getProductCountWithOutEan(): int
    {
        return $this->productWithOutEan;
    }
}
