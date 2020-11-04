<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDocument\Business\Model;

use Twig\Environment;

class HtmlRenderer implements HtmlRendererInterface
{
    /**
     * @var \Twig\Environment
     */
    private $twigEnvironment;

    /**
     * @param \Twig\Environment $twigEnvironment
     */
    public function __construct(Environment $twigEnvironment)
    {
        $this->twigEnvironment = $twigEnvironment;
    }

    /**
     * @param string $template
     * @param array $parameters
     *
     * @return string
     */
    public function render(string $template, array $parameters): string
    {
        $htmlContent = $this->twigEnvironment->render(
            $template,
            $parameters
        );

        return $htmlContent;
    }
}
