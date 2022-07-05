<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\StoreSwitcherWidget\StoreSwitcher;

use Symfony\Component\HttpFoundation\Request;
use voku\helper\AntiXSS;

class StoreSwitcherUrlValidation implements StoreSwitcherUrlValidationInterface
{
    public const URL_PARAM_REFERER_URL = 'referer-url';
    public const URL_PARAM_PATH = 'path';

    /**
     * @var \voku\helper\AntiXSS
     */
    protected $antiXSS;

    /**
     * @param \voku\helper\AntiXSS $antiXSS
     */
    public function __construct(AntiXSS $antiXSS)
    {
        $this->antiXSS = $antiXSS;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function validateUrl(Request $request): array
    {
        $myRequestUri = $request->getRequestUri();
        $refererUrl = $this->antiXSS->xss_clean($request->query->get(static::URL_PARAM_REFERER_URL, ''));
        $path = $this->antiXSS->xss_clean($request->query->get(static::URL_PARAM_PATH));

        if (str_contains($refererUrl, "AND")) {
            $refererUrl = str_replace("AND", "-&-", $refererUrl);
        }

        if (str_contains($myRequestUri, 'http')) {
            $refererUrl = '/';
            $path = '';
        }

        if (isset($path) && str_starts_with($path, 'http')) {
            $path = '';
        }

        if (str_starts_with($refererUrl, '/')) {
            $refererUrl = $refererUrl . $path;
        } else {
            $refererUrl = '/';
        }

        return [
            'path' => $path,
            'refererUrl' => $refererUrl,
        ];
    }
}
