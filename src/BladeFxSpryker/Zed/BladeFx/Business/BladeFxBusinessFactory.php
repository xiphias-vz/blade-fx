<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace BladeFxSpryker\Zed\BladeFx\Business;

use BladeFxSpryker\Zed\BladeFx\Business\Caller\BladeFxRequestCaller;
use BladeFxSpryker\Zed\BladeFx\Business\Caller\BladeFxRequestCallerInterface;
use BladeFxSpryker\Zed\BladeFx\Business\Mapper\BladeFxResponseMapper;
use BladeFxSpryker\Zed\BladeFx\Business\Mapper\BladeFxResponseMapperInterface;
use BladeFxSpryker\Zed\BladeFx\Business\Parser\BladeFxResponseParser;
use BladeFxSpryker\Zed\BladeFx\Business\Parser\BladeFxResponseParserInterface;
use BladeFxSpryker\Zed\BladeFx\Business\Provider\BladeFxProvider;
use BladeFxSpryker\Zed\BladeFx\Business\Provider\BladeFxProviderInterface;
use BladeFxSpryker\Zed\BladeFx\Business\Request\BladeFxRequest;
use BladeFxSpryker\Zed\BladeFx\Business\Request\BladeFxRequestInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \BladeFxSpryker\Zed\BladeFx\BladeFxConfig getConfig()
 */
class BladeFxBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \BladeFxSpryker\Zed\BladeFx\Business\Parser\BladeFxResponseParserInterface
     */
    public function createBladeFxResponseParser(): BladeFxResponseParserInterface
    {
        return new BladeFxResponseParser();
    }

    /**
     * @return \BladeFxSpryker\Zed\BladeFx\Business\Mapper\BladeFxResponseMapperInterface
     */
    public function createBladeFxResponseMapper(): BladeFxResponseMapperInterface
    {
        return new BladeFxResponseMapper();
    }

    /**
     * @return \BladeFxSpryker\Zed\BladeFx\Business\Request\BladeFxRequestInterface
     */
    public function createBladeFxRequest(): BladeFxRequestInterface
    {
        return new BladeFxRequest(
            $this->getConfig()
        );
    }

    /**
     * @return \BladeFxSpryker\Zed\BladeFx\Business\Provider\BladeFxProviderInterface
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
     * @return \BladeFxSpryker\Zed\BladeFx\Business\Caller\BladeFxRequestCallerInterface
     */
    public function createBladeFxRequestCaller(): BladeFxRequestCallerInterface
    {
        return new BladeFxRequestCaller();
    }
}
