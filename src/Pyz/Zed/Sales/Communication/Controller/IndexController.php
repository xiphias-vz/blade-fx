<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Controller;

use Spryker\Zed\Sales\Communication\Controller\IndexController as SprykerIndexController;

/**
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 */
class IndexController extends SprykerIndexController
{
    /**
     * @return array
     */
    public function indexAction()
    {
        $merchantReference = $this->getMerchantReferenceForFilter($_REQUEST);
        $table = $this->getFactory()->createOrdersTable();
        $stores = $table->getMerchantFilterButtonsData();
        $timeslots = $table->getTimeslotsFilterButtonData($merchantReference);
        asort($stores);

        return [
            'orders' => $table->render(),
            'merchantFilterButtonsData' => $stores,
            'timeslotsFilterButtonData' => $timeslots,
            'pickingZones' => $table->getPickingZones(),
        ];
    }

    /**
     * @param $request
     *
     * @return string
     */
    public function getMerchantReferenceForFilter($request): string
    {
        if (isset($request['merchant-reference-filter'])) {
            $mercRef = $request['merchant-reference-filter'];
        } else {
            $mercRef = "";
        }

        return $mercRef;
    }
}
