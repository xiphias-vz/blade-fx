<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\SalesOrderActions;

use Pyz\Client\SalesOrderActions\Zed\SalesOrderActionsStub;
use Pyz\Client\SalesOrderActions\Zed\SalesOrderActionsStubInterface;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\ZedRequest\ZedRequestClientInterface;

class SalesOrderActionsFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Client\SalesOrderActions\Zed\SalesOrderActionsStubInterface
     */
    public function createZedStub(): SalesOrderActionsStubInterface
    {
        return new SalesOrderActionsStub($this->getZedRequestClient());
    }

    /**
     * @return \Spryker\Client\ZedRequest\ZedRequestClientInterface
     */
    protected function getZedRequestClient(): ZedRequestClientInterface
    {
        return $this->getProvidedDependency(SalesOrderActionsDependencyProvider::CLIENT_ZED_REQUEST);
    }
}
