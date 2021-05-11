<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\StoreSwitcher\Zed;

use Generated\Shared\Transfer\MerchantTransfer;
use Spryker\Client\ZedRequest\ZedRequestClientInterface;

class StoreSwitcherStub implements StoreSwitcherStubInterface
{
    /**
     * @var \Spryker\Client\ZedRequest\ZedRequestClientInterface
     */
    protected $zedRequestClient;

    /**
     * @param \Spryker\Client\ZedRequest\ZedRequestClientInterface $zedRequestClient
     */
    public function __construct(ZedRequestClientInterface $zedRequestClient)
    {
        $this->zedRequestClient = $zedRequestClient;
    }

    /**
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface
     */
    public function getVisibleStores()
    {
        return $this->zedRequestClient->call(
            '/store-switcher-widget/gateway/get-stores',
            new MerchantTransfer()
        );
    }
}
