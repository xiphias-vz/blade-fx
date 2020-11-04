<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDocument;

use Generated\Shared\Transfer\PdfParametersTransfer;
use Pyz\Shared\Pdf\PdfConfig;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class SalesDocumentConfig extends AbstractBundleConfig
{
    public const FORMAT_MERCHANT_DETAILS = '%s - Filiale - %d';
    public const FORMAT_MERCHANT_DETAILS_OPTION = '%s %s, %s';

    public const PICKING_LIST_PDF_MODE = PdfConfig::PDF_MODE_UTF8;
    public const PICKING_LIST_PDF_ORIENTATION = PdfConfig::PDF_ORIENTATION_LANDSCAPE;

    /**
     * @return \Generated\Shared\Transfer\PdfParametersTransfer
     */
    public function getStorePickingListPdfParameters(): PdfParametersTransfer
    {
        return (new PdfParametersTransfer())
            ->setMode(self::PICKING_LIST_PDF_MODE)
            ->setOrientation(self::PICKING_LIST_PDF_ORIENTATION)
            ->setAutoTopMargin(PdfConfig::PDF_AUTO_TOP_MARGIN);
    }
}
