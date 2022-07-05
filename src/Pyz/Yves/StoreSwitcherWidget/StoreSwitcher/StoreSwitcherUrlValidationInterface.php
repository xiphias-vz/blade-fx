<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\StoreSwitcherWidget\StoreSwitcher;

use Symfony\Component\HttpFoundation\Request;

interface StoreSwitcherUrlValidationInterface
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function validateUrl(Request $request): array;
}
