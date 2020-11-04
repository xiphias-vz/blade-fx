<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Error;

use Spryker\Shared\ErrorHandler\ErrorHandlerConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class ErrorConfig extends AbstractBundleConfig
{
    /**
     * @return bool
     */
    public function isPrettyErrorHandlerEnabled(): bool
    {
        return $this->get(ErrorHandlerConstants::IS_PRETTY_ERROR_HANDLER_ENABLED, false);
    }
}
