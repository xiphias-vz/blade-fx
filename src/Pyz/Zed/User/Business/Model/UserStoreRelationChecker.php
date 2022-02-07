<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Business\Model;

use Generated\Shared\Transfer\StoreTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface;

/**
 * @method \Pyz\Zed\User\Business\UserBusinessFactory getFactory()
 */
class UserStoreRelationChecker implements UserStoreRelationCheckerInterface
{
    /**
     * @var \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    protected $userFacade;

    /**
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface $userFacade
     */
    public function __construct(SalesToUserInterface $userFacade)
    {
        $this->userFacade = $userFacade;
    }

    /**
     * @return \Generated\Shared\Transfer\StoreTransfer
     */
    public function findStoreRelationForSupervisor(): StoreTransfer
    {
        $userMerchantReference = $this->userFacade->getCurrentUser()->getMerchantReference();
        $spyMerchantEntity = SpyMerchantQuery::create()
            ->filterByFilialNumber($userMerchantReference)
            ->findOneOrCreate();

        $currentSupervisorStoreId = $spyMerchantEntity->getFkStore();
        $storeTransfer = new StoreTransfer();
        $storeTransfer->setIdStore($currentSupervisorStoreId);

        return $storeTransfer;
    }
}
