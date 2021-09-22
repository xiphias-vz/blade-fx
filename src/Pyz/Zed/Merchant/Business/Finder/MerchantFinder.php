<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Business\Finder;

use Generated\Shared\Transfer\MerchantCriteriaFilterTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\UserTransfer;
use Spryker\Zed\Merchant\Business\Model\MerchantReaderInterface;

class MerchantFinder implements MerchantFinderInterface
{
    /**
     * @var \Spryker\Zed\Merchant\Business\Model\MerchantReaderInterface
     */
    private $merchantReader;

    /**
     * @param \Spryker\Zed\Merchant\Business\Model\MerchantReaderInterface $merchantReader
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

        $merchantCriteriaFilterTransfer = (new MerchantCriteriaFilterTransfer())
            ->setMerchantReference($userTransfer->getMerchantReference());

        return $this->merchantReader->findOne($merchantCriteriaFilterTransfer);
    }
}
