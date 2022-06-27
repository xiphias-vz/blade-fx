<?php

namespace Pyz\Yves\StoreSwitcherWidget\StoreSwitcher;

use Symfony\Component\HttpFoundation\Request;

interface StoreSwitcherUrlValidationInterface
{
    /**
     * @param Request $request
     * @return array
     */
    public function validateUrl(Request $request): array;
}
