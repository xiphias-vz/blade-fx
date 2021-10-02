<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ContentNavigationWidget;

use SprykerShop\Yves\ContentNavigationWidget\ContentNavigationWidgetConfig as SprykerContentNavigationWidget;

class ContentNavigationWidgetConfig extends SprykerContentNavigationWidget
{
    protected const WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_HEADER = 'navigation-header';

    protected const WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_HEADER_MOBILE = 'navigation-header-mobile';

    protected const WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_FOOTER = 'navigation-footer';

    protected const WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_POPULAR_CATEGORIES = 'navigation-categories';

    protected const WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_LEGAL_INFORMATION = 'navigation-legal-information';

    protected const WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_LEGAL_INFORMATION_GREY = 'navigation-legal-information-grey';

    /**
     * @api
     *
     * @return string[]
     */
    public function getAvailableTemplateList(): array
    {
        $availableTemplates = parent::getAvailableTemplateList();
        $availableTemplates += [
            static::WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_HEADER => '@ContentNavigationWidget/views/navigation-header/navigation-header.twig',
            static::WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_HEADER_MOBILE => '@ContentNavigationWidget/views/navigation-header-mobile/navigation-header-mobile.twig',
            static::WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_FOOTER => '@ContentNavigationWidget/views/navigation-footer/navigation-footer.twig',
            static::WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_POPULAR_CATEGORIES => '@ContentNavigationWidget/views/navigation-categories/navigation-categories.twig',
            static::WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_LEGAL_INFORMATION => '@ContentNavigationWidget/views/navigation-legal-information/navigation-legal-information.twig',
            static::WIDGET_TEMPLATE_IDENTIFIER_LIST_NAVIGATION_LEGAL_INFORMATION_GREY => '@ContentNavigationWidget/views/navigation-legal-information-grey/navigation-legal-information-grey.twig',
        ];

        return $availableTemplates;
    }
}
