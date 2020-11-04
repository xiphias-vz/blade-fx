<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CommissioningExport\Communication\CommissioningExportCsvResponseBuilder;

use Generated\Shared\Transfer\CommissioningExportContentsTransfer;
use Pyz\Shared\ContentHeaders\ContentHeadersConfig;
use Symfony\Component\HttpFoundation\Response;

class CommissioningExportCsvResponseBuilder implements CommissioningExportCsvResponseBuilderInterface
{
    public const CSV_DELIMITER = ';';

    /**
     * @param \Generated\Shared\Transfer\CommissioningExportContentsTransfer $commissioningExportTransfer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function buildResponse(CommissioningExportContentsTransfer $commissioningExportTransfer): Response
    {
        $response = new Response();
        $this->setHeaders($commissioningExportTransfer->getFilename());

        $filePointer = fopen('php://output', 'wb');

        foreach ($commissioningExportTransfer->getContents() as $content) {
            fputcsv($filePointer, $content, static::CSV_DELIMITER);
        }

        return $response;
    }

    /**
     * @param string $filename
     *
     * @return void
     */
    protected function setHeaders(string $filename): void
    {
        $this->addHeader(ContentHeadersConfig::CONTENT_TYPE_LABEL, ContentHeadersConfig::CONTENT_TYPE_CSV);
        $this->addHeader(ContentHeadersConfig::CONTENT_DISPOSITION_LABEL, sprintf(ContentHeadersConfig::CONTENT_DISPOSITION_VALUE_FORMAT_CSV, $filename));
        $this->addHeader(ContentHeadersConfig::CACHE_CONTROL_LABEL, ContentHeadersConfig::CACHE_CONTROL_VALUE);
    }

    /**
     * @param string $name
     * @param string $value
     *
     * @return void
     */
    private function addHeader(string $name, string $value): void
    {
        header(sprintf('%s: %s', $name, $value));
    }
}
