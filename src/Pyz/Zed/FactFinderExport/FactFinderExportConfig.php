<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport;

use Pyz\Shared\FactFinder\FactFinderConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class FactFinderExportConfig extends AbstractBundleConfig
{
    protected const FTP_FILE_SYSTEM_SERVICE_PROVIDER_KEY = 'globus_ftp_fact_finder';

    /**
     * @return string
     */
    public function getFtpFileSystemServiceProviderKey()
    {
        return static::FTP_FILE_SYSTEM_SERVICE_PROVIDER_KEY;
    }

    /**
     * @return string
     */
    public function getDefaultOrderExportDirectoryPath(): string
    {
        return $this->get(FactFinderConstants::FTP_FACT_FINDER_FILES_FOLDER_NAME);
    }
}
