<?php

namespace Orm\Zed\FactFinderExport\Persistence\Map;

use Orm\Zed\FactFinderExport\Persistence\PyzFactFinderEvent;
use Orm\Zed\FactFinderExport\Persistence\PyzFactFinderEventQuery;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\InstancePoolTrait;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\DataFetcher\DataFetcherInterface;
use Propel\Runtime\Exception\PropelException;
use Propel\Runtime\Map\RelationMap;
use Propel\Runtime\Map\TableMap;
use Propel\Runtime\Map\TableMapTrait;


/**
 * This class defines the structure of the 'pyz_fact_finder_event' table.
 *
 *
 *
 * This map class is used by Propel to do runtime db structure discovery.
 * For example, the createSelectSql() method checks the type of a given column used in an
 * ORDER BY clause to know whether it needs to apply SQL to make the ORDER BY case-insensitive
 * (i.e. if it's a text column type).
 */
class PyzFactFinderEventTableMap extends TableMap
{
    use InstancePoolTrait;
    use TableMapTrait;

    /**
     * The (dot-path) name of this class
     */
    const CLASS_NAME = 'src.Orm.Zed.FactFinderExport.Persistence.Map.PyzFactFinderEventTableMap';

    /**
     * The default database name for this class
     */
    const DATABASE_NAME = 'zed';

    /**
     * The table name for this class
     */
    const TABLE_NAME = 'pyz_fact_finder_event';

    /**
     * The related Propel class for this table
     */
    const OM_CLASS = '\\Orm\\Zed\\FactFinderExport\\Persistence\\PyzFactFinderEvent';

    /**
     * A class that can be returned by this tableMap
     */
    const CLASS_DEFAULT = 'src.Orm.Zed.FactFinderExport.Persistence.PyzFactFinderEvent';

    /**
     * The total number of columns
     */
    const NUM_COLUMNS = 6;

    /**
     * The number of lazy-loaded columns
     */
    const NUM_LAZY_LOAD_COLUMNS = 0;

    /**
     * The number of columns to hydrate (NUM_COLUMNS - NUM_LAZY_LOAD_COLUMNS)
     */
    const NUM_HYDRATE_COLUMNS = 6;

    /**
     * the column name for the id_fact_finder_event field
     */
    const COL_ID_FACT_FINDER_EVENT = 'pyz_fact_finder_event.id_fact_finder_event';

    /**
     * the column name for the fk_product_abstract field
     */
    const COL_FK_PRODUCT_ABSTRACT = 'pyz_fact_finder_event.fk_product_abstract';

    /**
     * the column name for the event_name field
     */
    const COL_EVENT_NAME = 'pyz_fact_finder_event.event_name';

    /**
     * the column name for the class_name field
     */
    const COL_CLASS_NAME = 'pyz_fact_finder_event.class_name';

    /**
     * the column name for the event_data field
     */
    const COL_EVENT_DATA = 'pyz_fact_finder_event.event_data';

    /**
     * the column name for the created_at field
     */
    const COL_CREATED_AT = 'pyz_fact_finder_event.created_at';

    /**
     * The default string format for model objects of the related table
     */
    const DEFAULT_STRING_FORMAT = 'YAML';

    /**
     * holds an array of fieldnames
     *
     * first dimension keys are the type constants
     * e.g. self::$fieldNames[self::TYPE_PHPNAME][0] = 'Id'
     */
    protected static $fieldNames = array (
        self::TYPE_PHPNAME       => array('IdFactFinderEvent', 'FkProductAbstract', 'EventName', 'ClassName', 'EventData', 'CreatedAt', ),
        self::TYPE_CAMELNAME     => array('idFactFinderEvent', 'fkProductAbstract', 'eventName', 'className', 'eventData', 'createdAt', ),
        self::TYPE_COLNAME       => array(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT, PyzFactFinderEventTableMap::COL_FK_PRODUCT_ABSTRACT, PyzFactFinderEventTableMap::COL_EVENT_NAME, PyzFactFinderEventTableMap::COL_CLASS_NAME, PyzFactFinderEventTableMap::COL_EVENT_DATA, PyzFactFinderEventTableMap::COL_CREATED_AT, ),
        self::TYPE_FIELDNAME     => array('id_fact_finder_event', 'fk_product_abstract', 'event_name', 'class_name', 'event_data', 'created_at', ),
        self::TYPE_NUM           => array(0, 1, 2, 3, 4, 5, )
    );

