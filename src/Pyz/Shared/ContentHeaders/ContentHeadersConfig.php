<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\ContentHeaders;

class ContentHeadersConfig
{
    public const CONTENT_TYPE_LABEL = 'Content-Type';
    public const CONTENT_DISPOSITION_VALUE_FORMAT_CSV = 'attachment;filename="%s.csv"';
    public const CONTENT_DISPOSITION_VALUE_FORMAT_JSON = 'attachment;filename="%s.json"';
    public const CONTENT_TYPE_CSV = 'text/csv';
    public const CONTENT_TYPE_JSON = 'application/json';
    public const CONTENT_DISPOSITION_LABEL = 'Content-Disposition';
    public const CACHE_CONTROL_LABEL = 'Cache-Control';
    public const CACHE_CONTROL_VALUE = 'no-store,no-cache';
}
