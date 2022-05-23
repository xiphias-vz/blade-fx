<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication;

use Pyz\Zed\DataImport\Communication\Console\Executor\DataImportExecutor;
use Pyz\Zed\DataImport\Communication\Plugin\ExecEvents\ExecEventsPlugin;
use Spryker\Zed\DataImport\Communication\Console\Executor\DataImportExecutorInterface;
use Spryker\Zed\DataImport\Communication\DataImportCommunicationFactory as SprykerDataImportCommunicationFactory;

class DataImportCommunicationFactory extends SprykerDataImportCommunicationFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Communication\Console\Executor\DataImportExecutorInterface
     */
    public function createDataImportExecutor(): DataImportExecutorInterface
    {
        return new DataImportExecutor(
            $this->createDataImportConfigurationYamlParser(),
            $this->getFacade()
        );
    }

    /**
     * @return ExecEventsPlugin
     */
    public function getExecEventsPlugin(): ExecEventsPlugin {
        return new ExecEventsPlugin();
    }
}
