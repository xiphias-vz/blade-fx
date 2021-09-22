<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Business\Finder;

use Generated\Shared\Transfer\MerchantCriteriaTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\UserTransfer;
use Spryker\Zed\Merchant\Business\Reader\MerchantReaderInterface;

class MerchantFinder implements MerchantFinderInterface
{
    /**
     * @var \Spryker\Zed\Merchant\Business\Reader\MerchantReaderInterface
     */
    private $merchantReader;

    /**
     * @param \Spryker\Zed\Merchant\Business\Reader\MerchantReaderInterface $merchantReader
     */
    public function __construct(MerchantReaderInterface $merchantReader)
    {
        $this->merchantReader = $merchantReader;
    }

    /**
     * @inheritDoc
     */
    public function findMerchantByUser(UserTransfer $userTransfer): ?MerchantTransfer
    {
        if ($userTransfer->getMerchantReference() === null) {
            return null;
        }

        $merchantCriteriaTransfer = (new MerchantCriteriaTransfer())
            ->setMerchantReference($userTransfer->getMerchantReference());

        return $this->merchantReader->findOne($merchantCriteriaTransfer);
    }
}
