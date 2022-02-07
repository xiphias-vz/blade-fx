<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\ContentBannerGui;

use Spryker\Shared\ContentBannerGui\ContentBannerGuiConfig as SprykerContentBannerGuiConfig;

class ContentBannerGuiConfig extends SprykerContentBannerGuiConfig
{
    protected const WIDGET_TEMPLATE_IDENTIFIER_SLIDER_WITHOUT_LINK = 'slider-without-link';
    protected const WIDGET_TEMPLATE_IDENTIFIER_SLIDER = 'slider';
    protected const WIDGET_TEMPLATE_IDENTIFIER_BANNER_FOR_MOBILE = 'banner-for-mobile';

    /**
     * Content item banner default template name
     */
    protected const WIDGET_TEMPLATE_DISPLAY_NAME_SLIDER = 'content_banner.template.slider';

    /**
     * Content item banner top-title template name
     */
    protected const WIDGET_TEMPLATE_DISPLAY_NAME_SLIDER_WITHOUT_LINK = 'content_banner.template.slider-without-link';

    /**
     * Content item banner default template name
     */
    protected const WIDGET_TEMPLATE_DISPLAY_NAME_BANNER_FOR_MOBILE = 'content_banner.template.banner-for-mobile';

    /**
     * @return array
     */
    public function getContentWidgetTemplates(): array
    {
        return array_merge(
            parent::getContentWidgetTemplates(),
            [
                static::WIDGET_TEMPLATE_IDENTIFIER_SLIDER => static::WIDGET_TEMPLATE_DISPLAY_NAME_SLIDER,
                static::WIDGET_TEMPLATE_IDENTIFIER_SLIDER_WITHOUT_LINK => static::WIDGET_TEMPLATE_DISPLAY_NAME_SLIDER_WITHOUT_LINK,
                static::WIDGET_TEMPLATE_IDENTIFIER_BANNER_FOR_MOBILE => static::WIDGET_TEMPLATE_DISPLAY_NAME_BANNER_FOR_MOBILE,
            ]
        );
    }
}
