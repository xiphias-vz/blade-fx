<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\StoreSwitcherWidget\Business\Reader\StoreSwitcherReader;

use Generated\Shared\Transfer\MerchantTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;

class StoreSwitcherReader implements StoreSwitcherReaderInterface
{
    /**
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    public function getVisibleMerchants(): MerchantTransfer
    {
        $query = new SpyMerchantQuery();
        $visibleMerchant = $query->filterByIsShopVisible(true)->find();

        $transferObject = new MerchantTransfer();

        $transferObjectArray = [];
        $transferObjectItemArray = [];
        foreach ($visibleMerchant as $merchant) {
            $transferObjectItemArray['idMerchant'] = $merchant->getIdMerchant();
            $transferObjectItemArray['isShopVisible'] = $merchant->getIsShopVisible();
            $transferObjectItemArray['isPasswordProtected'] = $merchant->getIsPasswordProtected();
            $transferObjectItemArray['shopPassword'] = $merchant->getShopPassword();
            $transferObjectItemArray['fillialNumber'] = $merchant->getFilialNumber();
            array_push($transferObjectArray, $transferObjectItemArray);
        }

        $transferObject->setVisibleStoresArray($transferObjectArray);

        return $transferObject;
    }
}
