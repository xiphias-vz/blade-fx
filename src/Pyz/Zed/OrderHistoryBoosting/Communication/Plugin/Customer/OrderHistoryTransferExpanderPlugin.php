<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OrderHistoryBoosting\Communication\Plugin\Customer;

use Generated\Shared\Transfer\CustomerTransfer;
use Spryker\Zed\Customer\Dependency\Plugin\CustomerTransferExpanderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\OrderHistoryBoosting\Persistence\OrderHistoryBoostingQueryContainer getQueryContainer()
 */
class OrderHistoryTransferExpanderPlugin extends AbstractPlugin implements CustomerTransferExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    public function expandTransfer(CustomerTransfer $customerTransfer)
    {
        $previouslyBoughtSkus = $this->getQueryContainer()->getPreviouslyBoughtSkusByCustomerReference($customerTransfer->getCustomerReference());
        $customerTransfer->setPreviouslyBoughtSkus($previouslyBoughtSkus);

        return $customerTransfer;
    }
}
