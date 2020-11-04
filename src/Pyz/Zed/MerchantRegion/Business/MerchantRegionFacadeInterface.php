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

interface MerchantRegionFacadeInterface
{
    /**
     * Specification:
     * - import merchant regions.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function import(DataImporterConfigurationTransfer $dataImporterConfigurationTransfer): DataImporterReportTransfer;

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function expandOrderWithMerchantRegion(OrderTransfer $orderTransfer): OrderTransfer;

    /**
     * @param string $merchantReference
     *
     * @return \Generated\Shared\Transfer\MerchantRegionTransfer
     */
    public function getByMerchantReference(string $merchantReference): MerchantRegionTransfer;
}
