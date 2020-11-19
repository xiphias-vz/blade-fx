<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OrderContainer\Business;

use Pyz\Zed\OrderContainer\Business\Writer\OrderContainerWriter;
use Pyz\Zed\OrderContainer\Business\Writer\OrderContainerWriterInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\OrderContainer\Persistence\OrderContainerEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\OrderContainer\OrderContainerConfig getConfig()
 */
class OrderContainerBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\OrderContainer\Business\Writer\OrderContainerWriterInterface
     */
    public function createOrderContainerWriter(): OrderContainerWriterInterface
    {
        return new OrderContainerWriter($this->getEntityManager());
    }
}
