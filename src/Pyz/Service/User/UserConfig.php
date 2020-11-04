<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\User;

use Spryker\Service\Kernel\AbstractBundleConfig;

class UserConfig extends AbstractBundleConfig
{
    protected const MINIMAL_PASSWORD_LENGTH = 10;
    protected const REQUIRED_PATTERNS_MATCHES = 3;
    protected const ALLOWED_PATTERNS = [
        '/[a-z]+/',
        '/[A-Z]+/',
        '/\d/',
        '/[^a-zA-Z\d]/',
    ];

    /**
     * @api
     *
     * @return int
     */
    public function getRequiredPatternsMatches(): int
    {
        return static::REQUIRED_PATTERNS_MATCHES;
    }

    /**
     * @api
     *
     * @return string[]
     */
    public function getAllowedPatterns(): array
    {
        return static::ALLOWED_PATTERNS;
    }

    /**
     * @api
     *
     * @return int
     */
    public function getMinimalPasswordLength(): int
    {
        return static::MINIMAL_PASSWORD_LENGTH;
    }
}
