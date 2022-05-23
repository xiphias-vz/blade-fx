<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product\Business\Product\PyzStoreRelation;

use ArrayObject;
use Generated\Shared\Transfer\StoreRelationTransfer;
use Generated\Shared\Transfer\StoreTransfer;
use Pyz\Zed\Product\Persistence\ProductQueryContainerInterface;

class ProductAbstractPyzStoreRelationReader implements ProductAbstractPyzStoreRelationReaderInterface
{
    /**
     * @var \Pyz\Zed\Product\Persistence\ProductQueryContainerInterface
     */
    protected $productQueryContainer;

    /**
     * @param \Pyz\Zed\Product\Persistence\ProductQueryContainerInterface $productQueryContainer
     */
    public function __construct(ProductQueryContainerInterface $productQueryContainer)
    {
        $this->productQueryContainer = $productQueryContainer;
    }

    /**
     * @param \Generated\Shared\Transfer\StoreRelationTransfer $storeRelationTransfer
     *
     * @return \Generated\Shared\Transfer\StoreRelationTransfer
     */
    public function getStoreRelation(StoreRelationTransfer $storeRelationTransfer): StoreRelationTransfer
    {
        $storeRelationTransfer->requireIdEntity();

        $storeTransferCollection = $this->getRelatedStores($storeRelationTransfer->getIdEntity());
        $idStores = $this->getIdStores($storeTransferCollection);

        $storeRelationTransfer
            ->setStores($storeTransferCollection)
            ->setIdStores($idStores);

        return $storeRelationTransfer;
    }

    /**
     * @param int $idProductAbstract
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\StoreTransfer[]
     */
    protected function getRelatedStores($idProductAbstract)
    {
        $productAbstractStoreCollection = $this->productQueryContainer
            ->queryProductAbstractPyzStoreWithStoresByFkProductAbstract($idProductAbstract)
            ->find();

        $relatedStores = new ArrayObject();
        foreach ($productAbstractStoreCollection as $productAbstractStoreEntity) {
            $relatedStores->append(
                (new StoreTransfer())
                    ->fromArray(
                        $productAbstractStoreEntity->getSpyStore()->toArray(),
                        true
                    )
            );
        }

        return $relatedStores;
    }

    /**
     * @param \ArrayObject|\Generated\Shared\Transfer\StoreTransfer[] $storeTransferCollection
     *
     * @return int[]
     */
    protected function getIdStores(ArrayObject $storeTransferCollection)
    {
        return array_map(function (StoreTransfer $storeTransfer) {
            return $storeTransfer->getIdStore();
        }, $storeTransferCollection->getArrayCopy());
    }
}
