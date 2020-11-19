<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OrderContainer\Persistence;

use Pyz\Zed\OrderContainer\Persistence\Propel\Mapper\OrderContainerMapper;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\OrderContainer\Persistence\OrderContainerEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\OrderContainer\OrderContainerConfig getConfig()
 */
class OrderContainerPersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Pyz\Zed\OrderContainer\Persistence\Propel\Mapper\OrderContainerMapper
     */
    public function createOrderContainerMapper(): OrderContainerMapper
    {
        return new OrderContainerMapper();
    }
}
