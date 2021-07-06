<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataExport;

use Pyz\Service\DataExport\Writer\DataExportLocalWriter;
use Spryker\Service\DataExport\DataExportServiceFactory as SpyDataExportServiceFactory;
use Spryker\Service\DataExport\Writer\DataExportWriterInterface;
use Spryker\Service\FileSystem\FileSystemServiceInterface;

class DataExportServiceFactory extends SpyDataExportServiceFactory
{
    /**
     * @return \Spryker\Service\DataExport\Writer\DataExportWriterInterface
     */
    public function createDataExportLocalWriter(): DataExportWriterInterface
    {
        return new DataExportLocalWriter(
            $this->createDataExportFormatter(),
            $this->createDataExportPathResolver(),
            $this->getConfig(),
            $this->getFileSystemService()
        );
    }

    /**
     * @return \Spryker\Service\FileSystem\FileSystemServiceInterface
     */
    public function getFileSystemService(): FileSystemServiceInterface
    {
        return $this->getProvidedDependency(DataExportDependencyProvider::SERVICE_FILE_SYSTEM);
    }
}
