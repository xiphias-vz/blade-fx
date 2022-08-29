<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Business\Caller;

interface BladeFxRequestCallerInterface
{
    /**
     * @param string $url
     * @param string $resource
     * @param string $request
     *
     * @return string
     */
    public function call(string $url, string $resource, string $request): string;
}
