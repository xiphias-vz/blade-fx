<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Table;

use Pyz\Zed\BladeFx\Business\BladeFxFacadeInterface;
use Pyz\Zed\Sales\SalesConfig;
use Spryker\Zed\Gui\Communication\Table\AbstractTable;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;

class SalesOrderBladeFxReportsTable extends AbstractTable
{
    public const COL_ORDER_REPORT_ID = 'rep_id';
    public const COL_ORDER_REPORT_NAME = 'rep_name';
    public const ORDER_BLADE_FX_TABLE = 'order-blade-fx-table';
    public const ACTION = 'actions';
    public const IDENTIFIER = 'order_report_data_table';

    /**
     * @var \Pyz\Zed\BladeFx\Business\BladeFxFacadeInterface
     */
    protected BladeFxFacadeInterface $bladeFxFacade;

    /**
     * @var string
     */
    protected string $orderReference;

    /**
     * @var int
     */
    protected int $idSalesOrder;

    /**
     * @param \Pyz\Zed\BladeFx\Business\BladeFxFacadeInterface $bladeFxFacade
     * @param string $orderReference
     * @param int $idSalesOrder
     */
    public function __construct(BladeFxFacadeInterface $bladeFxFacade, string $orderReference, int $idSalesOrder)
    {
        $this->bladeFxFacade = $bladeFxFacade;
        $this->orderReference = $orderReference;
        $this->idSalesOrder = $idSalesOrder;
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return \Spryker\Zed\Gui\Communication\Table\TableConfiguration
     */
    protected function configure(TableConfiguration $config): TableConfiguration
    {
        $config->setHeader([
            static::COL_ORDER_REPORT_ID => 'Report ID',
            static::COL_ORDER_REPORT_NAME => 'Report Name',
            static::ACTION => 'Action',
        ]);

        $config->setDefaultSortField(static::COL_ORDER_REPORT_ID);

        $config->setSortable([
            static::COL_ORDER_REPORT_ID,
            static::COL_ORDER_REPORT_NAME,
        ]);

        $config->setSearchable([
            static::COL_ORDER_REPORT_NAME,
        ]);

        $config->setRawColumns([
            static::ACTION,
        ]);

        $config->setUrl(
            sprintf(
                static::ORDER_BLADE_FX_TABLE . '?%s=%s&%s=%d',
                SalesConfig::PARAM_ORDER_REFERENCE,
                $this->orderReference,
                SalesConfig::PARAM_ID_SALES_ORDER,
                $this->idSalesOrder
            )
        );

        $config->setServerSide(false);

        $this->setTableIdentifier(static::IDENTIFIER);

        return $config;
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return array
     */
    protected function prepareData(TableConfiguration $config): array
    {
        $results = [];
        $userBladeFxTransfer = $this->bladeFxFacade->provideBladeFxUser();
        $bladeFxReportsCollection = $this->bladeFxFacade->provideReportsByBladeFxUser($userBladeFxTransfer);

        foreach ($bladeFxReportsCollection->getReports() as $report) {
            $results[] = array_merge([
                self::COL_ORDER_REPORT_ID => $report->getRepId(),
                self::COL_ORDER_REPORT_NAME => $report->getRepName(),
                self::ACTION => $this->buildLinks($report->getRepId()),
            ]);
        }

        return $results;
    }

    /**
     * @param int $reportId
     *
     * @return string
     */
    public function buildLinks(int $reportId): string
    {
        $urls[] = $this->generateViewButton(
            sprintf(
                '/sales/view-report?id-report=%d&order-reference=%s&id-sales-order=%d',
                $reportId,
                $this->orderReference,
                $this->idSalesOrder
            ),
            'View Report'
        );

        return implode(' ', $urls);
    }
}
