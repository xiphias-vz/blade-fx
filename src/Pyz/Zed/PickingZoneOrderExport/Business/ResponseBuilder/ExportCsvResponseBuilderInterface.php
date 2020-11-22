<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Business\ResponseBuilder;

use Generated\Shared\Transfer\ExportContentsTransfer;
use Symfony\Component\HttpFoundation\Response;

interface ExportCsvResponseBuilderInterface
{
    /**
     * @param \Generated\Shared\Transfer\ExportContentsTransfer $exportContentsTransfer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function buildResponse(ExportContentsTransfer $exportContentsTransfer): Response;
}
