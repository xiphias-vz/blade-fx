<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Communication\Plugin;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SaveOrderTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostSavePluginInterface;

/**
 * @method \Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface getFacade()
 * @method \Pyz\Zed\TimeSlot\TimeSlotConfig getConfig()
 */
class TimeSlotStorageWriterPostSavePlugin extends AbstractPlugin implements OrderPostSavePluginInterface
{
    /**
     * Specification:
     *   - Writes time slots with orders count (per slot) to the Storage
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\SaveOrderTransfer $saveOrderTransfer
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\SaveOrderTransfer
     */
    public function execute(SaveOrderTransfer $saveOrderTransfer, QuoteTransfer $quoteTransfer): SaveOrderTransfer
    {
        $this->getFacade()->updateTimeSlotStorage($quoteTransfer);

        return $saveOrderTransfer;
    }
}
