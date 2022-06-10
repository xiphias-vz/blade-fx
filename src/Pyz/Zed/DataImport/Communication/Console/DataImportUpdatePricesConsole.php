<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console;

use Exception;
use Propel\Runtime\Propel;
use Pyz\Shared\PropelExtension\PropelExtension;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\DataImport\Communication\DataImportCommunicationFactory getFactory()
 */
class DataImportUpdatePricesConsole extends Console
{
    public const COMMAND_NAME = 'import:updatePrices';
    public const COMMAND_DESCRIPTION = 'Update product prices per store from pyz_imp_price_product';
    public const OPTION_CURRENCY = 'currency';
    public const OPTION_CURRENCY_SHORT = 'c';

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);

        parent::configure();
        $this->addOption(static::OPTION_CURRENCY, static::OPTION_CURRENCY_SHORT, InputOption::VALUE_OPTIONAL, 'Define currency - EUR or CZK');
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @throws \Exception
     *
     * @return int|null
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $con = Propel::getConnection();
        $con->beginTransaction();
        try {
            if ($input->hasParameterOption('--' . static::OPTION_CURRENCY) || $input->hasParameterOption('-' . static::OPTION_CURRENCY_SHORT)) {
                $currency = $input->getOption(static::OPTION_CURRENCY);
                $result = PropelExtension::getResultNamed("call pyzx_import_prices('" . $currency . "');", $con);

                if ($result) {
                    $output->writeln($result[0]["result"]);

                    return static::CODE_SUCCESS;
                }
            } else {
                throw new Exception('DEFINE CURRENCY SYMBOL: -c EUR, -c CZK');
            }
        } catch (Exception $ex) {
            $con->rollBack();
            $output->writeln($ex->getMessage());
        }

        return Console::CODE_ERROR;
    }
}
