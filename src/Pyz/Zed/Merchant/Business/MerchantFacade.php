<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Business;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SpySalesOrderEntityTransfer;
use Generated\Shared\Transfer\UserTransfer;
use Spryker\Zed\Merchant\Business\MerchantFacade as SpykerMerchantFacade;

/**
 * @method \Pyz\Zed\Merchant\Business\MerchantBusinessFactory getFactory()
 * @method \Spryker\Zed\Merchant\Persistence\MerchantRepositoryInterface getRepository()
 * @method \Spryker\Zed\Merchant\Persistence\MerchantEntityManagerInterface getEntityManager()
 */
class MerchantFacade extends SpykerMerchantFacade implements MerchantFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer|null
     */
    public function findMerchantByUser(UserTransfer $userTransfer): ?MerchantTransfer
    {
        return $this->getFactory()->createMerchantFinder()
            ->findMerchantByUser($userTransfer);
    }

    /**
     * @inheritDoc
     *
     * @param \Generated\Shared\Transfer\SpySalesOrderEntityTransfer $spySalesOrderEntityTransfer
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\SpySalesOrderEntityTransfer
     */
    public function expandOrderWithMerchant(SpySalesOrderEntityTransfer $spySalesOrderEntityTransfer, QuoteTransfer $quoteTransfer): SpySalesOrderEntityTransfer
    {
        return $this->getFactory()
            ->createOrderExpander()
            ->expandOrderWithMerchant($spySalesOrderEntityTransfer, $quoteTransfer);
    }

    /**
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function findMerchantTransferFromMerchantReference(string $merchantReference): MerchantTransfer
    {
        return $this->getFactory()
            ->getMerchantTransferFromMerchantReference($merchantReference);
    }
}
