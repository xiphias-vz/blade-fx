<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Pdf;

use Generated\Shared\Transfer\PdfParametersTransfer;
use Pyz\Client\Pdf\Model\MpdfCreator;
use Pyz\Client\Pdf\Model\PdfGenerator;
use Pyz\Client\Pdf\Model\PdfGeneratorInterface;
use Pyz\Client\Pdf\Response\PdfResponse;
use Spryker\Client\Kernel\AbstractFactory;

/**
 * @method \Pyz\Client\Pdf\PdfConfig getConfig()
 */
class PdfFactory extends AbstractFactory
{
    /**
     * @param \Generated\Shared\Transfer\PdfParametersTransfer $pdfParametersTransfer
     *
     * @return \Pyz\Client\Pdf\Model\PdfGenerator
     */
    public function createPdfGenerator(PdfParametersTransfer $pdfParametersTransfer): PdfGeneratorInterface
    {
        return new PdfGenerator(
            $this->createMpdfCreator()->createMpdf($pdfParametersTransfer)
        );
    }

    /**
     * @return \Pyz\Client\Pdf\Model\MpdfCreator
     */
    private function createMpdfCreator(): MpdfCreator
    {
        return new MpdfCreator($this->getConfig());
    }

    /**
     * @return \Pyz\Client\Pdf\Response\PdfResponse
     */
    public function createPdfResponse(): PdfResponse
    {
        return new PdfResponse();
    }
}
