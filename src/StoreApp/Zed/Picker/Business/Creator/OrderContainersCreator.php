<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Creator;

use Generated\Shared\Transfer\OrderContainerCollectionTransfer;
use Pyz\Zed\OrderContainer\Business\OrderContainerFacadeInterface;

class OrderContainersCreator implements OrderContainersCreatorInterface
{
    /**
     * @var \Pyz\Zed\OrderContainer\Business\OrderContainerFacadeInterface
     */
    private $orderContainerFacade;

    /**
     * @param \Pyz\Zed\OrderContainer\Business\OrderContainerFacadeInterface $orderContainerFacade
     */
    public function __construct(OrderContainerFacadeInterface $orderContainerFacade)
    {
        $this->orderContainerFacade = $orderContainerFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderContainerCollectionTransfer $orderContainerCollectionTransfer
     *
     * @return void
     */
    public function createOrderContainers(OrderContainerCollectionTransfer $orderContainerCollectionTransfer): void
    {
        $this->orderContainerFacade->createOrderContainers($orderContainerCollectionTransfer);
    }
}
