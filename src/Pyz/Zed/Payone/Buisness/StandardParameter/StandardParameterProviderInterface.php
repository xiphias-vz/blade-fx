<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Buisness\StandardParameter;

use Generated\Shared\Transfer\PayoneStandardParameterTransfer;

interface StandardParameterProviderInterface
{
    /**
     * @param string $storeName
     *
     * @return \Generated\Shared\Transfer\PayoneStandardParameterTransfer
     */
    public function provideStandardParameter(string $storeName): PayoneStandardParameterTransfer;
}
