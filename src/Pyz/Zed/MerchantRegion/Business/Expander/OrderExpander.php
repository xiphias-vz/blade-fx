<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantRegion\Business\Expander;

use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Zed\MerchantRegion\Persistence\MerchantRegionRepositoryInterface;

class OrderExpander
{
    /**
     * @var \Pyz\Zed\MerchantRegion\Persistence\MerchantRegionRepositoryInterface
     */
    private $repository;

    /**
     * @param \Pyz\Zed\MerchantRegion\Persistence\MerchantRegionRepositoryInterface $repository
     */
    public function __construct(MerchantRegionRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function expandOrderWithMerchantRegion(OrderTransfer $orderTransfer): OrderTransfer
    {
        if ($orderTransfer->getMerchantRegionNumber()) {
            $orderTransfer->setMerchantRegion(
                $this->repository->getMerchantRegionByRegionNumber($orderTransfer->getMerchantRegionNumber())
            );
        }

        return $orderTransfer;
    }
}
