<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\DepositProductOption\DepositProductOption;

use Spryker\Client\ProductOptionStorage\ProductOptionStorageClientInterface;

class DepositProductOptionReader implements DepositProductOptionReaderInterface
{
    protected const PRODUCT_GROUP_DEPOSIT = 'product.option.group.name.deposit_bottle';

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
     *
     * @return array
     */
    public function getDepositProductOptionsByIdProductAbstract(int $idProductAbstract): array
    {
        $options = [];

        if (!$idProductAbstract) {
            return $options;
        }

        $productAbstractOptionStorageTransfer = $this->productOptionStorageClient->getProductOptionsForCurrentStore($idProductAbstract);

        if ($productAbstractOptionStorageTransfer === null
            || $productAbstractOptionStorageTransfer->getProductOptionGroups()->count() === 0
        ) {
            return $options;
        }

        foreach ($productAbstractOptionStorageTransfer->getProductOptionGroups() as $productOptionGroupStorageTransfer) {
            if (strpos($productOptionGroupStorageTransfer->getName(), static::PRODUCT_GROUP_DEPOSIT) === 0) {
                $options[] = $productOptionGroupStorageTransfer->getProductOptionValues()[0]->getIdProductOptionValue();

                break;
            }
        }

        return $options;
    }
}
