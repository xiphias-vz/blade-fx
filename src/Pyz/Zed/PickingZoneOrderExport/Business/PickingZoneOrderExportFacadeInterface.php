<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Business;

use DateTime;
use Generated\Shared\Transfer\ExportContentsTransfer;
use Symfony\Component\HttpFoundation\Response;

interface PickingZoneOrderExportFacadeInterface
{
    /**
     * Specification:
     * - Generates content for picking zone order export.
     *
     * @api
     *
     * @param int $idPickingZone
     * @param string $pickingStore
     * @param \DateTime $datePicking
     * @param array $timeSlots
     * @param string $status
     *
     * @return \Generated\Shared\Transfer\ExportContentsTransfer
     */
    public function generatePickingZoneOrderExportContent(
        int $idPickingZone,
        string $pickingStore,
        DateTime $datePicking,
        array $timeSlots,
        string $status
    ): ExportContentsTransfer;

    /**
     * Specification:
     * - Builds response for downloading CSV files.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ExportContentsTransfer $exportContentsTransfer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function buildCsvResponse(ExportContentsTransfer $exportContentsTransfer): Response;
}
