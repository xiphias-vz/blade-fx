<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CookieBot;

use Pyz\Shared\CookieBot\CookieBotConstants;
use Spryker\Yves\Kernel\AbstractBundleConfig;

class CookieBotConfig extends AbstractBundleConfig
{
    /**
     * @return string
     */
    public function getCookieBotDomainGroupId(): string
    {
        return $this->get(CookieBotConstants::DOMAIN_GROUP_ID);
    }
}
