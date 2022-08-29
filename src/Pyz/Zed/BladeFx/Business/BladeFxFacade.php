<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Business;

use Generated\Shared\Transfer\BladeFxReportsCollectionTransfer;
use Generated\Shared\Transfer\OrderDataTransfer;
use Generated\Shared\Transfer\UserBladeFxTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\BladeFx\Business\BladeFxBusinessFactory getFactory()
 */
class BladeFxFacade extends AbstractFacade implements BladeFxFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\UserBladeFxTransfer $userBladeFxTransfer
     *
     * @return \Generated\Shared\Transfer\BladeFxReportsCollectionTransfer
     */
    public function provideReportsByBladeFxUser(UserBladeFxTransfer $userBladeFxTransfer): BladeFxReportsCollectionTransfer
    {
        return $this->getFactory()
            ->createBladeFxProvider()
            ->provideReportsByBladeFxUser($userBladeFxTransfer);
    }

    /**
     * @return \Generated\Shared\Transfer\UserBladeFxTransfer
     */
    public function provideBladeFxUser(): UserBladeFxTransfer
    {
        return $this->getFactory()
            ->createBladeFxProvider()
            ->provideBladeFxUser();
    }

    /**
     * @param \Generated\Shared\Transfer\UserBladeFxTransfer $userBladeFxTransfer
     *
     * @return string
     */
    public function provideWebPageUrl(UserBladeFxTransfer $userBladeFxTransfer): string
    {
        return $this->getFactory()
            ->createBladeFxProvider()
            ->provideWebPageUrl($userBladeFxTransfer);
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
        return $this->getFactory()
            ->createBladeFxProvider()
            ->provideOrderReferenceWebPageReport($userBladeFxTransfer, $orderDataTransfer);
    }
}
