<?php

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
