<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\GsoaRestApiClient\Import;

class AlternativeEanMapping
{
    protected const KEY_SAP_NUMBER = 'SAP Nummer';
    protected const KEY_PRODUCT_GROUP_ID = '<ID>';
    protected const KEY_NAME = '<Name>';
    protected const KEY_EAN = 'ordernumber';
    protected const KEY_IS_ACTIVE = 'Aktives Produkt';
    protected const KEY_IS_SALES_UNIT = 'Verkaufsmengeneinheit';
    protected const KEY_UNIT_OF_MEASURE_SAP = 'Mengeneinheit SAP';

    /**
     * @var string[]
     */
    public static $dataSetSchema = [
        AlternativeEanMapping::KEY_SAP_NUMBER => '',
        AlternativeEanMapping::KEY_PRODUCT_GROUP_ID => '',
        AlternativeEanMapping::KEY_NAME => '',
        AlternativeEanMapping::KEY_EAN => '',
        AlternativeEanMapping::KEY_IS_ACTIVE => '',
        AlternativeEanMapping::KEY_IS_SALES_UNIT => '',
        AlternativeEanMapping::KEY_UNIT_OF_MEASURE_SAP => '',
    ];

    /**
     * @param array $item
     * @param string $code
     *
     * @return string[]
     */
    protected function mapValues(array $item, string $code)
    {
        $d = static::$dataSetSchema;
        $d[static::KEY_SAP_NUMBER] = $item["wamasNr"];
        $d[static::KEY_NAME] = $item["name"];
        $d[static::KEY_EAN] = $code;
        $d[static::KEY_IS_ACTIVE] = $item["isActive"] == "true" ? "Ja" : "Nein";
        $d[static::KEY_IS_SALES_UNIT] = empty($item["saleUnit"]) ? "Nein" : "Ja";
        $d[static::KEY_UNIT_OF_MEASURE_SAP] = $item["saleUnit"];

        return $d;
    }

    /**
     * @param array $item
     *
     * @return array
     */
    public function getEanLines(array $item): array
    {
        $lines = [];
        if (is_array($item["eanCodes"])) {
            foreach ($item["eanCodes"] as $eanCode) {
                if ($eanCode["eanType"] == "EAN") {
                    $lines[] = $this->mapValues($item, $eanCode["code"]);
                }
            }
        }

        return $lines;
    }
}
