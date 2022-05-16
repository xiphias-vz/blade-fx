<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Communication\Controller;

use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\PickingZoneOrderExport\Communication\PickingZoneOrderExportCommunicationFactory getFactory()
 */
class PickingZoneOrderItemsExportController extends IndexController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return string|false
     */
    public function changeTimeSlotsByUserSelectAction(Request $request)
    {
        return parent::changeTimeSlotsByUserSelectAction($request);
    }
}
