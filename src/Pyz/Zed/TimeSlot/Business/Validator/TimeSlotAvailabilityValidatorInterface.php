<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Business\Validator;

use Generated\Shared\Transfer\QuoteTransfer;

interface TimeSlotAvailabilityValidatorInterface
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function hasTimeSlotAvailability(QuoteTransfer $quoteTransfer): bool;
}
