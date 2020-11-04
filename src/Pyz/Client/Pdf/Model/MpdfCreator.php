<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Pdf\Model;

use Generated\Shared\Transfer\PdfParametersTransfer;
use Mpdf\Config\ConfigVariables;
use Mpdf\Config\FontVariables;
use Mpdf\Mpdf;
use Pyz\Client\Pdf\PdfConfig;

class MpdfCreator
{
    /**
     * @var \Pyz\Client\Pdf\PdfConfig
     */
    private $config;

    /**
     * @param \Pyz\Client\Pdf\PdfConfig $config
     */
    public function __construct(PdfConfig $config)
    {
        $this->config = $config;
    }

    /**
     * @param \Generated\Shared\Transfer\PdfParametersTransfer $pdfParametersTransfer
     *
     * @return \Mpdf\Mpdf
     */
    public function createMpdf(PdfParametersTransfer $pdfParametersTransfer): Mpdf
    {
        return new Mpdf($this->getMpdfConfig($pdfParametersTransfer));
    }

    /**
     * @param \Generated\Shared\Transfer\PdfParametersTransfer $pdfParametersTransfer
     *
     * @return array
     */
    protected function getMpdfConfig(PdfParametersTransfer $pdfParametersTransfer): array
    {
        if ($pdfParametersTransfer->getDefaultFont() === null) {
            $pdfParametersTransfer->setDefaultFont($this->config->getFontDefault());
        }
        $defaultConfig = (new ConfigVariables())->getDefaults();
        $fontDirs = $defaultConfig['fontDir'];
        $pdfParametersTransfer->addFontDir($this->config->getFontDir());
        $pdfParametersTransfer->setFontDir(array_merge(
            $fontDirs,
            $pdfParametersTransfer->getFontDir()
        ));

        $defaultFontConfig = (new FontVariables())->getDefaults();
        $configFontData = $defaultFontConfig['fontdata'];
        $pdfParametersTransfer->addFontData($this->config->getFontData());
        foreach ($pdfParametersTransfer->getFontData() as $fontData) {
            $configFontData += $fontData;
        }
        $pdfParametersTransfer->setFontData($configFontData);

        return [
            'mode' => $pdfParametersTransfer->getMode(),
            'orientation' => $pdfParametersTransfer->getOrientation(),
            'default_font' => $pdfParametersTransfer->getDefaultFont(),
            'fontDir' => $pdfParametersTransfer->getFontDir(),
            'fontdata' => $pdfParametersTransfer->getFontData(),
            'setAutoTopMargin' => $pdfParametersTransfer->getAutoTopMargin(),
        ];
    }
}