    /**
     * holds an array of keys for quick access to the fieldnames array
     *
     * first dimension keys are the type constants
     * e.g. self::$fieldKeys[self::TYPE_PHPNAME]['Id'] = 0
     */
    protected static $fieldKeys = array (
        self::TYPE_PHPNAME       => array('IdFactFinderEvent' => 0, 'FkProductAbstract' => 1, 'EventName' => 2, 'ClassName' => 3, 'EventData' => 4, 'CreatedAt' => 5, ),
        self::TYPE_CAMELNAME     => array('idFactFinderEvent' => 0, 'fkProductAbstract' => 1, 'eventName' => 2, 'className' => 3, 'eventData' => 4, 'createdAt' => 5, ),
        self::TYPE_COLNAME       => array(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT => 0, PyzFactFinderEventTableMap::COL_FK_PRODUCT_ABSTRACT => 1, PyzFactFinderEventTableMap::COL_EVENT_NAME => 2, PyzFactFinderEventTableMap::COL_CLASS_NAME => 3, PyzFactFinderEventTableMap::COL_EVENT_DATA => 4, PyzFactFinderEventTableMap::COL_CREATED_AT => 5, ),
        self::TYPE_FIELDNAME     => array('id_fact_finder_event' => 0, 'fk_product_abstract' => 1, 'event_name' => 2, 'class_name' => 3, 'event_data' => 4, 'created_at' => 5, ),
        self::TYPE_NUM           => array(0, 1, 2, 3, 4, 5, )
    );

    /**
     * Holds a list of column names and their normalized version.
     *
     * @var string[]
     */
    protected $normalizedColumnNameMap = [

        'IdFactFinderEvent' => 'ID_FACT_FINDER_EVENT',
        'PyzFactFinderEvent.IdFactFinderEvent' => 'ID_FACT_FINDER_EVENT',
        'idFactFinderEvent' => 'ID_FACT_FINDER_EVENT',
        'pyzFactFinderEvent.idFactFinderEvent' => 'ID_FACT_FINDER_EVENT',
        'PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT' => 'ID_FACT_FINDER_EVENT',
        'COL_ID_FACT_FINDER_EVENT' => 'ID_FACT_FINDER_EVENT',
        'id_fact_finder_event' => 'ID_FACT_FINDER_EVENT',
        'pyz_fact_finder_event.id_fact_finder_event' => 'ID_FACT_FINDER_EVENT',
        'FkProductAbstract' => 'FK_PRODUCT_ABSTRACT',
        'PyzFactFinderEvent.FkProductAbstract' => 'FK_PRODUCT_ABSTRACT',
        'fkProductAbstract' => 'FK_PRODUCT_ABSTRACT',
        'pyzFactFinderEvent.fkProductAbstract' => 'FK_PRODUCT_ABSTRACT',
        'PyzFactFinderEventTableMap::COL_FK_PRODUCT_ABSTRACT' => 'FK_PRODUCT_ABSTRACT',
        'COL_FK_PRODUCT_ABSTRACT' => 'FK_PRODUCT_ABSTRACT',
        'fk_product_abstract' => 'FK_PRODUCT_ABSTRACT',
        'pyz_fact_finder_event.fk_product_abstract' => 'FK_PRODUCT_ABSTRACT',
        'EventName' => 'EVENT_NAME',
        'PyzFactFinderEvent.EventName' => 'EVENT_NAME',
        'eventName' => 'EVENT_NAME',
        'pyzFactFinderEvent.eventName' => 'EVENT_NAME',
        'PyzFactFinderEventTableMap::COL_EVENT_NAME' => 'EVENT_NAME',
        'COL_EVENT_NAME' => 'EVENT_NAME',
        'event_name' => 'EVENT_NAME',
        'pyz_fact_finder_event.event_name' => 'EVENT_NAME',
        'ClassName' => 'CLASS_NAME',
        'PyzFactFinderEvent.ClassName' => 'CLASS_NAME',
        'className' => 'CLASS_NAME',
        'pyzFactFinderEvent.className' => 'CLASS_NAME',
        'PyzFactFinderEventTableMap::COL_CLASS_NAME' => 'CLASS_NAME',
        'COL_CLASS_NAME' => 'CLASS_NAME',
        'class_name' => 'CLASS_NAME',
        'pyz_fact_finder_event.class_name' => 'CLASS_NAME',
        'EventData' => 'EVENT_DATA',
        'PyzFactFinderEvent.EventData' => 'EVENT_DATA',
        'eventData' => 'EVENT_DATA',
        'pyzFactFinderEvent.eventData' => 'EVENT_DATA',
        'PyzFactFinderEventTableMap::COL_EVENT_DATA' => 'EVENT_DATA',
        'COL_EVENT_DATA' => 'EVENT_DATA',
        'event_data' => 'EVENT_DATA',
        'pyz_fact_finder_event.event_data' => 'EVENT_DATA',
        'CreatedAt' => 'CREATED_AT',
        'PyzFactFinderEvent.CreatedAt' => 'CREATED_AT',
        'createdAt' => 'CREATED_AT',
        'pyzFactFinderEvent.createdAt' => 'CREATED_AT',
        'PyzFactFinderEventTableMap::COL_CREATED_AT' => 'CREATED_AT',
        'COL_CREATED_AT' => 'CREATED_AT',
        'created_at' => 'CREATED_AT',
        'pyz_fact_finder_event.created_at' => 'CREATED_AT',
    ];

