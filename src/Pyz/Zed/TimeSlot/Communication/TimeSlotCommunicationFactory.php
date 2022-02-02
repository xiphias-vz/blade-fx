<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Communication;

use Pyz\Zed\Sales\SalesDependencyProvider;
use Pyz\Zed\TimeSlot\Business\TimeSlotBusinessFactory;
use Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface;

class TimeSlotCommunicationFactory extends TimeSlotBusinessFactory
{
    /**
     * @return \Pyz\Zed\TimeSlot\Business\TimeSlotBusinessFactory
     */
    public function getPickerBusinessFactory(): TimeSlotBusinessFactory
    {
        return new TimeSlotBusinessFactory();
    }

    /**
     * @return \Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface
     */
    public function getTimeSlotsFacade(): TimeSlotFacadeInterface
    {
        return $this->getProvidedDependency(SalesDependencyProvider::FACADE_TIME_SLOTS_ORDER_OVERVIEW);
    }
}
