<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\TwigCache;

use Pyz\Shared\TwigCache\TwigCacheConstants;
use Spryker\Yves\Kernel\AbstractBundleConfig;

class TwigCacheConfig extends AbstractBundleConfig
{
    /**
     * @return bool
     */
    public function isTwigCacheEnabled(): bool
    {
        return $this->get(TwigCacheConstants::TWIG_CACHE_ENABLED, false) && function_exists('apcu_fetch');
    }
}
