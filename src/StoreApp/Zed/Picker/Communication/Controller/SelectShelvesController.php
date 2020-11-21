<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Shared\Messages\MessagesConfig;
use Pyz\Shared\Oms\OmsConfig;
use StoreApp\Shared\Picker\PickerConfig;
use StoreApp\Zed\Picker\Communication\Form\ShelvesSelectionForm;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class SelectShelvesController extends BaseOrderPickingController
{
    protected const PICKING_SUCCESS_MESSAGE_ORDER_PICKED = 'storeapp.picking.message.success.order-has-been-picked';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return mixed[]|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER) ?? 0;

        $salesOrderTransfer = $this->getFactory()->getSalesFacade()
            ->findOrderByIdSalesOrderForStoreApp($idSalesOrder);
        $userTransfer = $this->getCurrentUser($request);

        if (!$this->getFactory()->getPermissionAccessFacade()->isAccessAllowed(
            $salesOrderTransfer,
            $userTransfer,
            [OmsConfig::STORE_STATE_READY_FOR_SELECTING_SHELVES]
        )) {
            $this->addErrorMessage(MessagesConfig::MESSAGE_PERMISSION_FAILED);

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        if ($this->isOrderPickingStartedByAnotherUser($idSalesOrder, $userTransfer)) {
            $this->addErrorMessage(
                static::PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED
            );

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $shelvesSelectionFormDataProvider = $this->getFactory()->createShelvesSelectionFormDataProvider();
        $shelvesSelectionForm = $this->getFactory()->createShelvesSelectionForm(
            [],
            $shelvesSelectionFormDataProvider->getOptions($salesOrderTransfer->getIdSalesOrder())
        );

        $shelvesSelectionForm->handleRequest($request);

        if ($shelvesSelectionForm->isSubmitted() && $shelvesSelectionForm->isValid()) {
            return $this->processShelvesSelectionForm(
                $shelvesSelectionForm,
                $salesOrderTransfer
            );
        }

        return [
            'shelvesSelectionForm' => $shelvesSelectionForm->createView(),
        ];
    }

    /**
     * @param \Symfony\Component\Form\FormInterface $orderItemSelectionForm
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function processShelvesSelectionForm(
        FormInterface $orderItemSelectionForm,
        OrderTransfer $salesOrderTransfer
    ): RedirectResponse {
        $formData = $orderItemSelectionForm->getData();

        $containerIdToShelfCodeMap = $this->getFactory()->getFormDataMapper()
            ->mapFormDataToSelectedQuantityMap(
                $formData,
                ShelvesSelectionForm::PREFIX_FIELD_CONTAINER_CODE
            );

        $pickingSalesOrderCollectionTransfer = $this->getFactory()
            ->getFormDataMapper()
            ->mapContainersToShelves($containerIdToShelfCodeMap, $salesOrderTransfer);

        $this->getFactory()->getPickingSalesOrderFacade()->updatePickingSalesOrderCollection($pickingSalesOrderCollectionTransfer);

        $selectedIdSalesOrderItems = $this->getFactory()
            ->getSalesFacade()
            ->getSalesOrderItemsIdsByIdSalesOrderAndStates(
                $salesOrderTransfer->getIdSalesOrder(),
                [OmsConfig::STORE_STATE_READY_FOR_SELECTING_SHELVES]
            );

        $this->addSuccessMessage(static::PICKING_SUCCESS_MESSAGE_ORDER_PICKED);
        $this->getFacade()->markOrderItemsAsPicked($selectedIdSalesOrderItems);

        return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
    }
}
