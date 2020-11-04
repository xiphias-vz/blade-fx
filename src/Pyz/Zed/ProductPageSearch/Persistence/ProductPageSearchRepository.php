<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch\Persistence;

use Spryker\Zed\ProductPageSearch\Persistence\ProductPageSearchRepository as SprykerProductPageSearchRepository;

/**
 * @method \Pyz\Zed\ProductPageSearch\Persistence\ProductPageSearchPersistenceFactory getFactory()
 */
class ProductPageSearchRepository extends SprykerProductPageSearchRepository
{
    /**
     * @param int[] $productIds
     *
     * @return \Generated\Shared\Transfer\ProductConcretePageSearchTransfer[]
     */
    public function getProductConcretePageSearchTransfers(array $productIds): array
    {
        $productConcretePageSearchEntities = $this->getFactory()
            ->getProductConcretePageSearchJoinProductQuery()
            ->filterByFkProduct_In($productIds)
            ->find();

        return $this->mapProductConcretePageSearchEntities(
            $productConcretePageSearchEntities
        );
    }
}
