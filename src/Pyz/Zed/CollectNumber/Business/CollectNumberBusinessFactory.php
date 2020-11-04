<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CollectNumber\Business;

use Pyz\Zed\CollectNumber\Business\Generator\CollectNumberGenerator;
use Pyz\Zed\CollectNumber\Business\Saver\CollectNumberSaver;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\CollectNumber\CollectNumberConfig getConfig()
 * @method \Pyz\Zed\CollectNumber\Persistence\CollectNumberEntityManagerInterface getEntityManager()
 */
class CollectNumberBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\CollectNumber\Business\Saver\CollectNumberSaver
     */
    public function createCollectNumberSaver(): CollectNumberSaver
    {
        return new CollectNumberSaver(
            $this->getEntityManager(),
            $this->createCollectNumberGenerator()
        );
    }

    /**
     * @return \Pyz\Zed\CollectNumber\Business\Generator\CollectNumberGenerator
     */
    private function createCollectNumberGenerator(): CollectNumberGenerator
    {
        return new CollectNumberGenerator(
            $this->getConfig()
        );
    }
}
