<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantRegion\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Generated\Shared\Transfer\MerchantRegionTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\MerchantRegion\Business\MerchantRegionBusinessFactory getFactory()
 * @method \Pyz\Zed\MerchantRegion\Persistence\MerchantRegionRepositoryInterface getRepository()
 */
class MerchantRegionFacade extends AbstractFacade implements MerchantRegionFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function import(DataImporterConfigurationTransfer $dataImporterConfigurationTransfer): DataImporterReportTransfer
    {
        return $this->getFactory()
            ->createMerchantRegionDataImport()
            ->import($dataImporterConfigurationTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function expandOrderWithMerchantRegion(OrderTransfer $orderTransfer): OrderTransfer
    {
        return $this->getFactory()
            ->createOrderExpander()
            ->expandOrderWithMerchantRegion($orderTransfer);
    }

    /**
     * @inheritDoc
     */
    public function getByMerchantReference(string $merchantReference): MerchantRegionTransfer
    {
        return $this->getRepository()
            ->getMerchantRegionByMerchantReference($merchantReference);
    }
}
