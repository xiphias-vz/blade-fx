<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Checkout;

use Pyz\Zed\CollectNumber\Communication\Plugin\CheckoutOrderSaver\GenerateCollectNumberCheckoutOrderSaverPlugin;
use Pyz\Zed\DataDog\Communication\Plugin\Checkout\DataDogCheckoutPostSaveHookPlugin;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Pyz\Zed\TimeSlot\Communication\Plugin\TimeSlotAvailabilityPreConditionCheckerPlugin;
use Spryker\Zed\CartNote\Communication\Plugin\Checkout\CartNoteSaverPlugin;
use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Customer\Communication\Plugin\Checkout\CustomerOrderSavePlugin;
use Spryker\Zed\Customer\Communication\Plugin\CustomerPreConditionCheckerPlugin;
use Spryker\Zed\Discount\Communication\Plugin\Checkout\DiscountOrderSavePlugin;
use Spryker\Zed\Discount\Communication\Plugin\Checkout\VoucherDiscountMaxUsageCheckoutPreConditionPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Merchant\Communication\Plugin\Checkout\MerchantCheckoutPreConditionPlugin;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentOrderSaverPlugin;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentPostCheckPlugin;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentPreCheckPlugin;
use Spryker\Zed\ProductOption\Communication\Plugin\Checkout\ProductOptionOrderSaverPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Checkout\AmountAvailabilityCheckoutPreConditionPlugin;
use Spryker\Zed\Sales\Communication\Plugin\Checkout\SalesOrderSaverPlugin;
use Spryker\Zed\Sales\Communication\Plugin\SalesOrderExpanderPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout\SalesOrderThresholdCheckoutPreConditionPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout\SalesOrderThresholdExpenseSavePlugin;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\Checkout\ItemMetadataSaverPlugin;
use Spryker\Zed\Shipment\Communication\Plugin\Checkout\OrderShipmentSavePlugin;
use Spryker\Zed\ShipmentCheckoutConnector\Communication\Plugin\Checkout\ShipmentCheckoutPreCheckPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    public const FACADE_SALES = 'FACADE_SALES';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container->set(static::CHECKOUT_PRE_CONDITIONS, function (Container $container) {
            return $this->getCheckoutPreConditions($container);
        });

        $container->set(static::CHECKOUT_ORDER_SAVERS, function (Container $container) {
            return $this->getCheckoutOrderSavers($container);
        });

        $container->set(static::CHECKOUT_POST_HOOKS, function (Container $container) {
            return $this->getCheckoutPostHooks($container);
        });

        $container->set(static::CHECKOUT_PRE_SAVE_HOOKS, function (Container $container) {
            return $this->getCheckoutPreSaveHooks($container);
        });

        $container = $this->addOmsFacade($container);
        $container = $this->addSalesOrderFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container ’
     *
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            new CustomerPreConditionCheckerPlugin(),
            new PaymentPreCheckPlugin(),
            new SalesOrderThresholdCheckoutPreConditionPlugin(), #SalesOrderThresholdFeature
            new VoucherDiscountMaxUsageCheckoutPreConditionPlugin(),
            new ShipmentCheckoutPreCheckPlugin(),
            new TimeSlotAvailabilityPreConditionCheckerPlugin(),
            new AmountAvailabilityCheckoutPreConditionPlugin(),
            new MerchantCheckoutPreConditionPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[]
     */
    protected function getCheckoutOrderSavers(Container $container)
    {
        /** @var \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[] $plugins */
        $plugins = [
            new CustomerOrderSavePlugin(),
            new SalesOrderSaverPlugin(),
            new CartNoteSaverPlugin(), #CartNoteFeature
            new ProductOptionOrderSaverPlugin(),
            new ItemMetadataSaverPlugin(),
            new OrderShipmentSavePlugin(),
            new DiscountOrderSavePlugin(),
            new PaymentOrderSaverPlugin(),
            new SalesOrderThresholdExpenseSavePlugin(), #SalesOrderThresholdFeature
            new GenerateCollectNumberCheckoutOrderSaverPlugin(),
        ];

        return $plugins;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPostSaveHookInterface[]
     */
    protected function getCheckoutPostHooks(Container $container)
    {
        return [
            new PaymentPostCheckPlugin(),
            new DataDogCheckoutPostSaveHookPlugin(), #DataDog Business KPI. Executes after payment.
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveHookInterface[]|\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveInterface[]
     */
    protected function getCheckoutPreSaveHooks(Container $container)
    {
        return [
            new SalesOrderExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addSalesOrderFacade(Container $container)
    {
        $container->set(self::FACADE_SALES, function (Container $container): SalesFacadeInterface {
            return $container->getLocator()->sales()->facade();
        });

        return $container;
    }
}
