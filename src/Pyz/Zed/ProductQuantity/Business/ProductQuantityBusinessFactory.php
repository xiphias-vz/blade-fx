<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantity\Business;

use Pyz\Zed\ProductQuantity\Business\Model\Validator\ProductQuantityRestrictionValidator;
use Pyz\Zed\ProductQuantity\Business\Model\Writer\ProductQuantityWriter;
use Pyz\Zed\ProductQuantity\Business\Model\Writer\ProductQuantityWriterInterface;
use Spryker\Zed\ProductQuantity\Business\Model\Validator\ProductQuantityRestrictionValidatorInterface as SprykerProductQuantityRestrictionValidatorInterface;
use Spryker\Zed\ProductQuantity\Business\ProductQuantityBusinessFactory as SprykerProductQuantityBusinessFactory;

/**
 * @method \Spryker\Zed\ProductQuantity\ProductQuantityConfig getConfig()
 * @method \Spryker\Zed\ProductQuantity\Persistence\ProductQuantityRepositoryInterface getRepository()
 * @method \Pyz\Zed\ProductQuantity\Persistence\ProductQuantityEntityManagerInterface getEntityManager()
 */
class ProductQuantityBusinessFactory extends SprykerProductQuantityBusinessFactory
{
    /**
     * @return \Pyz\Zed\ProductQuantity\Business\Model\Writer\ProductQuantityWriterInterface
     */
    public function createProductQuantityWriter(): ProductQuantityWriterInterface
    {
        return new ProductQuantityWriter(
            $this->getEntityManager()
        );
    }

    /**
     * @return \Spryker\Zed\ProductQuantity\Business\Model\Validator\ProductQuantityRestrictionValidatorInterface
     */
    public function createProductQuantityRestrictionValidator(): SprykerProductQuantityRestrictionValidatorInterface
    {
        return new ProductQuantityRestrictionValidator($this->createProductQuantityReader());
    }
}
