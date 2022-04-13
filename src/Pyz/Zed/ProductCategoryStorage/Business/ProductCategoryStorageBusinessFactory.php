<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCategoryStorage\Business;

use Pyz\Zed\ProductCategoryStorage\Business\Storage\ProductCategoryStorageWriter;
use Spryker\Zed\ProductCategoryStorage\Business\ProductCategoryStorageBusinessFactory as ExtendProductCategoryStorageBusinessFactory;

///**
// * @method \Spryker\Zed\ProductCategoryStorage\ProductCategoryStorageConfig getConfig()
// * @method \Spryker\Zed\ProductCategoryStorage\Persistence\ProductCategoryStorageQueryContainerInterface getQueryContainer()
// */
class ProductCategoryStorageBusinessFactory extends ExtendProductCategoryStorageBusinessFactory
{
    /**
     * @return \Spryker\Zed\ProductCategoryStorage\Business\Storage\ProductCategoryStorageWriterInterface
     */
    public function createProductCategoryStorageWriter()
    {
        return new ProductCategoryStorageWriter(
            $this->getCategoryFacade(),
            $this->getQueryContainer(),
            $this->getConfig()->isSendingToQueue()
        );
    }
}
