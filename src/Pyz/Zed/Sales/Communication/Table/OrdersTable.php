<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Table;

use DateTime;
use Generated\Shared\Transfer\UserTransfer;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderAddressTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Orm\Zed\Sales\Persistence\Map\SpySalesShipmentTableMap;
use Pyz\Shared\Acl\AclConstants;
use Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;
use Spryker\Zed\Sales\Communication\Table\OrdersTable as SprykerOrdersTable;
use Spryker\Zed\Sales\Communication\Table\OrdersTableQueryBuilderInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToCustomerInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToMoneyInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface;
use Spryker\Zed\Sales\Dependency\Service\SalesToUtilSanitizeInterface;

class OrdersTable extends SprykerOrdersTable
{
    public const REQUESTED_DELIVERY_DATE = 'requested_delivery_date';
    public const ADDRESS_PHONE = 'BillingAddress';
    public const DAY_RANGE_FILTER = 'day-range-filter';

    protected const TIMESLOT_DELIMITER = '_';
    protected const TIMESLOT_DELIMITER_REPLACEMENT = ' ';
    protected const TIMESLOT_SEARCHABLE_FIELD_PATTERN = 'REPLACE(%s, \'%s\', \'%s\')';
    /**
     * @var \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    protected $userFacade;

    /**
     * @var \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    protected $aclFacade;

    /**
     * @param \Spryker\Zed\Sales\Communication\Table\OrdersTableQueryBuilderInterface $queryBuilder
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToMoneyInterface $moneyFacade
     * @param \Spryker\Zed\Sales\Dependency\Service\SalesToUtilSanitizeInterface $sanitizeService
     * @param \Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface $utilDateTimeService
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToCustomerInterface $customerFacade
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface $userFacade
     * @param \Spryker\Zed\Acl\Business\AclFacadeInterface $aclFacade
     * @param \Spryker\Zed\SalesExtension\Dependency\Plugin\SalesTablePluginInterface[] $salesTablePlugins
     */
    public function __construct(
        OrdersTableQueryBuilderInterface $queryBuilder,
        SalesToMoneyInterface $moneyFacade,
        SalesToUtilSanitizeInterface $sanitizeService,
        UtilDateTimeServiceInterface $utilDateTimeService,
        SalesToCustomerInterface $customerFacade,
        SalesToUserInterface $userFacade,
        AclFacadeInterface $aclFacade,
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

        $this->userFacade = $userFacade;
        $this->aclFacade = $aclFacade;
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
            static::ADDRESS_PHONE => 'Phone',
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
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return void
     */
    protected function persistFilters(TableConfiguration $config)
    {
        $idOrderItemProcess = $this->request->query->getInt(static::ID_ORDER_ITEM_PROCESS);
        $dayRangeFilter = $this->request->query->get(static::DAY_RANGE_FILTER);
        if ($idOrderItemProcess) {
            $idOrderItemState = $this->request->query->getInt(static::ID_ORDER_ITEM_STATE);
            $filter = $this->request->query->get(static::FILTER);

            $config->setUrl(
                sprintf(
                    'table?id-order-item-process=%s&id-order-item-state=%s&filter=%s&day-range-filter=%s',
                    $idOrderItemProcess,
                    $idOrderItemState,
                    $filter,
                    $dayRangeFilter
                )
            );
        }

        if ($dayRangeFilter) {
            $config->setUrl(sprintf('table?day-range-filter=%s', $dayRangeFilter));
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
        $dayRangeFilter = $this->request->query->get(static::DAY_RANGE_FILTER);

        $currentUser = $this->userFacade->getCurrentUser();
        $isCurrentUserSupervisor = $this->isCurrentUserSupervisor($currentUser);

        foreach ($queryResults as $item) {
            if ($dayRangeFilter && !$this->hasApplicableDateForDayRangeFilter($item, $dayRangeFilter)) {
                continue;
            }

            if ($isCurrentUserSupervisor && !$this->userHasApplicableMerchantReference($item, $currentUser)) {
                continue;
            }

            $itemLine = [
                SpySalesOrderTableMap::COL_ID_SALES_ORDER => $item[SpySalesOrderTableMap::COL_ID_SALES_ORDER],
                SpySalesOrderTableMap::COL_ORDER_REFERENCE => $item[SpySalesOrderTableMap::COL_ORDER_REFERENCE],
                SpySalesOrderTableMap::COL_MERCHANT_NAME => $item[SpySalesOrderTableMap::COL_MERCHANT_NAME],
                SpySalesOrderTableMap::COL_CREATED_AT => $this->utilDateTimeService->formatDateTime($item[SpySalesOrderTableMap::COL_CREATED_AT]),
                SpySalesOrderTableMap::COL_CUSTOMER_REFERENCE => $this->formatCustomer($item),
                SpySalesOrderTableMap::COL_EMAIL => $this->formatEmailAddress($item[SpySalesOrderTableMap::COL_EMAIL]),
                static::ADDRESS_PHONE => $this->getAddressPhone($item),
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
     * @param array $item
     * @param \Generated\Shared\Transfer\UserTransfer $currentUser
     *
     * @return bool
     */
    protected function userHasApplicableMerchantReference(array $item, UserTransfer $currentUser): bool
    {
        return $item[SpySalesOrderTableMap::COL_MERCHANT_REFERENCE] === $currentUser->getMerchantReference();
    }

    /**
     * @param \Generated\Shared\Transfer\UserTransfer $currentUser
     *
     * @return bool
     */
    protected function isCurrentUserSupervisor(UserTransfer $currentUser): bool
    {
        $currentUserGroups = $this->aclFacade->getUserGroups($currentUser->getIdUser());

        foreach ($currentUserGroups->getGroups() as $group) {
            if ($group->getName() === AclConstants::SUPERVISOR_GROUP) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param array $item
     * @param string $dayRangeFilter
     *
     * @return bool
     */
    protected function hasApplicableDateForDayRangeFilter(array $item, string $dayRangeFilter): bool
    {
        $timeSlotDate = explode('_', $item[static::REQUESTED_DELIVERY_DATE])[0];
        $orderDate = DateTime::createFromFormat('Y-m-d', $timeSlotDate)->modify('midnight');

        return $orderDate == new DateTime($dayRangeFilter);
    }

    /**
     * @param array $item
     *
     * @return string
     */
    protected function getAddressPhone(array $item): string
    {
        return $item[static::ADDRESS_PHONE][SpySalesOrderAddressTableMap::COL_PHONE] ?? 'No Billing address or Phone was set';
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
