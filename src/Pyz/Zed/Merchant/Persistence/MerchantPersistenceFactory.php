<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Persistence;

use Pyz\Zed\Merchant\Persistence\Propel\Mapper\MerchantMapper;
use Spryker\Zed\Merchant\Persistence\MerchantPersistenceFactory as SprykerMerchantPersistenceFactory;
use Spryker\Zed\Merchant\Persistence\Propel\Mapper\MerchantMapperInterface;

class MerchantPersistenceFactory extends SprykerMerchantPersistenceFactory
{
    /**
     * @return \Spryker\Zed\Merchant\Persistence\Propel\Mapper\MerchantMapperInterface
     */
    public function createPropelMerchantMapper(): MerchantMapperInterface
    {
        return new MerchantMapper();
    }
}
