<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Table;

use Orm\Zed\TimeSlot\Persistence\Map\PyzTimeSlotHistoryTableMap;
use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotHistoryQuery;
use Propel\Runtime\ActiveQuery\Criteria;
use Pyz\Zed\Gui\Communication\Table\AbstractTable;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;
use Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface;

class CapacitiesHistoryTable extends AbstractTable
{
    public const CREATED_AT_FILTER = 'created-at-filter';

    protected const TIMESLOT_DELIMITER = '_';
    protected const TIMESLOT_DELIMITER_REPLACEMENT = ' ';
    protected const TIMESLOT_SEARCHABLE_FIELD_PATTERN = 'REPLACE(%s, \'%s\', \'%s\')';

    public const COL_CREATED_AT = 'created_at';
    public const COL_MERCHANT_REFERENCE = 'merchant_reference';
    public const COL_USER = 'username';
    public const COL_TIME_SLOT_CHANGED = 'time_slot_changed';
    public const COL_ID_TIME_SLOT_HISTORY = 'id_time_slot_history';
    public const COL_DAY_CHANGED = 'day_changed';
    public const COL_DATE_CHANGED = 'date_changed';
    public const COL_CAPACITY_SET_FROM = 'capacity_set_from';
    public const COL_CAPACITY_SET_TO = 'capacity_set_to';
    public const COL_ACTION_PERFORMED = 'action_performed';
    public const COL_ID_USER = 'fk_user';

    /**
     * @var int
     */
    protected $defaultLimit = 500;

    /**
     * @var \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface
     */
    protected $queryContainer;

    /**
     * @var array
     */
    protected $merchantsToShow;

    /**
     * @param \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface $queryContainer
     * @param array $merchantsToShow
     */
    public function __construct(
        SalesQueryContainerInterface $queryContainer,
        array $merchantsToShow
    ) {
        $this->setTableIdentifier('capacities-history-table');
        $this->queryContainer = $queryContainer;
        $this->merchantsToShow = $merchantsToShow;
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return \Spryker\Zed\Gui\Communication\Table\TableConfiguration
     */
    protected function configure(TableConfiguration $config)
    {
        $config->setHeader([
            static::COL_CREATED_AT => 'Created at',
            static::COL_MERCHANT_REFERENCE => 'Merchant reference',
            static::COL_DATE_CHANGED => 'Date changed',
            static::COL_DAY_CHANGED => 'Day changed',
            static::COL_TIME_SLOT_CHANGED => 'Timeslot changed',
            static::COL_ID_TIME_SLOT_HISTORY => 'Id time slot history',
            static::COL_CAPACITY_SET_FROM => 'Capacity set from',
            static::COL_CAPACITY_SET_TO => 'Capacity set to',
            static::COL_ACTION_PERFORMED => 'Action performed',
            static::COL_ID_USER => 'Id user',
        ]);

        $config->setRawColumns([
            static::COL_CREATED_AT,
            static::COL_MERCHANT_REFERENCE,
            static::COL_DATE_CHANGED,
            static::COL_DAY_CHANGED,
            static::COL_TIME_SLOT_CHANGED,
            static::COL_ID_TIME_SLOT_HISTORY,
            static::COL_CAPACITY_SET_FROM,
            static::COL_CAPACITY_SET_TO,
            static::COL_ACTION_PERFORMED,
            static::COL_ID_USER,
        ]);

        $config->setSearchable([
            static::COL_TIME_SLOT_CHANGED,
        ]);

        $config->setSortable([
            static::COL_CREATED_AT,
            static::COL_MERCHANT_REFERENCE,
            static::COL_DATE_CHANGED,
            static::COL_DAY_CHANGED,
            static::COL_TIME_SLOT_CHANGED,
            static::COL_ID_TIME_SLOT_HISTORY,
            static::COL_CAPACITY_SET_FROM,
            static::COL_CAPACITY_SET_TO,
            static::COL_ACTION_PERFORMED,
            static::COL_ID_USER,
        ]);

        $this->persistFilters($config);

        return $config;
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return array
     */
    protected function prepareData(TableConfiguration $config)
    {
        $query = $this->buildQuery();
        $config->setPageLength(100);
        $queryResults = $this->runQuery($query, $config);

        return $this->formatQueryData($queryResults);
    }

    /**
     * @return int
     */
    public function getLimit()
    {
        if (!$this->limit) {
            $this->limit = $this->request->query->getInt('length', $this->defaultLimit);
        }

        return $this->limit;
    }

    /**
     * @return \Orm\Zed\TimeSlot\Persistence\PyzTimeSlotHistoryQuery
     */
    protected function buildQuery()
    {
        $result = PyzTimeSlotHistoryQuery::create()
            ->withColumn("(select username from spy_user where spy_user.id_user = pyz_time_slot_history.fk_user)", "username")
            ->filterByMerchantReference_In($this->merchantsToShow)
            ->orderByCreatedAt(Criteria::DESC)
            ->orderByTimeSlotChanged(Criteria::ASC)
            ->orderByActionPerformed(Criteria::DESC);

        return $result;
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return void
     */
    protected function persistFilters(TableConfiguration $config)
    {
        $filters = [
            static::COL_CREATED_AT => $this->request->query->get(static::CREATED_AT_FILTER),
        ];

        $sanitizedFilers = array_filter($filters);

        $queryFilters = http_build_query($sanitizedFilers);

        if ($queryFilters) {
            $config->setUrl(sprintf('table?%s', $queryFilters));
        }
    }

    /**
     * @param array $queryResults
     *
     * @return array
     */
    protected function formatQueryData(array $queryResults)
    {
        $results = [];

        foreach ($queryResults as $item) {
            $results[] = [
                static::COL_CREATED_AT => date("Y-m-d H:i:s", strtotime($item[PyzTimeSlotHistoryTableMap::COL_CREATED_AT])),
                static::COL_MERCHANT_REFERENCE => $item[PyzTimeSlotHistoryTableMap::COL_MERCHANT_REFERENCE],
                static::COL_DATE_CHANGED => $item[PyzTimeSlotHistoryTableMap::COL_DATE_CHANGED],
                static::COL_DAY_CHANGED => $item[PyzTimeSlotHistoryTableMap::COL_DAY_CHANGED],
                static::COL_TIME_SLOT_CHANGED => $item[PyzTimeSlotHistoryTableMap::COL_TIME_SLOT_CHANGED],
                static::COL_ID_TIME_SLOT_HISTORY => $item[PyzTimeSlotHistoryTableMap::COL_ID_TIME_SLOT_HISTORY],
                static::COL_CAPACITY_SET_FROM => $item[PyzTimeSlotHistoryTableMap::COL_CAPACITY_SET_FROM],
                static::COL_CAPACITY_SET_TO => $item[PyzTimeSlotHistoryTableMap::COL_CAPACITY_SET_TO],
                static::COL_ACTION_PERFORMED => $item[PyzTimeSlotHistoryTableMap::COL_ACTION_PERFORMED],
                static::COL_ID_USER => $item[PyzTimeSlotHistoryTableMap::COL_FK_USER],
            ];
        }

        return $results;
    }
}
