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
use Propel\Runtime\Exception\LogicException;
use Pyz\Shared\Acl\AclConstants;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\Sales\SalesConfig;
use Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;
use Spryker\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Zed\Sales\Communication\Table\OrdersTable as SprykerOrdersTable;
use Spryker\Zed\Sales\Dependency\Facade\SalesToCustomerInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToMoneyInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface;
use Spryker\Zed\Sales\Dependency\Service\SalesToUtilSanitizeInterface;
use Twig\Loader\FilesystemLoader;

class OrdersTable extends SprykerOrdersTable
{
    public const REQUESTED_DELIVERY_DATE = 'requested_delivery_date';
    public const ADDRESS_PHONE = 'BillingAddress';
    public const DAY_RANGE_FILTER = 'day-range-filter';
    public const MERCHANT_REFERENCE_FILTER = 'merchant-reference-filter';
    public const DATE_RANGE_FILTER = 'date-range-filter';
    public const DATE_FROM_FILTER = 'date-from-range-filter';
    public const DATE_TO_FILTER = 'date-to-range-filter';
    public const FILTER_BY_STORE_STATUS = 'state-status-filter';
    public const FILTER_BY_PICK_ZONES = 'pickZones';
    public const FILTER_BY_TIME_SLOTS = 'timeSlots';

    protected const TIMESLOT_DELIMITER = '_';
    protected const TIMESLOT_DELIMITER_REPLACEMENT = ' ';
    protected const TIMESLOT_SEARCHABLE_FIELD_PATTERN = 'REPLACE(%s, \'%s\', \'%s\')';

    /**
     * @var \Pyz\Zed\Sales\Communication\Table\OrdersTableQueryBuilderInterface
     */
    protected $queryBuilder;

    /**
     * @var \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    protected $userFacade;

    /**
     * @var \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    protected $aclFacade;

    /**
     * @var \Pyz\Zed\Sales\SalesConfig
     */
    protected $salesConfig;

    /**
     * @var \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    protected $pickingZoneFacade;

    /**
     * @var \Spryker\Zed\Sales\Business\SalesFacadeInterface
     */
    protected $salesFacade;

    /**
     * @var int
     */
    protected $defaultLimit = 50;

