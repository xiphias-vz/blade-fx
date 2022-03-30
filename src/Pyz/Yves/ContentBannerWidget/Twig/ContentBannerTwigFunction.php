<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ContentBannerWidget\Twig;

use SprykerShop\Yves\ContentBannerWidget\Twig\ContentBannerTwigFunctionProvider as SprykerContentBannerTwigFunctionProvider;

class ContentBannerTwigFunction extends SprykerContentBannerTwigFunctionProvider
{
    protected const WIDGET_TEMPLATE_IDENTIFIER_SLIDER = 'slider';
    protected const WIDGET_TEMPLATE_IDENTIFIER_SLIDER_WITHOUT_LINK = 'slider-without-link';
    protected const WIDGET_TEMPLATE_IDENTIFIER_BANNER_FOR_MOBILE = 'banner-for-mobile';

    /**
     * @return array
     */
    protected function getAvailableTemplates(): array
    {
        return array_merge(
            parent::getAvailableTemplates(),
            [
                static::WIDGET_TEMPLATE_IDENTIFIER_SLIDER => '@ContentBannerWidget/views/slider/slider.twig',
                static::WIDGET_TEMPLATE_IDENTIFIER_SLIDER_WITHOUT_LINK => '@ContentBannerWidget/views/slider-without-link/slider-without-link.twig',
                static::WIDGET_TEMPLATE_IDENTIFIER_BANNER_FOR_MOBILE => '@ContentBannerWidget/views/banner-for-mobile/banner-for-mobile.twig',

            ]
        );
    }
}
