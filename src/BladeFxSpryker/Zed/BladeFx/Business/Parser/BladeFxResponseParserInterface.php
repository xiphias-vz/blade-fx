<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace BladeFxSpryker\Zed\BladeFx\Business\Parser;

interface BladeFxResponseParserInterface
{
    /**
     * @param string $response
     * @param string $pathNamespace
     *
     * @return array
     */
    public function parse(string $response, string $pathNamespace): array;
}
