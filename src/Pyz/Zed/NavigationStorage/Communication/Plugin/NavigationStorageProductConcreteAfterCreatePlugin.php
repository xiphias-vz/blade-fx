<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\NavigationStorage\Communication\Plugin;

use Generated\Shared\Transfer\ProductConcreteTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Product\Dependency\Plugin\ProductConcretePluginCreateInterface;

/**
 * @method \Spryker\Zed\NavigationStorage\Business\NavigationStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\NavigationStorage\Communication\NavigationStorageCommunicationFactory getFactory()()
 * @method \Pyz\Zed\NavigationStorage\NavigationStorageConfig getConfig()
 */
class NavigationStorageProductConcreteAfterCreatePlugin extends AbstractPlugin implements ProductConcretePluginCreateInterface
{
    /**
     * @api
     *
     * @param \Generated\Shared\Transfer\ProductConcreteTransfer $productConcreteTransfer
     *
     * @return \Generated\Shared\Transfer\ProductConcreteTransfer
     */
    public function create(ProductConcreteTransfer $productConcreteTransfer): ProductConcreteTransfer
    {
        $this->getFacade()->publish($this->getFactory()->getNavigationFacade()->getMainNavigationIds());

        return $productConcreteTransfer;
    }
}
