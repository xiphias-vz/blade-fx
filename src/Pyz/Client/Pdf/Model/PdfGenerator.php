<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Pdf\Model;

use Mpdf\Mpdf;
use Mpdf\Output\Destination;

class PdfGenerator implements PdfGeneratorInterface
{
    /**
     * @var \Mpdf\Mpdf
     */
    private $mpdf;

    /**
     * @param \Mpdf\Mpdf $mpdf
     */
    public function __construct(Mpdf $mpdf)
    {
        $this->mpdf = $mpdf;
    }

    /**
     * @param string $htmlSource
     *
     * @return string PDF string output
     */
    public function generateFromHtml(string $htmlSource): string
    {
        $this->mpdf->WriteHTML($htmlSource);

        return $this->mpdf->Output('', Destination::STRING_RETURN);
    }
}
