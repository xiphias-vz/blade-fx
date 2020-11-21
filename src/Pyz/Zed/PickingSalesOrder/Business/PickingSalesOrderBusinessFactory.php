<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingSalesOrder\Business;

use Pyz\Zed\PickingSalesOrder\Business\Writer\PickingSalesOrderWriter;
use Pyz\Zed\PickingSalesOrder\Business\Writer\PickingSalesOrderWriterInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\PickingSalesOrder\PickingSalesOrderConfig getConfig()
 * @method \Pyz\Zed\PickingSalesOrder\Persistence\PickingSalesOrderRepositoryInterface getRepository()
 */
class PickingSalesOrderBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\PickingSalesOrder\Business\Writer\PickingSalesOrderWriterInterface
     */
    public function createPickingSalesOrderWriter(): PickingSalesOrderWriterInterface
    {
        return new PickingSalesOrderWriter(
            $this->getEntityManager(),
            $this->getRepository()
        );
    }
}
