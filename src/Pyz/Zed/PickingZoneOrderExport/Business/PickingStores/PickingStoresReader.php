<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Business\PickingStores;

use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\User\Business\UserFacadeInterface;
use Spryker\Shared\Kernel\Store;

class PickingStoresReader implements PickingStoresReaderInterface
{
    /**
     * @var \Pyz\Zed\User\Business\UserFacadeInterface
     */
    protected $userFacade;

    /**
     * @var \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    protected $merchantFacade;

    /**
     * @param \Pyz\Zed\User\Business\UserFacadeInterface $userFacade
     * @param \Pyz\Zed\Merchant\Business\MerchantFacadeInterface $merchantFacade
     */
    public function __construct(
        UserFacadeInterface $userFacade,
        MerchantFacadeInterface $merchantFacade
    ) {
        $this->userFacade = $userFacade;
        $this->merchantFacade = $merchantFacade;
    }

    /**
     * @return string[]
     */
    public function getPickingStores(): array
    {
        $pickingStores = [];
        $isCurrentUserSupervisor = $this->userFacade->isCurrentUserSupervisor();

        if (isset($isCurrentUserSupervisor) && $isCurrentUserSupervisor) {
            $currentUser = $this->userFacade->getCurrentUser();
            $merchantByCurrentUser = $this->merchantFacade->findMerchantByUser($currentUser);
            if ($merchantByCurrentUser) {
                $currentStore = $merchantByCurrentUser->getStoreRelation()->getStores();
                foreach ($currentStore as $store) {
                    $storeName = $store->getName();
                    $pickingStores[$storeName] = $storeName;
                }
            }
        } else {
            foreach (Store::getInstance()->getAllowedStores() as $allowedStore) {
                $pickingStores[$allowedStore] = $allowedStore;
            }
        }

        return $pickingStores;
    }
}
