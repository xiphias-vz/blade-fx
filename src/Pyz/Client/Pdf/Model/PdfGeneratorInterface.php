<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Pdf\Model;

interface PdfGeneratorInterface
{
    /**
     * @param string $htmlSource
     *
     * @return string
     */
    public function generateFromHtml(string $htmlSource): string;
}
