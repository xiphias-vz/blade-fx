<?php

namespace BladeFxSpryker\Zed\BladeFx\Business\Provider;

use Generated\Shared\Transfer\BladeFxReportsCollectionTransfer;
use Generated\Shared\Transfer\OrderDataTransfer;
use Generated\Shared\Transfer\UserBladeFxTransfer;
use BladeFxSpryker\Zed\BladeFx\BladeFxConfig;
use BladeFxSpryker\Zed\BladeFx\Business\Caller\BladeFxRequestCallerInterface;
use BladeFxSpryker\Zed\BladeFx\Business\Mapper\BladeFxResponseMapperInterface;
use BladeFxSpryker\Zed\BladeFx\Business\Parser\BladeFxResponseParserInterface;
use BladeFxSpryker\Zed\BladeFx\Business\Request\BladeFxRequestInterface;

class BladeFxProvider implements BladeFxProviderInterface
{
    /**
     * @var \BladeFxSpryker\Zed\BladeFx\Business\Request\BladeFxRequestInterface
     */
    protected BladeFxRequestInterface $bladeFxRequest;

    /**
     * @var \BladeFxSpryker\Zed\BladeFx\Business\Parser\BladeFxResponseParserInterface
     */
    protected BladeFxResponseParserInterface $bladeFxResponseParser;

    /**
     * @var \BladeFxSpryker\Zed\BladeFx\BladeFxConfig
     */
    protected BladeFxConfig $bladeFxConfig;

    /**
     * @var \BladeFxSpryker\Zed\BladeFx\Business\Caller\BladeFxRequestCallerInterface
     */
    protected BladeFxRequestCallerInterface $bladeFxRequestCaller;

    /**
     * @var \BladeFxSpryker\Zed\BladeFx\Business\Mapper\BladeFxResponseMapperInterface
     */
    protected BladeFxResponseMapperInterface $bladeFxResponseMapper;

    /**
     * @param \BladeFxSpryker\Zed\BladeFx\Business\Request\BladeFxRequestInterface $bladeFxRequest
     * @param \BladeFxSpryker\Zed\BladeFx\Business\Parser\BladeFxResponseParserInterface $bladeFxResponseParser
     * @param \BladeFxSpryker\Zed\BladeFx\BladeFxConfig $bladeFxConfig
     * @param \BladeFxSpryker\Zed\BladeFx\Business\Caller\BladeFxRequestCallerInterface $bladeFxRequestCaller
     * @param \BladeFxSpryker\Zed\BladeFx\Business\Mapper\BladeFxResponseMapperInterface $bladeFxResponseMapper
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
        $fileName = $this->bladeFxConfig->getBladeFxMobileFileUrl();

        return $bladeFxSaasHost . $fileName . '?Data=' . $userBladeFxTransfer->getUserData() . '|' . $userBladeFxTransfer->getReportId() . '|0|0|HTML&inline=1';
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
