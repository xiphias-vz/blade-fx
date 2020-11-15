<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
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
