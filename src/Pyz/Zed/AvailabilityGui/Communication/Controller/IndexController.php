<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\AvailabilityGui\Communication\Controller;

use Generated\Shared\Transfer\AvailabilityStockTransfer;
use Pyz\Zed\FactFinderExport\Business\Model\FactFinderEventManager;
use Spryker\Zed\AvailabilityGui\Communication\Controller\IndexController as SpryIndexController;
use Spryker\Zed\AvailabilityGui\Communication\Table\AvailabilityTable;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Spryker\Zed\AvailabilityGui\Communication\AvailabilityGuiCommunicationFactory getFactory()
 * @method \Spryker\Zed\AvailabilityGui\Persistence\AvailabilityGuiRepositoryInterface getRepository()
 */
class IndexController extends SpryIndexController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function indexAction(Request $request)
    {
        return parent::indexAction($request);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function viewAction(Request $request)
    {
        return parent::viewAction($request);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function editAction(Request $request)
    {
        $idProduct = $this->castId($request->query->getInt(AvailabilityTable::URL_PARAM_ID_PRODUCT));
        $idStore = $this->castId($request->query->getInt(AvailabilityTable::URL_PARAM_ID_STORE));
        $idProductAbstract = $this->castId($request->query->getInt(AvailabilityTable::URL_PARAM_ID_PRODUCT_ABSTRACT));
        $sku = $request->query->get(AvailabilityTable::URL_PARAM_SKU);

        $storeTransfer = $this->getFactory()->getStoreFacade()->getStoreById($idStore);

        $availabilityStockForm = $this->getFactory()->createAvailabilityStockForm($idProduct, $sku, $storeTransfer);
        $availabilityStockForm->handleRequest($request);

        if ($availabilityStockForm->isSubmitted() && $availabilityStockForm->isValid()) {
            $data = $availabilityStockForm->getData();
            if ($this->saveAvailabilityStock($data)) {
                $this->addSuccessMessage('Stock successfully updated');
                FactFinderEventManager::addEvent(FactFinderEventManager::FF_EVENT_GEODATA_UPDATE, $idProductAbstract);
            } else {
                $this->addErrorMessage('Failed to update stock, please enter stock amount or select "never out of stock"');
            }
        }

        return [
            'form' => $availabilityStockForm->createView(),
            'idProductAbstract' => $idProductAbstract,
        ];
    }

    /**
     * @param \Generated\Shared\Transfer\AvailabilityStockTransfer $availabilityStockTransfer
     *
     * @return bool
     */
    protected function saveAvailabilityStock(AvailabilityStockTransfer $availabilityStockTransfer)
    {
        $isAnyItemsUpdated = false;
        foreach ($availabilityStockTransfer->getStocks() as $stockProductTransfer) {
            if ($stockProductTransfer->getIdStockProduct() !== null) {
                if ($this->getFactory()->getStockFacade()->updateStockProduct($stockProductTransfer) > 0) {
                    $isAnyItemsUpdated = true;
                }
            } elseif ($this->isStockProductTransferValid($stockProductTransfer)) {
                $stockProductTransfer->setSku($availabilityStockTransfer->getSku());
                if ($this->getFactory()->getStockFacade()->createStockProduct($stockProductTransfer) > 0) {
                    $isAnyItemsUpdated = true;
                }
            }
        }

        return $isAnyItemsUpdated;
    }
}
