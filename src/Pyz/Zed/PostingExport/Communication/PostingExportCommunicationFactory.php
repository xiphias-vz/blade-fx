<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PostingExport\Communication;

use Pyz\Zed\PostingExport\Communication\Form\ExportForm;
use Pyz\Zed\PostingExport\Communication\ResponseBuilder\ExportCsvResponseBuilder;
use Pyz\Zed\PostingExport\Communication\ResponseBuilder\ExportJsonResponseBuilder;
use Pyz\Zed\PostingExport\Communication\ResponseBuilder\ExportResponseBuilderInterface;
use Pyz\Zed\PostingExport\PostingExportDependencyProvider;
use Spryker\Service\UtilEncoding\UtilEncodingServiceInterface;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Symfony\Component\Form\FormInterface;

/**
 * @method \Pyz\Zed\PostingExport\PostingExportConfig getConfig()
 * @method \Pyz\Zed\PostingExport\Business\PostingExportFacadeInterface getFacade()
 */
class PostingExportCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createExportForm(): FormInterface
    {
        return $this->getFormFactory()->create(ExportForm::class);
    }

    /**
     * @return \Pyz\Zed\PostingExport\Communication\ResponseBuilder\ExportResponseBuilderInterface
     */
    public function createExportCsvResponseBuilder(): ExportResponseBuilderInterface
    {
        return new ExportCsvResponseBuilder();
    }

    /**
     * @return \Pyz\Zed\PostingExport\Communication\ResponseBuilder\ExportResponseBuilderInterface
     */
    public function createExportJsonResponseBuilder(): ExportResponseBuilderInterface
    {
        return new ExportJsonResponseBuilder(
            $this->getUtilEncodingService()
        );
    }

    /**
     * @return \Spryker\Service\UtilEncoding\UtilEncodingServiceInterface
     */
    public function getUtilEncodingService(): UtilEncodingServiceInterface
    {
        return $this->getProvidedDependency(PostingExportDependencyProvider::SERVICE_UTIL_ENCODING);
    }
}
