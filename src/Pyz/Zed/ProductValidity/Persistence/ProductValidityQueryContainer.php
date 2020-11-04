<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductValidity\Persistence;

use Orm\Zed\ProductValidity\Persistence\SpyProductValidityQuery;
use Spryker\Zed\ProductValidity\Persistence\ProductValidityQueryContainer as SprykerProductValidityQueryContainer;
use Spryker\Zed\PropelOrm\Business\Runtime\ActiveQuery\Criteria;

/**
 * @method \Spryker\Zed\ProductValidity\Persistence\ProductValidityPersistenceFactory getFactory()
 */
class ProductValidityQueryContainer extends SprykerProductValidityQueryContainer
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return \Orm\Zed\ProductValidity\Persistence\SpyProductValidityQuery
     */
    public function queryProductsBecomingInvalid(): SpyProductValidityQuery
    {
        return $this
            ->getFactory()
            ->createProductValidityQuery()
            ->filterByValidTo('now', Criteria::LESS_THAN)
            ->_or()
            ->filterByValidFrom('now', Criteria::GREATER_THAN);
    }
}
