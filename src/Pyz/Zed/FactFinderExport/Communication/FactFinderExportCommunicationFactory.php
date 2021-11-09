<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport\Communication;

use Pyz\Zed\FactFinderExport\Business\Writer\FactFinderExportWriter;
use Pyz\Zed\FactFinderExport\FactFinderExportDependencyProvider;
use Spryker\Service\FileSystem\FileSystemServiceInterface;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Pyz\Zed\FactFinderExport\FactFinderExportConfig getConfig()
 */
class FactFinderExportCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Pyz\Zed\FactFinderExport\Business\Writer\FactFinderExportWriter
     */
    public function createFactFinderExportWriter(): FactFinderExportWriter
    {
        return new FactFinderExportWriter(
            $this->getFileSystemService(),
            $this->getConfig()
        );
    }

    /**
     * @return \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    public function getFileSystemService(): FileSystemServiceInterface
    {
        return $this->getProvidedDependency(FactFinderExportDependencyProvider::SERVICE_FILE_SYSTEM);
    }
}
