<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDocument\Business;

use DateTime;
use Generated\Shared\Transfer\StorePickingListCollectionTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\SalesDocument\Business\SalesDocumentBusinessFactory getFactory()
 */
class SalesDocumentFacade extends AbstractFacade implements SalesDocumentFacadeInterface
{
    /**
     * @param \DateTime $pickingDate
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\StorePickingListCollectionTransfer
     */
    public function generateStorePickingListContent(DateTime $pickingDate, string $merchantReference): StorePickingListCollectionTransfer
    {
        return $this->getFactory()
            ->createStorePickingListContentGenerator()
            ->generate($pickingDate, $merchantReference);
    }
}
