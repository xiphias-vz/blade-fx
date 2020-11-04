<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PostingExport\Business;

use DateTime;
use Generated\Shared\Transfer\ExportContentsTransfer;
use Symfony\Component\HttpFoundation\Response;

interface PostingExportFacadeInterface
{
    /**
     * @param \DateTime|null $dateFrom
     * @param \DateTime|null $dateTo
     *
     * @return \Generated\Shared\Transfer\ExportContentsTransfer
     */
    public function generatePostingExportContent(?DateTime $dateFrom, ?DateTime $dateTo): ExportContentsTransfer;

    /**
     * @param \DateTime|null $dateFrom
     * @param \DateTime|null $dateTo
     *
     * @return \Generated\Shared\Transfer\ExportContentsTransfer
     */
    public function generateSoldProductsContent(?DateTime $dateFrom, ?DateTime $dateTo): ExportContentsTransfer;

    /**
     * @param \DateTime|null $dateFrom
     * @param \DateTime|null $dateTo
     *
     * @return \Generated\Shared\Transfer\ExportContentsTransfer
     */
    public function generatePosExportContent(?DateTime $dateFrom, ?DateTime $dateTo): ExportContentsTransfer;

    /**
     * @param \Generated\Shared\Transfer\ExportContentsTransfer $exportContentsTransfer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function buildCsvResponse(ExportContentsTransfer $exportContentsTransfer): Response;
}
