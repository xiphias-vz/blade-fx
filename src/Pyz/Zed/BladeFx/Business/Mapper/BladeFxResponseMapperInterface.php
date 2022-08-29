<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Business\Mapper;

use Generated\Shared\Transfer\BladeFxReportsCollectionTransfer;
use Generated\Shared\Transfer\UserBladeFxTransfer;

interface BladeFxResponseMapperInterface
{
    /**
     * @param array $user
     *
     * @return \Generated\Shared\Transfer\UserBladeFxTransfer
     */
    public function mapUserResponseToTransfer(array $user): UserBladeFxTransfer;

    /**
     * @param array $reports
     *
     * @return \Generated\Shared\Transfer\BladeFxReportsCollectionTransfer
     */
    public function mapReportsResponseToTransfer(array $reports): BladeFxReportsCollectionTransfer;
}