    /**
     * Initialize the table attributes and columns
     * Relations are not initialized by this method since they are lazy loaded
     *
     * @return void
     * @throws PropelException
     */
    public function initialize()
    {
        // attributes
        $this->setName('pyz_fact_finder_event');
        $this->setPhpName('PyzFactFinderEvent');
        $this->setIdentifierQuoting(false);
        $this->setClassName('\\Orm\\Zed\\FactFinderExport\\Persistence\\PyzFactFinderEvent');
        $this->setPackage('src.Orm.Zed.FactFinderExport.Persistence');
        $this->setUseIdGenerator(true);
        // columns
        $this->addPrimaryKey('id_fact_finder_event', 'IdFactFinderEvent', 'BIGINT', true, null, null);
        $this->addColumn('fk_product_abstract', 'FkProductAbstract', 'INTEGER', true, null, null);
        $this->addColumn('event_name', 'EventName', 'VARCHAR', false, 100, null);
        $this->addColumn('class_name', 'ClassName', 'VARCHAR', false, 100, null);
        $this->addColumn('event_data', 'EventData', 'VARCHAR', false, 1000, null);
        $this->addColumn('created_at', 'CreatedAt', 'TIMESTAMP', true, null, null);
    } // initialize()

    /**
     * Build the RelationMap objects for this table relationships
     */
    public function buildRelations()
    {
    } // buildRelations()

    /**
     * Retrieves a string version of the primary key from the DB resultset row that can be used to uniquely identify a row in this table.
     *
     * For tables with a single-column primary key, that simple pkey value will be returned.  For tables with
     * a multi-column primary key, a serialize()d version of the primary key will be returned.
     *
     * @param array  $row       resultset row.
     * @param int    $offset    The 0-based offset for reading from the resultset row.
     * @param string $indexType One of the class type constants TableMap::TYPE_PHPNAME, TableMap::TYPE_CAMELNAME
     *                           TableMap::TYPE_COLNAME, TableMap::TYPE_FIELDNAME, TableMap::TYPE_NUM
     *
     * @return string The primary key hash of the row
     */
    public static function getPrimaryKeyHashFromRow($row, $offset = 0, $indexType = TableMap::TYPE_NUM)
    {
        // If the PK cannot be derived from the row, return NULL.
        if ($row[TableMap::TYPE_NUM == $indexType ? 0 + $offset : static::translateFieldName('IdFactFinderEvent', TableMap::TYPE_PHPNAME, $indexType)] === null) {
            return null;
        }

        return null === $row[TableMap::TYPE_NUM == $indexType ? 0 + $offset : static::translateFieldName('IdFactFinderEvent', TableMap::TYPE_PHPNAME, $indexType)] || is_scalar($row[TableMap::TYPE_NUM == $indexType ? 0 + $offset : static::translateFieldName('IdFactFinderEvent', TableMap::TYPE_PHPNAME, $indexType)]) || is_callable([$row[TableMap::TYPE_NUM == $indexType ? 0 + $offset : static::translateFieldName('IdFactFinderEvent', TableMap::TYPE_PHPNAME, $indexType)], '__toString']) ? (string) $row[TableMap::TYPE_NUM == $indexType ? 0 + $offset : static::translateFieldName('IdFactFinderEvent', TableMap::TYPE_PHPNAME, $indexType)] : $row[TableMap::TYPE_NUM == $indexType ? 0 + $offset : static::translateFieldName('IdFactFinderEvent', TableMap::TYPE_PHPNAME, $indexType)];
    }

