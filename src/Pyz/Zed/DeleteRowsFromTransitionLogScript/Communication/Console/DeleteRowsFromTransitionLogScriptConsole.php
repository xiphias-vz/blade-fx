<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DeleteRowsFromTransitionLogScript\Communication\Console;

use PDO;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class DeleteRowsFromTransitionLogScriptConsole extends Console
{
    public const COMMAND_NAME = 'transition-log-old-date:delete';
    public const COMMAND_DESCRIPTION = 'Deletes rows from table spy_oms_transition_log that have date field created_at older than 14 days';

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
            $sql = $this->deleteRowsFromTransitionLog();
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
    protected function deleteRowsFromTransitionLog(): string
    {
        return "DELETE FROM spy_oms_transition_log
                WHERE created_at < DATE_ADD(now(), interval -14 day) ";
    }
}
