<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\ProductStorage;

use Generated\Shared\Transfer\ProductStorageCriteriaTransfer;
use Spryker\Client\ProductStorage\ProductStorageClient as SprykerProductStorageClient;

/**
 * @method \Pyz\Client\ProductStorage\ProductStorageFactory getFactory()
 */
class ProductStorageClient extends SprykerProductStorageClient
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param array $data
     * @param string $localeName
     * @param array $selectedAttributes
     * @param \Generated\Shared\Transfer\ProductStorageCriteriaTransfer|null $productStorageCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\ProductViewTransfer
     */
    public function mapProductStorageData(
        array $data,
        $localeName,
        array $selectedAttributes = [],
        ?ProductStorageCriteriaTransfer $productStorageCriteriaTransfer = null
    ) {
        return $this->getFactory()
            ->createProductStorageDataMapper()
            ->mapProductStorageData($localeName, $data, $selectedAttributes, $productStorageCriteriaTransfer);
    }
}