    /**
     * Retrieves the primary key from the DB resultset row
     * For tables with a single-column primary key, that simple pkey value will be returned.  For tables with
     * a multi-column primary key, an array of the primary key columns will be returned.
     *
     * @param array  $row       resultset row.
     * @param int    $offset    The 0-based offset for reading from the resultset row.
     * @param string $indexType One of the class type constants TableMap::TYPE_PHPNAME, TableMap::TYPE_CAMELNAME
     *                           TableMap::TYPE_COLNAME, TableMap::TYPE_FIELDNAME, TableMap::TYPE_NUM
     *
     * @return mixed The primary key of the row
     */
    public static function getPrimaryKeyFromRow($row, $offset = 0, $indexType = TableMap::TYPE_NUM)
    {
        return (string) $row[
            $indexType == TableMap::TYPE_NUM
                ? 0 + $offset
                : self::translateFieldName('IdFactFinderEvent', TableMap::TYPE_PHPNAME, $indexType)
        ];
    }

    /**
     * The class that the tableMap will make instances of.
     *
     * If $withPrefix is true, the returned path
     * uses a dot-path notation which is translated into a path
     * relative to a location on the PHP include_path.
     * (e.g. path.to.MyClass -> 'path/to/MyClass.php')
     *
     * @param boolean $withPrefix Whether or not to return the path with the class name
     * @return string path.to.ClassName
     */
    public static function getOMClass($withPrefix = true)
    {
        return $withPrefix ? PyzFactFinderEventTableMap::CLASS_DEFAULT : PyzFactFinderEventTableMap::OM_CLASS;
    }

    /**
     * Populates an object of the default type or an object that inherit from the default.
     *
     * @param array  $row       row returned by DataFetcher->fetch().
     * @param int    $offset    The 0-based offset for reading from the resultset row.
     * @param string $indexType The index type of $row. Mostly DataFetcher->getIndexType().
                                 One of the class type constants TableMap::TYPE_PHPNAME, TableMap::TYPE_CAMELNAME
     *                           TableMap::TYPE_COLNAME, TableMap::TYPE_FIELDNAME, TableMap::TYPE_NUM.
     *
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     * @return array           (PyzFactFinderEvent object, last column rank)
     */
    public static function populateObject($row, $offset = 0, $indexType = TableMap::TYPE_NUM)
    {
        $key = PyzFactFinderEventTableMap::getPrimaryKeyHashFromRow($row, $offset, $indexType);
        if (null !== ($obj = PyzFactFinderEventTableMap::getInstanceFromPool($key))) {
            // We no longer rehydrate the object, since this can cause data loss.
            // See http://www.propelorm.org/ticket/509
            // $obj->hydrate($row, $offset, true); // rehydrate
            $col = $offset + PyzFactFinderEventTableMap::NUM_HYDRATE_COLUMNS;
        } else {
            $cls = PyzFactFinderEventTableMap::OM_CLASS;
            /** @var PyzFactFinderEvent $obj */
            $obj = new $cls();
            $col = $obj->hydrate($row, $offset, false, $indexType);
            PyzFactFinderEventTableMap::addInstanceToPool($obj, $key);
        }

        return array($obj, $col);
    }

