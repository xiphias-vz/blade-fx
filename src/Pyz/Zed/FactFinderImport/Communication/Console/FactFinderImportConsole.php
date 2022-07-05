<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderImport\Communication\Console;

use Exception;
use Pyz\Shared\FactFinder\Business\Api\FactFinderApiClient;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class FactFinderImportConsole extends Console
{
    public const COMMAND_NAME = 'fact-finder:import';
    public const COMMAND_DESCRIPTION = 'Importing data on FactFinder.';

    protected const OPTION_DETAILS = 'details';
    protected const OPTION_SHORTCUT_DETAILS = 'd';

    protected const ARGUMENT_IMPORT_TYPE = 'ARGUMENT_IMPORT_TYPE';

    private const LIST_OF_AVAILABLE_ARGUMENTS = [
        'all' => 'all',
        'search' => 'search',
        'suggest' => 'suggest',
        'geo' => 'geo',
        'ranking' => 'ranking',
        'recommendation' => 'recommendation',
        'customerprices' => 'customerprices',
        'customerPrices' => 'customerprices',
        'customer-prices' => 'customerprices',
        'customer_prices' => 'customerprices',
        'refreshrecommendation' => 'refreshRecommendations',
        'refreshRecommendation' => 'refreshRecommendations',
        'refresh-recommendation' => 'refreshRecommendations',
        'refresh_recommendation' => 'refreshRecommendations',
    ];

    /**
     * @return void
     */
    public function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);
        $this->addOption(self::OPTION_DETAILS, static::OPTION_SHORTCUT_DETAILS, InputOption::VALUE_OPTIONAL, 'Show response from API.');
        $this->addArgument(self::ARGUMENT_IMPORT_TYPE, InputArgument::OPTIONAL, 'Argument to know which type of import to do.', 'all');

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $argument = $input->getArgument(static::ARGUMENT_IMPORT_TYPE);
        $resultCodeArray = [];

        if (array_key_exists($argument, self::LIST_OF_AVAILABLE_ARGUMENTS)) {
            if ($argument === 'all') {
                $allTypes = $this->listToArrayWithoutDuplicates();
                foreach ($allTypes as $type) {
                    $resultCodeArray[] = $this->doImport($type, $input, $output);
                }
            } else {
                $resultCodeArray[] = $this->doImport(self::LIST_OF_AVAILABLE_ARGUMENTS[$argument], $input, $output);
            }
        } else {
            $this->error(sprintf("%s is not a valid argument. Available arguments are: %s", $argument, $this->listToString()));

            $resultCodeArray[] = static::CODE_ERROR;
        }
        if (!in_array(1, $resultCodeArray)) {
            return self::CODE_SUCCESS;
        } else {
            return self::CODE_ERROR;
        }
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     *
     * @return bool
     */
    protected function isDetailsOptionProvided(InputInterface $input): bool
    {
        return $input->hasParameterOption([
            '--' . static::OPTION_DETAILS,
            '-' . static::OPTION_SHORTCUT_DETAILS,
        ]);
    }

    /**
     * @param string $type
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    private function doImport(string $type, InputInterface $input, OutputInterface $output): int
    {
        try {
            $result = FactFinderApiClient::import($type);
            $result = isset($result[0]) === true ? $result[0] : $result;

            if ($this->isDetailsOptionProvided($input)) {
                dump("Importing " . $type);
                dump($result);
            }

            if (isset($result['errorMessages']) && count($result['errorMessages']) > 0) {
                return self::CODE_ERROR;
            }
        } catch (Exception $e) {
            dump($e);

            return self::CODE_ERROR;
        }

        return self::CODE_SUCCESS;
    }

    /**
     * @return string
     */
    private function listToString(): string
    {
        $stringToSend = '';
        $previousArg = '';
        foreach (self::LIST_OF_AVAILABLE_ARGUMENTS as $arg) {
            if ($previousArg !== $arg) {
                $stringToSend .= $arg . ', ';
                $previousArg = $arg;
            }
        }

        if ($stringToSend !== '') {
            $stringToSend = substr($stringToSend, 0, strlen($stringToSend) - 2);
        }

        return $stringToSend;
    }

    /**
     * @return array
     */
    private function listToArrayWithoutDuplicates(): array
    {
        $arrayToSend = [];
        $previousValue = '';

        foreach (self::LIST_OF_AVAILABLE_ARGUMENTS as $value) {
            if ($value !== $previousValue) {
                $arrayToSend[] = $value;
                $previousValue = $value;
            }
        }
        array_shift($arrayToSend);

        return $arrayToSend;
    }
}
