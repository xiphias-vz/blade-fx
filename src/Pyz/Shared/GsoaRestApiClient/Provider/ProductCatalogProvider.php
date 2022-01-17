<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\GsoaRestApiClient\Provider;

use Pyz\Shared\GsoaRestApiClient\ApiClient;

class ProductCatalogProvider
{
    /**
     * @var string
     */
    private $url = '/ProductCatalog/2';

    /**
     * @var string
     */
    private $token;

    /**
     * @return string
     */
    private function getBearerToken(): string
    {
        if (empty($this->token)) {
            $client = new TokenProvider();
            $this->token = $client->getBearerToken(TokenScope::PRODUCT_CATALOG);
        }

        return $this->token;
    }

    /**
     * Get categories for eShop
     * ProductCatalogService /productCategoriesEshop
     *
     * @param int $page
     * @param int $pageSize
     *
     * @return array
     */
    public function getProductCategories(int $page = 0, int $pageSize = 50): array
    {
        /**
         * {
        "categoryId": "cls_czr_events_news_sales",
        "categoryName": "Akce",
        "childrenIds": [
            "cls_czr_week_special_offer",
            "cls_czr_most_popular",
            "cls_czr_new",
            "cls_czr_sale",
            "cls_czr_ideas_and_recipes",
            "cls_czr_local_products"
        ],
        "parentId": "cls_czr_click_and_collect",
        "urlKeyword": "/akce/",
        "rank": 200000000000,
        "isHidden": false,
        "isActive": true
        },
         */
        $url = $this->url . '/productCategoriesEshop';
        $data = [
            'page' => $page,
            'pageSize' => $pageSize,
        ];

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Get changed category identifiers for eShop
     * ProductCatalogService /modifiedProductCategoriesEshop
     *
     * @param string $modifiedFrom 'yyyy-mm-dd'
     *
     * @return array
     */
    public function getProductCategoriesModified(string $modifiedFrom): array
    {
        $url = $this->url . '/modifiedProductCategoriesEshop';
        $data = [
            'modifiedFrom' => $modifiedFrom,
        ];

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Get product master data for eShop
     * ProductCatalogService /eShop/products
     *
     * @param string $filter
     * @param bool $baseVariantOnly If true, it returns data for all products that have the activeForOnline = true property and isActive = true at the same time. Otherwise, it will return all products.
     * @param int $page
     * @param int $pageSize
     *
     * @return array
     */
    public function getProducts(string $filter = "", bool $baseVariantOnly = false, int $page = 0, int $pageSize = 50): array
    {
        $url = $this->url . '/eShop/products';
        $data = [
            'filter' => $filter,
            'baseVariantOnly' => $baseVariantOnly,
            'page' => $page,
            'pageSize' => $pageSize,
        ];

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Get identifiers for changed products
     * ProductCatalogService /modifiedProducts
     *
     * @param string $modifiedFrom 'yyyy-mm-dd'
     * @param bool $baseVariantOnly If True, it returns data for all products that have the activeForOnline = true property and isActive = true at the same time. Otherwise, it will return all products.
     *
     * @return array
     */
    public function getProductsModified(string $modifiedFrom, bool $baseVariantOnly = false): array
    {
        $url = $this->url . '/modifiedProducts';
        $data = [
            'baseVariantOnly' => $baseVariantOnly,
            'modifiedFrom' => $modifiedFrom,
        ];

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Obtain price data of products in a given house (store)
     * ProductCatalogService /houses/{houseNumber}/productPrices
     *
     * @param int $houseNumber
     * @param bool $baseVariantOnly
     * @param string $useCase DEFAULT | ESHOP
     * @param string $validFrom
     * @param string $filter
     * @param int $page
     * @param int $pageSize
     *
     * @return array
     */
    public function getProductPricesByHouse(
        int $houseNumber,
        bool $baseVariantOnly = false,
        string $useCase = 'DEFAULT',
        string $validFrom = '',
        string $filter = '',
        int $page = 0,
        int $pageSize = 50
    ): array {
        $url = $this->url . '/houses/' . $houseNumber . '/productPrices';
        $data = [
            'baseVariantOnly' => $baseVariantOnly,
            'useCase' => $useCase,
            'page' => $page,
            'pageSize' => $pageSize,
        ];
        if (!empty($filter)) {
            $data['filter'] = $filter;
        }
        if (!empty($validFrom)) {
            $data['validFrom'] = $validFrom;
        }

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Get product identifiers with price changes
     * ProductCatalogService /houses/{houseNumber}/modifiedProductPrices
     *
     * @param string $houseNumber
     * @param string $modifiedFrom
     * @param bool $activeForOnlineOnly If True, it returns data for all products that have the activeForOnline = true property and isActive = true at the same time. Otherwise, it will return all products.
     *
     * @return array
     */
    public function getProductPricesByHouseModified(
        string $houseNumber,
        string $modifiedFrom = '',
        bool $activeForOnlineOnly = false
    ): array {
        $url = $this->url . '/houses/' . $houseNumber . '/modifiedProductPrices';
        $data = [
            'activeForOnlineOnly' => $activeForOnlineOnly,
            'modifiedFrom' => $modifiedFrom,
        ];

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Obtain stocks of products in the given house (store)
     * ProductCatalogService /houses/{houseNumber}/productStocks
     *
     * @param int $houseNumber
     * @param bool $baseVariantOnly
     * @param string $filter
     * @param int $page
     * @param int $pageSize
     *
     * @return array
     */
    public function getProductStocksByHouse(
        int $houseNumber,
        bool $baseVariantOnly = false,
        string $filter = '',
        int $page = 0,
        int $pageSize = 50
    ): array {
        $url = $this->url . '/houses/' . $houseNumber . '/productStocks';
        $data = [
            'baseVariantOnly' => $baseVariantOnly,
            'page' => $page,
            'pageSize' => $pageSize,
        ];
        if (!empty($filter)) {
            $data['filter'] = $filter;
        }

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Obtain product identifiers with a change in stock
     * ProductCatalogService /houses/{houseNumber}/modifiedProductStock
     *
     * @param int $houseNumber
     * @param string $modifiedFrom
     * @param bool $activeForOnlineOnly If True, it returns data for all products that have the activeForOnline = true property and isActive = true at the same time. Otherwise, it will return all products.
     *
     * @return array
     */
    public function getProductStocksByHouseModified(
        int $houseNumber,
        string $modifiedFrom,
        bool $activeForOnlineOnly = false
    ): array {
        $url = $this->url . '/houses/' . $houseNumber . '/modifiedProductStock';
        $data = [
            'activeForOnlineOnly' => $activeForOnlineOnly,
            'modifiedFrom' => $modifiedFrom,
        ];

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Get rebates in a given house (store)
     * ProductCatalogService /houses/{houseNumber}/rebates
     *
     * @param int $houseNumber
     * @param bool $activeForEshopOnly If True, it returns data for all products that have the activeForOnline = true property and isActive = true at the same time. Otherwise, it will return all products.
     * @param string $filter Id:in Abc,def,ghi ; OriginalRebateId:in Abc,def,ghi ; DiscountedProducts:in Abc,def,ghi. Combinations possible, concatenation with ";;" means logical AND.
     * @param int $page Default value : 0
     * @param int $pageSize Default value : 50
     *
     * @return array
     */
    public function getProductRebatesByHouse(
        int $houseNumber,
        bool $activeForEshopOnly = false,
        string $filter = '',
        int $page = 0,
        int $pageSize = 50
    ): array {
        $url = $this->url . '/houses/' . $houseNumber . '/rebates';
        $data = [
            'activeForEshopOnly' => $activeForEshopOnly,
            'page' => $page,
            'pageSize' => $pageSize,
        ];
        if (!empty($filter)) {
            $data['filter'] = $filter;
        }

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Get identifiers of changed rebates in a given house (store)
     * ProductCatalogService /houses/{houseNumber}/modifiedRebates
     *
     * @param int $houseNumber
     * @param string $modifiedFrom yyyy-dd-mm
     * @param bool $activeForEshopOnly If True, it returns data for all products that have the activeForOnline = true property and isActive = true at the same time. Otherwise, it will return all products.
     *
     * @return array
     */
    public function getProductRebatesByHouseModified(
        int $houseNumber,
        string $modifiedFrom,
        bool $activeForEshopOnly = false
    ): array {
        $url = $this->url . '/houses/' . $houseNumber . '/modifiedRebates';
        $data = [
            'activeForEshopOnly' => $activeForEshopOnly,
            'modifiedFrom' => $modifiedFrom,
        ];

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Get product brands
     * ProductCatalogService /brands
     *
     * @param string $filter Id:in Abc,def,ghi. Combinations possible, concatenation with ";;" means logical AND.
     * @param int $page Default value : 0
     * @param int $pageSize Default value : 50
     *
     * @return array
     */
    public function getBrands(
        string $filter = '',
        int $page = 0,
        int $pageSize = 50
    ): array {
        $url = $this->url . '/brands';
        $data = [
            'page' => $page,
            'pageSize' => $pageSize,
        ];
        if (!empty($filter)) {
            $data['filter'] = $filter;
        }

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Get product labels
     * ProductCatalogService /productTags
     *
     * @param string $filter Id:in Abc,def,ghi. Combinations possible, concatenation with ";;" means logical AND.
     * @param int $page Default value : 0
     * @param int $pageSize Default value : 50
     *
     * @return array
     */
    public function getProductTags(
        string $filter = '',
        int $page = 0,
        int $pageSize = 50
    ): array {
        $url = $this->url . '/productTags';
        $data = [
            'page' => $page,
            'pageSize' => $pageSize,
        ];
        if (!empty($filter)) {
            $data['filter'] = $filter;
        }

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Get price labels
     * ProductCatalogService /priceTags
     *
     * @param string $filter Id:in Abc,def,ghi. Combinations possible, concatenation with ";;" means logical AND.
     * @param int $page Default value : 0
     * @param int $pageSize Default value : 50
     *
     * @return array
     */
    public function getPriceTags(
        string $filter = '',
        int $page = 0,
        int $pageSize = 50
    ): array {
        $url = $this->url . '/priceTags';
        $data = [
            'page' => $page,
            'pageSize' => $pageSize,
        ];
        if (!empty($filter)) {
            $data['filter'] = $filter;
        }

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }

    /**
     * Obtain products with stock and prices in the given house (store)
     * ProductCatalogService /houses/{houseNumber}/products
     *
     * @param int $houseNumber
     * @param string $filter vanr:in Abc,def,ghi productCategories:in Abc,def,ghi
     * @param string $fields
     * @param int $page
     * @param int $pageSize
     *
     * @return array
     */
    public function getProductsByHouse(
        int $houseNumber,
        string $filter = '',
        string $fields = '',
        int $page = 0,
        int $pageSize = 50
    ): array {
        $url = $this->url . '/houses/' . $houseNumber . '/products';
        $data = [
            'page' => $page,
            'pageSize' => $pageSize,
        ];
        if (!empty($filter)) {
            $data['filter'] = $filter;
        }
        if (!empty($fields)) {
            $data['fields'] = $fields;
        }

        return ApiClient::get($url, $this->getBearerToken(), $data);
    }
}