    /**
     * The returned array will contain objects of the default type or
     * objects that inherit from the default.
     *
     * @param DataFetcherInterface $dataFetcher
     * @return array
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     */
    public static function populateObjects(DataFetcherInterface $dataFetcher)
    {
        $results = array();

        // set the class once to avoid overhead in the loop
        $cls = static::getOMClass(false);
        // populate the object(s)
        while ($row = $dataFetcher->fetch()) {
            $key = PyzFactFinderEventTableMap::getPrimaryKeyHashFromRow($row, 0, $dataFetcher->getIndexType());
            if (null !== ($obj = PyzFactFinderEventTableMap::getInstanceFromPool($key))) {
                // We no longer rehydrate the object, since this can cause data loss.
                // See http://www.propelorm.org/ticket/509
                // $obj->hydrate($row, 0, true); // rehydrate
                $results[] = $obj;
            } else {
                /** @var PyzFactFinderEvent $obj */
                $obj = new $cls();
                $obj->hydrate($row);
                $results[] = $obj;
                PyzFactFinderEventTableMap::addInstanceToPool($obj, $key);
            } // if key exists
        }

        return $results;
    }
    /**
     * Add all the columns needed to create a new object.
     *
     * Note: any columns that were marked with lazyLoad="true" in the
     * XML schema will not be added to the select list and only loaded
     * on demand.
     *
     * @param Criteria $criteria object containing the columns to add.
     * @param string   $alias    optional table alias
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     */
    public static function addSelectColumns(Criteria $criteria, $alias = null)
    {
        if (null === $alias) {
            $criteria->addSelectColumn(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT);
            $criteria->addSelectColumn(PyzFactFinderEventTableMap::COL_FK_PRODUCT_ABSTRACT);
            $criteria->addSelectColumn(PyzFactFinderEventTableMap::COL_EVENT_NAME);
            $criteria->addSelectColumn(PyzFactFinderEventTableMap::COL_CLASS_NAME);
            $criteria->addSelectColumn(PyzFactFinderEventTableMap::COL_EVENT_DATA);
            $criteria->addSelectColumn(PyzFactFinderEventTableMap::COL_CREATED_AT);
        } else {
            $criteria->addSelectColumn($alias . '.id_fact_finder_event');
            $criteria->addSelectColumn($alias . '.fk_product_abstract');
            $criteria->addSelectColumn($alias . '.event_name');
            $criteria->addSelectColumn($alias . '.class_name');
            $criteria->addSelectColumn($alias . '.event_data');
            $criteria->addSelectColumn($alias . '.created_at');
        }
    }

    /**
     * Remove all the columns needed to create a new object.
     *
     * Note: any columns that were marked with lazyLoad="true" in the
     * XML schema will not be removed as they are only loaded on demand.
     *
     * @param Criteria $criteria object containing the columns to remove.
     * @param string   $alias    optional table alias
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     */
    public static function removeSelectColumns(Criteria $criteria, $alias = null)
    {
        if (null === $alias) {
            $criteria->removeSelectColumn(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT);
            $criteria->removeSelectColumn(PyzFactFinderEventTableMap::COL_FK_PRODUCT_ABSTRACT);
            $criteria->removeSelectColumn(PyzFactFinderEventTableMap::COL_EVENT_NAME);
            $criteria->removeSelectColumn(PyzFactFinderEventTableMap::COL_CLASS_NAME);
            $criteria->removeSelectColumn(PyzFactFinderEventTableMap::COL_EVENT_DATA);
            $criteria->removeSelectColumn(PyzFactFinderEventTableMap::COL_CREATED_AT);
        } else {
            $criteria->removeSelectColumn($alias . '.id_fact_finder_event');
            $criteria->removeSelectColumn($alias . '.fk_product_abstract');
            $criteria->removeSelectColumn($alias . '.event_name');
            $criteria->removeSelectColumn($alias . '.class_name');
            $criteria->removeSelectColumn($alias . '.event_data');
            $criteria->removeSelectColumn($alias . '.created_at');
        }
    }

