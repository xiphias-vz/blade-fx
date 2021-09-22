<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MerchantSearch;

use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\MerchantSearch\MerchantSearchFactory getFactory()
 */
class MerchantSearchClient extends AbstractClient implements MerchantSearchClientInterface
{
    /**
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer
     */
    public function getActiveMerchants(): MerchantCollectionTransfer
    {
        return $this->getFactory()->getMerchantStorageClient()->getMerchantsList();
    }
}
