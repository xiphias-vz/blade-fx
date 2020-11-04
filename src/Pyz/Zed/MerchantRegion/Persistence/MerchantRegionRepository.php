<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantRegion\Persistence;

use Generated\Shared\Transfer\MerchantRegionTransfer;
use Generated\Shared\Transfer\PyzMerchantRegionEntityTransfer;
use Orm\Zed\MerchantRegion\Persistence\PyzMerchantRegionQuery;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

class MerchantRegionRepository extends AbstractRepository implements MerchantRegionRepositoryInterface
{
    /**
     * @inheritDoc
     */
    public function getMerchantRegionByRegionNumber(int $regionNumber): MerchantRegionTransfer
    {
        $merchantRegionQuery = PyzMerchantRegionQuery::create()
            ->filterByRegionNumber($regionNumber);

        $merchantRegionEntity = $this->buildQueryFromCriteria($merchantRegionQuery)->findOne();

        return $this->mapEntityToTransfer($merchantRegionEntity);
    }

    /**
     * @inheritDoc
     */
    public function getMerchantRegionByMerchantReference(string $merchantReference): MerchantRegionTransfer
    {
        $merchantRegionQuery = PyzMerchantRegionQuery::create()
            ->useSpyMerchantQuery()
                ->filterByMerchantReference($merchantReference)
            ->endUse();

        $merchantRegionEntity = $this->buildQueryFromCriteria($merchantRegionQuery)->findOne();

        return $this->mapEntityToTransfer($merchantRegionEntity);
    }

    /**
     * @param \Generated\Shared\Transfer\PyzMerchantRegionEntityTransfer|null $merchantRegion
     *
     * @return \Generated\Shared\Transfer\MerchantRegionTransfer
     */
    private function mapEntityToTransfer(?PyzMerchantRegionEntityTransfer $merchantRegion): MerchantRegionTransfer
    {
        $merchantRegionTransfer = new MerchantRegionTransfer();

        if ($merchantRegion) {
            $merchantRegionTransfer->fromArray($merchantRegion->toArray(), true);
        }

        return $merchantRegionTransfer;
    }
}
