<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CmsBlockStorage\Persistence;

use Generated\Shared\Transfer\CmsBlockStorageTransfer;

interface CmsBlockStorageRepositoryInterface
{
    /**
     * @api
     *
     * Get SpyCmsBlockStorageEntityTransfer by cmsBlockName
     *
     * @param string $cmsBlockName
     *
     * @return \Generated\Shared\Transfer\CmsBlockStorageTransfer|null
     */
    public function findCmsBlockStorageByName(string $cmsBlockName): ?CmsBlockStorageTransfer;
}
