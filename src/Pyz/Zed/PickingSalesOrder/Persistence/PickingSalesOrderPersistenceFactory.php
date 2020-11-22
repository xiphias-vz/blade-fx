<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Persistence;

use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery;
use Pyz\Zed\PickingSalesOrder\Persistence\Propel\Mapper\PickingSalesOrderMapper;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\PickingSalesOrder\PickingSalesOrderConfig getConfig()
 * @method \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderRepositoryInterface getRepository()
 */
class PickingSalesOrderPersistenceFactory extends AbstractPersistenceFactory
{
    /**
     * @return \Pyz\Zed\PickingSalesOrder\Persistence\Propel\Mapper\PickingSalesOrderMapper
     */
    public function createPickingSalesOrderMapper(): PickingSalesOrderMapper
    {
        return new PickingSalesOrderMapper();
    }

    /**
     * @return \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery
     */
    public function createPickingSalesOrderQuery(): PyzPickingSalesOrderQuery
    {
        return new PyzPickingSalesOrderQuery();
    }
}
