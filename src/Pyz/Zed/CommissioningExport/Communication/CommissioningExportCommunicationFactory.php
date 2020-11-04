<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CommissioningExport\Communication;

use Pyz\Zed\CommissioningExport\CommissioningExportDependencyProvider;
use Pyz\Zed\CommissioningExport\Communication\CommissioningExportCsvResponseBuilder\CommissioningExportCsvResponseBuilder;
use Pyz\Zed\CommissioningExport\Communication\CommissioningExportCsvResponseBuilder\CommissioningExportCsvResponseBuilderInterface;
use Pyz\Zed\CommissioningExport\Communication\Form\CommissioningExportForm;
use Pyz\Zed\PostingExport\Business\PostingExportFacadeInterface;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Symfony\Component\Form\FormInterface;

class CommissioningExportCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createCommissioningExportForm(): FormInterface
    {
        return $this->getFormFactory()->create(CommissioningExportForm::class);
    }

    /**
     * @return \Pyz\Zed\CommissioningExport\Communication\CommissioningExportCsvResponseBuilder\CommissioningExportCsvResponseBuilderInterface
     */
    public function createCommissioningExportResponseBuilder(): CommissioningExportCsvResponseBuilderInterface
    {
        return new CommissioningExportCsvResponseBuilder();
    }

    /**
     * @return \Pyz\Zed\PostingExport\Business\PostingExportFacadeInterface
     */
    public function getPostingExportFacade(): PostingExportFacadeInterface
    {
        return $this->getProvidedDependency(CommissioningExportDependencyProvider::FACADE_POSTING_EXPORT);
    }
}
