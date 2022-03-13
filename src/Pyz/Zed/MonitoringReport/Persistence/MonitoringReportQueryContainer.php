<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Persistence;

use PDO;
use Propel\Runtime\Connection\StatementInterface;
use Spryker\Zed\Kernel\Persistence\AbstractQueryContainer;
use Symfony\Component\Config\Definition\Exception\Exception;

/**
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportPersistenceFactory getFactory()
 */
class MonitoringReportQueryContainer extends AbstractQueryContainer implements MonitoringReportQueryContainerInterface
{
    /**
     * @return string
     */
    public function getDBVersion(): string
    {
        try {
            $query = $this->dbVersionQuery();
            $statement = $this->prepareStatement($query);
            $statement->execute();
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);

            return $data['0']['VERSION()'];
        } catch (Exception $e) {
            return 'NO_VERSION';
        }
    }

    /**
     * @return string[]
     */
    public function getRedisKeys(): array
    {
        try {
            $query = $this->redisKeys();
            $statement = $this->prepareStatement($query);
            $statement->execute();
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);

            return $data;
        } catch (Exception $e) {
            return ['NO_KEYS'];
        }
    }

    /**
     * @return string
     */
    protected function dbVersionQuery(): string
    {
        return 'SELECT VERSION()';
    }

    /**
     * @return string
     */
    protected function redisKeys(): string
    {
        return "call pyzx_monitoring_redis()";
    }

    /**
     * @param string $query
     *
     * @return \Propel\Runtime\Connection\StatementInterface
     */
    protected function prepareStatement(string $query): StatementInterface
    {
        $connection = $this->getFactory()->createPropelConnection();

        return $connection->prepare($query);
    }
}
