<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Business;

use DateTime;
use Generated\Shared\Transfer\ExportContentsTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method \Pyz\Zed\PickingZoneOrderExport\Business\PickingZoneOrderExportBusinessFactory getFactory()
 */
class PickingZoneOrderExportFacade extends AbstractFacade implements PickingZoneOrderExportFacadeInterface
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
    ): ExportContentsTransfer {
        return $this->getFactory()
            ->createPickingZoneOrderExportContentBuilder()
            ->generateContent($idPickingZone, $pickingStore, $datePicking, $timeSlots, $status);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ExportContentsTransfer $exportContentsTransfer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function buildCsvResponse(ExportContentsTransfer $exportContentsTransfer): Response
    {
        return $this->getFactory()
            ->createExportCsvResponseBuilder()
            ->buildResponse($exportContentsTransfer);
    }

    /**
     * @return array
     */
    public function getPickingStores(): array
    {
        return $this->getFactory()
            ->createPickingStoresReader()
            ->getPickingStores();
    }
}
