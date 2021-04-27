<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Controller;

use Spryker\Zed\Oms\Communication\Controller\TriggerController as SpyTriggerController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Spryker\Zed\Oms\Business\OmsFacadeInterface getFacade()
 * @method \Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Oms\Communication\OmsCommunicationFactory getFactory()
 * @method \Spryker\Zed\Oms\Persistence\OmsRepositoryInterface getRepository()
 */
class TriggerController extends SpyTriggerController
{
    /**
     * @deprecated Exists for Backward Compatibility reasons only. Use static::REQUEST_PARAMETER_ITEMS instead.
     */

    protected const REQUEST_PARAMETER_PICKING_ZONE = 'pickingZone';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function submitTriggerEventForOrderAction(Request $request)
    {
        $redirect = $request->query->get('redirect', static::ROUTE_REDIRECT_DEFAULT);

        if (!$this->isValidPostRequest($request)) {
            $this->addErrorMessage(static::ERROR_INVALID_FORM);

            return $this->redirectResponse($redirect);
        }

        $idOrder = $this->castId($request->query->getInt(static::REQUEST_PARAMETER_ID_SALES_ORDER));
        $pickingZoneName = $request->query->get(static::REQUEST_PARAMETER_PICKING_ZONE);
        $event = $request->query->get(static::REQUEST_PARAMETER_EVENT);

        if ($event == "Abholung bestätigen") {
            $event = "confirm collection";
        } elseif ($event == "Picking bestätigen") {
            $event = "confirm picking";
        }

        $redirect = $request->query->get(static::REQUEST_PARAMETER_REDIRECT, '/');
        $itemsList = $request->query->get(static::REQUEST_PARAMETER_ITEMS);

        // This is a project specific modification
        if (empty($pickingZoneName)) {
            $orderItems = $this->getOrderItemsToTriggerAction($idOrder, $itemsList);
        } else {
            $orderItems = $this->getOrderItemsByPickZoneToTriggerAction($idOrder, $pickingZoneName);
        }

        $this->getFacade()->triggerEvent($event, $orderItems, []);
        $this->addInfoMessage(static::MESSAGE_STATUS_CHANGED_SUCCESSFULLY);

        return $this->redirectResponse($redirect);
    }

    /**
     * @param int $idOrder
     * @param string $pickZone
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItem[]|\Propel\Runtime\Collection\ObjectCollection
     */
    protected function getOrderItemsByPickZoneToTriggerAction(int $idOrder, string $pickZone)
    {
        return $this->getQueryContainer()
            ->querySalesOrderItemsByIdOrder($idOrder)
            ->findByPickZone($pickZone);
    }
}
