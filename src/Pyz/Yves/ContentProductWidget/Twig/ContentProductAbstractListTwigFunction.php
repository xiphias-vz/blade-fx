<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ContentProductWidget\Twig;

use SprykerShop\Yves\ContentProductWidget\Twig\ContentProductAbstractListTwigFunction as SprykerContentProductAbstractListTwigFunction;

/**
 * @method \Pyz\Yves\ContentProductWidget\ContentProductWidgetFactory getFactory()
 */
class ContentProductAbstractListTwigFunction extends SprykerContentProductAbstractListTwigFunction
{
    /**
     * @uses \Pyz\Shared\ContentProductGui\ContentProductGuiConfig::WIDGET_TEMPLATE_IDENTIFIER_NAME_SLIDER_WITH_BUTTON
     */
    protected const WIDGET_TEMPLATE_IDENTIFIER_SLIDER_WITH_BUTTON = 'slider-with-button';

    /**
     * @uses \Pyz\Shared\ContentProductGui\ContentProductGuiConfig::WIDGET_TEMPLATE_IDENTIFIER_SLIDER
     */
    protected const WIDGET_TEMPLATE_IDENTIFIER_SLIDER = 'slider';

    /**
     * @uses \Pyz\Shared\ContentProductGui\ContentProductGuiConfig::WIDGET_TEMPLATE_IDENTIFIER_SLIDER_NOT_INCLUDE_GROUP
     */
    protected const WIDGET_TEMPLATE_IDENTIFIER_SLIDER_NOT_INCLUDE_GROUP = 'slider-not-include-group';

    /**
     * @uses \Pyz\Shared\ContentProductGui\ContentProductGuiConfig::WIDGET_TEMPLATE_IDENTIFIER_PRODUCT_SLIDER_WITH_BUTTON
     */
    protected const WIDGET_TEMPLATE_DISPLAY_PRODUCT_SLIDER_WITH_BUTTON = 'slider-product-with-button';

        /**
         * @return array
         */
    protected function getAvailableTemplates(): array
    {
        return array_merge(
            parent::getAvailableTemplates(),
            [
                static::WIDGET_TEMPLATE_IDENTIFIER_SLIDER_WITH_BUTTON => '@ContentProductWidget/views/cms-product-abstract-and-button/cms-product-abstract-and-button.twig',
                static::WIDGET_TEMPLATE_IDENTIFIER_SLIDER => '@ContentProductWidget/views/cms-product-abstract/cms-product-abstract.twig',
                static::WIDGET_TEMPLATE_IDENTIFIER_SLIDER_NOT_INCLUDE_GROUP => '@ContentProductWidget/views/cms-product-abstract-not-include-group/cms-product-abstract-not-include-group.twig',
                static::WIDGET_TEMPLATE_DISPLAY_PRODUCT_SLIDER_WITH_BUTTON => '@ContentProductWidget/views/cms-product-abstract-group-slider/cms-product-abstract-slider-with-button.twig',
            ]
        );
    }
}
