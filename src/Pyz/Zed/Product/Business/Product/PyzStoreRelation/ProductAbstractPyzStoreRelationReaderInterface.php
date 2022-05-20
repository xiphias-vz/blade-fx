<?php

namespace Pyz\Zed\Product\Business\Product\PyzStoreRelation;

use Generated\Shared\Transfer\StoreRelationTransfer;

interface ProductAbstractPyzStoreRelationReaderInterface
{
    /**
     * @param \Generated\Shared\Transfer\StoreRelationTransfer $storeRelationTransfer
     *
     * @return \Generated\Shared\Transfer\StoreRelationTransfer
     */
    public function getStoreRelation(StoreRelationTransfer $storeRelationTransfer):StoreRelationTransfer;
}
