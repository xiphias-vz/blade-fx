<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImportCZ\Business;

use Pyz\Zed\DataImport\Business\DataImportBusinessFactory as PyzDataImportBusinessFactory;
use Pyz\Zed\DataImportCZ\Business\Model\BaseProduct\ProductDepositOptionStep;
use Pyz\Zed\DataImportCZ\Business\Model\ProductAbstract\ProductAbstractWriterStep;
use Pyz\Zed\DataImportCZ\Business\Model\ProductConcrete\ProductConcreteWriter;
use Pyz\Zed\DataImportCZ\Business\Model\ProductPrice\ProductPriceWriterStep;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;

/**
 * @method \Pyz\Zed\DataImport\DataImportConfig getConfig()
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 * @SuppressWarnings(PHPMD.ExcessiveClassLength)
 */
class DataImportBusinessFactory extends PyzDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    protected function createProductConcreteWriter(): DataImportStepInterface
    {
        return new ProductConcreteWriter(
            $this->createProductRepository(),
            $this->getConfig()
        );
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    protected function createProductAbstractWriterStep(): DataImportStepInterface
    {
        return new ProductAbstractWriterStep(
            $this->createProductRepository(),
            $this->getUtilTextService(),
            $this->getConfig()
        );
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep
     */
    protected function createProductDepositOptionStep(): PublishAwareStep
    {
        return new ProductDepositOptionStep();
    }

    /**
     * @return \Pyz\Zed\DataImportCZ\Business\Model\ProductPrice\ProductPriceWriterStep
     */
    public function createPriceProductWriterStep()
    {
        return new ProductPriceWriterStep(
            $this->createNumberFormatter(),
            $this->getMoneyFacade(),
            $this->getProductUpdateFacade(),
            $this->getConfig()
        );
    }
}
