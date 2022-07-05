<?php

namespace Orm\Zed\FactFinderExport\Persistence\Base;

use \Exception;
use \PDO;
use Orm\Zed\FactFinderExport\Persistence\PyzFactFinderEvent as ChildPyzFactFinderEvent;
use Orm\Zed\FactFinderExport\Persistence\PyzFactFinderEventQuery as ChildPyzFactFinderEventQuery;
use Orm\Zed\FactFinderExport\Persistence\Map\PyzFactFinderEventTableMap;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\ModelCriteria;
use Propel\Runtime\Collection\ObjectCollection;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Exception\PropelException;
use Spryker\Zed\PropelOrm\Business\Runtime\ActiveQuery\Criteria as SprykerCriteria;
use Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException;

/**
 * Base class that represents a query for the 'pyz_fact_finder_event' table.
 *
 *
 *
 * @method     ChildPyzFactFinderEventQuery orderByIdFactFinderEvent($order = Criteria::ASC) Order by the id_fact_finder_event column
 * @method     ChildPyzFactFinderEventQuery orderByFkProductAbstract($order = Criteria::ASC) Order by the fk_product_abstract column
 * @method     ChildPyzFactFinderEventQuery orderByEventName($order = Criteria::ASC) Order by the event_name column
 * @method     ChildPyzFactFinderEventQuery orderByClassName($order = Criteria::ASC) Order by the class_name column
 * @method     ChildPyzFactFinderEventQuery orderByEventData($order = Criteria::ASC) Order by the event_data column
 * @method     ChildPyzFactFinderEventQuery orderByCreatedAt($order = Criteria::ASC) Order by the created_at column
 *
 * @method     ChildPyzFactFinderEventQuery groupByIdFactFinderEvent() Group by the id_fact_finder_event column
 * @method     ChildPyzFactFinderEventQuery groupByFkProductAbstract() Group by the fk_product_abstract column
 * @method     ChildPyzFactFinderEventQuery groupByEventName() Group by the event_name column
 * @method     ChildPyzFactFinderEventQuery groupByClassName() Group by the class_name column
 * @method     ChildPyzFactFinderEventQuery groupByEventData() Group by the event_data column
 * @method     ChildPyzFactFinderEventQuery groupByCreatedAt() Group by the created_at column
 *
 * @method     ChildPyzFactFinderEventQuery leftJoin($relation) Adds a LEFT JOIN clause to the query
 * @method     ChildPyzFactFinderEventQuery rightJoin($relation) Adds a RIGHT JOIN clause to the query
 * @method     ChildPyzFactFinderEventQuery innerJoin($relation) Adds a INNER JOIN clause to the query
 *
 * @method     ChildPyzFactFinderEventQuery leftJoinWith($relation) Adds a LEFT JOIN clause and with to the query
 * @method     ChildPyzFactFinderEventQuery rightJoinWith($relation) Adds a RIGHT JOIN clause and with to the query
 * @method     ChildPyzFactFinderEventQuery innerJoinWith($relation) Adds a INNER JOIN clause and with to the query
 *
 * @method     ChildPyzFactFinderEvent|null|null findOne(ConnectionInterface $con = null) Return the first ChildPyzFactFinderEvent matching the query
 * @method     ChildPyzFactFinderEvent findOneOrCreate(ConnectionInterface $con = null) Return the first ChildPyzFactFinderEvent matching the query, or a new ChildPyzFactFinderEvent object populated from the query conditions when no match is found
 *
 * @method     ChildPyzFactFinderEvent|null|null findOneByIdFactFinderEvent(string $id_fact_finder_event) Return the first ChildPyzFactFinderEvent filtered by the id_fact_finder_event column
 * @method     ChildPyzFactFinderEvent|null|null findOneByFkProductAbstract(int $fk_product_abstract) Return the first ChildPyzFactFinderEvent filtered by the fk_product_abstract column
 * @method     ChildPyzFactFinderEvent|null|null findOneByEventName(string $event_name) Return the first ChildPyzFactFinderEvent filtered by the event_name column
 * @method     ChildPyzFactFinderEvent|null|null findOneByClassName(string $class_name) Return the first ChildPyzFactFinderEvent filtered by the class_name column
 * @method     ChildPyzFactFinderEvent|null|null findOneByEventData(string $event_data) Return the first ChildPyzFactFinderEvent filtered by the event_data column
 * @method     ChildPyzFactFinderEvent|null|null findOneByCreatedAt(string $created_at) Return the first ChildPyzFactFinderEvent filtered by the created_at column *

 * @method     ChildPyzFactFinderEvent requirePk($key, ConnectionInterface $con = null) Return the ChildPyzFactFinderEvent by primary key and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPyzFactFinderEvent requireOne(ConnectionInterface $con = null) Return the first ChildPyzFactFinderEvent matching the query and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildPyzFactFinderEvent requireOneByIdFactFinderEvent(string $id_fact_finder_event) Return the first ChildPyzFactFinderEvent filtered by the id_fact_finder_event column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPyzFactFinderEvent requireOneByFkProductAbstract(int $fk_product_abstract) Return the first ChildPyzFactFinderEvent filtered by the fk_product_abstract column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPyzFactFinderEvent requireOneByEventName(string $event_name) Return the first ChildPyzFactFinderEvent filtered by the event_name column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPyzFactFinderEvent requireOneByClassName(string $class_name) Return the first ChildPyzFactFinderEvent filtered by the class_name column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPyzFactFinderEvent requireOneByEventData(string $event_data) Return the first ChildPyzFactFinderEvent filtered by the event_data column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPyzFactFinderEvent requireOneByCreatedAt(string $created_at) Return the first ChildPyzFactFinderEvent filtered by the created_at column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildPyzFactFinderEvent[]|ObjectCollection find(ConnectionInterface $con = null) Return ChildPyzFactFinderEvent objects based on current ModelCriteria
 * @method     ChildPyzFactFinderEvent[]|ObjectCollection findByIdFactFinderEvent(string $id_fact_finder_event) Return ChildPyzFactFinderEvent objects filtered by the id_fact_finder_event column
 * @method     ChildPyzFactFinderEvent[]|ObjectCollection findByFkProductAbstract(int $fk_product_abstract) Return ChildPyzFactFinderEvent objects filtered by the fk_product_abstract column
 * @method     ChildPyzFactFinderEvent[]|ObjectCollection findByEventName(string $event_name) Return ChildPyzFactFinderEvent objects filtered by the event_name column
 * @method     ChildPyzFactFinderEvent[]|ObjectCollection findByClassName(string $class_name) Return ChildPyzFactFinderEvent objects filtered by the class_name column
 * @method     ChildPyzFactFinderEvent[]|ObjectCollection findByEventData(string $event_data) Return ChildPyzFactFinderEvent objects filtered by the event_data column
 * @method     ChildPyzFactFinderEvent[]|ObjectCollection findByCreatedAt(string $created_at) Return ChildPyzFactFinderEvent objects filtered by the created_at column
 * @method     ChildPyzFactFinderEvent[]|\Propel\Runtime\Util\PropelModelPager paginate($page = 1, $maxPerPage = 10, ConnectionInterface $con = null) Issue a SELECT query based on the current ModelCriteria and uses a page and a maximum number of results per page to compute an offset and a limit
 *
 */
