<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImportCZ\Business\Model\ProductConcrete;

use Orm\Zed\ProductImage\Persistence\SpyProductImage;
use Orm\Zed\ProductImage\Persistence\SpyProductImageQuery;
use Orm\Zed\ProductImage\Persistence\SpyProductImageSetToProductImageQuery;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Model\ProductConcrete\ProductConcreteWriter as PyzProductConcreteWriter;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductConcreteWriter extends PyzProductConcreteWriter
{
    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        parent::execute($dataSet);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function importProductPlaceholderImage(DataSetInterface $dataSet)
    {
        foreach (Store::getInstance()->getLocales() as $localeKey => $localeName) {
            $productImageSetEntity = $this->findOrCreateImageSet($dataSet, $localeName);
            SpyProductImageSetToProductImageQuery::create()->findByFkProductImageSet($productImageSetEntity->getIdProductImageSet())->delete();
            $images = explode(';', $dataSet[ProductConfig::KEY_MAIN_IMAGE_FILE_NAME]);
            foreach ($images as $key => $image) {
                if (!empty($image)) {
                    $imageUrl = $this->dataImportConfig->getImagesHostUrl() . $image;
                    $productImageEntity = $this->findOrCreateImage($imageUrl);
                    $this->updateOrCreateImageToImageSetRelation($productImageSetEntity, $productImageEntity, $key);
                }
            }
            $this->addImagePublishEvents($productImageSetEntity);
        }
    }

    /**
     * @param string $imageUrl
     *
     * @return \Orm\Zed\ProductImage\Persistence\SpyProductImage
     */
    protected function findOrCreateImage(string $imageUrl): SpyProductImage
    {
        $productImageEntity = SpyProductImageQuery::create()
            ->filterByExternalUrlLarge($imageUrl)
            ->findOneOrCreate();

        $productImageEntity->setExternalUrlSmall($imageUrl);

        if ($productImageEntity->isNew() || $productImageEntity->isModified()) {
            $productImageEntity->save();
        }

        return $productImageEntity;
    }
}
