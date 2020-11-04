<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DateTimeWithZone;

use Pyz\Service\DateTimeWithZone\DateTime\DateTimeWithTimeZone;
use Spryker\Shared\Kernel\Store;

class DateTimeWithZoneServiceFactory
{
    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTime\DateTimeWithTimeZone
     */
    public function createDateTimeWithTimeZone(): DateTimeWithTimeZone
    {
        return new DateTimeWithTimeZone(
            $this->getStore()
        );
    }

    /**
     * @return \Spryker\Shared\Kernel\Store
     */
    private function getStore(): Store
    {
        return Store::getInstance();
    }
}
