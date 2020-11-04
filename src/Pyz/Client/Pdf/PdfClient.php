<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Pdf;

use Generated\Shared\Transfer\PdfParametersTransfer;
use Spryker\Client\Kernel\AbstractClient;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method \Pyz\Client\Pdf\PdfFactory getFactory()
 */
class PdfClient extends AbstractClient implements PdfClientInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $html
     * @param \Generated\Shared\Transfer\PdfParametersTransfer $pdfParametersTransfer
     *
     * @return string
     */
    public function generateFromHTML(string $html, PdfParametersTransfer $pdfParametersTransfer): string
    {
        return $this->getFactory()
            ->createPdfGenerator($pdfParametersTransfer)
            ->generateFromHtml($html);
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $pdfContent
     * @param string $pdfFileName
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function createInlinePdfResponse(string $pdfContent, string $pdfFileName): Response
    {
        return $this->getFactory()
            ->createPdfResponse()
            ->createInlinePdfResponse($pdfContent, $pdfFileName);
    }
}
