<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Business;

use Pyz\Zed\BladeFx\Business\Caller\BladeFxRequestCaller;
use Pyz\Zed\BladeFx\Business\Caller\BladeFxRequestCallerInterface;
use Pyz\Zed\BladeFx\Business\Mapper\BladeFxResponseMapper;
use Pyz\Zed\BladeFx\Business\Mapper\BladeFxResponseMapperInterface;
use Pyz\Zed\BladeFx\Business\Parser\BladeFxResponseParser;
use Pyz\Zed\BladeFx\Business\Parser\BladeFxResponseParserInterface;
use Pyz\Zed\BladeFx\Business\Provider\BladeFxProvider;
use Pyz\Zed\BladeFx\Business\Provider\BladeFxProviderInterface;
use Pyz\Zed\BladeFx\Business\Request\BladeFxRequest;
use Pyz\Zed\BladeFx\Business\Request\BladeFxRequestInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\BladeFx\BladeFxConfig getConfig()
 */
class BladeFxBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\BladeFx\Business\Parser\BladeFxResponseParserInterface
     */
    public function createBladeFxResponseParser(): BladeFxResponseParserInterface
    {
        return new BladeFxResponseParser();
    }

    /**
     * @return \Pyz\Zed\BladeFx\Business\Mapper\BladeFxResponseMapperInterface
     */
    public function createBladeFxResponseMapper(): BladeFxResponseMapperInterface
    {
        return new BladeFxResponseMapper();
    }

    /**
     * @return \Pyz\Zed\BladeFx\Business\Request\BladeFxRequestInterface
     */
    public function createBladeFxRequest(): BladeFxRequestInterface
    {
        return new BladeFxRequest(
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Zed\BladeFx\Business\Provider\BladeFxProviderInterface
     */
    public function createBladeFxProvider(): BladeFxProviderInterface
    {
        return new BladeFxProvider(
            $this->createBladeFxRequest(),
            $this->createBladeFxResponseParser(),
            $this->getConfig(),
            $this->createBladeFxRequestCaller(),
            $this->createBladeFxResponseMapper()
        );
    }

    /**
     * @return \Pyz\Zed\BladeFx\Business\Caller\BladeFxRequestCallerInterface
     */
    public function createBladeFxRequestCaller(): BladeFxRequestCallerInterface
    {
        return new BladeFxRequestCaller();
    }
}