    /**
     * Returns the TableMap related to this object.
     * This method is not needed for general use but a specific application could have a need.
     * @return TableMap
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     */
    public static function getTableMap()
    {
        return Propel::getServiceContainer()->getDatabaseMap(PyzFactFinderEventTableMap::DATABASE_NAME)->getTable(PyzFactFinderEventTableMap::TABLE_NAME);
    }

    /**
     * Add a TableMap instance to the database for this tableMap class.
     */
    public static function buildTableMap()
    {
        $dbMap = Propel::getServiceContainer()->getDatabaseMap(PyzFactFinderEventTableMap::DATABASE_NAME);
        if (!$dbMap->hasTable(PyzFactFinderEventTableMap::TABLE_NAME)) {
            $dbMap->addTableObject(new PyzFactFinderEventTableMap());
        }
    }

    /**
     * Performs a DELETE on the database, given a PyzFactFinderEvent or Criteria object OR a primary key value.
     *
     * @param mixed               $values Criteria or PyzFactFinderEvent object or primary key or array of primary keys
     *              which is used to create the DELETE statement
     * @param  ConnectionInterface $con the connection to use
     * @return int             The number of affected rows (if supported by underlying database driver).  This includes CASCADE-related rows
     *                         if supported by native driver or if emulated using Propel.
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     */
     public static function doDelete($values, ConnectionInterface $con = null)
     {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(PyzFactFinderEventTableMap::DATABASE_NAME);
        }

        if ($values instanceof Criteria) {
            // rename for clarity
            $criteria = $values;
        } elseif ($values instanceof \Orm\Zed\FactFinderExport\Persistence\PyzFactFinderEvent) { // it's a model object
            // create criteria based on pk values
            $criteria = $values->buildPkeyCriteria();
        } else { // it's a primary key, or an array of pks
            $criteria = new Criteria(PyzFactFinderEventTableMap::DATABASE_NAME);
            $criteria->add(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT, (array) $values, Criteria::IN);
        }

        $query = PyzFactFinderEventQuery::create()->mergeWith($criteria);

        if ($values instanceof Criteria) {
            PyzFactFinderEventTableMap::clearInstancePool();
        } elseif (!is_object($values)) { // it's a primary key, or an array of pks
            foreach ((array) $values as $singleval) {
                PyzFactFinderEventTableMap::removeInstanceFromPool($singleval);
            }
        }

        return $query->delete($con);
    }

    /**
     * Deletes all rows from the pyz_fact_finder_event table.
     *
     * @param ConnectionInterface $con the connection to use
     * @return int The number of affected rows (if supported by underlying database driver).
     */
    public static function doDeleteAll(ConnectionInterface $con = null)
    {
        return PyzFactFinderEventQuery::create()->doDeleteAll($con);
    }

    /**
     * Performs an INSERT on the database, given a PyzFactFinderEvent or Criteria object.
     *
     * @param mixed               $criteria Criteria or PyzFactFinderEvent object containing data that is used to create the INSERT statement.
     * @param ConnectionInterface $con the ConnectionInterface connection to use
     * @return mixed           The new primary key.
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     */
    public static function doInsert($criteria, ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(PyzFactFinderEventTableMap::DATABASE_NAME);
        }

        if ($criteria instanceof Criteria) {
            $criteria = clone $criteria; // rename for clarity
        } else {
            $criteria = $criteria->buildCriteria(); // build Criteria from PyzFactFinderEvent object
        }

        if ($criteria->containsKey(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT) && $criteria->keyContainsValue(PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT) ) {
            throw new PropelException('Cannot insert a value for auto-increment primary key ('.PyzFactFinderEventTableMap::COL_ID_FACT_FINDER_EVENT.')');
        }


        // Set the correct dbName
        $query = PyzFactFinderEventQuery::create()->mergeWith($criteria);

        // use transaction because $criteria could contain info
        // for more than one table (I guess, conceivably)
        return $con->transaction(function () use ($con, $query) {
            return $query->doInsert($con);
        });
    }

} // PyzFactFinderEventTableMap
// This is the static code needed to register the TableMap for this table with the main Propel class.
//
PyzFactFinderEventTableMap::buildTableMap();
