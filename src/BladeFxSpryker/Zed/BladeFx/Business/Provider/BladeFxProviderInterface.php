<?php

namespace BladeFxSpryker\Zed\BladeFx\Business\Provider;

use Generated\Shared\Transfer\BladeFxReportsCollectionTransfer;
use Generated\Shared\Transfer\OrderDataTransfer;
use Generated\Shared\Transfer\UserBladeFxTransfer;

interface BladeFxProviderInterface
{
    /**
     * @return \Generated\Shared\Transfer\UserBladeFxTransfer
     */
    public function provideBladeFxUser(): UserBladeFxTransfer;

    /**
     * @param \Generated\Shared\Transfer\UserBladeFxTransfer $userBladeFxTransfer
     *
     * @return \Generated\Shared\Transfer\BladeFxReportsCollectionTransfer
     */
    public function provideReportsByBladeFxUser(UserBladeFxTransfer $userBladeFxTransfer): BladeFxReportsCollectionTransfer;

    /**
     * @param \Generated\Shared\Transfer\UserBladeFxTransfer $userBladeFxTransfer
     *
     * @return string
     */
    public function provideWebPageUrl(UserBladeFxTransfer $userBladeFxTransfer): string;

    /**
     * @param \Generated\Shared\Transfer\UserBladeFxTransfer $userBladeFxTransfer
     * @param \Generated\Shared\Transfer\OrderDataTransfer $orderDataTransfer
     *
     * @return string
     */
    public function provideOrderReferenceWebPageReport(
        UserBladeFxTransfer $userBladeFxTransfer,
        OrderDataTransfer $orderDataTransfer
    ): string;
}
