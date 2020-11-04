<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Product;

use Spryker\Zed\Product\ProductConfig as SprykerProductConfigAlias;

class ProductConfig extends SprykerProductConfigAlias
{
    public const PRODUCT_ATTRIBUTE_KEY_PICKING_AREA = 'Picking Area';
    public const PRODUCT_ATTRIBUTE_KEY_AGE_CONTROL = 'Alkoholkontrolle erforderlich';

    public const PRODUCT_ATTRIBUTE_KEY_WEIGHT = 'Gewicht';
    public const PRODUCT_ATTRIBUTE_KEY_LENGTH = 'Maße: Höhe';
    public const PRODUCT_ATTRIBUTE_KEY_WIDTH = 'Maße: Breite';
    public const PRODUCT_ATTRIBUTE_KEY_DEPTH = 'Maße: Tiefe';
    public const PRODUCT_ATTRIBUTE_KEY_CONTAMINATION = 'Getrennte Auslieferung wegen Kontamination';
    public const PRODUCT_ATTRIBUTE_KEY_FOOD = 'Food?';

    public const KEY_ARTIKELNAME_SPRYKER = 'Artikelname Spryker';
    public const KEY_SALES_UNIT = 'Verkaufseinheit';
    public const KEY_VARIETY = 'Sorte';
    public const KEY_PRODUCT_NUMBER = 'Artikelnummer';
    public const KEY_PRODUCT_EAN = 'EAN';

    public const KEY_PRICE = 'Verkaufspreis';
    public const KEY_PRICE_FROM = 'Geplante Preisreduktion aktiv von';
    public const KEY_PRICE_TO = 'Geplante Preisreduktion aktiv bis';
    public const KEY_COMPARE_PRICE = 'Vergleichspreis';
    public const KEY_PRICE_ORIGINAL = 'Verkaufspreis Original';
    public const KEY_PRICE_ORIGINAL_FROM = 'Usprungspreis aktiv von';
    public const KEY_PRICE_ORIGINAL_TO = 'Usprungspreis aktiv bis';

    public const KEY_SALE_VOLUME = 'Verkaufsvolumen';
    public const KEY_REFERENCE_SIZE = 'Bezugsgröße';
    public const KEY_ENERGY_KJ = 'Brennwert/kJ';
    public const KEY_ENERGY_KCAL = 'Brenntwert/kcal';
    public const KEY_CARBOHYDRATES = 'Kohlenhydrate';
    public const KEY_OF_WHICH_SUGAR = 'davon Zucker';
    public const KEY_FAT = 'Fett';
    public const KEY_SATURATED_FAT = 'davon ges. Fettsäuren';
    public const KEY_PROTEIN = 'Eiweiß';
    public const KEY_SALT = 'Salz';

    public const KEY_HEIGHT = 'Maße: Höhe';
    public const KEY_WIDTH = 'Maße: Breite';
    public const KEY_DEPTH = 'Maße: Tiefe';
    public const KEY_WEIGHT = 'Gewicht';

    public const PRODUCT_ATTRIBUTE_ABT_NR = 'AbtNr';
    public const PRODUCT_ATTRIBUTE_LAGERPLATZ = 'Lagerplatz';
    public const PRODUCT_ATTRIBUTE_VARIETY = 'Sorte';

    public const PRODUCT_ATTRIBUTE_KEY_QUANTITY = 'Menge';
    public const PRODUCT_ATTRIBUTE_KEY_DAILY_INTAKE = 'Prozent Tagesdosis';

    public const PRODUCT_STORE_ATTRIBUTE_FORMAT = '%s_%s';
    public const PRODUCT_REGION_ATTRIBUTE_CHECK_REGEX = '/_\d{3}$/';
    public const PRODUCT_STORE_SPECIFIC_ATTRIBUTES = [
        self::KEY_SALE_VOLUME,
        self::KEY_PRODUCT_NUMBER,
        self::KEY_PRICE,
    ];

    public const KEY_ACG_WARENGROUPPE = 'ACG_Warengruppe';
    public const KEY_ACG_UNTER_WARENGROUPPE = 'ACG_Unterwarengruppe';
}
