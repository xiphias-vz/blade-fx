<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Checkout\Communication\Console;

use Exception;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\Checkout\Business\CheckoutFacade getFacade()
 * @method \Pyz\Zed\Checkout\Business\CheckoutBusinessFactory getFactory()
 */
class ProcessOrderNewItemsConsole extends Console
{
    public const COMMAND_NAME = 'order:processNewItems';
    public const COMMAND_DESCRIPTION = 'Process new items for order';

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int|null
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            $order = $this->getFacade()->getNewOrderEntity(0);
            while ($order !== null) {
                if ($order == true) {
                    $itemsList = $this->getFacade()->getOrderItemsIdList($order->getIdSalesOrder());
                    $output->writeln(sprintf("ID: %d, ref: %s, count: %d", $order->getIdSalesOrder(), $order->getOrderReference(), count($itemsList)));
                    $this->getFacade()->getOmsFacade()->triggerEventForNewOrderItems($itemsList);
                    $order->setIsNew(false);
                    $order->save();
                    $order = $this->getFacade()->getNewOrderEntity($order->getIdSalesOrder());
                }
            }

            return self::CODE_SUCCESS;
        } catch (Exception $ex) {
            $output->writeln($ex->getMessage());
        }

        return self::CODE_ERROR;
    }
}
