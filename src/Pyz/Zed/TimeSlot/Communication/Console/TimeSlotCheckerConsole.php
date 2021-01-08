<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Communication\Console;

use Generated\Shared\Transfer\OrderCriteriaFilterTransfer;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface getFacade()
 * @method \Pyz\Zed\TimeSlot\Communication\TimeSlotCommunicationFactory getFactory()
 */
class TimeSlotCheckerConsole extends Console
{
    public const COMMAND_NAME = 'timeslot:check'; // e.g. 'catalog:import'
    public const COMMAND_DESCRIPTION = 'Check and update time slots';
    public const SHIPMENT_NAME = 'Click & Collect';

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
        $client = $this->getFactory()->getStorageClient();
        foreach ($client->getKeys('*click*:*-*:*:*') as $key) {
            $key = explode(':', $key, 2)[1];
            $val = $client->get($key);
            $keyParts = explode('_', $key);
            $merchantReference = $keyParts[0];
            $deliveryDate = $keyParts[count($keyParts) - 2] . '_' . $keyParts[count($keyParts) - 1];
            $deliveryDate = substr($deliveryDate, 0, strrpos($deliveryDate, ':'));

            $currentOrdersCount = count($this->getFactory()->getSalesFacade()
                ->findIdSalesOrdersByOrderFilterCriteria(
                    (new OrderCriteriaFilterTransfer())
                        ->setMerchantReferences([$merchantReference])
                        ->setRequestedDeliveryDate($deliveryDate)
                        ->setShipmentName(static::SHIPMENT_NAME)
                        ->setExcludeCancelledOrders(true)
                ));

            if (!$val || $val !== $currentOrdersCount) {
                $client->set($key, $currentOrdersCount);
                $output->writeln(sprintf('%s updated %d => %d', $key, $val, $currentOrdersCount));
            }

            $output->writeln(sprintf('%s = %d', $key, $currentOrdersCount));
        }
    }
}
