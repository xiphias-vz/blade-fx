<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\FactFinder;

interface FactFinderConstants
{
    public const FTP_FACT_FINDER_FILES_FOLDER_NAME = "FACT_FINDER:FTP_FACT_FINDER_FILES_FOLDER_NAME";

    public const TARGET_DIRECTORY_FOR_EXTRACTED_FILES = '/data/EIN/export/files/';

    public const FILE_NAMES = [
        'export.Categories.Spryker.csv',
        'export.geoStockData.Spryker.csv',
        'export.productData.Spryker.csv',
    ];
}
