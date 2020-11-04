<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PostingExport\Business;

use DateTime;
use Generated\Shared\Transfer\ExportContentsTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method \Pyz\Zed\PostingExport\Business\PostingExportBusinessFactory getFactory()
 */
class PostingExportFacade extends AbstractFacade implements PostingExportFacadeInterface
{
    /**
     * @inheritDoc
     */
    public function generatePostingExportContent(?DateTime $dateFrom, ?DateTime $dateTo): ExportContentsTransfer
    {
        return $this->getFactory()
            ->createPostingExportContentBuilder()
            ->generateContent($dateFrom, $dateTo);
    }

    /**
     * @inheritDoc
     */
    public function generateSoldProductsContent(?DateTime $dateFrom, ?DateTime $dateTo): ExportContentsTransfer
    {
        return $this->getFactory()
            ->createSoldProductsExportContentBuilder()
            ->generateContent($dateFrom, $dateTo);
    }

    /**
     * @inheritDoc
     */
    public function generatePosExportContent(?DateTime $dateFrom, ?DateTime $dateTo): ExportContentsTransfer
    {
        return $this->getFactory()
            ->createPosExportContentBuilder()
            ->generateContent($dateFrom, $dateTo);
    }

    /**
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
