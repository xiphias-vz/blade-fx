<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport;

use Generated\Shared\Transfer\DataImportConfigurationActionTransfer;
use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReaderConfigurationTransfer;
use Pyz\Shared\DataImport\DataImportConfig as SharedDataImportConfig;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\ProductDetailPage\ProductDetailPageConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Shared\ProductPageSearch\ProductPageSearchConstants;
use Pyz\Shared\Store\StoreConstants;
use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;

/**
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 */
class DataImportConfig extends SprykerDataImportConfig
{
    public const IMPORT_TYPE_CATEGORY_TEMPLATE = 'category-template';
    public const IMPORT_TYPE_CUSTOMER = 'customer';
    public const IMPORT_TYPE_GLOSSARY = 'glossary';
    public const IMPORT_TYPE_NAVIGATION = 'navigation';
    public const IMPORT_TYPE_NAVIGATION_NODE = 'navigation-node';
    public const IMPORT_TYPE_PRODUCT = 'product';
    public const IMPORT_TYPE_PRODUCT_PRICE = 'product-price';
    public const IMPORT_TYPE_VITAMIN_ATTRIBUTE = 'vitamin-attribute';
    public const IMPORT_TYPE_VITAMIN_DATA = 'vitamin-data';
    public const IMPORT_TYPE_PRODUCT_CATEGORY = 'product-category';
    public const IMPORT_TYPE_PICKING_ROUTE = 'picking-route';
    public const IMPORT_TYPE_PICKING_ZONE = 'picking-zone';
    public const IMPORT_TYPE_PRODUCT_LOCATION = 'product-location';
    public const IMPORT_TYPE_MERCHANT_DELIVERY_POSTAL_CODE = 'merchant-delivery-postal-code';
    public const IMPORT_TYPE_MERCHANT_USER = 'merchant-user';
    public const IMPORT_TYPE_PRODUCT_STOCK = 'product-stock';
    public const IMPORT_TYPE_PRODUCT_ABSTRACT = 'product-abstract';
    public const IMPORT_TYPE_PRODUCT_ABSTRACT_STORE = 'product-abstract-store';
    public const IMPORT_TYPE_PRODUCT_CONCRETE = 'product-concrete';
    public const IMPORT_TYPE_PRODUCT_ATTRIBUTE_KEY = 'product-attribute-key';
    public const IMPORT_TYPE_PRODUCT_MANAGEMENT_ATTRIBUTE = 'product-management-attribute';
    public const IMPORT_TYPE_PRODUCT_RELATION = 'product-relation';
    public const IMPORT_TYPE_PRODUCT_LABEL = 'product-label';
    public const IMPORT_TYPE_PRODUCT_SET = 'product-set';
    public const IMPORT_TYPE_PRODUCT_OPTION = 'product-option';
    public const IMPORT_TYPE_PRODUCT_OPTION_PRICE = 'product-option-price';
    public const IMPORT_TYPE_PRODUCT_IMAGE = 'product-image';
    public const IMPORT_TYPE_PRODUCT_SEARCH_ATTRIBUTE_MAP = 'product-search-attribute-map';
    public const IMPORT_TYPE_PRODUCT_SEARCH_ATTRIBUTE = 'product-search-attribute';
    public const IMPORT_TYPE_CMS_TEMPLATE = 'cms-template';
    public const IMPORT_TYPE_CMS_BLOCK = 'cms-block';
    public const IMPORT_TYPE_CMS_BLOCK_STORE = 'cms-block-store';
    public const IMPORT_TYPE_DISCOUNT = 'discount';
    public const IMPORT_TYPE_DISCOUNT_STORE = 'discount-store';
    public const IMPORT_TYPE_DISCOUNT_AMOUNT = 'discount-amount';
    public const IMPORT_TYPE_DISCOUNT_VOUCHER = 'discount-voucher';
    public const IMPORT_TYPE_SHIPMENT = 'shipment';
    public const IMPORT_TYPE_SHIPMENT_PRICE = 'shipment-price';
    public const IMPORT_TYPE_STOCK = 'stock';
    public const IMPORT_TYPE_TAX = 'tax';
    public const IMPORT_TYPE_CURRENCY = 'currency';
    public const IMPORT_TYPE_STORE = 'store';
    public const IMPORT_POSTAL_CODE = 'postal-code';
    public const IMPORT_PRODUCT_MANAGEMENT_ATTRIBUTE = 'product-management-attribute';
    public const IMPORT_TIME_SLOT = 'time-slot';
    public const IMPORT_ALTERNATIVE_EAN = 'alternative-ean';
    public const IMPORT_ORDER_PICKZONE_COLOR = 'order_pickzone_color';
    public const IMPORT_COUNTRY_LOCALIZED = 'country-localized';
    public const IMPORT_TYPE_MERCHANT = 'merchant';
    public const IMPORT_TYPE_MERCHANT_REGION = 'merchant-region';

