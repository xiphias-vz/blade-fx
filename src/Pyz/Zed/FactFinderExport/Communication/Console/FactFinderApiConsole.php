<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport\Communication\Console;

use Elastica\JSON;
use Pyz\Zed\FactFinderExport\Business\Model\FactFinderEventManager;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\FactFinderExport\Communication\FactFinderExportCommunicationFactory getFactory()
 */
class FactFinderApiConsole extends Console
{
    public const COMMAND_NAME = 'factfinder:publish';
    public const COMMAND_DESCRIPTION = 'send command to factfinder api';

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
            $manager = new FactFinderEventManager();
            $results = $manager->publishPreparedEvents();
            foreach ($results as $key => $result) {
                $counter = 0;
                $results[$key]["deleteList"] = [];
                foreach ($result as $item) {
                    if ($item["success"]) {
                        $counter++;
                        if (!in_array($item["fk_product_abstract"], $results[$key]["deleteList"])) {
                            $results[$key]["deleteList"][] = $item["fk_product_abstract"];
                        }
                    } else {
                        $output->writeln($key . ": " . JSON::stringify($item));
                    }
                }
                $results[$key]["success"] = $counter;
            }
            foreach ($results as $key => $result) {
                $output->writeln($key . " successed: " . $result["success"] . " items.");
                $manager->clearEvents($key, $result["deleteList"]);
            }
        } catch (Exception $e) {
            dump($e);

            return static::CODE_ERROR;
        }

        return static::CODE_SUCCESS;
    }
}
