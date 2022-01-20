<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\PropelExtension;

use PDO;
use PDOException;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Propel;

class PropelExtension
{
    /**
     * Return each row as an array indexed by column name as returned in the corresponding result set.
     * If the result set contains multiple columns with the same name returns only a single value per column name.
     *
     * @param string $sql
     * @param \Propel\Runtime\Connection\ConnectionInterface|null $connection
     *
     * @return array
     */
    public static function getResultAssoc(string $sql, ?ConnectionInterface $connection = null): array
    {
        try {
            if ($connection === null) {
                $connection = Propel::getConnection();
            }
            $stmt = $connection->prepare($sql);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $ex) {
        }

        return [];
    }

    /**
     * Return each row as an array indexed by column name as returned in the corresponding result set.
     * If the result set contains multiple columns with the same name returns an array of values per column name.
     *
     * @param string $sql
     * @param \Propel\Runtime\Connection\ConnectionInterface|null $connection
     *
     * @return array
     */
    public static function getResultNamed(string $sql, ?ConnectionInterface $connection = null): array
    {
        try {
            $statement = $connection->prepare($sql);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_NAMED);
        } catch (PDOException $ex) {
        }

        return [];
    }
}
