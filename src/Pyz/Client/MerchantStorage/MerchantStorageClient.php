<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\MerchantStorage;

use Generated\Shared\Transfer\MerchantCollectionTransfer;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\MerchantStorage\MerchantStorageFactory getFactory()
 */
class MerchantStorageClient extends AbstractClient implements MerchantStorageClientInterface
{
    /**
     * @return \Generated\Shared\Transfer\MerchantCollectionTransfer
     */
    public function getMerchantsList(): MerchantCollectionTransfer
    {
        return $this->getFactory()->createMerchantStorageReader()->getMerchants();
    }
}