abstract class PyzFactFinderEventQuery extends ModelCriteria
{

    /**
     * @var bool
     */
    protected $isForUpdateEnabled = false;

    /**
     * @param bool $isForUpdateEnabled
     *
     * @return $this The primary criteria object
     */
    public function forUpdate($isForUpdateEnabled)
    {
        $this->isForUpdateEnabled = $isForUpdateEnabled;

        return $this;
    }

    /**
     * @param array $params
     *
     * @return string
     */
    public function createSelectSql(&$params)
    {
        $sql = parent::createSelectSql($params);
        if ($this->isForUpdateEnabled) {
            $sql .= ' FOR UPDATE';
        }

        return $sql;
    }

    /**
     * Clear the conditions to allow the reuse of the query object.
     * The ModelCriteria's Model and alias 'all the properties set by construct) will remain.
     *
     * @return $this The primary criteria object
     */
    public function clear()
    {
        parent::clear();

        $this->forUpdate(false);

        return $this;
    }

    protected $entityNotFoundExceptionClass = '\\Propel\\Runtime\\Exception\\EntityNotFoundException';

    /**
     * Initializes internal state of \Orm\Zed\FactFinderExport\Persistence\Base\PyzFactFinderEventQuery object.
     *
     * @param     string $dbName The database name
     * @param     string $modelName The phpName of a model, e.g. 'Book'
     * @param     string $modelAlias The alias for the model in this query, e.g. 'b'
     */
    public function __construct($dbName = 'zed', $modelName = '\\Orm\\Zed\\FactFinderExport\\Persistence\\PyzFactFinderEvent', $modelAlias = null)
    {
        parent::__construct($dbName, $modelName, $modelAlias);
    }

