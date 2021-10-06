<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CodeBucketPlugin;

use Pyz\Shared\CodeBuckets\CodeBucketConstants;
use Spryker\Yves\Kernel\AbstractBundleConfig;

class CodeBucketPluginConfig extends AbstractBundleConfig
{
    /**
     * @return string
     */
    public function getCurrentCurrencySymbol(): string
    {
        return $this->get(CodeBucketConstants::CURRENCY_SYMBOL);
    }
}
