<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Pdf\Response;

use Symfony\Component\HttpFoundation\Response;

class PdfResponse
{
    /**
     * @param string $pdfContent
     * @param string $pdfFileName
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function createInlinePdfResponse(string $pdfContent, string $pdfFileName): Response
    {
        return new Response(
            $pdfContent,
            200,
            [
                'Content-type' => 'application/pdf',
                'Content-disposition' => sprintf('inline; filename="%s"', $pdfFileName),
            ]
        );
    }
}
