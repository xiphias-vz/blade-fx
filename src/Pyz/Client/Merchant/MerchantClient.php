<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Merchant;

use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\Merchant\MerchantFactory getFactory()
 */
class MerchantClient extends AbstractClient implements MerchantClientInterface
{
    /**
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function getMerchant()
    {
        return $this->getFactory()->createMerchantReader()->getCurrentMerchant();
    }
}
