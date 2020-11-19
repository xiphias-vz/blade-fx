<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\BaseProduct\Hook;

use Orm\Zed\ProductOption\Persistence\SpyProductAbstractProductOptionGroupQuery;
use Pyz\Zed\DataImport\Business\Model\BaseProduct\ProductDepositOptionStep;
use Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportInterface;

class ProductDepositOptionAfterImportHook implements DataImporterAfterImportInterface
{
    /**
     * @return void
     */
    public function afterImport()
    {
        $productAbstractProductOptionGroupCollection = SpyProductAbstractProductOptionGroupQuery::create()
            ->find();

        /** @var \Orm\Zed\ProductOption\Persistence\SpyProductAbstractProductOptionGroup $productAbstractProductOptionGroupItem */
        foreach ($productAbstractProductOptionGroupCollection as $productAbstractProductOptionGroupItem) {
            $key = $productAbstractProductOptionGroupItem->getFkProductAbstract() . '-' . $productAbstractProductOptionGroupItem->getFkProductOptionGroup();

            if (isset(ProductDepositOptionStep::$productAbstractProductOptionBuffer[$key])) {
                continue;
            }

            $productAbstractProductOptionGroupItem->delete();
        }
    }
}
