<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantRegion\Communication\Plugin\Sales;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface;

/**
 * @method \Pyz\Zed\MerchantRegion\Business\MerchantRegionFacadeInterface getFacade()
 * @method \Pyz\Zed\MerchantRegion\MerchantRegionConfig getConfig()
 */
class MerchantRegionOrderExpanderPlugin extends AbstractPlugin implements OrderExpanderPluginInterface
{
    /**
     * @inheritDoc
     */
    public function hydrate(OrderTransfer $orderTransfer)
    {
        return $this->getFacade()
            ->expandOrderWithMerchantRegion($orderTransfer);
    }
}
