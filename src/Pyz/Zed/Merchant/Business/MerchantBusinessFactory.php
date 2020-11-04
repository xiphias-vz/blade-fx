<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Business;

use Pyz\Zed\Merchant\Business\Finder\MerchantFinder;
use Pyz\Zed\Merchant\Business\Finder\MerchantFinderInterface;
use Pyz\Zed\Merchant\Business\Order\OrderExpander;
use Pyz\Zed\Merchant\Business\Order\OrderExpanderInterface;
use Spryker\Zed\Merchant\Business\MerchantBusinessFactory as SprykerMerchantBusinessFactory;

/**
 * @method \Pyz\Zed\Merchant\Persistence\MerchantRepositoryInterface getRepository()
 * @method \Spryker\Zed\Merchant\Persistence\MerchantEntityManagerInterface getEntityManager()
 */
class MerchantBusinessFactory extends SprykerMerchantBusinessFactory
{
    /**
     * @return \Pyz\Zed\Merchant\Business\Finder\MerchantFinderInterface
     */
    public function createMerchantFinder(): MerchantFinderInterface
    {
        return new MerchantFinder(
            $this->createMerchantReader()
        );
    }

    /**
     * @return \Pyz\Zed\Merchant\Business\Order\OrderExpanderInterface
     */
    public function createOrderExpander(): OrderExpanderInterface
    {
        return new OrderExpander(
            $this->getRepository()
        );
    }
}
