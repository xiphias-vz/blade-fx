<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Business;

use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Generated\Shared\Transfer\DataExportReportTransfer;

interface SalesDataExportFacadeInterface
{
    /**
     * Specification
     * - Exports orders according to configuration in `DataExportConfigurationTransfer`.
     * - Merges module level configuration with provided `DataExportConfigurationTransfer`.
     * - Returns results of export in `DataExportReportTransfer`.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportReportTransfer
     */
    public function exportOrder(DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportReportTransfer;

    /**
     * Specification
     * - Exports order items according to configuration in `DataExportConfigurationTransfer`.
     * - Merges module level configuration with provided `DataExportConfigurationTransfer`.
     * - Returns results of export in `DataExportReportTransfer`.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportReportTransfer
     */
    public function exportOrderItem(DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportReportTransfer;

    /**
     * Specification
     * - Exports order expenses according to configuration in `DataExportConfigurationTransfer`.
     * - Merges module level configuration with provided `DataExportConfigurationTransfer`.
     * - Returns results of export in `DataExportReportTransfer`.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportReportTransfer
     */
    public function exportOrderExpense(DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportReportTransfer;

    /**
     * Specification
     * - Exports order items according to configuration in `DataExportConfigurationTransfer`.
     * - Merges module level configuration with provided `DataExportConfigurationTransfer`.
     * - Returns results of export in `DataExportReportTransfer`.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportReportTransfer
     */
    public function exportCustomOrderItem(DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportReportTransfer;
}
