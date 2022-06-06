<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Business\Provider;

use Generated\Shared\Transfer\BladeFxReportsCollectionTransfer;
use Generated\Shared\Transfer\OrderDataTransfer;
use Generated\Shared\Transfer\UserBladeFxTransfer;
use Pyz\Zed\BladeFx\BladeFxConfig;
use Pyz\Zed\BladeFx\Business\Caller\BladeFxRequestCallerInterface;
use Pyz\Zed\BladeFx\Business\Mapper\BladeFxResponseMapperInterface;
use Pyz\Zed\BladeFx\Business\Parser\BladeFxResponseParserInterface;
use Pyz\Zed\BladeFx\Business\Request\BladeFxRequestInterface;

class BladeFxProvider implements BladeFxProviderInterface
{
    /**
     * @var \Pyz\Zed\BladeFx\Business\Request\BladeFxRequestInterface
     */
    protected BladeFxRequestInterface $bladeFxRequest;

    /**
     * @var \Pyz\Zed\BladeFx\Business\Parser\BladeFxResponseParserInterface
     */
    protected BladeFxResponseParserInterface $bladeFxResponseParser;

    /**
     * @var \Pyz\Zed\BladeFx\BladeFxConfig
     */
    protected BladeFxConfig $bladeFxConfig;

    /**
     * @var \Pyz\Zed\BladeFx\Business\Caller\BladeFxRequestCallerInterface
     */
    protected BladeFxRequestCallerInterface $bladeFxRequestCaller;

    /**
     * @var \Pyz\Zed\BladeFx\Business\Mapper\BladeFxResponseMapperInterface
     */
    protected BladeFxResponseMapperInterface $bladeFxResponseMapper;

    /**
     * @param \Pyz\Zed\BladeFx\Business\Request\BladeFxRequestInterface $bladeFxRequest
     * @param \Pyz\Zed\BladeFx\Business\Parser\BladeFxResponseParserInterface $bladeFxResponseParser
     * @param \Pyz\Zed\BladeFx\BladeFxConfig $bladeFxConfig
     * @param \Pyz\Zed\BladeFx\Business\Caller\BladeFxRequestCallerInterface $bladeFxRequestCaller
     * @param \Pyz\Zed\BladeFx\Business\Mapper\BladeFxResponseMapperInterface $bladeFxResponseMapper
     */
    public function __construct(
        BladeFxRequestInterface $bladeFxRequest,
        BladeFxResponseParserInterface $bladeFxResponseParser,
        BladeFxConfig $bladeFxConfig,
        BladeFxRequestCallerInterface $bladeFxRequestCaller,
        BladeFxResponseMapperInterface $bladeFxResponseMapper
    ) {
        $this->bladeFxRequest = $bladeFxRequest;
        $this->bladeFxResponseParser = $bladeFxResponseParser;
        $this->bladeFxConfig = $bladeFxConfig;
        $this->bladeFxRequestCaller = $bladeFxRequestCaller;
        $this->bladeFxResponseMapper = $bladeFxResponseMapper;
    }

    /**
     * @return \Generated\Shared\Transfer\UserBladeFxTransfer
     */
    public function provideBladeFxUser(): UserBladeFxTransfer
    {
        $userRequest = $this->bladeFxRequest->loggedInUserRequest();
        $urlFile = $this->bladeFxConfig->getWebServiceUrlFile();
        $urlUserInfo = $this->bladeFxConfig->getBladeFxUserUrlInfo();
        $response = $this->bladeFxRequestCaller->call($urlFile, $urlUserInfo, $userRequest);
        $data = [];

        if (!empty($response)) {
            $data = $this->bladeFxResponseParser->parse($response, $this->bladeFxConfig->getPathTagUser());
        }

        return $this->bladeFxResponseMapper->mapUserResponseToTransfer($data);
    }

    /**
     * @param \Generated\Shared\Transfer\UserBladeFxTransfer $userBladeFxTransfer
     *
     * @return \Generated\Shared\Transfer\BladeFxReportsCollectionTransfer
     */
    public function provideReportsByBladeFxUser(UserBladeFxTransfer $userBladeFxTransfer): BladeFxReportsCollectionTransfer
    {
        $reportsForLoggedInUserRequest = $this->bladeFxRequest->reportsForLoggedInUserRequest($userBladeFxTransfer);
        $urlFile = $this->bladeFxConfig->getWebServiceUrlFile();
        $urlReportList = $this->bladeFxConfig->getBladeFxReportUrlList();
        $response = $this->bladeFxRequestCaller->call($urlFile, $urlReportList, $reportsForLoggedInUserRequest);
        $data = [];

        if (!empty($response)) {
            $data = $this->bladeFxResponseParser->parse($response, $this->bladeFxConfig->getPathTagReports());
        }

        return $this->bladeFxResponseMapper->mapReportsResponseToTransfer($data);
    }

    /**
     * @param \Generated\Shared\Transfer\UserBladeFxTransfer $userBladeFxTransfer
     *
     * @return string
     */
    public function provideWebPageUrl(UserBladeFxTransfer $userBladeFxTransfer): string
    {
        $bladeFxSaasHost = $this->bladeFxConfig->getBladeFxReportsHost();
        $fileName = $this->bladeFxConfig->getBladeFxPrintOutFileUrl();

        return $bladeFxSaasHost . $fileName .'?'. $userBladeFxTransfer->getUserData() . '&rep_id=' . $userBladeFxTransfer->getReportId() . '&typ=reportHTML';
    }

    /**
     * @param \Generated\Shared\Transfer\UserBladeFxTransfer $userBladeFxTransfer
     * @param \Generated\Shared\Transfer\OrderDataTransfer $orderDataTransfer
     *
     * @return string
     */
    public function provideOrderReferenceWebPageReport(
        UserBladeFxTransfer $userBladeFxTransfer,
        OrderDataTransfer $orderDataTransfer
    ): string {
        $bladeFxSaasHost = $this->bladeFxConfig->getBladeFxReportsHost();
        $fileName = $this->bladeFxConfig->getBladeFxMobileFileUrl();

        return $bladeFxSaasHost . $fileName . '?Data=' . $userBladeFxTransfer->getUserData() . '|' . $orderDataTransfer->getIdReport() . '-0|@orderReference|' . $orderDataTransfer->getOrderReference() . '|HTML&inline=1';
    }
}
