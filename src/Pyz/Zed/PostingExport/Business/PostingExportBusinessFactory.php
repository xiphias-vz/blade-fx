<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PostingExport\Business;

use Pyz\Client\OrderDetail\OrderDetailClientInterface;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\Sku\SkuServiceInterface;
use Pyz\Zed\PostingExport\Business\ContentBuilder\PosExportContentBuilder;
use Pyz\Zed\PostingExport\Business\ContentBuilder\PostingExportContentBuilder;
use Pyz\Zed\PostingExport\Business\ContentBuilder\SoldProductsExportContentBuilder;
use Pyz\Zed\PostingExport\Communication\ResponseBuilder\ExportCsvResponseBuilder;
use Pyz\Zed\PostingExport\Communication\ResponseBuilder\ExportResponseBuilderInterface;
use Pyz\Zed\PostingExport\PostingExportDependencyProvider;
use Pyz\Zed\Product\Business\ProductFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Service\UtilEncoding\UtilEncodingServiceInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;

/**
 * @method \Pyz\Zed\PostingExport\PostingExportConfig getConfig()
 */
class PostingExportBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\PostingExport\Business\ContentBuilder\PostingExportContentBuilder
     */
    public function createPostingExportContentBuilder(): PostingExportContentBuilder
    {
        return new PostingExportContentBuilder(
            $this->getSalesFacade(),
            $this->getMoneyFacade(),
            $this->getDateTimeWithZoneService(),
            $this->getTranslatorFacade(),
            $this->getOrderDetailClient()
        );
    }

    /**
     * @return \Pyz\Zed\PostingExport\Business\ContentBuilder\SoldProductsExportContentBuilder
     */
    public function createSoldProductsExportContentBuilder(): SoldProductsExportContentBuilder
    {
        return new SoldProductsExportContentBuilder(
            $this->getSalesFacade(),
            $this->getMoneyFacade(),
            $this->getDateTimeWithZoneService(),
            $this->getTranslatorFacade(),
            $this->getOrderDetailClient()
        );
    }

    /**
     * @return \Pyz\Zed\PostingExport\Business\ContentBuilder\PosExportContentBuilder
     */
    public function createPosExportContentBuilder(): PosExportContentBuilder
    {
        return new PosExportContentBuilder(
            $this->getSalesFacade(),
            $this->getMoneyFacade(),
            $this->getDateTimeWithZoneService(),
            $this->getOrderDetailClient(),
            $this->getProductFacade(),
            $this->getConfig(),
            $this->getSkuService()
        );
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(PostingExportDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Spryker\Zed\Money\Business\MoneyFacadeInterface
     */
    public function getMoneyFacade(): MoneyFacadeInterface
    {
        return $this->getProvidedDependency(PostingExportDependencyProvider::FACADE_MONEY);
    }

    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    public function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(PostingExportDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }

    /**
     * @return \Spryker\Service\UtilEncoding\UtilEncodingServiceInterface
     */
    public function getUtilEncodingService(): UtilEncodingServiceInterface
    {
        return $this->getProvidedDependency(PostingExportDependencyProvider::SERVICE_UTIL_ENCODING);
    }

    /**
     * @return \Spryker\Zed\Translator\Business\TranslatorFacadeInterface
     */
    public function getTranslatorFacade(): TranslatorFacadeInterface
    {
        return $this->getProvidedDependency(PostingExportDependencyProvider::FACADE_TRANSLATOR);
    }

    /**
     * @return \Pyz\Zed\Product\Business\ProductFacadeInterface
     */
    public function getProductFacade(): ProductFacadeInterface
    {
        return $this->getProvidedDependency(PostingExportDependencyProvider::FACADE_PRODUCT);
    }

    /**
     * @return \Pyz\Client\OrderDetail\OrderDetailClientInterface
     */
    public function getOrderDetailClient(): OrderDetailClientInterface
    {
        return $this->getProvidedDependency(PostingExportDependencyProvider::CLIENT_ORDER_DETAIL);
    }

    /**
     * @return \Pyz\Service\Sku\SkuServiceInterface
     */
    public function getSkuService(): SkuServiceInterface
    {
        return $this->getProvidedDependency(PostingExportDependencyProvider::SERVICE_SKU);
    }

    /**
     * @return \Pyz\Zed\PostingExport\Communication\ResponseBuilder\ExportResponseBuilderInterface
     */
    public function createExportCsvResponseBuilder(): ExportResponseBuilderInterface
    {
        return new ExportCsvResponseBuilder();
    }
}
