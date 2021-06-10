<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Persistence;

use Generated\Shared\Transfer\MerchantTransfer;
use Orm\Zed\Product\Persistence\SpyProduct;
use Orm\Zed\Product\Persistence\SpyProductQuery;
use Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\CashierOrderExport\Persistence\CashierOrderExportPersistenceFactory getFactory()
 */
class CashierOrderExportRepository extends AbstractRepository implements CashierOrderExportRepositoryInterface
{
    /**
     * @param string $productConcreteSku
     *
     * @throws \Spryker\Zed\ProductMeasurementUnitDataImport\Business\Exception\EntityNotFoundException
     *
     * @return \Orm\Zed\Product\Persistence\SpyProduct
     */
    public function getProductBySku($productConcreteSku): SpyProduct
    {
        $spyProductEntity = SpyProductQuery::create()
            ->findOneBySku($productConcreteSku);

        if (!$spyProductEntity) {
            throw new EntityNotFoundException(
                sprintf('Product concrete with SKU "%s" was not found during import.', $productConcreteSku)
            );
        }

        return $spyProductEntity;
    }

    /**
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer|null
     */
    public function findMerchantByMerchantReference(string $merchantReference): ?MerchantTransfer
    {
        $merchantEntity = $this->getFactory()->createMerchantQuery()
            ->filterByMerchantReference($merchantReference)
            ->findOne();

        if ($merchantEntity !== null) {
            return (new MerchantTransfer())->fromArray($merchantEntity->toArray(), true);
        }

        return null;
    }
}
