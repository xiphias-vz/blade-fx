<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Form\DataProvider;

use Spryker\Zed\Oms\Communication\Form\OmsTriggerForm;

class OrderOmsTriggerFormDataProvider extends AbstractOmsTriggerFormDataProvider
{
    /**
     * @param string $redirectUrl
     * @param string $event
     * @param int $idSalesOrder
     * @param string|null $idPickingZone
     *
     * @return array
     */
    public function getOptions(string $redirectUrl, string $event, int $idSalesOrder, ?string $idPickingZone = null): array
    {
        return [
            OmsTriggerForm::OPTION_OMS_ACTION => static::OMS_ACTION_ORDER_TRIGGER,
            OmsTriggerForm::OPTION_EVENT => $event,
            OmsTriggerForm::OPTION_SUBMIT_BUTTON_CLASS => static::SUBMIT_BUTTON_CLASS,
            OmsTriggerForm::OPTION_QUERY_PARAMS => [
                static::QUERY_PARAM_EVENT => $event,
                static::QUERY_PARAM_ID_SALES_ORDER => $idSalesOrder,
                static::QUERY_PARAM_ID_PICKING_ZONE => $idPickingZone,
                static::QUERY_PARAM_REDIRECT => $redirectUrl,
            ],
        ];
    }
}
