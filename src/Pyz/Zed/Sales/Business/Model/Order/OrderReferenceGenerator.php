<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Model\Order;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SequenceNumberSettingsTransfer;
use Spryker\Zed\Sales\Business\Model\Order\OrderReferenceGeneratorInterface;

class OrderReferenceGenerator implements OrderReferenceGeneratorInterface
{
    /**
     * @var \Generated\Shared\Transfer\SequenceNumberSettingsTransfer
     */
    protected $sequenceNumberSettings;

    /**
     * @param \Generated\Shared\Transfer\SequenceNumberSettingsTransfer $sequenceNumberSettingsTransfer
     */
    public function __construct(SequenceNumberSettingsTransfer $sequenceNumberSettingsTransfer)
    {
        $this->sequenceNumberSettings = $sequenceNumberSettingsTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return string
     */
    public function generateOrderReference(QuoteTransfer $quoteTransfer)
    {
        return sprintf(
            '%s-%06d-%06d',
            $this->sequenceNumberSettings->getPrefix(),
            mt_rand(0, 999999),
            mt_rand(0, 999999)
        );
    }
}
