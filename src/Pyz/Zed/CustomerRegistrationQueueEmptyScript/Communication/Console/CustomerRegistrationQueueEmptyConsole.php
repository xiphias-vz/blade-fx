<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CustomerRegistrationQueueEmptyScript\Communication\Console;

use PDO;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CustomerRegistrationQueueEmptyConsole extends Console
{
    public const COMMAND_NAME = 'customer-registration-queue:empty';
    public const COMMAND_DESCRIPTION = 'Clears customer registration queue by deleting items in queue that are created/added to queue more than 28 hours ago';

    /**
     * @return void
     */
    public function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            $sql = $this->clearCustomerRegistrationQueue();
            $this->getResult($sql, false);
        } catch (Exception $e) {
            dump($e);

            return static::CODE_ERROR;
        }

        return static::CODE_SUCCESS;
    }

    /**
     * @param string $sql
     * @param bool $doFetch
     *
     * @return array
     */
    private function getResult(string $sql, bool $doFetch = true): array
    {
        try {
            $connection = Propel::getConnection();
            $statement = $connection->prepare($sql);
            $statement->execute();

            if ($doFetch) {
                return $statement->fetchAll(PDO::FETCH_NAMED);
            }
        } catch (Exception $e) {
            dump($e);
        }

        return [];
    }

    /**
     * @return string
     */
    protected function clearCustomerRegistrationQueue(): string
    {
        return "DELETE
                FROM pyz_order_pickup_queue
                WHERE TIMESTAMPDIFF(HOUR, created_at, NOW()) > 28 ";
    }
}
