<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Business;

use Generated\Shared\Transfer\CaptureResponseTransfer;
use Generated\Shared\Transfer\PayonePartialOperationRequestTransfer;
use SprykerEco\Zed\Payone\Business\PayoneFacadeInterface as SprykerEcoPayoneFacadeInterface;

interface PayoneFacadeInterface extends SprykerEcoPayoneFacadeInterface
{
    /**
     * Specification:
     * - Performs partial capture call to Payone API.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
     *
     * @return \Generated\Shared\Transfer\CaptureResponseTransfer
     */
    public function executePartialCapture(
        PayonePartialOperationRequestTransfer $payonePartialOperationRequestTransfer
    ): CaptureResponseTransfer;
}
