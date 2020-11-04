<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Table;

use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesShipmentTableMap;
use Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;
use Spryker\Zed\Sales\Communication\Table\OrdersTable as SprykerOrdersTable;
use Spryker\Zed\Sales\Communication\Table\OrdersTableQueryBuilderInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToCustomerInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToMoneyInterface;
use Spryker\Zed\Sales\Dependency\Service\SalesToUtilSanitizeInterface;

class OrdersTable extends SprykerOrdersTable
{
    public const REQUESTED_DELIVERY_DATE = 'requested_delivery_date';

    protected const TIMESLOT_DELIMITER = '_';
    protected const TIMESLOT_DELIMITER_REPLACEMENT = ' ';
    protected const TIMESLOT_SEARCHABLE_FIELD_PATTERN = 'REPLACE(%s, \'%s\', \'%s\')';

    /**
     * @param \Spryker\Zed\Sales\Communication\Table\OrdersTableQueryBuilderInterface $queryBuilder
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToMoneyInterface $moneyFacade
     * @param \Spryker\Zed\Sales\Dependency\Service\SalesToUtilSanitizeInterface $sanitizeService
     * @param \Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface $utilDateTimeService
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToCustomerInterface $customerFacade
     * @param \Spryker\Zed\SalesExtension\Dependency\Plugin\SalesTablePluginInterface[] $salesTablePlugins
     */
    public function __construct(
        OrdersTableQueryBuilderInterface $queryBuilder,
        SalesToMoneyInterface $moneyFacade,
        SalesToUtilSanitizeInterface $sanitizeService,
        UtilDateTimeServiceInterface $utilDateTimeService,
        SalesToCustomerInterface $customerFacade,
        array $salesTablePlugins
    ) {
        parent::__construct(
            $queryBuilder,
            $moneyFacade,
            $sanitizeService,
            $utilDateTimeService,
            $customerFacade,
            $salesTablePlugins
        );
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return \Spryker\Zed\Gui\Communication\Table\TableConfiguration
     */
    protected function configure(TableConfiguration $config)
    {
        $config = parent::configure($config);

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
        $queryResults = $this->runQuery($query, $config);

        return $this->formatQueryData($queryResults);
    }

    /**
     * @return array
     */
    protected function getHeaderFields()
    {
        return [
            SpySalesOrderTableMap::COL_ID_SALES_ORDER => '#',
            SpySalesOrderTableMap::COL_ORDER_REFERENCE => 'Order Reference',
            SpySalesOrderTableMap::COL_CREATED_AT => 'Created',
            SpySalesOrderTableMap::COL_MERCHANT_NAME => 'Merchant',
            static::REQUESTED_DELIVERY_DATE => 'Time slot',
            SpySalesOrderTableMap::COL_CUSTOMER_REFERENCE => 'Customer Full Name',
            SpySalesOrderTableMap::COL_EMAIL => 'Email',
            static::ITEM_STATE_NAMES_CSV => 'Order State',
            static::GRAND_TOTAL => 'Grand Total',
            static::NUMBER_OF_ORDER_ITEMS => 'Number of Items',
            static::URL => 'Actions',
        ];
    }

    /**
     * @return array
     */
    protected function getSearchableFields()
    {
        $searchableFields = parent::getSearchableFields();

        $searchableFields[] = $this->getTimeSlotSearchableField();
        $searchableFields[] = SpySalesOrderTableMap::COL_MERCHANT_NAME;

        return $searchableFields;
    }

    /**
     * @return array
     */
    protected function getSortableFields()
    {
        $sortableFields = parent::getSortableFields();

        $sortableFields[] = static::REQUESTED_DELIVERY_DATE;
        $sortableFields[] = SpySalesOrderTableMap::COL_MERCHANT_NAME;

        return $sortableFields;
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
            $itemLine = [
                SpySalesOrderTableMap::COL_ID_SALES_ORDER => $item[SpySalesOrderTableMap::COL_ID_SALES_ORDER],
                SpySalesOrderTableMap::COL_ORDER_REFERENCE => $item[SpySalesOrderTableMap::COL_ORDER_REFERENCE],
                SpySalesOrderTableMap::COL_MERCHANT_NAME => $item[SpySalesOrderTableMap::COL_MERCHANT_NAME],
                SpySalesOrderTableMap::COL_CREATED_AT => $this->utilDateTimeService->formatDateTime($item[SpySalesOrderTableMap::COL_CREATED_AT]),
                SpySalesOrderTableMap::COL_CUSTOMER_REFERENCE => $this->formatCustomer($item),
                SpySalesOrderTableMap::COL_EMAIL => $this->formatEmailAddress($item[SpySalesOrderTableMap::COL_EMAIL]),
                static::ITEM_STATE_NAMES_CSV => $this->groupItemStateNames($item[OrdersTableQueryBuilder::FIELD_ITEM_STATE_NAMES_CSV]),
                static::GRAND_TOTAL => $this->getGrandTotal($item),
                static::NUMBER_OF_ORDER_ITEMS => $item[OrdersTableQueryBuilder::FIELD_NUMBER_OF_ORDER_ITEMS],
                static::URL => implode(' ', $this->createActionUrls($item)),

                static::REQUESTED_DELIVERY_DATE => $this->formatRequestedDeliveryDate(
                    $item[OrdersTableQueryBuilder::FIELD_REQUESTED_DELIVERY_DATE]
                ),
            ];
            $itemLine = $this->applyUiPlugins($itemLine);
            $results[] = $itemLine;
        }

        return $results;
    }

    /**
     * @param string $requestedDeliveryDate
     *
     * @return string
     */
    protected function formatRequestedDeliveryDate(string $requestedDeliveryDate): string
    {
        return str_replace(
            self::TIMESLOT_DELIMITER,
            self::TIMESLOT_DELIMITER_REPLACEMENT,
            $requestedDeliveryDate
        );
    }

    /**
     * @return string
     */
    protected function getTimeSlotSearchableField(): string
    {
        return sprintf(
            static::TIMESLOT_SEARCHABLE_FIELD_PATTERN,
            SpySalesShipmentTableMap::COL_REQUESTED_DELIVERY_DATE,
            static::TIMESLOT_DELIMITER,
            static::TIMESLOT_DELIMITER_REPLACEMENT
        );
    }
}
