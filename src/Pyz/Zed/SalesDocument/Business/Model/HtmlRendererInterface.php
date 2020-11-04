<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDocument\Business\Model;

interface HtmlRendererInterface
{
    /**
     * @param string $template
     * @param array $parameters
     *
     * @return string
     */
    public function render(string $template, array $parameters): string;
}
