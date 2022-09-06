<?php

namespace BladeFxSpryker\Zed\BladeFx\Business\Mapper;

use Generated\Shared\Transfer\BladeFxReportsCollectionTransfer;
use Generated\Shared\Transfer\BladeFxReportTransfer;
use Generated\Shared\Transfer\UserBladeFxTransfer;

class BladeFxResponseMapper implements BladeFxResponseMapperInterface
{
    /**
     * @param array $user
     *
     * @return \Generated\Shared\Transfer\UserBladeFxTransfer
     */
    public function mapUserResponseToTransfer(array $user): UserBladeFxTransfer
    {
        $userBladeFxTransfer = new UserBladeFxTransfer();

        return $userBladeFxTransfer->fromArray(reset($user), true);
    }

    /**
     * @param array $reports
     *
     * @return \Generated\Shared\Transfer\BladeFxReportsCollectionTransfer
     */
    public function mapReportsResponseToTransfer(array $reports): BladeFxReportsCollectionTransfer
    {
        $bladeFxReportsCollection = new BladeFxReportsCollectionTransfer();
        foreach ($reports as $report) {
            $bladeFxReportTransfer = new BladeFxReportTransfer();
            $bladeFxReportTransfer->fromArray($report, true);
            $bladeFxReportsCollection->addReports($bladeFxReportTransfer);
        }

        return $bladeFxReportsCollection;
    }
}