    /**
     * @return string|null
     */
    public function getDefaultYamlConfigPath(): ?string
    {
        return APPLICATION_ROOT_DIR . DIRECTORY_SEPARATOR . 'data/import/local/full_DE.yml';
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductDataImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration('spryker/product_data.csv', static::IMPORT_TYPE_PRODUCT, SharedDataImportConfig::IMPORT_CSV_PIPE_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductPriceDataImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration('spryker/product_price.csv', static::IMPORT_TYPE_PRODUCT_PRICE, SharedDataImportConfig::IMPORT_CSV_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductStockDataImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration('spryker/product_stock.csv', static::IMPORT_TYPE_PRODUCT_STOCK, SharedDataImportConfig::IMPORT_CSV_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getVitaminDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('spryker/vitaminangaben.csv', static::IMPORT_TYPE_VITAMIN_DATA);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductCategoryImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration('spryker/product_category.csv', static::IMPORT_TYPE_PRODUCT_CATEGORY, SharedDataImportConfig::IMPORT_CSV_BASE_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductManagementAttributeImporterConfiguration()
    {
        return $this->buildImporterConfiguration('product_management_attribute.csv', static::IMPORT_PRODUCT_MANAGEMENT_ATTRIBUTE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getPickingRouteDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('spryker/pick_reihenfolge.csv', static::IMPORT_TYPE_PICKING_ROUTE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getPickingZoneDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('picking_zone.csv', static::IMPORT_TYPE_PICKING_ZONE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductLocationDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('spryker/product_location.csv', static::IMPORT_TYPE_PRODUCT_LOCATION, SharedDataImportConfig::IMPORT_CSV_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getMerchantDeliveryPostalCodeImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration('spryker/merchant_delivery_zipcode.csv', static::IMPORT_TYPE_MERCHANT_DELIVERY_POSTAL_CODE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCurrencyDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('currency.csv', static::IMPORT_TYPE_CURRENCY);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getStoreDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('', static::IMPORT_TYPE_STORE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getGlossaryDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('glossary.csv', static::IMPORT_TYPE_GLOSSARY);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCustomerDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('customer.csv', static::IMPORT_TYPE_CUSTOMER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCategoryTemplateDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('category_template.csv', static::IMPORT_TYPE_CATEGORY_TEMPLATE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getTaxDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('tax.csv', static::IMPORT_TYPE_TAX);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getStockDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('stock.csv', static::IMPORT_TYPE_STOCK);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getShipmentDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('shipment.csv', static::IMPORT_TYPE_SHIPMENT);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getShipmentPriceDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('shipment_price.csv', static::IMPORT_TYPE_SHIPMENT_PRICE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getNavigationDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('navigation.csv', static::IMPORT_TYPE_NAVIGATION);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getNavigationNodeDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('navigation_node.csv', static::IMPORT_TYPE_NAVIGATION_NODE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductAttributeKeyDataImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration('spryker/product_data.csv', static::IMPORT_TYPE_PRODUCT_ATTRIBUTE_KEY, SharedDataImportConfig::IMPORT_CSV_PIPE_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductVitaminAttributeImporterConfiguration()
    {
        return $this->buildBaseImporterConfiguration('spryker/vitaminangaben.csv', static::IMPORT_TYPE_VITAMIN_ATTRIBUTE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductLabelDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('product_label.csv', static::IMPORT_TYPE_PRODUCT_LABEL);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductSearchAttributeMapDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('product_search_attribute_map.csv', static::IMPORT_TYPE_PRODUCT_SEARCH_ATTRIBUTE_MAP);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductSearchAttributeDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('product_search_attribute.csv', static::IMPORT_TYPE_PRODUCT_SEARCH_ATTRIBUTE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductOptionDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('product_option.csv', static::IMPORT_TYPE_PRODUCT_OPTION);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getProductOptionPriceDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('product_option_price.csv', static::IMPORT_TYPE_PRODUCT_OPTION_PRICE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCmsTemplateDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('cms_template.csv', static::IMPORT_TYPE_CMS_TEMPLATE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCmsBlockDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('cms_block.csv', static::IMPORT_TYPE_CMS_BLOCK);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCmsBlockStoreDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('cms_block_store.csv', static::IMPORT_TYPE_CMS_BLOCK_STORE);
    }

    /**
     * @return bool
     */
    public function isInternal()
    {
        return ($this->getConfig()->get(DataImportConstants::IS_ENABLE_INTERNAL_IMAGE)) ? true : false;
    }

    /**
     * @return string[]
     */
    public function getSearchableAttributeKeys(): array
    {
        return $this->get(ProductPageSearchConstants::SEARCHABLE_ATTRIBUTE_KEYS, []);
    }

    /**
     * @return string[]
     */
    public function getRequiredAttributeKeys(): array
    {
        return $this->get(ProductDetailPageConstants::REQUIRED_ATTRIBUTE_KEYS, []);
    }

    /**
     * @param string $file
     * @param string $importType
     * @param string $defaultDelimiter
     *
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    protected function buildBaseImporterConfiguration(string $file, string $importType, string $defaultDelimiter = SharedDataImportConfig::IMPORT_CSV_DELIMITER): DataImporterConfigurationTransfer
    {
        $dataImporterConfigurationTransfer = $this->buildImporterConfiguration($file, $importType);

        $dataImporterConfigurationTransfer
            ->getReaderConfiguration()
            ->setCsvDelimiter($defaultDelimiter);

        return $dataImporterConfigurationTransfer;
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getPostalCodeDataImporterConfiguration()
    {
        return $this->buildImporterConfiguration('postal_code.csv', static::IMPORT_POSTAL_CODE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getMerchantUserImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('spryker/merchant_user.csv', static::IMPORT_TYPE_MERCHANT_USER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getTimeSlotImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('spryker/time_slot.csv', static::IMPORT_TIME_SLOT);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getAlternativeEanImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('spryker/alternative_ean.csv', static::IMPORT_ALTERNATIVE_EAN, SharedDataImportConfig::IMPORT_CSV_PIPE_DELIMITER);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getOrderPickzoneColorImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('spryker/order_pickzone_color.csv', static::IMPORT_ORDER_PICKZONE_COLOR);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCountryLocalizedImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildBaseImporterConfiguration('spryker/country_localized.csv', static::IMPORT_COUNTRY_LOCALIZED);
    }

    /**
     * @return array
     */
    public function getSapStoreIdToStoreMap(): array
    {
        return $this->get(StoreConstants::SAP_STORE_ID_TO_STORE_MAP, []);
    }

    /**
     * @return string
     */
    public function getImagesHostUrl(): string
    {
        return $this->get(ProductImageConstants::IMAGES_HOST_URL, '');
    }

    /**
     * @return array
     */
    public function getRegexToSprykerFileNameMap(): array
    {
        return [
            '/^2\.globus_articles\.metzgerei/' => '2.globus_articles.metzgerei.csv',

            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1004/' => '4.globus_article_prices.metzgerei.1004.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1031/' => '4.globus_article_prices.metzgerei.1031.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1042/' => '4.globus_article_prices.metzgerei.1042.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1057/' => '4.globus_article_prices.metzgerei.1057.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1021/' => '4.globus_article_prices.metzgerei.1021.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1053/' => '4.globus_article_prices.metzgerei.1053.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1013/' => '4.globus_article_prices.metzgerei.1013.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1001/' => '4.globus_article_prices.metzgerei.1001.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1071/' => '4.globus_article_prices.metzgerei.1071.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1003/' => '4.globus_article_prices.metzgerei.1003.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1073/' => '4.globus_article_prices.metzgerei.1073.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1006/' => '4.globus_article_prices.metzgerei.1006.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1072/' => '4.globus_article_prices.metzgerei.1072.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1054/' => '4.globus_article_prices.metzgerei.1054.csv',
            '/^4\.globus_article_prices\.metzgerei\.[0-9]+_1032/' => '4.globus_article_prices.metzgerei.1032.csv',

            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1004/' => '5.globus_article_instock.metzgerei.1004.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1031/' => '5.globus_article_instock.metzgerei.1031.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1042/' => '5.globus_article_instock.metzgerei.1042.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1057/' => '5.globus_article_instock.metzgerei.1057.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1021/' => '5.globus_article_instock.metzgerei.1021.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1053/' => '5.globus_article_instock.metzgerei.1053.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1013/' => '5.globus_article_instock.metzgerei.1013.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1001/' => '5.globus_article_instock.metzgerei.1001.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1071/' => '5.globus_article_instock.metzgerei.1071.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1003/' => '5.globus_article_instock.metzgerei.1003.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1073/' => '5.globus_article_instock.metzgerei.1073.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1006/' => '5.globus_article_instock.metzgerei.1006.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1072/' => '5.globus_article_instock.metzgerei.1072.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1054/' => '5.globus_article_instock.metzgerei.1054.csv',
            '/^5\.globus_article_instock\.metzgerei\.[0-9]+_1032/' => '5.globus_article_instock.metzgerei.1032.csv',

            '/^5\.globus_article_instock\.NOS\.[0-9]+_1004/' => '5.globus_article_instock.NOS.1004.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1031/' => '5.globus_article_instock.NOS.1031.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1042/' => '5.globus_article_instock.NOS.1042.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1057/' => '5.globus_article_instock.NOS.1057.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1021/' => '5.globus_article_instock.NOS.1021.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1053/' => '5.globus_article_instock.NOS.1053.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1013/' => '5.globus_article_instock.NOS.1013.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1001/' => '5.globus_article_instock.NOS.1001.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1071/' => '5.globus_article_instock.NOS.1071.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1003/' => '5.globus_article_instock.NOS.1003.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1073/' => '5.globus_article_instock.NOS.1073.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1006/' => '5.globus_article_instock.NOS.1006.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1072/' => '5.globus_article_instock.NOS.1072.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1054/' => '5.globus_article_instock.NOS.1054.csv',
            '/^5\.globus_article_instock\.NOS\.[0-9]+_1032/' => '5.globus_article_instock.NOS.1032.csv',

            '/^1\.globus_categories\.[0-9]+/' => '1.globus_categories.csv',
            '/^1\.globus_time_slot/' => '1.globus_time_slot.csv',
            '/^2\.globus_articles\.[0-9]+/' => '2.globus_articles.csv',
            '/^99\.globus_article_gtins\.[0-9]+/' => '99.globus_article_gtins.csv',

            '/^5\.globus_article_instock\.[0-9]+_1004/' => '5.globus_article_instock.1004.csv',
            '/^5\.globus_article_instock\.[0-9]+_1031/' => '5.globus_article_instock.1031.csv',
            '/^5\.globus_article_instock\.[0-9]+_1042/' => '5.globus_article_instock.1042.csv',
            '/^5\.globus_article_instock\.[0-9]+_1057/' => '5.globus_article_instock.1057.csv',
            '/^5\.globus_article_instock\.[0-9]+_1021/' => '5.globus_article_instock.1021.csv',
            '/^5\.globus_article_instock\.[0-9]+_1053/' => '5.globus_article_instock.1053.csv',
            '/^5\.globus_article_instock\.[0-9]+_1013/' => '5.globus_article_instock.1013.csv',
            '/^5\.globus_article_instock\.[0-9]+_1001/' => '5.globus_article_instock.1001.csv',
            '/^5\.globus_article_instock\.[0-9]+_1071/' => '5.globus_article_instock.1071.csv',
            '/^5\.globus_article_instock\.[0-9]+_1003/' => '5.globus_article_instock.1003.csv',
            '/^5\.globus_article_instock\.[0-9]+_1073/' => '5.globus_article_instock.1073.csv',
            '/^5\.globus_article_instock\.[0-9]+_1006/' => '5.globus_article_instock.1006.csv',
            '/^5\.globus_article_instock\.[0-9]+_1072/' => '5.globus_article_instock.1072.csv',
            '/^5\.globus_article_instock\.[0-9]+_1054/' => '5.globus_article_instock.1054.csv',
            '/^5\.globus_article_instock\.[0-9]+_1032/' => '5.globus_article_instock.1032.csv',

            '/^4\.globus_article_prices\.[0-9]+_1004/' => '4.globus_article_prices.1004.csv',
            '/^4\.globus_article_prices\.[0-9]+_1031/' => '4.globus_article_prices.1031.csv',
            '/^4\.globus_article_prices\.[0-9]+_1042/' => '4.globus_article_prices.1042.csv',
            '/^4\.globus_article_prices\.[0-9]+_1057/' => '4.globus_article_prices.1057.csv',
            '/^4\.globus_article_prices\.[0-9]+_1021/' => '4.globus_article_prices.1021.csv',
            '/^4\.globus_article_prices\.[0-9]+_1053/' => '4.globus_article_prices.1053.csv',
            '/^4\.globus_article_prices\.[0-9]+_1013/' => '4.globus_article_prices.1013.csv',
            '/^4\.globus_article_prices\.[0-9]+_1001/' => '4.globus_article_prices.1001.csv',
            '/^4\.globus_article_prices\.[0-9]+_1071/' => '4.globus_article_prices.1071.csv',
            '/^4\.globus_article_prices\.[0-9]+_1003/' => '4.globus_article_prices.1003.csv',
            '/^4\.globus_article_prices\.[0-9]+_1073/' => '4.globus_article_prices.1073.csv',
            '/^4\.globus_article_prices\.[0-9]+_1006/' => '4.globus_article_prices.1006.csv',
            '/^4\.globus_article_prices\.[0-9]+_1072/' => '4.globus_article_prices.1072.csv',
            '/^4\.globus_article_prices\.[0-9]+_1054/' => '4.globus_article_prices.1054.csv',
            '/^4\.globus_article_prices\.[0-9]+_1032/' => '4.globus_article_prices.1032.csv',
        ];
    }

    /**
     * @return string
     */
    public function getDataImportFilesFolderName(): string
    {
        return $this->get(DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME, '');
    }

    /**
     * @api
     *
     * @param \Generated\Shared\Transfer\DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function buildImporterConfigurationByDataImportConfigAction(
        DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer
    ): DataImporterConfigurationTransfer {
        $dataImportReaderConfigurationTransfer = new DataImporterReaderConfigurationTransfer();
        $dataImportReaderConfigurationTransfer
            ->setFileName($dataImportConfigurationActionTransfer->getSource())
            ->addDirectory($this->getDataImportRootPath());

        $dataImporterConfigurationTransfer = new DataImporterConfigurationTransfer();
        $dataImporterConfigurationTransfer
            ->setImportType($dataImportConfigurationActionTransfer->getDataEntity())
            ->setReaderConfiguration($dataImportReaderConfigurationTransfer);

        return $dataImporterConfigurationTransfer;
    }
}
