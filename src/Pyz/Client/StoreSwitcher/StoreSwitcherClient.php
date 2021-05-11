<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\StoreSwitcher;

use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\StoreSwitcher\StoreSwitcherFactory getFactory();
 */
class StoreSwitcherClient extends AbstractClient implements StoreSwitcherClientInterface
{
    /**
     * @return \Spryker\Shared\Kernel\Transfer\TransferInterface
     */
    public function getVisibleStores()
    {
        return $this->getFactory()->createZedStub()->getVisibleStores();
    }
}
