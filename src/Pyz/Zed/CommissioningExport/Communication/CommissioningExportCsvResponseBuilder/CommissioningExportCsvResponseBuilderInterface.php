<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CommissioningExport\Communication\CommissioningExportCsvResponseBuilder;

use Generated\Shared\Transfer\CommissioningExportContentsTransfer;
use Symfony\Component\HttpFoundation\Response;

interface CommissioningExportCsvResponseBuilderInterface
{
    /**
     * @param \Generated\Shared\Transfer\CommissioningExportContentsTransfer $commissioningExportTransfer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function buildResponse(CommissioningExportContentsTransfer $commissioningExportTransfer): Response;
}
