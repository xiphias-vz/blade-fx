<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\ShipmentStorage;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentMethodsCollectionTransfer;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\ShipmentStorage\ShipmentStorageFactory getFactory()
 */
class ShipmentStorageClient extends AbstractClient implements ShipmentStorageClientInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodsCollectionTransfer
     */
    public function getShipmentMethods(QuoteTransfer $quoteTransfer): ShipmentMethodsCollectionTransfer
    {
        return $this->getFactory()->createShipmentStorageReader()->getShipmentMethodsCollectionTransfer($quoteTransfer);
    }
}
