<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductAttribute\Business\Model\Attribute;

use Generated\Shared\Transfer\ProductAttributeKeyTransfer;
use Generated\Shared\Transfer\ProductManagementAttributeTransfer;
use Spryker\Shared\ProductAttribute\Code\KeyBuilder\GlossaryKeyBuilderInterface;
use Spryker\Zed\Product\Persistence\ProductQueryContainerInterface;
use Spryker\Zed\ProductAttribute\Business\Model\Attribute\AttributeValueWriterInterface;
use Spryker\Zed\ProductAttribute\Business\Model\Attribute\AttributeWriter as SprykerAttributeWriter;
use Spryker\Zed\ProductAttribute\Dependency\Facade\ProductAttributeToGlossaryInterface;
use Spryker\Zed\ProductAttribute\Dependency\Facade\ProductAttributeToProductInterface;
use Spryker\Zed\ProductAttribute\Persistence\ProductAttributeQueryContainerInterface;

/**
 * @method \Pyz\Zed\ProductAttribute\Business\ProductAttributeBusinessFactory getFactory()
 */
class AttributeWriter extends SprykerAttributeWriter
{
    /**
     * @var \Spryker\Zed\Product\Persistence\ProductQueryContainerInterface
     */
    protected $productQueryContainer;

    /**
     * @param \Spryker\Zed\Product\Persistence\ProductQueryContainerInterface $productQueryContainer
     */

    /**
     * @param \Spryker\Zed\ProductAttribute\Persistence\ProductAttributeQueryContainerInterface $productAttributeQueryContainer
     * @param \Spryker\Zed\ProductAttribute\Dependency\Facade\ProductAttributeToProductInterface $productFacade
     * @param \Spryker\Zed\ProductAttribute\Dependency\Facade\ProductAttributeToGlossaryInterface $glossaryFacade
     * @param \Spryker\Zed\ProductAttribute\Business\Model\Attribute\AttributeValueWriterInterface $attributeValueWriter
     * @param \Spryker\Shared\ProductAttribute\Code\KeyBuilder\GlossaryKeyBuilderInterface $glossaryKeyBuilder
     * @param \Spryker\Zed\Product\Persistence\ProductQueryContainerInterface $productQueryContainer
     */
    public function __construct(
        ProductAttributeQueryContainerInterface $productAttributeQueryContainer,
        ProductAttributeToProductInterface $productFacade,
        ProductAttributeToGlossaryInterface $glossaryFacade,
        AttributeValueWriterInterface $attributeValueWriter,
        GlossaryKeyBuilderInterface $glossaryKeyBuilder,
        ProductQueryContainerInterface $productQueryContainer
    ) {
        parent::__construct($productAttributeQueryContainer, $productFacade, $glossaryFacade, $attributeValueWriter, $glossaryKeyBuilder);
        $this->productQueryContainer = $productQueryContainer;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductManagementAttributeTransfer $productManagementAttributeTransfer
     *
     * @return \Generated\Shared\Transfer\ProductAttributeKeyTransfer
     */
    protected function findOrCreateProductAttributeKey(ProductManagementAttributeTransfer $productManagementAttributeTransfer)
    {
        if ($this->productFacade->hasProductAttributeKey($productManagementAttributeTransfer->getKey())) {
            $productAttributeKeyTransfer = $this->productFacade->findProductAttributeKey($productManagementAttributeTransfer->getKey());

            $ffExportValue = $productManagementAttributeTransfer->getFfExport();

            $productAttributeKeyTransfer->setFfExport($ffExportValue);

            $this->updateAttributeKey($productAttributeKeyTransfer);

            return $productAttributeKeyTransfer;
        }

        $productAttributeKeyTransfer = new ProductAttributeKeyTransfer();
        $productAttributeKeyTransfer->fromArray($productManagementAttributeTransfer->toArray(), true);
        $productAttributeKeyTransfer = $this->productFacade->createProductAttributeKey($productAttributeKeyTransfer);

        return $productAttributeKeyTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductAttributeKeyTransfer $attributeKeyTransfer
     *
     * @return \Generated\Shared\Transfer\ProductAttributeKeyTransfer
     */
    public function updateAttributeKey(ProductAttributeKeyTransfer $attributeKeyTransfer): ProductAttributeKeyTransfer
    {
        $attributeKeyTransfer->requireIdProductAttributeKey();

        $productAttributeKeyEntity = $this->productQueryContainer
            ->queryProductAttributeKey()
            ->filterByIdProductAttributeKey($attributeKeyTransfer->getIdProductAttributeKey())
            ->findOne();

        $productAttributeKeyEntity->fromArray($attributeKeyTransfer->modifiedToArray());

        $productAttributeKeyEntity->setFfExport($attributeKeyTransfer->getFfExport());

        $productAttributeKeyEntity->save();

        $attributeKeyTransfer->fromArray($productAttributeKeyEntity->toArray(), true);

        return $attributeKeyTransfer;
    }
}
