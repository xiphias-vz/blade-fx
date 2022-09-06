<?php

namespace BladeFxSpryker\Zed\BladeFx\Communication;

use BladeFxSpryker\Zed\BladeFx\Communication\Table\BladeFxTable;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \BladeFxSpryker\Zed\BladeFx\BladeFxConfig getConfig()
 * @method \BladeFxSpryker\Zed\BladeFx\Business\BladeFxFacadeInterface getFacade()
 */
class BladeFxCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \BladeFxSpryker\Zed\BladeFx\Communication\Table\BladeFxTable
     */
    public function createBladeFXTable(): BladeFxTable
    {
        return new BladeFxTable(
            $this->getFacade()
        );
    }
}
