<?php

namespace BladeFxSpryker\Zed\BladeFx\Business\Caller;

interface BladeFxRequestCallerInterface
{
    /**
     * @param string $url
     * @param string $resource
     * @param string $request
     *
     * @return string
     */
    public function call(string $url, string $resource, string $request): string;
}
