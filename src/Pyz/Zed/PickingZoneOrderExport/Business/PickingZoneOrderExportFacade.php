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
     * {@inheritDoc}
     *
     * @api
     *
     * @param int $idPickingZone
     * @param \DateTime $datePicking
     *
     * @return \Generated\Shared\Transfer\ExportContentsTransfer
     */
    public function generatePickingZoneOrderExportContent(
        int $idPickingZone,
        DateTime $datePicking
    ): ExportContentsTransfer {
        return $this->getFactory()
            ->createPickingZoneOrderExportContentBuilder()
            ->generateContent($idPickingZone, $datePicking);
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
}