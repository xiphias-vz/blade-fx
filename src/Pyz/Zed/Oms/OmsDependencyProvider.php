<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Zed\CancelledItems\Communication\Plugin\Oms\Command\UpdateOrderDueCancelledItemsCommandByOrderPlugin;
use Pyz\Zed\CashierOrderExport\Communication\Plugin\Oms\Command\CashierOrderExportCommandPlugin;
use Pyz\Zed\CashierOrderExport\Communication\Plugin\Oms\Condition\IsOrderExportedToCashierConditionPlugin;
use Pyz\Zed\Customer\Communication\Plugin\Oms\Command\CustomerHasOrderWriterCommandPlugin;
use Pyz\Zed\Invoice\Communication\Plugin\Oms\Command\GenerateInvoiceReferenceCommandByOrderPlugin;
use Pyz\Zed\Invoice\Communication\Plugin\Oms\Command\SendInvoiceCommandByOrderPlugin;
use Pyz\Zed\Invoice\Communication\Plugin\Oms\Condition\IfTimeToSendInvoiceConditionPlugin;
use Pyz\Zed\MerchantSalesOrder\Business\MerchantSalesOrderFacadeInterface;
use Pyz\Zed\Oms\Communication\Plugin\Oms\Command\CancelCollectionByCustomerCommandPlugin;
use Pyz\Zed\Oms\Communication\Plugin\Oms\Command\CancelCollectionByStoreCommandPlugin;
use Pyz\Zed\Oms\Communication\Plugin\Oms\Command\CancelDueToNotInStockCommandPlugin;
use Pyz\Zed\Oms\Communication\Plugin\Oms\Command\OrderCancelledByCustomerCommandByOrderPlugin;
use Pyz\Zed\Oms\Communication\Plugin\Oms\Command\SendOrderCancelledEmailCommandByOrderPlugin;
use Pyz\Zed\Oms\Communication\Plugin\Oms\Command\SendOrderRefundedCommandByOrderPlugin;
use Pyz\Zed\Oms\Communication\Plugin\Oms\Condition\Is1DayPassedConditionPlugin;
use Pyz\Zed\Oms\Communication\Plugin\Oms\Condition\IsOrderCancelledCondition;
use Pyz\Zed\Oms\Communication\Plugin\Oms\Condition\TrueConditionPlugin;
use Pyz\Zed\Payone\Communication\Plugin\Oms\Command\CancelCommandPlugin;
use Pyz\Zed\Payone\Communication\Plugin\Oms\Command\CancelRemainingAmountCommandByOrderPlugin;
use Pyz\Zed\Payone\Communication\Plugin\Oms\Command\PartialCaptureCommandByOrderPlugin;
use Pyz\Zed\Payone\Communication\Plugin\Oms\Condition\PartialCaptureIsApprovedConditionPlugin;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Command\CancelByTimeoutCommandPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Command\CancelStartDeliveryCommandPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Command\ConfirmCollectionCommandPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Command\ConfirmDeliveryCommandPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Command\ConfirmPickingCommandPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Command\MarkDeliveryCancelledByCustomerCommandPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Command\MarkDeliveryCancelledByStoreCommandPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Command\MoveToReadyForCollectionCommandPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Command\MoveToReadyForDeliveryCommandPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Command\MoveToReadyForPickingCommandPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Command\StartDeliveryCommandPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Condition\IsExpiredOrderConditionPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Condition\IsForCollectionConditionPlugin;
use Pyz\Zed\Sales\Communication\Plugin\Oms\Condition\IsTimeToStartPickingConditionPlugin;
use Pyz\Zed\TimeSlot\Communication\Plugin\Oms\Command\ReleaseTimeSlotCommandPlugin;
use Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface;
use Spryker\Zed\Availability\Communication\Plugin\AvailabilityHandlerPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\SendOrderConfirmationPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\SendOrderShippedPlugin;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionCollectionInterface;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Oms\ProductPackagingUnitReservationAggregationStrategyPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Reservation\LeadProductReservationHandlerPlugin;
use Spryker\Zed\Shipment\Dependency\Plugin\Oms\ShipmentManualEventGrouperPlugin;
use Spryker\Zed\Shipment\Dependency\Plugin\Oms\ShipmentOrderMailExpanderPlugin;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\AuthorizeCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\CaptureCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\PartialRefundCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\PreAuthorizeCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\RefundCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\SavePartialRefundCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\AuthorizationIsApprovedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\AuthorizationIsErrorConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\AuthorizationIsRedirectConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\CaptureIsApprovedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PartialRefundIsApprovedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PaymentIsAppointedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PaymentIsCaptureConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PaymentIsPaidConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PaymentIsRefundConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PaymentIsUnderPaidConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PreAuthorizationIsApprovedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PreAuthorizationIsErrorConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PreAuthorizationIsRedirectConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\RefundIsApprovedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\RefundIsPossibleConditionPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    public const FACADE_MONEY = 'FACADE_MONEY';
    public const SERVICE_MAIL_CMS_BLOCK = 'SERVICE_MAIL_CMS_BLOCK';
    public const SERVICE_UTIL_DATE_TIME = 'SERVICE_UTIL_DATE_TIME';
    public const PYZ_FACADE_SALES = 'PYZ_FACADE_SALES';
    public const FACADE_TRANSLATOR = 'FACADE_TRANSLATOR';
    public const SERVICE_DATE_TIME_WITH_ZONE = 'SERVICE_DATE_TIME_WITH_ZONE';
    public const FACADE_MERCHANT_SALES_ORDER = 'FACADE_MERCHANT_SALES_ORDER';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->extendCommandPlugins($container);
        $container = $this->extendConditionPlugins($container);
        $container = $this->addMailCmsBlockService($container);
        $container = $this->addMoneyFacade($container);
        $container = $this->addUtilDateTimeService($container);
        $container = $this->addPyzSalesFacade($container);
        $container = $this->addTranslatorsFacade($container);
        $container = $this->addDateTimeWithZoneService($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container)
    {
        $container = parent::provideCommunicationLayerDependencies($container);

        $container = $this->addPyzSalesFacade($container);
        $container = $this->addMerchantSalesOrderFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new SendOrderConfirmationPlugin(), 'Oms/SendOrderConfirmation');
            $commandCollection->add(new SendOrderShippedPlugin(), 'Oms/SendOrderShipped');
            $commandCollection->add(new SendOrderCancelledEmailCommandByOrderPlugin(), 'OrderCancelEmail');
            $commandCollection->add(new OrderCancelledByCustomerCommandByOrderPlugin(), 'OrderCancelByCustomer');
            $commandCollection->add(new SendOrderRefundedCommandByOrderPlugin(), 'SendOrderRefundedEmail');

            // Invoice
            $commandCollection->add(new GenerateInvoiceReferenceCommandByOrderPlugin(), 'Generate invoice reference');
            $commandCollection->add(new SendInvoiceCommandByOrderPlugin(), 'Send invoice');
            $commandCollection->add(new UpdateOrderDueCancelledItemsCommandByOrderPlugin(), 'Cancel and recalculate order');

            // --- Payone
            $commandCollection->add(new PreAuthorizeCommandPlugin(), 'Payone/PreAuthorize');
            $commandCollection->add(new AuthorizeCommandPlugin(), 'Payone/Authorize');
            $commandCollection->add(new CancelCommandPlugin(), 'Payone/Cancel');
            $commandCollection->add(new ReleaseTimeSlotCommandPlugin(), 'TimeSlot/Release');
            $commandCollection->add(new CaptureCommandPlugin(), 'Payone/Capture');
            $commandCollection->add(new RefundCommandPlugin(), 'Payone/Refund');

            // --- Payone partial operations
            $commandCollection->add(new PartialCaptureCommandByOrderPlugin(), 'Payone/PartialCapture');
            $commandCollection->add(new CancelRemainingAmountCommandByOrderPlugin(), 'Payone/CalculateCancelledAmount');
            $commandCollection->add(new PartialRefundCommandPlugin(), 'Payone/PartialRefund');
            $commandCollection->add(new SavePartialRefundCommandPlugin(), 'Payone/SavePartialRefund');

            //AppStore
            $commandCollection->add(new MoveToReadyForPickingCommandPlugin(), 'Sales/MoveToReadyForPicking');
            $commandCollection->add(new ConfirmPickingCommandPlugin(), 'Sales/ConfirmPicking');

            $commandCollection->add(new MoveToReadyForCollectionCommandPlugin(), 'Sales/MoveToReadyForCollection');
            $commandCollection->add(new ConfirmCollectionCommandPlugin(), 'Sales/ConfirmCollection');
            $commandCollection->add(new CancelDueToNotInStockCommandPlugin(), 'Oms/CancelDueToNotInStock');
            $commandCollection->add(new CancelCollectionByCustomerCommandPlugin(), 'Oms/CancelCollectionByCustomer');
            $commandCollection->add(new CancelCollectionByStoreCommandPlugin(), 'Oms/CancelCollectionByStore');

            $commandCollection->add(new MoveToReadyForDeliveryCommandPlugin(), 'Sales/MoveToReadyForDelivery');
            $commandCollection->add(new StartDeliveryCommandPlugin(), 'Sales/StartDelivery');
            $commandCollection->add(new CancelStartDeliveryCommandPlugin(), 'Sales/CancelStartDelivery');
            $commandCollection->add(new ConfirmDeliveryCommandPlugin(), 'Sales/ConfirmDelivery');
            $commandCollection->add(new MarkDeliveryCancelledByCustomerCommandPlugin(), 'Sales/MarkCancelledByCustomer');
            $commandCollection->add(new MarkDeliveryCancelledByStoreCommandPlugin(), 'Sales/MarkCancelledByStore');

            $commandCollection->add(new CancelByTimeoutCommandPlugin(), 'Sales/CancelByTimeout');

            $commandCollection->add(new CashierOrderExportCommandPlugin(), 'CashierOrderExport/OrderExport');

            $commandCollection->add(new CustomerHasOrderWriterCommandPlugin(), 'Customer/SetHasOrdersFlag');

            return $commandCollection;
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendConditionPlugins(Container $container): Container
    {
        $container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
            // --- Payone
            $conditionCollection->add(new PreAuthorizationIsApprovedConditionPlugin(), 'Payone/PreAuthorizationIsApproved');
            $conditionCollection->add(new AuthorizationIsApprovedConditionPlugin(), 'Payone/AuthorizationIsApproved');
            $conditionCollection->add(new CaptureIsApprovedConditionPlugin(), 'Payone/CaptureIsApproved');
            $conditionCollection->add(new RefundIsApprovedConditionPlugin(), 'Payone/RefundIsApproved');
            $conditionCollection->add(new RefundIsPossibleConditionPlugin(), 'Payone/RefundIsPossible');
            $conditionCollection->add(new PreAuthorizationIsErrorConditionPlugin(), 'Payone/PreAuthorizationIsError');
            $conditionCollection->add(new AuthorizationIsErrorConditionPlugin(), 'Payone/AuthorizationIsError');
            $conditionCollection->add(new PreAuthorizationIsRedirectConditionPlugin(), 'Payone/PreAuthorizationIsRedirect');
            $conditionCollection->add(new AuthorizationIsRedirectConditionPlugin(), 'Payone/AuthorizationIsRedirect');
            $conditionCollection->add(new PaymentIsAppointedConditionPlugin(), 'Payone/PaymentIsAppointed');
            $conditionCollection->add(new PaymentIsCaptureConditionPlugin(), 'Payone/PaymentIsCapture');
            $conditionCollection->add(new PaymentIsPaidConditionPlugin(), 'Payone/PaymentIsPaid');
            $conditionCollection->add(new PaymentIsUnderPaidConditionPlugin(), 'Payone/PaymentIsUnderPaid');
            $conditionCollection->add(new PaymentIsRefundConditionPlugin(), 'Payone/PaymentIsRefund');

            // --- Payone partial operations
            $conditionCollection->add(new PartialCaptureIsApprovedConditionPlugin(), 'Payone/PartialCaptureIsApproved');
            $conditionCollection->add(new PartialRefundIsApprovedConditionPlugin(), 'Payone/PartialRefundIsApproved');

            // App
            $conditionCollection->add(new IsTimeToStartPickingConditionPlugin(), 'can start picking');
            $conditionCollection->add(new IsForCollectionConditionPlugin(), 'is for collection');
            $conditionCollection->add(new IsOrderCancelledCondition(), 'is order cancelled');
            $conditionCollection->add(new TrueConditionPlugin(), 'Oms/TrueCondition');
            $conditionCollection->add(new Is1DayPassedConditionPlugin(), 'Oms/Is1DayPassed');
            $conditionCollection->add(new IsExpiredOrderConditionPlugin(), 'Sales/IsExpiredOrder');

            // Invoice
            $conditionCollection->add(new IfTimeToSendInvoiceConditionPlugin(), 'if time to send invoice');

            //Cashier
            $conditionCollection->add(new IsOrderExportedToCashierConditionPlugin(), 'is order exported to cashier');

            return $conditionCollection;
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Oms\Dependency\Plugin\ReservationHandlerPluginInterface[]
     */
    protected function getReservationHandlerPlugins(Container $container)
    {
        return [
            new AvailabilityHandlerPlugin(),
            new LeadProductReservationHandlerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OmsExtension\Dependency\Plugin\ReservationAggregationStrategyPluginInterface[]
     */
    protected function getReservationAggregationStrategyPlugins(): array
    {
        return [
            new ProductPackagingUnitReservationAggregationStrategyPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\OmsExtension\Dependency\Plugin\OmsOrderMailExpanderPluginInterface[]
     */
    protected function getOmsOrderMailExpanderPlugins(Container $container)
    {
        return [
            new ShipmentOrderMailExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\OmsExtension\Dependency\Plugin\OmsManualEventGrouperPluginInterface[]
     */
    protected function getOmsManualEventGrouperPlugins(Container $container)
    {
        return [
            new ShipmentManualEventGrouperPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addMailCmsBlockService(Container $container): Container
    {
        $container->set(self::SERVICE_MAIL_CMS_BLOCK, function (Container $container) {
            return $container->getLocator()->mailCmsBlock()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    private function addMoneyFacade(Container $container)
    {
        $container->set(self::FACADE_MONEY, function (Container $container) {
            return $container->getLocator()->money()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addUtilDateTimeService(Container $container): Container
    {
        $container->set(self::SERVICE_UTIL_DATE_TIME, function (Container $container): UtilDateTimeServiceInterface {
            return $container->getLocator()->utilDateTime()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addPyzSalesFacade(Container $container)
    {
        $container->set(static::PYZ_FACADE_SALES, function (Container $container): SalesFacadeInterface {
            return $container->getLocator()->sales()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addTranslatorsFacade(Container $container): Container
    {
        $container->set(static::FACADE_TRANSLATOR, function (Container $container): TranslatorFacadeInterface {
            return $container->getLocator()->translator()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addDateTimeWithZoneService(Container $container)
    {
        $container->set(self::SERVICE_DATE_TIME_WITH_ZONE, function (Container $container): DateTimeWithZoneServiceInterface {
            return $container->getLocator()->dateTimeWithZone()->service();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addMerchantSalesOrderFacade(Container $container)
    {
        $container->set(static::FACADE_MERCHANT_SALES_ORDER, function (Container $container): MerchantSalesOrderFacadeInterface {
            return $container->getLocator()->merchantSalesOrder()->facade();
        });

        return $container;
    }
}