    /**
     * Returns a new ChildPyzFactFinderEventQuery object.
     *
     * @param     string $modelAlias The alias of a model in the query
     * @param     Criteria $criteria Optional Criteria to build the query from
     *
     * @return ChildPyzFactFinderEventQuery
     */
    public static function create($modelAlias = null, Criteria $criteria = null)
    {
        if ($criteria instanceof ChildPyzFactFinderEventQuery) {
            return $criteria;
        }
        $query = new ChildPyzFactFinderEventQuery();
        if (null !== $modelAlias) {
            $query->setModelAlias($modelAlias);
        }
        if ($criteria instanceof Criteria) {
            $query->mergeWith($criteria);
        }

        return $query;
    }

    /**
     * Find object by primary key.
     * Propel uses the instance pool to skip the database if the object exists.
     * Go fast if the query is untouched.
     *
     * <code>
     * $obj  = $c->findPk(12, $con);
     * </code>
     *
     * @param mixed $key Primary key to use for the query
     * @param ConnectionInterface $con an optional connection object
     *
     * @return ChildPyzFactFinderEvent|array|mixed the result, formatted by the current formatter
     */
    public function findPk($key, ConnectionInterface $con = null)
    {
        if ($key === null) {
            return null;
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getReadConnection(PyzFactFinderEventTableMap::DATABASE_NAME);
        }

        $this->basePreSelect($con);

        if (
            $this->formatter || $this->modelAlias || $this->with || $this->select
            || $this->selectColumns || $this->asColumns || $this->selectModifiers
            || $this->map || $this->having || $this->joins
        ) {
            return $this->findPkComplex($key, $con);
        }

        if ((null !== ($obj = PyzFactFinderEventTableMap::getInstanceFromPool(null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key)))) {
            // the object is already in the instance pool
            return $obj;
        }

        return $this->findPkSimple($key, $con);
    }

    /**
     * Find object by primary key using raw SQL to go fast.
     * Bypass doSelect() and the object formatter by using generated code.
     *
     * @param     mixed $key Primary key to use for the query
     * @param     ConnectionInterface $con A connection object
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildPyzFactFinderEvent A model object, or null if the key is not found
     */
    protected function findPkSimple($key, ConnectionInterface $con)
    {
        $sql = 'SELECT id_fact_finder_event, fk_product_abstract, event_name, class_name, event_data, created_at FROM pyz_fact_finder_event WHERE id_fact_finder_event = :p0';
        try {
            $stmt = $con->prepare($sql);
            $stmt->bindValue(':p0', $key, PDO::PARAM_INT);
            $stmt->execute();
        } catch (Exception $e) {
            Propel::log($e->getMessage(), Propel::LOG_ERR);
            throw new PropelException(sprintf('Unable to execute SELECT statement [%s]', $sql), 0, $e);
        }
        $obj = null;
        if ($row = $stmt->fetch(\PDO::FETCH_NUM)) {
            /** @var ChildPyzFactFinderEvent $obj */
            $obj = new ChildPyzFactFinderEvent();
            $obj->hydrate($row);
            PyzFactFinderEventTableMap::addInstanceToPool($obj, null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key);
        }
        $stmt->closeCursor();

        return $obj;
    }

