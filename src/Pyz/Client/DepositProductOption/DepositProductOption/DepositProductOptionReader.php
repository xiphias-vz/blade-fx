<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\DepositProductOption\DepositProductOption;

use Generated\Shared\Transfer\ProductAbstractOptionStorageTransfer;
use Generated\Shared\Transfer\ProductOptionGroupStorageTransfer;
use Generated\Shared\Transfer\ProductViewTransfer;
use Spryker\Client\ProductOptionStorage\ProductOptionStorageClientInterface;

class DepositProductOptionReader implements DepositProductOptionReaderInterface
{
    protected const PRODUCT_GROUP_DEPOSIT = 'product.option.group.name.deposit';

    /**
     * @var \Spryker\Client\ProductOptionStorage\ProductOptionStorageClientInterface
     */
    protected $productOptionStorageClient;

    /**
     * @param \Spryker\Client\ProductOptionStorage\ProductOptionStorageClientInterface $productOptionStorageClient
     */
    public function __construct(ProductOptionStorageClientInterface $productOptionStorageClient)
    {
        $this->productOptionStorageClient = $productOptionStorageClient;
    }

    /**
     * @param int $idProductAbstract
     * @param \Generated\Shared\Transfer\ProductViewTransfer|null $productViewTransfer
     *
     * @return array
     */
    public function getDepositProductOptionsByIdProductAbstract(int $idProductAbstract, ?ProductViewTransfer $productViewTransfer): array
    {
        $options = [];

        if (!$idProductAbstract) {
            return $options;
        }

        $productAbstractOptionStorageTransfer = $this->productOptionStorageClient->getProductOptionsForCurrentStore($idProductAbstract);
        $productAbstractOptionStorageTransfer = $this->getFilteredProductOptions($productViewTransfer, $productAbstractOptionStorageTransfer);

        if ($productAbstractOptionStorageTransfer === null
            || $productAbstractOptionStorageTransfer->getProductOptionGroups()->count() === 0
        ) {
            return $options;
        }

        foreach ($productAbstractOptionStorageTransfer->getProductOptionGroups() as $productOptionGroupStorageTransfer) {
            if (strpos($productOptionGroupStorageTransfer->getName(), static::PRODUCT_GROUP_DEPOSIT) === 0) {
                $options[] = $productOptionGroupStorageTransfer->getProductOptionValues()[0]->getIdProductOptionValue();
            }
        }

        return $options;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     * @param \Generated\Shared\Transfer\ProductAbstractOptionStorageTransfer|null $productAbstractOptionStorageTransfer
     *
     * @return \Generated\Shared\Transfer\ProductAbstractOptionStorageTransfer|null
     */
    protected function getFilteredProductOptions(
        ProductViewTransfer $productViewTransfer,
        ?ProductAbstractOptionStorageTransfer $productAbstractOptionStorageTransfer = null
    ) {
        if (!$productAbstractOptionStorageTransfer) {
            return null;
        }

        $productAttributes = $productViewTransfer['attributes'];
        $currentProductOptionSkuPfand1 = 'OP_product_deposit_' .
            $productAttributes['pfand_1_sapnumber'] . '_' .
            $productAttributes['pfand_1_plu'] . '_' .
            $productAttributes['pfand_1_count'];

        $currentProductOptionSkuPfand2 = null;

        if (isset($productAttributes['pfand_2_plu'])) {
            $currentProductOptionSkuPfand2 = 'OP_product_deposit_' .
                $productAttributes['pfand_2_sapnumber'] . '_' .
                $productAttributes['pfand_2_plu'] . '_' .
                $productAttributes['pfand_2_count'];
        }

        $filteredProductAbstractOptionStorageTransfer = new ProductAbstractOptionStorageTransfer();

        foreach ($productAbstractOptionStorageTransfer->getProductOptionGroups() as $productOptionGroup) {
            $filteredProductOptionGroup = new ProductOptionGroupStorageTransfer();
            $filteredProductOptionGroup->setName($productOptionGroup->getName());

            foreach ($productOptionGroup->getProductOptionValues() as $productOptionValue) {
                if ($productOptionValue->getSku() === $currentProductOptionSkuPfand1) {
                    $filteredProductOptionGroup->addProductOptionValue($productOptionValue);
                }

                if ($productOptionValue->getSku() === $currentProductOptionSkuPfand2) {
                    $filteredProductOptionGroup->addProductOptionValue($productOptionValue);
                }
            }
            $filteredProductAbstractOptionStorageTransfer->addProductOptionGroup($filteredProductOptionGroup);
        }

        return $filteredProductAbstractOptionStorageTransfer;
    }
}
