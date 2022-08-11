<?php

declare(strict_types = 1);

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\UrlStorage\Communication\Console;

use Exception;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Spryker\Zed\UrlStorage\Business\UrlStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\UrlStorage\Persistence\UrlStorageRepositoryInterface getRepository()
 */
class UrlStorageConsole extends Console
{
    protected const COMMAND_NAME = 'urlstorage:publish:url';
    public const ARGUMENT_URL_ID = 'urlId';
    public const ARGUMENT_URL_ID_DESCRIPTION = 'id from spy_url table';

    /**
     * @return void
     */
    protected function configure(): void
    {
        $this
            ->setName(static::COMMAND_NAME)
            ->setDescription('PUBLISH URL')
            ->addArgument(
                self::ARGUMENT_URL_ID,
                InputArgument::OPTIONAL,
                self::ARGUMENT_URL_ID_DESCRIPTION
            );
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @throws \Exception
     *
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $result = false; // execute facade call here
        $urlId = $input->getArgument(self::ARGUMENT_URL_ID);

        try {
            if ($urlId === null) {
                throw new Exception('No urlId is given!');
            }
            $this->getFacade()->publishUrl(explode(",", $urlId));
            $result = true;
        } catch (Exception $ex) {
            $output->writeln($ex->getMessage());
        }

        if ($result) {
            return static::CODE_SUCCESS;
        }

        return static::CODE_ERROR;
    }
}