    /**
     * Find object by primary key.
     *
     * @param     mixed $key Primary key to use for the query
     * @param     ConnectionInterface $con A connection object
     *
     * @return ChildPyzFactFinderEvent|array|mixed the result, formatted by the current formatter
     */
    protected function findPkComplex($key, ConnectionInterface $con)
    {
        // As the query uses a PK condition, no limit(1) is necessary.
        $criteria = $this->isKeepQuery() ? clone $this : $this;
        $dataFetcher = $criteria
            ->filterByPrimaryKey($key)
            ->doSelect($con);

        return $criteria->getFormatter()->init($criteria)->formatOne($dataFetcher);
    }

    /**
     * Find objects by primary key
     * <code>
     * $objs = $c->findPks(array(12, 56, 832), $con);
     * </code>
     * @param     array $keys Primary keys to use for the query
     * @param     ConnectionInterface $con an optional connection object
     *
     * @return ObjectCollection|array|mixed the list of results, formatted by the current formatter
     */
    public function findPks($keys, ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getReadConnection($this->getDbName());
        }
        $this->basePreSelect($con);
        $criteria = $this->isKeepQuery() ? clone $this : $this;
        $dataFetcher = $criteria
            ->filterByPrimaryKeys($keys)
            ->doSelect($con);

        return $criteria->getFormatter()->init($criteria)->format($dataFetcher);
    }

    /**
     * Filter the query by primary key
     *
     * @param     mixed $key Primary key to use for the query
     *
     * @return $this|ChildPyzFactFinderEventQuery The current query, for fluid interface
     */
    public function filterByPrimaryKey($key)
    {

        return $this->addUsingAlias(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT, $key, Criteria::EQUAL);
    }

    /**
     * Filter the query by a list of primary keys
     *
     * @param     array $keys The list of primary key to use for the query
     *
     * @return $this|ChildPyzFactFinderEventQuery The current query, for fluid interface
     */
    public function filterByPrimaryKeys($keys)
    {

        return $this->addUsingAlias(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT, $keys, Criteria::IN);
    }

    /**
     * Applies SprykerCriteria::BETWEEN filtering criteria for the column.
     *
     * @param array $idFactFinderEvent Filter value.
     * [
     *    'min' => 3, 'max' => 5
     * ]
     *
     * 'min' and 'max' are optional, when neither is specified, throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByIdFactFinderEvent_Between(array $idFactFinderEvent)
    {
        return $this->filterByIdFactFinderEvent($idFactFinderEvent, SprykerCriteria::BETWEEN);
    }

    /**
     * Applies Criteria::IN filtering criteria for the column.
     *
     * @param array $idFactFinderEvents Filter value.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByIdFactFinderEvent_In(array $idFactFinderEvents)
    {
        return $this->filterByIdFactFinderEvent($idFactFinderEvents, Criteria::IN);
    }

    /**
     * Filter the query on the id_fact_finder_event column
     *
     * Example usage:
     * <code>
     * $query->filterByIdFactFinderEvent(1234); // WHERE id_fact_finder_event = 1234
     * $query->filterByIdFactFinderEvent(array(12, 34), Criteria::IN); // WHERE id_fact_finder_event IN (12, 34)
     * $query->filterByIdFactFinderEvent(array('min' => 12), SprykerCriteria::BETWEEN); // WHERE id_fact_finder_event > 12
     * </code>
     *
     * @param     mixed $idFactFinderEvent The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent. Add Criteria::IN explicitly.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals. Add SprykerCriteria::BETWEEN explicitly.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this The current query, for fluid interface
     *
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     */
    public function filterByIdFactFinderEvent($idFactFinderEvent = null, $comparison = Criteria::EQUAL)
    {

        if (is_array($idFactFinderEvent)) {
            $useMinMax = false;
            if (isset($idFactFinderEvent['min'])) {
                if ($comparison != SprykerCriteria::BETWEEN && $comparison != Criteria::GREATER_EQUAL && $comparison != Criteria::GREATER_THAN) {
                    throw new AmbiguousComparisonException('\'min\' requires explicit Criteria::GREATER_EQUAL, Criteria::GREATER_THAN or SprykerCriteria::BETWEEN when \'max\' is also needed as comparison criteria.');
                }
                $this->addUsingAlias(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT, $idFactFinderEvent['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($idFactFinderEvent['max'])) {
                if ($comparison != SprykerCriteria::BETWEEN && $comparison != Criteria::LESS_EQUAL && $comparison != Criteria::LESS_THAN) {
                    throw new AmbiguousComparisonException('\'max\' requires explicit Criteria::LESS_EQUAL, Criteria::LESS_THAN or SprykerCriteria::BETWEEN when \'min\' is also needed as comparison criteria.');
                }
                $this->addUsingAlias(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT, $idFactFinderEvent['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }

            if (!in_array($comparison, [Criteria::IN, Criteria::NOT_IN])) {
                throw new AmbiguousComparisonException('$idFactFinderEvent of type array requires one of [Criteria::IN, Criteria::NOT_IN] as comparison criteria.');
            }
        }

        $query = $this->addUsingAlias(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT, $idFactFinderEvent, $comparison);

        return $query;
    }

    /**
     * Applies SprykerCriteria::BETWEEN filtering criteria for the column.
     *
     * @param array $fkProductAbstract Filter value.
     * [
     *    'min' => 3, 'max' => 5
     * ]
     *
     * 'min' and 'max' are optional, when neither is specified, throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByFkProductAbstract_Between(array $fkProductAbstract)
    {
        return $this->filterByFkProductAbstract($fkProductAbstract, SprykerCriteria::BETWEEN);
    }

    /**
     * Applies Criteria::IN filtering criteria for the column.
     *
     * @param array $fkProductAbstracts Filter value.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByFkProductAbstract_In(array $fkProductAbstracts)
    {
        return $this->filterByFkProductAbstract($fkProductAbstracts, Criteria::IN);
    }

    /**
     * Filter the query on the fk_product_abstract column
     *
     * Example usage:
     * <code>
     * $query->filterByFkProductAbstract(1234); // WHERE fk_product_abstract = 1234
     * $query->filterByFkProductAbstract(array(12, 34), Criteria::IN); // WHERE fk_product_abstract IN (12, 34)
     * $query->filterByFkProductAbstract(array('min' => 12), SprykerCriteria::BETWEEN); // WHERE fk_product_abstract > 12
     * </code>
     *
     * @param     mixed $fkProductAbstract The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent. Add Criteria::IN explicitly.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals. Add SprykerCriteria::BETWEEN explicitly.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this The current query, for fluid interface
     *
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     */
    public function filterByFkProductAbstract($fkProductAbstract = null, $comparison = Criteria::EQUAL)
    {

        if (is_array($fkProductAbstract)) {
            $useMinMax = false;
            if (isset($fkProductAbstract['min'])) {
                if ($comparison != SprykerCriteria::BETWEEN && $comparison != Criteria::GREATER_EQUAL && $comparison != Criteria::GREATER_THAN) {
                    throw new AmbiguousComparisonException('\'min\' requires explicit Criteria::GREATER_EQUAL, Criteria::GREATER_THAN or SprykerCriteria::BETWEEN when \'max\' is also needed as comparison criteria.');
                }
                $this->addUsingAlias(PyzFactFinderEventTableMap::COL_FK_PRODUCT_ABSTRACT, $fkProductAbstract['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($fkProductAbstract['max'])) {
                if ($comparison != SprykerCriteria::BETWEEN && $comparison != Criteria::LESS_EQUAL && $comparison != Criteria::LESS_THAN) {
                    throw new AmbiguousComparisonException('\'max\' requires explicit Criteria::LESS_EQUAL, Criteria::LESS_THAN or SprykerCriteria::BETWEEN when \'min\' is also needed as comparison criteria.');
                }
                $this->addUsingAlias(PyzFactFinderEventTableMap::COL_FK_PRODUCT_ABSTRACT, $fkProductAbstract['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }

            if (!in_array($comparison, [Criteria::IN, Criteria::NOT_IN])) {
                throw new AmbiguousComparisonException('$fkProductAbstract of type array requires one of [Criteria::IN, Criteria::NOT_IN] as comparison criteria.');
            }
        }

        $query = $this->addUsingAlias(PyzFactFinderEventTableMap::COL_FK_PRODUCT_ABSTRACT, $fkProductAbstract, $comparison);

        return $query;
    }

    /**
     * Applies Criteria::IN filtering criteria for the column.
     *
     * @param array $eventNames Filter value.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByEventName_In(array $eventNames)
    {
        return $this->filterByEventName($eventNames, Criteria::IN);
    }

    /**
     * Applies SprykerCriteria::LIKE filtering criteria for the column.
     *
     * @param string $eventName Filter value.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByEventName_Like($eventName)
    {
        return $this->filterByEventName($eventName, Criteria::LIKE);
    }

    /**
     * Filter the query on the event_name column
     *
     * Example usage:
     * <code>
     * $query->filterByEventName('fooValue');   // WHERE event_name = 'fooValue'
     * $query->filterByEventName('%fooValue%', Criteria::LIKE); // WHERE event_name LIKE '%fooValue%'
     * $query->filterByEventName([1, 'foo'], Criteria::IN); // WHERE event_name IN (1, 'foo')
     * </code>
     *
     * @param     string|string[] $eventName The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE). Add Criteria::LIKE explicitly.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this The current query, for fluid interface
     *
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     */
    public function filterByEventName($eventName = null, $comparison = Criteria::EQUAL)
    {
        if ($comparison == Criteria::LIKE || $comparison == Criteria::ILIKE) {
            $eventName = str_replace('*', '%', $eventName);
        }

        if (is_array($eventName) && !in_array($comparison, [Criteria::IN, Criteria::NOT_IN])) {
            throw new AmbiguousComparisonException('$eventName of type array requires one of [Criteria::IN, Criteria::NOT_IN] as comparison criteria.');
        }

        $query = $this->addUsingAlias(PyzFactFinderEventTableMap::COL_EVENT_NAME, $eventName, $comparison);

        return $query;
    }

    /**
     * Applies Criteria::IN filtering criteria for the column.
     *
     * @param array $classNames Filter value.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByClassName_In(array $classNames)
    {
        return $this->filterByClassName($classNames, Criteria::IN);
    }

    /**
     * Applies SprykerCriteria::LIKE filtering criteria for the column.
     *
     * @param string $className Filter value.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByClassName_Like($className)
    {
        return $this->filterByClassName($className, Criteria::LIKE);
    }

    /**
     * Filter the query on the class_name column
     *
     * Example usage:
     * <code>
     * $query->filterByClassName('fooValue');   // WHERE class_name = 'fooValue'
     * $query->filterByClassName('%fooValue%', Criteria::LIKE); // WHERE class_name LIKE '%fooValue%'
     * $query->filterByClassName([1, 'foo'], Criteria::IN); // WHERE class_name IN (1, 'foo')
     * </code>
     *
     * @param     string|string[] $className The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE). Add Criteria::LIKE explicitly.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this The current query, for fluid interface
     *
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     */
    public function filterByClassName($className = null, $comparison = Criteria::EQUAL)
    {
        if ($comparison == Criteria::LIKE || $comparison == Criteria::ILIKE) {
            $className = str_replace('*', '%', $className);
        }

        if (is_array($className) && !in_array($comparison, [Criteria::IN, Criteria::NOT_IN])) {
            throw new AmbiguousComparisonException('$className of type array requires one of [Criteria::IN, Criteria::NOT_IN] as comparison criteria.');
        }

        $query = $this->addUsingAlias(PyzFactFinderEventTableMap::COL_CLASS_NAME, $className, $comparison);

        return $query;
    }

    /**
     * Applies Criteria::IN filtering criteria for the column.
     *
     * @param array $eventDatas Filter value.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByEventData_In(array $eventDatas)
    {
        return $this->filterByEventData($eventDatas, Criteria::IN);
    }

    /**
     * Applies SprykerCriteria::LIKE filtering criteria for the column.
     *
     * @param string $eventData Filter value.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByEventData_Like($eventData)
    {
        return $this->filterByEventData($eventData, Criteria::LIKE);
    }

    /**
     * Filter the query on the event_data column
     *
     * Example usage:
     * <code>
     * $query->filterByEventData('fooValue');   // WHERE event_data = 'fooValue'
     * $query->filterByEventData('%fooValue%', Criteria::LIKE); // WHERE event_data LIKE '%fooValue%'
     * $query->filterByEventData([1, 'foo'], Criteria::IN); // WHERE event_data IN (1, 'foo')
     * </code>
     *
     * @param     string|string[] $eventData The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE). Add Criteria::LIKE explicitly.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this The current query, for fluid interface
     *
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     */
    public function filterByEventData($eventData = null, $comparison = Criteria::EQUAL)
    {
        if ($comparison == Criteria::LIKE || $comparison == Criteria::ILIKE) {
            $eventData = str_replace('*', '%', $eventData);
        }

        if (is_array($eventData) && !in_array($comparison, [Criteria::IN, Criteria::NOT_IN])) {
            throw new AmbiguousComparisonException('$eventData of type array requires one of [Criteria::IN, Criteria::NOT_IN] as comparison criteria.');
        }

        $query = $this->addUsingAlias(PyzFactFinderEventTableMap::COL_EVENT_DATA, $eventData, $comparison);

        return $query;
    }

    /**
     * Applies SprykerCriteria::BETWEEN filtering criteria for the column.
     *
     * @param array $createdAt Filter value.
     * [
     *    'min' => 3, 'max' => 5
     * ]
     *
     * 'min' and 'max' are optional, when neither is specified, throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByCreatedAt_Between(array $createdAt)
    {
        return $this->filterByCreatedAt($createdAt, SprykerCriteria::BETWEEN);
    }

    /**
     * Applies Criteria::IN filtering criteria for the column.
     *
     * @param array $createdAts Filter value.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByCreatedAt_In(array $createdAts)
    {
        return $this->filterByCreatedAt($createdAts, Criteria::IN);
    }

    /**
     * Applies SprykerCriteria::LIKE filtering criteria for the column.
     *
     * @param string $createdAt Filter value.
     *
     * @return $this The current query, for fluid interface
     */
    public function filterByCreatedAt_Like($createdAt)
    {
        return $this->filterByCreatedAt($createdAt, Criteria::LIKE);
    }

    /**
     * Filter the query on the created_at column
     *
     * Example usage:
     * <code>
     * $query->filterByCreatedAt('2011-03-14'); // WHERE created_at = '2011-03-14'
     * $query->filterByCreatedAt('now'); // WHERE created_at = '2011-03-14'
     * $query->filterByCreatedAt(array('max' => 'yesterday'), SprykerCriteria::BETWEEN); // WHERE created_at > '2011-03-13'
     * </code>
     *
     * @param     mixed $createdAt The value to use as filter.
     *              Values can be integers (unix timestamps), DateTime objects, or strings.
     *              Empty strings are treated as NULL.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent. Add Criteria::IN explicitly.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals. Add SprykerCriteria::BETWEEN explicitly.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this The current query, for fluid interface
     *
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     */
    public function filterByCreatedAt($createdAt = null, $comparison = Criteria::EQUAL)
    {

        if (is_array($createdAt)) {
            $useMinMax = false;
            if (isset($createdAt['min'])) {
                if ($comparison != SprykerCriteria::BETWEEN && $comparison != Criteria::GREATER_EQUAL && $comparison != Criteria::GREATER_THAN) {
                    throw new AmbiguousComparisonException('\'min\' requires explicit Criteria::GREATER_EQUAL, Criteria::GREATER_THAN or SprykerCriteria::BETWEEN when \'max\' is also needed as comparison criteria.');
                }
                $this->addUsingAlias(PyzFactFinderEventTableMap::COL_CREATED_AT, $createdAt['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($createdAt['max'])) {
                if ($comparison != SprykerCriteria::BETWEEN && $comparison != Criteria::LESS_EQUAL && $comparison != Criteria::LESS_THAN) {
                    throw new AmbiguousComparisonException('\'max\' requires explicit Criteria::LESS_EQUAL, Criteria::LESS_THAN or SprykerCriteria::BETWEEN when \'min\' is also needed as comparison criteria.');
                }
                $this->addUsingAlias(PyzFactFinderEventTableMap::COL_CREATED_AT, $createdAt['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }

            if (!in_array($comparison, [Criteria::IN, Criteria::NOT_IN])) {
                throw new AmbiguousComparisonException('$createdAt of type array requires one of [Criteria::IN, Criteria::NOT_IN] as comparison criteria.');
            }
        }

        $query = $this->addUsingAlias(PyzFactFinderEventTableMap::COL_CREATED_AT, $createdAt, $comparison);

        return $query;
    }

    /**
     * Exclude object from result
     *
     * @param   ChildPyzFactFinderEvent $pyzFactFinderEvent Object to remove from the list of results
     *
     * @return $this|ChildPyzFactFinderEventQuery The current query, for fluid interface
     */
    public function prune($pyzFactFinderEvent = null)
    {
        if ($pyzFactFinderEvent) {
            $this->addUsingAlias(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT, $pyzFactFinderEvent->getIdFactFinderEvent(), Criteria::NOT_EQUAL);
        }

        return $this;
    }

    /**
     * Deletes all rows from the pyz_fact_finder_event table.
     *
     * @param ConnectionInterface $con the connection to use
     * @return int The number of affected rows (if supported by underlying database driver).
     */
    public function doDeleteAll(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(PyzFactFinderEventTableMap::DATABASE_NAME);
        }

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            $affectedRows += parent::doDeleteAll($con);
            // Because this db requires some delete cascade/set null emulation, we have to
            // clear the cached instance *after* the emulation has happened (since
            // instances get re-added by the select statement contained therein).
            PyzFactFinderEventTableMap::clearInstancePool();
            PyzFactFinderEventTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

    /**
     * Performs a DELETE on the database based on the current ModelCriteria
     *
     * @param ConnectionInterface $con the connection to use
     * @return int             The number of affected rows (if supported by underlying database driver).  This includes CASCADE-related rows
     *                         if supported by native driver or if emulated using Propel.
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     */
    public function delete(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(PyzFactFinderEventTableMap::DATABASE_NAME);
        }

        $criteria = $this;

        // Set the correct dbName
        $criteria->setDbName(PyzFactFinderEventTableMap::DATABASE_NAME);

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con, $criteria) {
            $affectedRows = 0; // initialize var to track total num of affected rows

            PyzFactFinderEventTableMap::removeInstanceFromPool($criteria);

            $affectedRows += ModelCriteria::delete($con);
            PyzFactFinderEventTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

} // PyzFactFinderEventQuery
