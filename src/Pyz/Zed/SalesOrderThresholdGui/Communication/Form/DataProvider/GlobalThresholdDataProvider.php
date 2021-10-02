<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThresholdGui\Communication\Form\DataProvider;

use Generated\Shared\Transfer\CurrencyTransfer;
use Generated\Shared\Transfer\StoreTransfer;
use Pyz\Shared\SalesOrderThreshold\SalesOrderThresholdConfig;
use Pyz\Zed\SalesOrderThresholdGui\Communication\Form\GlobalThresholdType;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Form\DataProvider\GlobalThresholdDataProvider as SprykerGlobalThresholdDataProvider;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Form\Type\ThresholdGroup\GlobalHardThresholdType;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Form\Type\ThresholdGroup\GlobalSoftThresholdType;

class GlobalThresholdDataProvider extends SprykerGlobalThresholdDataProvider
{
    /**
     * @param \Generated\Shared\Transfer\StoreTransfer $storeTransfer
     * @param \Generated\Shared\Transfer\CurrencyTransfer $currencyTransfer
     *
     * @return array
     */
    public function getData(
        StoreTransfer $storeTransfer,
        CurrencyTransfer $currencyTransfer
    ): array {
        $data = [
            GlobalThresholdType::FIELD_HARD_MAX => [
                GlobalHardThresholdType::FIELD_STRATEGY => current($this->getHardMaxTypesList()),
            ],
            GlobalThresholdType::FIELD_HARD => [
                GlobalHardThresholdType::FIELD_STRATEGY => current($this->getHardTypesList()),
            ],
            GlobalThresholdType::FIELD_SOFT => [
                GlobalSoftThresholdType::FIELD_STRATEGY => current($this->getSoftTypesList()),
            ],
        ];

        $salesOrderThresholdTransfers = $this->getSalesOrderThresholdTransfers($storeTransfer, $currencyTransfer);

        foreach ($salesOrderThresholdTransfers as $salesOrderThresholdTransfer) {
            $thresholdGroup = $salesOrderThresholdTransfer->getSalesOrderThresholdValue()->getSalesOrderThresholdType()->getThresholdGroup();
            $thresholdStrategyDataProvider = $this->globalThresholdDataProviderResolver
                ->hasGlobalThresholdDataProviderByStrategyGroup($thresholdGroup);

            if ($thresholdStrategyDataProvider) {
                $data = $this->globalThresholdDataProviderResolver
                    ->resolveGlobalThresholdDataProviderByStrategyGroup($thresholdGroup)
                    ->mapSalesOrderThresholdValueTransferToFormData($salesOrderThresholdTransfer, $data);
            }
        }

        $data[GlobalThresholdType::FIELD_STORE_CURRENCY] = $this->formatStoreCurrencyRowValue(
            $storeTransfer,
            $currencyTransfer
        );

        return $data;
    }

    /**
     * @param \Generated\Shared\Transfer\CurrencyTransfer $currencyTransfer
     *
     * @return array
     */
    public function getOptions(CurrencyTransfer $currencyTransfer): array
    {
        return [
            'allow_extra_fields' => true,
            GlobalThresholdType::OPTION_CURRENCY_CODE => $currencyTransfer->getCode(),
            GlobalThresholdType::OPTION_STORE_CURRENCY_ARRAY => $this->getStoreCurrencyList(),
            GlobalThresholdType::OPTION_HARD_MAXIMUM_TYPES_ARRAY => $this->getHardMaxTypesList(),
            GlobalThresholdType::OPTION_HARD_TYPES_ARRAY => $this->getHardTypesList(),
            GlobalThresholdType::OPTION_SOFT_TYPES_ARRAY => $this->getSoftTypesList(),
        ];
    }

    /**
     * @return string[]
     */
    protected function getHardMaxTypesList(): array
    {
        $hardTypesList = [];
        foreach ($this->formExpanderPlugins as $formExpanderPlugin) {
            if ($formExpanderPlugin->getThresholdKey() === SalesOrderThresholdConfig::THRESHOLD_STRATEGY_KEY_HARD_MAX) {
                $hardTypesList[$formExpanderPlugin->getThresholdName()] = $formExpanderPlugin->getThresholdKey();
            }
        }

        return $hardTypesList;
    }
}
