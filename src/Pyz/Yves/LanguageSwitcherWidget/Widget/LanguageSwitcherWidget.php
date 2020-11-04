<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Yves\LanguageSwitcherWidget\Widget;

use Generated\Shared\Transfer\UrlStorageTransfer;
use SprykerShop\Yves\LanguageSwitcherWidget\Widget\LanguageSwitcherWidget as SprykerLanguageSwitcherWidget;

class LanguageSwitcherWidget extends SprykerLanguageSwitcherWidget
{
    /**
     * @param string $pathInfo
     * @param string $queryString
     * @param string $requestUri
     */
    public function __construct(string $pathInfo, $queryString, string $requestUri)
    {
        parent::__construct($pathInfo, $queryString, $requestUri);
    }

    /**
     * @param array $locales
     * @param array $localeUrls
     * @param string $queryString
     *
     * @return array
     */
    protected function attachLocaleUrlsFromStorageToLanguages(
        array $locales,
        array $localeUrls,
        $queryString
    ): array {
        $languages = [];
        foreach ($locales as $locale) {
            $language = $this->getLanguageFromLocale($locale);
            foreach ($localeUrls as $localeUrl) {
                if ($localeUrl[UrlStorageTransfer::LOCALE_NAME] === $locale) {
                    $languages[$language] = $localeUrl[UrlStorageTransfer::URL];
                    if ($queryString) {
                        $languages[$language] .= '?' . $queryString;
                    }

                    break;
                }
            }
        }

        return $languages;
    }
}
