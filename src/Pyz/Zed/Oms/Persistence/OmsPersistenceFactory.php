<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Persistence;

use Pyz\Zed\Oms\Persistence\Propel\Mapper\OrderItemMapper;
use Spryker\Zed\Oms\Persistence\OmsPersistenceFactory as SprykerOmsPersistenceFactory;
use Spryker\Zed\Oms\Persistence\Propel\Mapper\OrderItemMapperInterface;

class OmsPersistenceFactory extends SprykerOmsPersistenceFactory
{
    /**
     * @return \Spryker\Zed\Oms\Persistence\Propel\Mapper\OrderItemMapperInterface
     */
    public function createOrderItemMapper(): OrderItemMapperInterface
    {
        return new OrderItemMapper();
    }
}
