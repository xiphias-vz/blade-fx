<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Persistence;

use Spryker\Zed\User\Persistence\UserQueryContainer as SpyUserQueryContainer;

class UserQueryContainer extends SpyUserQueryContainer implements UserQueryContainerInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return \Orm\Zed\User\Persistence\SpyUserQuery
     */
    public function queryUsersByMerchantReference(string $merchantReference)
    {
        $query = $this->getFactory()->createUserQuery();
        $query->filterByMerchantReference($merchantReference);

        return $query;
    }
}
