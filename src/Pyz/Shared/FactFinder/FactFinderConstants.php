<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\FactFinder;

interface FactFinderConstants
{
    public const FTP_FACT_FINDER_FILES_FOLDER_NAME = "FACT_FINDER:FTP_FACT_FINDER_FILES_FOLDER_NAME";

    public const TARGET_DIRECTORY_FOR_EXTRACTED_FILES = '/data/export/files/';

    public const CATEGORIES_FILE_NAME = 'categoriesFileName';
    public const GEO_STOCK_FILE_NAME = 'geoStockFileName';
    public const PRODUCT_DATA_FILE_NAME = 'productDataFileName';
    public const SEQUENCES_FILE_NAME = 'sequencesFileName';

    public const FILE_NAMES = [
        self::CATEGORIES_FILE_NAME => 'export.Categories.Spryker.csv',
        self::GEO_STOCK_FILE_NAME => 'export.geoStockData.Spryker.csv',
        self::PRODUCT_DATA_FILE_NAME => 'export.productData.Spryker.csv',
        self::SEQUENCES_FILE_NAME => 'sequences.csv',
    ];

    public const FACT_FINDER_ROOT_URL = 'FACT_FINDER_ROOT_URL';
    public const FACT_FINDER_SHOPWARE_CHANNEL = 'FACT_FINDER_SHOPWARE_CHANNEL';
}
