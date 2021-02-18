<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Communication\Plugin\DataExport;

use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Generated\Shared\Transfer\DataExportReportTransfer;
use Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityExporterPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\SalesDataExport\Business\SalesDataExportFacade getFacade()
 * @method \Pyz\Zed\SalesDataExport\SalesDataExportConfig getConfig()
 * @method \Pyz\Zed\SalesDataExport\Communication\SalesDataExportCommunicationFactory getFactory()
 */
class OrderDataEntityExporterPlugin extends AbstractPlugin implements DataEntityExporterPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public static function getDataEntity(): string
    {
        return 'order';
    }

    /**
     * {@inheritDoc}
     * - Exports orders data according to configuration in `DataExportConfigurationTransfer`.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportReportTransfer
     */
    public function export(DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportReportTransfer
    {
        return $this->getFacade()->exportOrder($dataExportConfigurationTransfer);
    }
}
