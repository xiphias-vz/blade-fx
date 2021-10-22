<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\OrderDetailCZ;

use Pyz\Client\OrderDetail\Model\OrderDetailModelInterface;
use Pyz\Client\OrderDetail\OrderDetailFactory as IntOrderDetailFactory;
use Pyz\Client\OrderDetailCZ\Model\OrderDetailModel;

/**
 * @method \Pyz\Client\OrderDetail\OrderDetailConfig getConfig()
 */
class OrderDetailFactory extends IntOrderDetailFactory
{
    /**
     * @return \Pyz\Client\OrderDetail\Model\OrderDetailModelInterface
     */
    public function createOrderDetailModel(): OrderDetailModelInterface
    {
        return new OrderDetailModel(
            $this->getSalesClient(),
            $this->getCustomerClient(),
            $this->getDateTimeWithZoneService(),
            $this->getConfig()
        );
    }
}
