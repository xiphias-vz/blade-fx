<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Communication;

use Pyz\Zed\BladeFx\Communication\Table\BladeFxTable;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Pyz\Zed\BladeFx\BladeFxConfig getConfig()
 * @method \Pyz\Zed\BladeFx\Business\BladeFxFacadeInterface getFacade()
 */
class BladeFxCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Pyz\Zed\BladeFx\Communication\Table\BladeFxTable
     */
    public function createBladeFXTable(): BladeFxTable
    {
        return new BladeFxTable(
            $this->getFacade()
        );
    }
}
