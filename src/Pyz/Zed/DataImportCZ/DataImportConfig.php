<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImportCZ;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Pyz\Shared\DataImport\DataImportConfig as SharedDataImportConfig;
use Pyz\Zed\DataImport\DataImportConfig as IntDataImportConfig;

/**
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 */
class DataImportConfig extends IntDataImportConfig
{
    /**
     * @return string|null
     */
    public function getDefaultYamlConfigPath(): ?string
    {
        return APPLICATION_ROOT_DIR . DIRECTORY_SEPARATOR . 'data/import/local/full_CZ.yml';
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductDataImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration('spryker/product_data_CZ.csv', static::IMPORT_TYPE_PRODUCT, SharedDataImportConfig::IMPORT_CSV_PIPE_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductPriceDataImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration('spryker/product_price_CZ.csv', static::IMPORT_TYPE_PRODUCT_PRICE, SharedDataImportConfig::IMPORT_CSV_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductStockDataImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration('spryker/product_stock_CZ.csv', static::IMPORT_TYPE_PRODUCT_STOCK, SharedDataImportConfig::IMPORT_CSV_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductCategoryImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration('spryker/1.globusCZ_categories.csv', static::IMPORT_TYPE_PRODUCT_CATEGORY, SharedDataImportConfig::IMPORT_CSV_BASE_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getTaxDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('tax_CZ.csv', static::IMPORT_TYPE_TAX);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getStockDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('stock_CZ.csv', static::IMPORT_TYPE_STOCK);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getNavigationNodeDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('navigation_node_CZ.csv', static::IMPORT_TYPE_NAVIGATION_NODE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getMerchantUserImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('spryker/merchant_user_CZ.csv', static::IMPORT_TYPE_MERCHANT_USER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getTimeSlotImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('spryker/time_slot_CZ.csv', static::IMPORT_TIME_SLOT);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductLabelDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('product_label_CZ.csv', static::IMPORT_TYPE_PRODUCT_LABEL);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductLocationDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('spryker/product_location_CZ.csv', static::IMPORT_TYPE_PRODUCT_LOCATION, SharedDataImportConfig::IMPORT_CSV_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getPickingZoneDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('picking_zone_CZ.csv', static::IMPORT_TYPE_PICKING_ZONE);
    }
}
