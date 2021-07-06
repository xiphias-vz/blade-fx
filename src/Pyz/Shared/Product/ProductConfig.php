<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Product;

use Spryker\Zed\Product\ProductConfig as SprykerProductConfigAlias;

class ProductConfig extends SprykerProductConfigAlias
{
    public const PRODUCT_ATTRIBUTE_KEY_PICKING_AREA = 'pickzone';
    public const PRODUCT_ATTRIBUTE_KEY_AGE_CONTROL = 'Alkoholkontrolle erforderlich';

    public const KEY_PRODUCT_EAN = 'EAN';

    public const PRODUCT_ATTRIBUTE_VARIETY = 'Sorte';

    public const PRODUCT_ATTRIBUTE_KEY_QUANTITY = 'Menge';
    public const PRODUCT_ATTRIBUTE_KEY_DAILY_INTAKE = 'Prozent Tagesdosis';

    public const PRODUCT_STORE_ATTRIBUTE_FORMAT = '%s_%s';
    public const PRODUCT_REGION_ATTRIBUTE_CHECK_REGEX = '/_\d{3}$/';
    public const PRODUCT_STORE_SPECIFIC_ATTRIBUTES = [
        self::KEY_PRODUCT_NUMBER,
        self::KEY_PRICE,
    ];

    public const KEY_ACG_WARENGROUPPE = 'ACG_Warengruppe';
    public const KEY_ACG_UNTER_WARENGROUPPE = 'ACG_Unterwarengruppe';

    public const KEY_PRODUCT_NUMBER = 'ordernumber';
    public const KEY_SAP_NUMBER = 'sapnumber';
    public const KEY_ARTIKELNAME_SPRYKER = 'name';
    public const KEY_DESCRIPTION = 'description_long';
    public const KEY_ACTIVE = 'active';
    public const KEY_TAX = 'tax';
    public const KEY_MAIN_IMAGE_FILE_NAME = 'mainimage_filename';
    public const KEY_PRICE = 'price';
    public const KEY_PRICE_PER_KG = 'priceperkg';
    public const KEY_PRICE_PROMOTION = 'promotion';
    public const KEY_PRICE_FROM = 'promotionstart';
    public const KEY_PRICE_TO = 'promotionend';
    public const KEY_PSEUDO_PRICE = 'pseudoprice';
    public const KEY_HERKUNFTSLAND_ATTRIBUTE = 'herkunftsland_o_g';
    public const KEY_PICK_ZONE_ATTRIBUTE = 'pickzone';
    public const KEY_ASSORTMENT_ZONE_ATTRIBUTE = 'assortmentzone';
    public const KEY_SAP_WGR = 'sapwgr';
    public const KEY_BON_TEXT = 'bontext';
    public const KEY_BRAND = 'supplier';
    public const KEY_BASE_PRICE_CONTENT = 'grundpreisinhalt';
    public const KEY_BASE_PRICE_UNIT = 'grundpreismasseinheit';

    public const KEY_WEIGHT_PER_ITEM = 'einzelgewicht';

    public const PRICE_PER_KG = 'preis_pro_kg';
}
