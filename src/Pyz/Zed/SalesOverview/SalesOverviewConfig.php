<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOverview;

use Pyz\Shared\BackofficeOverview\BackofficeOverviewConstants;
use Pyz\Shared\Store\StoreConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class SalesOverviewConfig extends AbstractBundleConfig
{
    /**
     * @return array
     */
    public function getMerchantList(): array
    {
        return $this->get(StoreConstants::SAP_STORE_ID_TO_STORE_MAP);
    }

    /**
     * @return array
     */
    public function getChoiceForDisplay(): array
    {
        return $this->get(BackofficeOverviewConstants::CHOICE_FILTER);
    }

    /**
     * @return array
     */
    public function getTableHeader(): array
    {
        return $this->get(BackofficeOverviewConstants::TABLE_HEADER);
    }
}
