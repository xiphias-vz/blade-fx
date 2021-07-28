<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Exception;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\PerformanceGlobalSalesOrderReportTransfer;
use Generated\Shared\Transfer\PerformanceSalesOrderReportTransfer;
use Generated\Shared\Transfer\PickingZoneTransfer;
use Orm\Zed\PerformancePickingReport\Persistence\Base\PyzPerformanceSalesOrderReportQuery;
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceGlobalSalesOrderReportQuery;
use Orm\Zed\PerformancePickingReport\Persistence\PyzPerformanceSalesOrderReportQuery as OrmPyzPerformanceSalesOrderReportQuery;
use Pyz\Shared\Messages\MessagesConfig;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Shared\Log\LoggerTrait;
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
    use LoggerTrait;

    protected const PICKING_SUCCESS_MESSAGE_ORDER_PICKED = 'storeapp.picking.message.success.order-has-been-picked';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return mixed[]|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $idSalesOrder = $request->get(PickerConfig::REQUEST_PARAM_ID_ORDER) ?? 0;
        $pickingZoneTransfer = $this->getFacade()->findPickingZoneInSession();

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

        if (!$this->isOrderPickingBlockAvailableForUser($idSalesOrder, $userTransfer, $pickingZoneTransfer)) {
            $this->addErrorMessage(
                static::PICKING_ERROR_MESSAGE_ORDER_IS_BEING_PROCESSED
            );

            return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
        }

        $shelvesSelectionFormDataProvider = $this->getFactory()->createShelvesSelectionFormDataProvider();
        $shelvesSelectionForm = $this->getFactory()->createShelvesSelectionForm(
            $shelvesSelectionFormDataProvider->getData($salesOrderTransfer->getIdSalesOrder()),
            $shelvesSelectionFormDataProvider->getOptions(
                $salesOrderTransfer->getIdSalesOrder(),
                $pickingZoneTransfer->getIdPickingZone()
            )
        );

        $shelvesSelectionForm->handleRequest($request);

        if ($shelvesSelectionForm->isSubmitted() && $shelvesSelectionForm->isValid()) {
            return $this->processShelvesSelectionForm(
                $shelvesSelectionForm,
                $salesOrderTransfer,
                $pickingZoneTransfer
            );
        }

        return [
            'shelvesSelectionForm' => $shelvesSelectionForm->createView(),
            'orderReference' => $salesOrderTransfer->getIdSalesOrder(),
        ];
    }

    /**
     * @param \Symfony\Component\Form\FormInterface $orderItemSelectionForm
     * @param \Generated\Shared\Transfer\OrderTransfer $salesOrderTransfer
     * @param \Generated\Shared\Transfer\PickingZoneTransfer $pickingZoneTransfer
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function processShelvesSelectionForm(
        FormInterface $orderItemSelectionForm,
        OrderTransfer $salesOrderTransfer,
        PickingZoneTransfer $pickingZoneTransfer
    ): RedirectResponse {
        $formData = $orderItemSelectionForm->getData();

        $containerIdToShelfCodeMap = $this->getFactory()->getFormDataMapper()
            ->mapFormDataToSelectedQuantityMap(
                $formData,
                ShelvesSelectionForm::PREFIX_FIELD_CONTAINER_CODE
            );

        $pickingSalesOrderCollectionTransfer = $this->getFactory()
            ->getFormDataMapper()
            ->mapContainersToShelves(
                $containerIdToShelfCodeMap,
                $salesOrderTransfer,
                $pickingZoneTransfer
            );

        $this->getFactory()->getPickingSalesOrderFacade()
            ->refreshPickingSalesOrderCollection($pickingSalesOrderCollectionTransfer);

        $selectedIdSalesOrderItems = $this->getFactory()
            ->getSalesFacade()
            ->getSalesOrderItemsIdsByIdSalesOrderAndPickingZoneAndStates(
                $salesOrderTransfer->getIdSalesOrder(),
                $pickingZoneTransfer->getIdPickingZone(),
                [OmsConfig::STORE_STATE_READY_FOR_SELECTING_SHELVES]
            );

        $idGlobalPickReport = $this->updatePerformanceOrder($salesOrderTransfer->getIdSalesOrder(), count($containerIdToShelfCodeMap));
        $this->updateGlobalPerformanceOrder($idGlobalPickReport);

        $this->addSuccessMessage(static::PICKING_SUCCESS_MESSAGE_ORDER_PICKED);
        $this->getFacade()->markOrderItemsAsPicked($selectedIdSalesOrderItems);

        return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
    }

    /**
     * @param int $IdGlobalPickReport
     *
     * @return void
     */
    protected function updateGlobalPerformanceOrder(int $IdGlobalPickReport)
    {
        $orderGlobalPerformanceOrderTransfer = (new PerformanceGlobalSalesOrderReportTransfer())
            ->setIdGlobalPickReport($IdGlobalPickReport)
            ->setPickTimeEnd(date("Y-m-d H:i:s"));

        try {
            $orderPerformanceGlobalOrderTransferEntity = PyzPerformanceGlobalSalesOrderReportQuery::create()
                ->filterByIdGlobalPickReport($orderGlobalPerformanceOrderTransfer->getIdGlobalPickReport())
                ->findOneOrCreate();

            $globalOrderPickingDuration = $this->calculatePickingDurationTime(date("Y-m-d H:i:s", $orderPerformanceGlobalOrderTransferEntity->getPickTimeBegin()->getTimestamp()), $orderGlobalPerformanceOrderTransfer->getPickTimeEnd());

            $orderPerformanceGlobalOrderTransferEntity->setPickTimeEnd($orderGlobalPerformanceOrderTransfer->getPickTimeEnd());
            $orderPerformanceGlobalOrderTransferEntity->setDurationPickTime($globalOrderPickingDuration);

            if ($orderPerformanceGlobalOrderTransferEntity->isModified()) {
                $orderPerformanceGlobalOrderTransferEntity->save();
            }
        } catch (Exception $exceptionSaveGlobal) {
            $this->logError($exceptionSaveGlobal->getMessage(), $exceptionSaveGlobal->getTrace());
        }
    }

    /**
     * @param int $IdSalesOrder
     * @param int $containerCount
     *
     * @return int
     */
    protected function updatePerformanceOrder(int $IdSalesOrder, int $containerCount): int
    {
        $orderPerformanceOrderTransfer = (new PerformanceSalesOrderReportTransfer())
            ->setIdSalesOrder($IdSalesOrder)
            ->setContainersUsed($containerCount)
            ->setPickingEnd(date("Y-m-d H:i:s"));

        $orderPerformanceOrderTransferEntity = new OrmPyzPerformanceSalesOrderReportQuery();
        try {
            $orderPerformanceOrderTransferEntity = PyzPerformanceSalesOrderReportQuery::create()
                ->filterByIdSalesOrder($orderPerformanceOrderTransfer->getIdSalesOrder())
                ->findOneOrCreate();

            $orderPickingDuration = $this->calculatePickingDurationTime(date("Y-m-d H:i:s", $orderPerformanceOrderTransferEntity->getPickingStart()->getTimestamp()), $orderPerformanceOrderTransfer->getPickingEnd());

            $orderPerformanceOrderTransferEntity->setContainersUsed($orderPerformanceOrderTransfer->getContainersUsed());
            $orderPerformanceOrderTransferEntity->setPickingEnd($orderPerformanceOrderTransfer->getPickingEnd());
            $orderPerformanceOrderTransferEntity->setDurationPickTime($orderPickingDuration);

            if ($orderPerformanceOrderTransferEntity->isModified()) {
                $orderPerformanceOrderTransferEntity->save();
            }
        } catch (Exception $exceptionSaveGlobal) {
            $this->logError($exceptionSaveGlobal->getMessage(), $exceptionSaveGlobal->getTrace());
        }

        return $orderPerformanceOrderTransferEntity->getFkGlobalPickReport();
    }

    /**
     * @param string $message
     * @param array $trace
     *
     * @return void
     */
    protected function logError(string $message, array $trace = [])
    {
        $this->getLogger()->error($message, $trace);
    }

    /**
     * @param string $startTime
     * @param string $endTime
     *
     * @return int
     */
    protected function calculatePickingDurationTime(string $startTime, string $endTime): int
    {
        $firstTime = strtotime($startTime);
        $lastTime = strtotime($endTime);
        $timeDiff = $lastTime - $firstTime;

        return $timeDiff;
    }
}
