<?php

namespace BladeFxSpryker\Zed\BladeFx\Communication\Table;

use BladeFxSpryker\Zed\BladeFx\Business\BladeFxFacadeInterface;
use Spryker\Zed\Gui\Communication\Table\AbstractTable;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;

class BladeFxTable extends AbstractTable
{
    public const COL_REPORT_ID = 'rep_id';
    public const COL_REPORT_NAME = 'rep_name';
    public const BLADE_FX_TABLE = 'blade-fx-table';
    public const ACTION = 'actions';
    public const IDENTIFIER = 'report_data_table';

    /**
     * @var \BladeFxSpryker\Zed\BladeFx\Business\BladeFxFacadeInterface
     */
    protected BladeFxFacadeInterface $bladeFxFacade;

    /**
     * @param \BladeFxSpryker\Zed\BladeFx\Business\BladeFxFacadeInterface $bladeFxFacade
     */
    public function __construct(BladeFxFacadeInterface $bladeFxFacade)
    {
        $this->bladeFxFacade = $bladeFxFacade;
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return \Spryker\Zed\Gui\Communication\Table\TableConfiguration
     */
    protected function configure(TableConfiguration $config): TableConfiguration
    {
        $config->setHeader([
            static::COL_REPORT_ID => 'Report ID',
            static::COL_REPORT_NAME => 'Report name',
            static::ACTION => 'Action',
        ]);

        $config->setDefaultSortField(static::COL_REPORT_ID);

        $config->setSortable([
            static::COL_REPORT_ID,
            static::COL_REPORT_NAME,
        ]);

        $config->setUrl(static::BLADE_FX_TABLE);

        $config->setSearchable([
            static::COL_REPORT_NAME,
        ]);

        $config->setRawColumns([
            static::ACTION,
        ]);

        $config->setServerSide(false);

        $this->setTableIdentifier(static::IDENTIFIER);

        return $config;
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return array
     */
    public function prepareData(TableConfiguration $config): array
    {
        $results = [];
        $userBladeFxTransfer = $this->bladeFxFacade->provideBladeFxUser();
        $bladeFxReportsCollection = $this->bladeFxFacade->provideReportsByBladeFxUser($userBladeFxTransfer);

        foreach ($bladeFxReportsCollection->getReports() as $report) {
            $results[] = array_merge([
                self::COL_REPORT_ID => $report->getRepId(),
                self::COL_REPORT_NAME => $report->getRepName(),
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
        $urls[] = $this->generateViewButton('/blade-fx/view?report_id=' . $reportId, 'Preview');

        return implode(' ', $urls);
    }
}
