<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PostingExport\Communication\ResponseBuilder;

use Generated\Shared\Transfer\ExportContentsTransfer;
use Pyz\Shared\ContentHeaders\ContentHeadersConfig;
use Spryker\Service\UtilEncoding\UtilEncodingServiceInterface;
use Symfony\Component\HttpFoundation\Response;

class ExportJsonResponseBuilder implements ExportResponseBuilderInterface
{
    /**
     * @var \Spryker\Service\UtilEncoding\UtilEncodingServiceInterface
     */
    private $utilEncodingService;

    /**
     * @param \Spryker\Service\UtilEncoding\UtilEncodingServiceInterface $utilEncodingService
     */
    public function __construct(
        UtilEncodingServiceInterface $utilEncodingService
    ) {
        $this->utilEncodingService = $utilEncodingService;
    }

    /**
     * @param \Generated\Shared\Transfer\ExportContentsTransfer $exportContentsTransfer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function buildResponse(ExportContentsTransfer $exportContentsTransfer): Response
    {
        $response = new Response();
        $this->setHeaders($exportContentsTransfer->getFilename());

        $response->setContent(
            $this->utilEncodingService->encodeJson(
                $exportContentsTransfer->getContents()
            )
        );

        return $response;
    }

    /**
     * @param string $filename
     *
     * @return void
     */
    protected function setHeaders(string $filename): void
    {
        $this->addHeader(ContentHeadersConfig::CONTENT_TYPE_LABEL, ContentHeadersConfig::CONTENT_TYPE_JSON);
        $this->addHeader(ContentHeadersConfig::CONTENT_DISPOSITION_LABEL, sprintf(ContentHeadersConfig::CONTENT_DISPOSITION_VALUE_FORMAT_JSON, $filename));
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
