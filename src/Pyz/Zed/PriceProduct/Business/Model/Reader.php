<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PriceProduct\Business\Model;

use Generated\Shared\Transfer\PriceProductCriteriaTransfer;
use Generated\Shared\Transfer\PriceProductTransfer;
use Spryker\Zed\PriceProduct\Business\Model\Reader as SprykerReader;

/**
 * Once price resolving bug will be fixed in core the override of resolveProductPriceByPriceProductCriteria should be removed.
 */
class Reader extends SprykerReader
{
    /**
     * @param string $priceProductCriteriaIdentifier
     * @param array $priceProductTransfers
     * @param \Generated\Shared\Transfer\PriceProductCriteriaTransfer $priceProductCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\PriceProductTransfer|null
     */
    protected function resolveProductPriceByPriceProductCriteria(
        string $priceProductCriteriaIdentifier,
        array $priceProductTransfers,
        PriceProductCriteriaTransfer $priceProductCriteriaTransfer
    ): ?PriceProductTransfer {
        static::$resolvedPriceProductTransferCollection[$priceProductCriteriaIdentifier] = $this->priceProductService->resolveProductPriceByPriceProductCriteria(
            $priceProductTransfers[$priceProductCriteriaIdentifier],
            $priceProductCriteriaTransfer
        );

        return static::$resolvedPriceProductTransferCollection[$priceProductCriteriaIdentifier];
    }
}
