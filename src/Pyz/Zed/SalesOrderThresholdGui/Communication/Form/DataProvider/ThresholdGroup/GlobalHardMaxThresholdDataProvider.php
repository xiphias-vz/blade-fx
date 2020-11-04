<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThresholdGui\Communication\Form\DataProvider\ThresholdGroup;

use Generated\Shared\Transfer\SalesOrderThresholdTransfer;
use Pyz\Zed\SalesOrderThresholdGui\Communication\Form\GlobalThresholdType;
use Pyz\Zed\SalesOrderThresholdGui\Communication\Form\Type\ThresholdGroup\GlobalHardMaxThresholdType;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Form\DataProvider\ThresholdGroup\AbstractGlobalThresholdDataProvider;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Form\DataProvider\ThresholdGroup\ThresholdStrategyGroupDataProviderInterface;

class GlobalHardMaxThresholdDataProvider extends AbstractGlobalThresholdDataProvider implements ThresholdStrategyGroupDataProviderInterface
{
    /**
     * @param \Generated\Shared\Transfer\SalesOrderThresholdTransfer $salesOrderThresholdTransfer
     * @param array $data
     *
     * @return array
     */
    public function mapSalesOrderThresholdValueTransferToFormData(SalesOrderThresholdTransfer $salesOrderThresholdTransfer, array $data): array
    {
        $thresholdData = $data[GlobalThresholdType::FIELD_HARD_MAX] ?? [];
        $thresholdData[GlobalHardMaxThresholdType::FIELD_ID_THRESHOLD] = $salesOrderThresholdTransfer->getIdSalesOrderThreshold();
        $thresholdData[GlobalHardMaxThresholdType::FIELD_THRESHOLD] = $salesOrderThresholdTransfer->getSalesOrderThresholdValue()->getThreshold();

        $thresholdData = $this->expandFormData($salesOrderThresholdTransfer, $thresholdData);
        $thresholdData = $this->getLocalizedMessages($salesOrderThresholdTransfer, $thresholdData);

        $data[GlobalThresholdType::FIELD_HARD_MAX] = $thresholdData;

        return $data;
    }
}
