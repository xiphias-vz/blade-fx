<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cart\Business\Model;

use Generated\Shared\Transfer\ProductAvailabilityTransfer;
use Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer;
use Spryker\Zed\AvailabilityCartConnector\Dependency\Facade\AvailabilityCartConnectorToAvailabilityInterface;

class ProductAvailability
{
    /**
     * @var \Spryker\Zed\AvailabilityCartConnector\Dependency\Facade\AvailabilityCartConnectorToAvailabilityInterface
     */
    protected $availabilityFacade;

    /**
     * @param \Spryker\Zed\AvailabilityCartConnector\Dependency\Facade\AvailabilityCartConnectorToAvailabilityInterface $availabilityFacade
     */
    public function __construct(AvailabilityCartConnectorToAvailabilityInterface $availabilityFacade)
    {
        $this->availabilityFacade = $availabilityFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductAvailabilityTransfer $productAvailabilityTransfer
     *
     * @return \Generated\Shared\Transfer\ProductConcreteAvailabilityTransfer
     */
    public function checkAvailabilityOfProduct(ProductAvailabilityTransfer $productAvailabilityTransfer): ProductConcreteAvailabilityTransfer
    {
        $sku = $productAvailabilityTransfer->getProductSku();
        $storeTransfer = $productAvailabilityTransfer->getStore();

        return $this->availabilityFacade->findOrCreateProductConcreteAvailabilityBySkuForStore(
            $sku,
            $storeTransfer,
            null
        );
    }
}
