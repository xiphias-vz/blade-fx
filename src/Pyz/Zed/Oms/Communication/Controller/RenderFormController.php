<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Controller;

use Spryker\Zed\Oms\Communication\Controller\RenderFormController as SpyRenderFormController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Oms\Communication\OmsCommunicationFactory getFactory()
 * @method \Pyz\Zed\Oms\Persistence\OmsQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Oms\Persistence\OmsRepositoryInterface getRepository()
 * @method \Pyz\Zed\Oms\Business\OmsFacadeInterface getFacade()
 */
class RenderFormController extends SpyRenderFormController
{
    protected const KEY_ID_PICKING_ZONE = 'pickingZone';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function orderAction(Request $request): array
    {
        $idSalesOrder = $request->attributes->get(static::KEY_ID_SALES_ORDER);
        $events = $request->attributes->get(static::KEY_EVENTS);
        $redirectUrl = $request->attributes->get(static::KEY_REDIRECT_URL);
        $idPickingZone = $request->attributes->get(static::KEY_ID_PICKING_ZONE);
        $orderOmsTriggerFormCollection = $this->getFactory()
            ->createPyzOmsTriggerFormCollectionBuilder()
            ->buildOrderOmsTriggerFormCollection($redirectUrl, $events, $idSalesOrder, $idPickingZone);

        return $this->viewResponse([
            'formCollection' => $orderOmsTriggerFormCollection,
        ]);
    }
}
