<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Pdf;

use Generated\Shared\Transfer\PdfParametersTransfer;
use Symfony\Component\HttpFoundation\Response;

interface PdfClientInterface
{
    /**
     * Specification:
     * - create pdf content from html content
     *
     * @api
     *
     * @param string $html
     * @param \Generated\Shared\Transfer\PdfParametersTransfer $pdfParametersTransfer
     *
     * @return string
     */
    public function generateFromHTML(string $html, PdfParametersTransfer $pdfParametersTransfer): string;

    /**
     * Specification:
     * - create response with file content.
     *
     * @api
     *
     * @param string $pdfContent
     * @param string $pdfFileName
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function createInlinePdfResponse(string $pdfContent, string $pdfFileName): Response;
}