    /**
     * @param \Pyz\Zed\Sales\Communication\Table\OrdersTableQueryBuilderInterface $queryBuilder
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToMoneyInterface $moneyFacade
     * @param \Spryker\Zed\Sales\Dependency\Service\SalesToUtilSanitizeInterface $sanitizeService
     * @param \Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface $utilDateTimeService
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToCustomerInterface $customerFacade
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface $userFacade
     * @param \Spryker\Zed\Acl\Business\AclFacadeInterface $aclFacade
     * @param \Pyz\Zed\Sales\SalesConfig $salesConfig
     * @param \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface $pickingZoneFacade
     * @param \Spryker\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param array $salesTablePlugins
     */
    public function __construct(
        OrdersTableQueryBuilderInterface $queryBuilder,
        SalesToMoneyInterface $moneyFacade,
        SalesToUtilSanitizeInterface $sanitizeService,
        UtilDateTimeServiceInterface $utilDateTimeService,
        SalesToCustomerInterface $customerFacade,
        SalesToUserInterface $userFacade,
        AclFacadeInterface $aclFacade,
        SalesConfig $salesConfig,
        PickingZoneFacadeInterface $pickingZoneFacade,
        SalesFacadeInterface $salesFacade,
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
        $this->salesConfig = $salesConfig;
        $this->pickingZoneFacade = $pickingZoneFacade;
        $this->salesFacade = $salesFacade;
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
     * @return array
     */
    public function getMerchantFilterButtonsData()
    {
        $currentUser = $this->userFacade->getCurrentUser();
        $isCurrentUserSupervisor = $this->isCurrentUserSupervisor($currentUser);

        if (!$isCurrentUserSupervisor) {
            return $this->getMerchantsIdToNameMap();
        }

        return [];
    }

    /**
     * @return string[]
     */
    public function getPickingZones(): array
    {
        $pickingZoneTransfers = $this->pickingZoneFacade->getPickingZones('');
        $pickingZones = [];

        foreach ($pickingZoneTransfers as $pickingZoneTransfer) {
            $pickingZones[$pickingZoneTransfer->getIdPickingZone()] = $pickingZoneTransfer->getName();
        }

        return $pickingZones;
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
     * @return string
     */
    public function render()
    {
        $this->init();

        $twigVars = [
            'config' => $this->prepareConfig(),
        ];

        return $this->twig
            ->render('index.twig', $twigVars);
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
     * @return $this
     */
    protected function init()
    {
        if (!$this->initialized) {
            $this->initialized = true;
            $this->request = $this->getRequest();
            $config = $this->newTableConfiguration();
            $config->setPageLength($this->getLimit());
            $config = $this->configure($config);
            $this->setConfiguration($config);
            $this->twig = $this->getTwig();

            if ($this->tableIdentifier === null) {
                $this->generateTableIdentifier();
            }
        }

        return $this;
    }

    /**
     * @throws \Propel\Runtime\Exception\LogicException
     *
     * @return \Twig\Environment
     */
    private function getTwig()
    {
        /** @var \Twig\Environment|null $twig */
        $twig = $this->getApplicationContainer()->get(static::SERVICE_TWIG);

        if ($twig === null) {
            throw new LogicException('Twig environment not set up.');
        }

        /** @var \Twig\Loader\ChainLoader $loaderChain */
        $loaderChain = $twig->getLoader();
        $loaderChain->addLoader(new FilesystemLoader(
            $this->getTwigPaths(),
            $this->getTwigRootPath()
        ));

        return $twig;
    }

    /**
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderQuery
     */
    protected function buildQuery()
    {
        $query = parent::buildQuery();
        $query->withColumn("(select max(item_paused) from spy_sales_order_item where fk_sales_order = spy_sales_order.id_sales_order)", "isPaused");
        $dayRangeFilter = $this->request->query->get(static::DAY_RANGE_FILTER);
        $merchantReferenceFilter = $this->request->query->get(static::MERCHANT_REFERENCE_FILTER);
        $dateRangeFilter = $this->request->query->get(static::DATE_RANGE_FILTER);
        $dateFrom = $this->request->query->get(static::DATE_FROM_FILTER);
        $dateTo = $this->request->query->get(static::DATE_TO_FILTER);
        $storeStatus = $this->request->query->get(static::FILTER_BY_STORE_STATUS);
        $pickingZones = json_decode(urldecode($this->request->query->get(static::FILTER_BY_PICK_ZONES)));
        $timeSlots = json_decode(urldecode($this->request->query->get(static::FILTER_BY_TIME_SLOTS)));
        $currentUser = $this->userFacade->getCurrentUser();
        $isCurrentUserSupervisor = $this->isCurrentUserSupervisor($currentUser);

        if ($dateFrom && $dateTo) {
            $query = $this->queryBuilder->applyFilterDateBetween($query, new DateTime($dateFrom), new DateTime($dateTo));
        } elseif ($dateFrom == '' && $dateTo == '') {
            $query = $this->queryBuilder->applyFilterDateBetween($query, new DateTime(), new DateTime());
        }

        if ($storeStatus === "paused") {
            $query = $this->queryBuilder->applyFilterByPausedState($query);
        } elseif ($storeStatus) {
            $query = $this->queryBuilder->applyFilterByState($query, $storeStatus);
        }

        if ($dayRangeFilter) {
            $query = $this->queryBuilder->applyDayRangeFilter($query, new DateTime($dayRangeFilter));
        }

        if ($dateRangeFilter) {
            $query = $this->queryBuilder->applyDayRangeFilter($query, new DateTime($dateRangeFilter));
        }

        if ($pickingZones) {
            $query = $this->queryBuilder->applyFilterByPickZone($query, $pickingZones);
        }

        if ($timeSlots) {
            $query = $this->queryBuilder->applyFilterByTimeSlots($query, $timeSlots);
        }

        if ($isCurrentUserSupervisor || $merchantReferenceFilter) {
            $merchantReference = $isCurrentUserSupervisor ? $currentUser->getMerchantReference() : $merchantReferenceFilter;
            $query = $this->queryBuilder->applyMerchantReferenceFilter($query, $merchantReference);
        }

        return $query;
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
            SpySalesOrderAddressTableMap::COL_CELL_PHONE => 'Mobile',
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
        $filters = [
            static::ID_ORDER_ITEM_PROCESS => $this->request->query->getInt(static::ID_ORDER_ITEM_PROCESS),
            static::DAY_RANGE_FILTER => $this->request->query->get(static::DAY_RANGE_FILTER),
            static::DATE_RANGE_FILTER => $this->request->query->get(static::DATE_RANGE_FILTER),
            static::DATE_FROM_FILTER => $this->request->query->get(static::DATE_FROM_FILTER),
            static::DATE_TO_FILTER => $this->request->query->get(static::DATE_TO_FILTER),
            static::FILTER_BY_STORE_STATUS => $this->request->query->get(static::FILTER_BY_STORE_STATUS),
            static::MERCHANT_REFERENCE_FILTER => $this->request->query->get(static::MERCHANT_REFERENCE_FILTER),
            static::ID_ORDER_ITEM_STATE => $this->request->query->getInt(static::ID_ORDER_ITEM_STATE),
            static::FILTER => $this->request->query->get(static::FILTER),
            static::FILTER_BY_PICK_ZONES => $this->request->query->get(static::FILTER_BY_PICK_ZONES),
            static::FILTER_BY_TIME_SLOTS => $this->request->query->get(static::FILTER_BY_TIME_SLOTS),
        ];

        $sanitizedFilers = array_filter($filters);

        $queryFilters = http_build_query($sanitizedFilers);

        if ($queryFilters) {
            $config->setUrl(sprintf('table?%s', $queryFilters));
        }
    }

    /**
     * @return array
     */
    protected function getMerchantsIdToNameMap(): array
    {
        $merchantFilterButtonsData = [];

        foreach ($this->salesConfig->getSapStoreIdToStoreMap() as $sapStoreId => $sapStoreName) {
            $merchantFilterButtonsData[$sapStoreId] = $sapStoreName;
        }

        return $merchantFilterButtonsData;
    }

    /**
     * @param string $itemStateNamesCsv
     * @param string $isPaused
     *
     * @return string
     */
    protected function groupPyzItemStateNames(string $itemStateNamesCsv, string $isPaused)
    {
        $itemStateNames = explode(',', $itemStateNamesCsv);
        $itemStateNames = array_map('trim', $itemStateNames);
        $distinctItemStateNames = array_unique($itemStateNames);

        return implode(', ', $distinctItemStateNames) . $isPaused;
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
            $isPaused = $item['isPaused'];
            $isPausedText = '';
            if ($isPaused === "1") {
                $isPausedText = ' (paused)';
            }
            $itemLine = [
                SpySalesOrderTableMap::COL_ID_SALES_ORDER => $item[SpySalesOrderTableMap::COL_ID_SALES_ORDER],
                SpySalesOrderTableMap::COL_ORDER_REFERENCE => $item[SpySalesOrderTableMap::COL_ORDER_REFERENCE],
                SpySalesOrderTableMap::COL_MERCHANT_NAME => $item[SpySalesOrderTableMap::COL_MERCHANT_NAME],
                SpySalesOrderTableMap::COL_CREATED_AT => $this->utilDateTimeService->formatDateTime($item[SpySalesOrderTableMap::COL_CREATED_AT]),
                SpySalesOrderTableMap::COL_CUSTOMER_REFERENCE => $this->formatCustomer($item),
                SpySalesOrderTableMap::COL_EMAIL => $this->formatEmailAddress($item[SpySalesOrderTableMap::COL_EMAIL]),
                static::ADDRESS_PHONE => $this->getAddressPhone($item),
                SpySalesOrderAddressTableMap::COL_CELL_PHONE => $this->getAddressMobilePhone($item),
                static::ITEM_STATE_NAMES_CSV => $this->groupPyzItemStateNames($item[OrdersTableQueryBuilder::FIELD_ITEM_STATE_NAMES_CSV], $isPausedText),
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
     *
     * @return string
     */
    protected function getAddressMobilePhone(array $item): string
    {
        return $item[static::ADDRESS_PHONE][SpySalesOrderAddressTableMap::COL_CELL_PHONE] ?? 'No Billing address or Phone was set';
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
