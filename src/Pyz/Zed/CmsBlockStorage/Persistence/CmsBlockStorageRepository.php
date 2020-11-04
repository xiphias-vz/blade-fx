<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CmsBlockStorage\Persistence;

use Generated\Shared\Transfer\CmsBlockStorageTransfer;
use Generated\Shared\Transfer\SpyCmsBlockStorageEntityTransfer;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Spryker\Zed\CmsBlockStorage\Persistence\CmsBlockStoragePersistenceFactory getFactory()
 */
class CmsBlockStorageRepository extends AbstractRepository implements CmsBlockStorageRepositoryInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $cmsBlockName
     *
     * @return \Generated\Shared\Transfer\CmsBlockStorageTransfer|null
     */
    public function findCmsBlockStorageByName(string $cmsBlockName): ?CmsBlockStorageTransfer
    {
        $query = $this->getFactory()
            ->createSpyCmsBlockStorage()
            ->filterByName($cmsBlockName);

        $spyCmsBlockStorageEntityTransfer = $this->buildQueryFromCriteria($query)->findOne();

        if ($spyCmsBlockStorageEntityTransfer === null) {
            return null;
        }

        return $this->mapCmsBlockStorageTransfer($spyCmsBlockStorageEntityTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\SpyCmsBlockStorageEntityTransfer $spyCmsBlockStorageEntityTransfer
     *
     * @return \Generated\Shared\Transfer\CmsBlockStorageTransfer
     */
    protected function mapCmsBlockStorageTransfer(SpyCmsBlockStorageEntityTransfer $spyCmsBlockStorageEntityTransfer): CmsBlockStorageTransfer
    {
        return (new CmsBlockStorageTransfer())->fromArray(
            $spyCmsBlockStorageEntityTransfer->toArray(),
            true
        );
    }
}
