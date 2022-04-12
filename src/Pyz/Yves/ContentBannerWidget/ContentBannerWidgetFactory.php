<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ContentBannerWidget;

use SprykerShop\Yves\ContentBannerWidget\ContentBannerWidgetFactory as SprykerContentBannerWidgetFactory;
use Twig\Environment;
use Twig\TwigFunction;

class ContentBannerWidgetFactory extends SprykerContentBannerWidgetFactory
{
    /**
     * @param \Twig\Environment $twig
     * @param string $localeName
     *
     * @return TwigFunction
     */
    public function createContentBannerTwigFunction(Environment $twig, string $localeName): TwigFunction
    {
        $functionProvider = $this->createContentBannerTwigFunctionProvider($twig, $localeName);

        return new TwigFunction(
            $functionProvider->getFunctionName(),
            $functionProvider->getFunction(),
            $functionProvider->getOptions()
        );
    }
}
