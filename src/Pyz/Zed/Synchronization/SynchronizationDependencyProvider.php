<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Synchronization;

use Pyz\Zed\MerchantStorage\Communication\Plugin\Synchronization\MerchantSynchronizationDataBulkPlugin;
use Pyz\Zed\ShipmentStorage\Communication\Plugin\Synchronization\ShipmentSynchronizationDataBulkPlugin;
use Spryker\Zed\AvailabilityStorage\Communication\Plugin\Synchronization\AvailabilitySynchronizationDataPlugin;
use Spryker\Zed\CategoryImageStorage\Communication\Plugin\Synchronization\CategoryImageSynchronizationDataBulkPlugin;
use Spryker\Zed\CategoryPageSearch\Communication\Plugin\Synchronization\CategoryPageSynchronizationDataPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Synchronization\CategoryNodeSynchronizationDataPlugin;
use Spryker\Zed\CategoryStorage\Communication\Plugin\Synchronization\CategoryTreeSynchronizationDataPlugin;
use Spryker\Zed\CmsBlockStorage\Communication\Plugin\Synchronization\CmsBlockSynchronizationDataPlugin;
use Spryker\Zed\CmsSlotBlockStorage\Communication\Plugin\Synchronization\CmsSlotBlockSynchronizationDataBulkPlugin;
use Spryker\Zed\CmsSlotStorage\Communication\Plugin\Synchronization\CmsSlotSynchronizationDataBulkPlugin;
use Spryker\Zed\CmsStorage\Communication\Plugin\Synchronization\CmsSynchronizationDataPlugin;
use Spryker\Zed\ContentStorage\Communication\Plugin\Synchronization\ContentStorageSynchronizationDataPlugin;
use Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Synchronization\CustomerAccessSynchronizationDataBulkPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Synchronization\GlossarySynchronizationDataPlugin;
use Spryker\Zed\MerchantOpeningHoursStorage\Communication\Plugin\Synchronization\MerchantOpeningHoursSynchronizationDataBulkPlugin;
use Spryker\Zed\NavigationStorage\Communication\Plugin\Synchronization\NavigationSynchronizationDataPlugin;
use Spryker\Zed\PriceProductStorage\Communication\Plugin\Synchronization\PriceProductAbstractSynchronizationDataPlugin;
use Spryker\Zed\PriceProductStorage\Communication\Plugin\Synchronization\PriceProductConcreteSynchronizationDataPlugin;
use Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Synchronization\ProductAlternativeSynchronizationDataBulkPlugin;
use Spryker\Zed\ProductAlternativeStorage\Communication\Plugin\Synchronization\ProductReplacementForSynchronizationDataBulkPlugin;
use Spryker\Zed\ProductCategoryFilterStorage\Communication\Plugin\Synchronization\ProductCategoryFilterSynchronizationDataPlugin;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Synchronization\ProductCategorySynchronizationDataPlugin;
use Spryker\Zed\ProductDiscontinuedStorage\Communication\Plugin\Synchronization\ProductDiscontinuedSynchronizationDataBulkPlugin;
use Spryker\Zed\ProductImageStorage\Communication\Plugin\Synchronization\ProductAbstractImageSynchronizationDataPlugin;
use Spryker\Zed\ProductImageStorage\Communication\Plugin\Synchronization\ProductConcreteImageSynchronizationDataPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Synchronization\ProductAbstractLabelSynchronizationDataPlugin;
use Spryker\Zed\ProductLabelStorage\Communication\Plugin\Synchronization\ProductLabelDictionarySynchronizationDataPlugin;
use Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Synchronization\ProductConcreteMeasurementUnitSynchronizationDataBulkPlugin;
use Spryker\Zed\ProductMeasurementUnitStorage\Communication\Plugin\Synchronization\ProductMeasurementUnitSynchronizationDataBulkPlugin;
use Spryker\Zed\ProductOptionStorage\Communication\Plugin\Synchronization\ProductOptionSynchronizationDataPlugin;
use Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Synchronization\ProductPackagingUnitSynchronizationDataBulkPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\Synchronization\ProductConcretePageSynchronizationDataBulkPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\Synchronization\ProductPageSynchronizationDataPlugin;
use Spryker\Zed\ProductQuantityStorage\Communication\Plugin\Synchronization\ProductQuantitySynchronizationDataBulkPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Synchronization\ProductRelationSynchronizationDataPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Synchronization\ProductRelationSynchronizationDataRepositoryPlugin;
use Spryker\Zed\ProductSearchConfigStorage\Communication\Plugin\Synchronization\ProductSearchConfigSynchronizationDataPlugin;
use Spryker\Zed\ProductSetPageSearch\Communication\Plugin\Synchronization\ProductSetSynchronizationDataPlugin as ProductSetSearchSynchronizationDataPlugin;
use Spryker\Zed\ProductSetStorage\Communication\Plugin\Synchronization\ProductSetSynchronizationDataPlugin;
use Spryker\Zed\ProductStorage\Communication\Plugin\Synchronization\ProductAbstractSynchronizationDataPlugin;
use Spryker\Zed\ProductStorage\Communication\Plugin\Synchronization\ProductConcreteSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;
use Spryker\Zed\TaxProductStorage\Communication\Plugin\Synchronization\TaxProductSynchronizationDataPlugin;
use Spryker\Zed\TaxStorage\Communication\Plugin\Synchronization\TaxSynchronizationDataPlugin;
use Spryker\Zed\UrlStorage\Communication\Plugin\Synchronization\UrlRedirectSynchronizationDataPlugin;
use Spryker\Zed\UrlStorage\Communication\Plugin\Synchronization\UrlSynchronizationDataPlugin;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new CategoryPageSynchronizationDataPlugin(),
            new ProductPageSynchronizationDataPlugin(),
            new ProductSetSearchSynchronizationDataPlugin(),
            new AvailabilitySynchronizationDataPlugin(),
            new CategoryTreeSynchronizationDataPlugin(),
            new CategoryNodeSynchronizationDataPlugin(),
            new CmsBlockSynchronizationDataPlugin(),
            new CmsSynchronizationDataPlugin(),
            new NavigationSynchronizationDataPlugin(),
            new GlossarySynchronizationDataPlugin(),
            new PriceProductConcreteSynchronizationDataPlugin(),
            new PriceProductAbstractSynchronizationDataPlugin(),
            new ProductCategoryFilterSynchronizationDataPlugin(),
            new ProductCategorySynchronizationDataPlugin(),
            new ProductAbstractImageSynchronizationDataPlugin(),
            new ProductConcreteImageSynchronizationDataPlugin(),
            new CategoryImageSynchronizationDataBulkPlugin(),
            new ProductAbstractLabelSynchronizationDataPlugin(),
            new ProductLabelDictionarySynchronizationDataPlugin(),
            new ProductQuantitySynchronizationDataBulkPlugin(),
            new ProductOptionSynchronizationDataPlugin(),
            new ProductRelationSynchronizationDataPlugin(),
            new ProductSearchConfigSynchronizationDataPlugin(),
            new ProductSetSynchronizationDataPlugin(),
            new ProductConcreteSynchronizationDataPlugin(),
            new ProductAbstractSynchronizationDataPlugin(),
            new UrlRedirectSynchronizationDataPlugin(),
            new UrlSynchronizationDataPlugin(),
            new ProductDiscontinuedSynchronizationDataBulkPlugin(),
            new CustomerAccessSynchronizationDataBulkPlugin(),
            new ProductConcretePageSynchronizationDataBulkPlugin(),
            new ContentStorageSynchronizationDataPlugin(),
            new ProductAlternativeSynchronizationDataBulkPlugin(),
            new ProductReplacementForSynchronizationDataBulkPlugin(),
            new TaxProductSynchronizationDataPlugin(),
            new TaxSynchronizationDataPlugin(),
            new CmsSlotSynchronizationDataBulkPlugin(),
            new CmsSlotBlockSynchronizationDataBulkPlugin(),
            new MerchantOpeningHoursSynchronizationDataBulkPlugin(),
            new MerchantSynchronizationDataBulkPlugin(),
            new ShipmentSynchronizationDataBulkPlugin(),

            new ProductMeasurementUnitSynchronizationDataBulkPlugin(),
            new ProductConcreteMeasurementUnitSynchronizationDataBulkPlugin(),

            new ProductPackagingUnitSynchronizationDataBulkPlugin(),
            new ProductRelationSynchronizationDataRepositoryPlugin(),
        ];
    }
}
