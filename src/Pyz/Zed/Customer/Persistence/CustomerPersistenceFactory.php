<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Persistence;

use Orm\Zed\PostalCode\Persistence\PyzPostalCodeQuery;
use Spryker\Zed\Customer\Persistence\CustomerPersistenceFactory as SprykerCustomerPersistenceFactory;

class CustomerPersistenceFactory extends SprykerCustomerPersistenceFactory
{
    /**
     * @return \Orm\Zed\PostalCode\Persistence\PyzPostalCodeQuery
     */
    public function createPostalCodeQuery(): PyzPostalCodeQuery
    {
        return PyzPostalCodeQuery::create();
    }
}
