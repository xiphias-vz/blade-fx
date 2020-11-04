<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CmsBlockStorage\Business;

use Generated\Shared\Transfer\CmsBlockStorageTransfer;
use Spryker\Zed\CmsBlockStorage\Business\CmsBlockStorageFacade as SprykerCmsBlockStorageFacade;

/**
 * @method \Spryker\Zed\CmsBlockStorage\Business\CmsBlockStorageBusinessFactory getFactory()
 * @method \Pyz\Zed\CmsBlockStorage\Persistence\CmsBlockStorageRepositoryInterface getRepository()
 */
class CmsBlockStorageFacade extends SprykerCmsBlockStorageFacade implements CmsBlockStorageFacadeInterface
{
    /**
     * @api
     *
     * @param string $cmsBlockName
     *
     * @return \Generated\Shared\Transfer\CmsBlockStorageTransfer|null
     */
    public function findBlockStorageByName(string $cmsBlockName): ?CmsBlockStorageTransfer
    {
        return $this->getRepository()->findCmsBlockStorageByName($cmsBlockName);
    }
}
