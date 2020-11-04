<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Business\Order;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SpySalesOrderEntityTransfer;
use Pyz\Zed\Merchant\Persistence\MerchantRepositoryInterface;

class OrderExpander implements OrderExpanderInterface
{
    /**
     * @var \Pyz\Zed\Merchant\Persistence\MerchantRepositoryInterface
     */
    protected $merchantRepository;

    /**
     * @param \Pyz\Zed\Merchant\Persistence\MerchantRepositoryInterface $merchantRepository
     */
    public function __construct(MerchantRepositoryInterface $merchantRepository)
    {
        $this->merchantRepository = $merchantRepository;
    }

    /**
     * @param \Generated\Shared\Transfer\SpySalesOrderEntityTransfer $spySalesOrderEntityTransfer
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\SpySalesOrderEntityTransfer
     */
    public function expandOrderWithMerchant(SpySalesOrderEntityTransfer $spySalesOrderEntityTransfer, QuoteTransfer $quoteTransfer): SpySalesOrderEntityTransfer
    {
        $merchantReference = $quoteTransfer->getMerchantReference();
        $merchantTransfer = $this->merchantRepository->findMerchantByMerchantReference($merchantReference);

        $spySalesOrderEntityTransfer
            ->setMerchantReference($merchantReference)
            ->setMerchantRegionNumber($merchantTransfer->getRegionNumber())
            ->setMerchantFilialNumber($merchantTransfer->getFilialNumber())
            ->setMerchantName($merchantTransfer->getName());

        return $spySalesOrderEntityTransfer;
    }
}
