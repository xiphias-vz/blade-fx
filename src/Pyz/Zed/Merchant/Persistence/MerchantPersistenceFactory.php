<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Persistence;

use Pyz\Zed\Merchant\Persistence\Propel\Mapper\MerchantMapper;
use Pyz\Zed\Merchant\Persistence\Propel\Mapper\MerchantMapperInterface;
use Spryker\Zed\Merchant\Persistence\MerchantPersistenceFactory as SprykerMerchantPersistenceFactory;

class MerchantPersistenceFactory extends SprykerMerchantPersistenceFactory
{
    /**
     * @return \Pyz\Zed\Merchant\Persistence\Propel\Mapper\MerchantMapperInterface
     */
    public function pyzCreatePropelMerchantMapper(): MerchantMapperInterface
    {
        return new MerchantMapper();
    }
}
