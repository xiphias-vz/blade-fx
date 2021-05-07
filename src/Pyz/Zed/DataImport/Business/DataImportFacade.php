<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business;

use Spryker\Zed\DataImport\Business\DataImportFacade as SprykerDataImportFacade;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportBusinessFactory getFactory()
 */
class DataImportFacade extends SprykerDataImportFacade implements DataImportFacadeInterface
{
    /**
     * @return void
     */
    public function updateProductAvailability(): void
    {
        $this->getFactory()->createUpdateAvailabilityAfterImport()->updateAvailability();
    }

    /**
     * @return void
     */
    public function downloadDataImportFiles(): void
    {
        $this->getFactory()->createSFTPDataImportFileLoader()->downloadDataImportFiles();
    }

    /**
     * @return void
     */
    public function downloadImagesDataImportFiles(): void
    {
        $this->getFactory()->createSFTPImagesDataImportFileLoader()->downloadDataImportFiles();
    }
}
