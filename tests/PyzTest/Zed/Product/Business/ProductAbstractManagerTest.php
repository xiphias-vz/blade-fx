<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace PyzTest\Zed\Product\Business;

use Generated\Shared\Transfer\PriceProductTransfer;
use Generated\Shared\Transfer\ProductAbstractTransfer;
use Generated\Shared\Transfer\ProductImageSetTransfer;
use Generated\Shared\Transfer\ProductImageTransfer;

/**
 * Auto-generated group annotations
 *
 * @group PyzTest
 * @group Zed
 * @group Product
 * @group Business
 * @group ProductAbstractManagerTest
 * Add your own group annotations below this line
 */
class ProductAbstractManagerTest extends ProductTestAbstract
{
    /**
     * @return void
     */
    public function testCreateProductAbstractShouldCreateProductAbstractAndTriggerPlugins()
    {
        $this->markTestSkipped('Test needs to be fixed.');

        $idProductAbstract = $this->productAbstractManager->createProductAbstract($this->productAbstractTransfer);

        $this->assertTrue($idProductAbstract > 0);
        $this->productAbstractTransfer->setIdProductAbstract($idProductAbstract);
        $this->assertCreateProductAbstract($this->productAbstractTransfer);
    }

    /**
     * @return void
     */
    public function testSaveProductAbstractShouldUpdateProductAbstractAndTriggerPlugins()
    {
        $this->markTestSkipped('Test needs to be fixed.');

        $idProductAbstract = $this->productAbstractManager->createProductAbstract($this->productAbstractTransfer);
        $this->productAbstractTransfer->setIdProductAbstract($idProductAbstract);

        foreach ($this->productAbstractTransfer->getLocalizedAttributes() as $localizedAttribute) {
            $localizedAttribute->setName(
                self::UPDATED_PRODUCT_ABSTRACT_NAME[$localizedAttribute->getLocale()->getLocaleName()]
            );
        }

        $idProductAbstract = $this->productAbstractManager->saveProductAbstract($this->productAbstractTransfer);

        $this->productAbstractTransfer->setIdProductAbstract($idProductAbstract);
        $this->assertSaveProductAbstract($this->productAbstractTransfer);
    }

    /**
     * @return void
     */
    public function testGetProductAbstractByIdShouldReturnFullyLoadedTransferObject()
    {
        $this->markTestSkipped('Test needs to be fixed.');

        $this->setupDefaultProducts();

        $productAbstract = $this->productAbstractManager->findProductAbstractById(
            $this->productAbstractTransfer->getIdProductAbstract()
        );

        $this->assertReadProductAbstract($productAbstract);
    }

    /**
     * @param \Generated\Shared\Transfer\ProductAbstractTransfer $productAbstractTransfer
     *
     * @return void
     */
    protected function assertCreateProductAbstract(ProductAbstractTransfer $productAbstractTransfer)
    {
        $createdProductEntity = $this->productQueryContainer
            ->queryProductAbstract()
            ->filterByIdProductAbstract($productAbstractTransfer->getIdProductAbstract())
            ->findOne();

        $this->assertNotNull($createdProductEntity);

        $this->assertEquals($productAbstractTransfer->getSku(), $createdProductEntity->getSku());
    }

    /**
     * @param \Generated\Shared\Transfer\ProductAbstractTransfer $productAbstractTransfer
     *
     * @return void
     */
    protected function assertSaveProductAbstract(ProductAbstractTransfer $productAbstractTransfer)
    {
        $updatedProductEntity = $this->productQueryContainer
            ->queryProductAbstract()
            ->filterByIdProductAbstract($productAbstractTransfer->getIdProductAbstract())
            ->findOne();

        $this->assertNotNull($updatedProductEntity);
        $this->assertEquals($this->productAbstractTransfer->getSku(), $updatedProductEntity->getSku());

        foreach ($productAbstractTransfer->getLocalizedAttributes() as $localizedAttribute) {
            $expectedProductName = self::UPDATED_PRODUCT_ABSTRACT_NAME[$localizedAttribute->getLocale()->getLocaleName()];

            $this->assertEquals($expectedProductName, $localizedAttribute->getName());
        }
    }

    /**
     * @param \Generated\Shared\Transfer\ProductAbstractTransfer $productAbstractTransfer
     *
     * @return void
     */
    protected function assertReadProductAbstract(ProductAbstractTransfer $productAbstractTransfer)
    {
        $this->assertProductPrice($productAbstractTransfer);
        $this->assertProductImages($productAbstractTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\ProductAbstractTransfer $productAbstractTransfer
     *
     * @return void
     */
    protected function assertProductPrice(ProductAbstractTransfer $productAbstractTransfer)
    {
        foreach ($productAbstractTransfer->getPrices() as $priceProductTransfer) {
            $this->assertInstanceOf(PriceProductTransfer::class, $priceProductTransfer);
            $this->assertNotNull($priceProductTransfer->getMoneyValue()->getGrossAmount());
            $this->assertNotNull($priceProductTransfer->getPriceTypeName());
        }
    }

    /**
     * @param \Generated\Shared\Transfer\ProductAbstractTransfer $productAbstractTransfer
     *
     * @return void
     */
    protected function assertProductImages(ProductAbstractTransfer $productAbstractTransfer)
    {
        /** @var \Generated\Shared\Transfer\ProductImageSetTransfer $imageSet */
        $imageSetCollection = (array)$productAbstractTransfer->getImageSets();
        $this->assertNotEmpty($imageSetCollection);
        $imageSet = $imageSetCollection[0];
        $this->assertInstanceOf(ProductImageSetTransfer::class, $imageSet);
        $this->assertNotNull($imageSet->getIdProductImageSet());
        $this->assertEquals($productAbstractTransfer->getIdProductAbstract(), $imageSet->getIdProductAbstract());

        $productImageCollection = (array)$imageSet->getProductImages();
        $this->assertNotEmpty($imageSetCollection);

        /** @var \Generated\Shared\Transfer\ProductImageTransfer $productImage */
        $productImage = $productImageCollection[0];
        $this->assertInstanceOf(ProductImageTransfer::class, $productImage);
        $this->assertEquals(self::IMAGE_URL_LARGE, $productImage->getExternalUrlLarge());
        $this->assertEquals(self::IMAGE_URL_SMALL, $productImage->getExternalUrlSmall());
    }
}
