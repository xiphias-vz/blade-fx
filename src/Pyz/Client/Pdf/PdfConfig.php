<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Pdf;

use Pyz\Shared\Pdf\PdfConstants;
use Spryker\Client\Kernel\AbstractBundleConfig;

class PdfConfig extends AbstractBundleConfig
{
    /**
     * @return string
     */
    public function getFontDir(): string
    {
        return $this->get(PdfConstants::FONT_DIR);
    }

    /**
     * @return array
     */
    public function getFontData(): array
    {
        return $this->get(PdfConstants::FONT_DATA);
    }

    /**
     * @return string
     */
    public function getFontDefault(): string
    {
        return $this->get(PdfConstants::FONT_DEFAULT);
    }
}
