<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Plugin\ProductStock\Hook;

use Spryker\Zed\DataImport\Business\Model\DataImporterAfterImportInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\DataImport\DataImportConfig getConfig()
 * @method \Pyz\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\DataImport\Communication\DataImportCommunicationFactory getFactory()
 */
class UpdateAvailabilityAfterImportPlugin extends AbstractPlugin implements DataImporterAfterImportInterface
{
    /**
     * @return void
     */
    public function afterImport(): void
    {
        $this->getFacade()->updateProductAvailability();
    }
}
