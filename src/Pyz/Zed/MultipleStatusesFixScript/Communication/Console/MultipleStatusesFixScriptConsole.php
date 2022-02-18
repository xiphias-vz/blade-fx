<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MultipleStatusesFixScript\Communication\Console;

use PDO;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class MultipleStatusesFixScriptConsole extends Console
{
    public const COMMAND_NAME = 'multiple-statuses:fix';
    public const COMMAND_DESCRIPTION = 'Push wrong statuses on items back into correct ones';

    /**
     * @return void
     */
    public function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            $selectSql = $this->selectSqlQuery();

            $wrongItemsStatuses = $this->getResult($selectSql);

            if (count($wrongItemsStatuses) != 0) {
                dump("Items with incorrect statuses: ");
                foreach ($wrongItemsStatuses as $wrongItem) {
                    if (isset($wrongItem['id_sales_order_item'])) {
                        dump('id_sales_order_item: ');
                        dump($wrongItem['id_sales_order_item']);
                    }
                }
                $sql = $this->insertTransitionLogSqlQuery();
                $this->getResult($sql, false);
                $sql = $this->updateSqlQuery();
                $this->getResult($sql, false);
            } else {
                dump("Currently there are no items with incorrect statuses!");
            }

            $selectCancelledDueToNotInStockSql = $this->selectSqlQueryForCancelledDueToNotInStockStatus();
            $wrongStatusesForCancelledDueToNotInStockStatus = $this->getResult($selectCancelledDueToNotInStockSql);

            if (count($wrongStatusesForCancelledDueToNotInStockStatus) != 0) {
                $updateCancelledDueToNotInStockSql = $this->updateSqlQueryForCancelledDueToNotInStockStatus();
                $this->getResult($updateCancelledDueToNotInStockSql, false);
            } else {
                dump("Currently there are no items with incorrect 'canceled due to not in stock' statuses!");
            }

            $selectOrdersWithStatusNew = $this->fromSqlQueryRemoveStatusNew();
            $ordersWithStatusNew = $this->getResult($selectOrdersWithStatusNew);

            if (count($ordersWithStatusNew) != 0) {
                $deletionQuery = $this->updateRowsWhereIsStatusNew();
                $this->getResult($deletionQuery, false);
            } else {
                dump("Currently there are no items with status new.");
            }
        } catch (Exception $e) {
            dump($e);

            return static::CODE_ERROR;
        }

        return static::CODE_SUCCESS;
    }

    /**
     * @param string $sql
     * @param bool $doFetch
     *
     * @return array
     */
    private function getResult(string $sql, bool $doFetch = true): array
    {
        $connection = Propel::getConnection();
        $statement = $connection->prepare($sql);
        $statement->execute();

        if ($doFetch) {
            return $statement->fetchAll(PDO::FETCH_NAMED);
        }

        return [];
    }

    /**
     * @return string
     */
    public function selectSqlQuery(): string
    {
        return "SELECT distinct s.order_reference, s.created_at, ssoi.*
                FROM spy_sales_order_item ssoi
                    INNER JOIN
                        (
                        SELECT sso.id_sales_order, sso.order_reference, sso.created_at
                        FROM spy_sales_order sso
                            INNER JOIN spy_sales_order_item ssoiG on ssoiG.fk_sales_order = sso.id_sales_order
                            INNER JOIN spy_oms_order_item_state sooisG on sooisG.id_oms_order_item_state = ssoiG.fk_oms_order_item_state
                                AND sooisG.name in ('collection process', 'ready for collection', 'collection cancelled by store', 'cancellation process', 'order cancellation recalculated', 'cashier order exporting', 'cashier order exported', 'collected by customer', 'accepted by customer', 'invoice process', 'started invoice process', 'generated invoice reference', 'invoice generated', 'order invoiced', 'picking cancelled by timeout', 'collection cancelled by timeout', 'cancelled by timeout', 'shipped mail sending', 'shipped mail sent', 'confirm mail sending', 'cashier export process', 'ready for cashier export', 'ready for return', 'refund - not received', 'ready for refund', 'refund items group', 'closed', 'cashier order exporting fail', 'release time slot and cancel', 'need to release time slot')
                            INNER JOIN spy_sales_order_item ssoiB on ssoiB.fk_sales_order = sso.id_sales_order
                            INNER JOIN spy_oms_order_item_state sooisB on sooisB.id_oms_order_item_state = ssoiB.fk_oms_order_item_state
                                AND sooisB.name in ('picked')
                        WHERE sso.created_at > now() - INTERVAL 20 DAY
                        ) s ON s.id_sales_order = ssoi.fk_sales_order
                    INNER JOIN spy_oms_order_item_state soois on soois.id_oms_order_item_state = ssoi.fk_oms_order_item_state
                        AND soois.name in ('collection process', 'ready for collection', 'collection cancelled by store', 'cancellation process', 'order cancellation recalculated', 'cashier order exporting', 'cashier order exported', 'collected by customer', 'accepted by customer', 'invoice process', 'started invoice process', 'generated invoice reference', 'invoice generated', 'order invoiced', 'picking cancelled by timeout', 'collection cancelled by timeout', 'cancelled by timeout', 'shipped mail sending', 'shipped mail sent', 'confirm mail sending', 'cashier export process', 'ready for cashier export', 'ready for return', 'refund - not received', 'ready for refund', 'refund items group', 'closed', 'cashier order exporting fail', 'release time slot and cancel', 'need to release time slot')";
    }

    /**
     * @return string
     */
    public function updateSqlQuery(): string
    {
        return "UPDATE spy_sales_order_item ssoi
        INNER JOIN
            (
            SELECT DISTINCT sso.id_sales_order
            FROM spy_sales_order sso
                INNER JOIN spy_sales_order_item ssoiG on ssoiG.fk_sales_order = sso.id_sales_order
                INNER JOIN spy_oms_order_item_state sooisG on sooisG.id_oms_order_item_state = ssoiG.fk_oms_order_item_state
                    AND sooisG.name in ('collection process', 'ready for collection', 'collection cancelled by store', 'cancellation process', 'order cancellation recalculated', 'cashier order exporting', 'cashier order exported', 'collected by customer', 'accepted by customer', 'invoice process', 'started invoice process', 'generated invoice reference', 'invoice generated', 'order invoiced', 'picking cancelled by timeout', 'collection cancelled by timeout', 'cancelled by timeout', 'shipped mail sending', 'shipped mail sent', 'confirm mail sending', 'cashier export process', 'ready for cashier export', 'ready for return', 'refund - not received', 'ready for refund', 'refund items group', 'closed', 'cashier order exporting fail', 'release time slot and cancel', 'need to release time slot')
                INNER JOIN spy_sales_order_item ssoiB on ssoiB.fk_sales_order = sso.id_sales_order
                INNER JOIN spy_oms_order_item_state sooisB on sooisB.id_oms_order_item_state = ssoiB.fk_oms_order_item_state
                    AND sooisB.name in ('picked')
            WHERE sso.created_at > now() - INTERVAL 20 DAY
            ) s ON s.id_sales_order = ssoi.fk_sales_order
        INNER JOIN spy_oms_order_item_state soois on soois.id_oms_order_item_state = ssoi.fk_oms_order_item_state
            AND soois.name in ('collection process', 'ready for collection', 'collection cancelled by store', 'cancellation process', 'order cancellation recalculated', 'cashier order exporting', 'cashier order exported', 'collected by customer', 'accepted by customer', 'invoice process', 'started invoice process', 'generated invoice reference', 'invoice generated', 'order invoiced', 'picking cancelled by timeout', 'collection cancelled by timeout', 'cancelled by timeout', 'shipped mail sending', 'shipped mail sent', 'confirm mail sending', 'cashier export process', 'ready for cashier export', 'ready for return', 'refund - not received', 'ready for refund', 'refund items group', 'closed', 'cashier order exporting fail', 'release time slot and cancel', 'need to release time slot')
        SET ssoi.fk_oms_order_item_state = (SELECT id_oms_order_item_state FROM spy_oms_order_item_state WHERE name = 'picked')";
    }

    /**
     * @return string
     */
    protected function insertTransitionLogSqlQuery(): string
    {
        return "INSERT INTO spy_oms_transition_log (fk_oms_order_process, fk_sales_order, fk_sales_order_item, command, hostname, is_error, locked, params, path, quantity, source_state, target_state, created_at)
        SELECT 1 as fk_oms_order_process, ssoi.fk_sales_order, ssoi.id_sales_order_item, 'multiple-statuses-fix' as command
            , @@hostname as hostname, 1 as is_error, 0 as locked, '|  |' as params, 'path' as path
            , 1 as quantity, s.source_state, 'picked' as target_state, now()
        FROM spy_sales_order_item ssoi
        INNER JOIN
            (
            SELECT DISTINCT sso.id_sales_order, sooisG.name as source_state
            FROM spy_sales_order sso
                INNER JOIN spy_sales_order_item ssoiG on ssoiG.fk_sales_order = sso.id_sales_order
                INNER JOIN spy_oms_order_item_state sooisG on sooisG.id_oms_order_item_state = ssoiG.fk_oms_order_item_state
                    AND sooisG.name in ('collection process', 'ready for collection', 'collection cancelled by store', 'cancellation process', 'order cancellation recalculated', 'cashier order exporting', 'cashier order exported', 'collected by customer', 'accepted by customer', 'invoice process', 'started invoice process', 'generated invoice reference', 'invoice generated', 'order invoiced', 'picking cancelled by timeout', 'collection cancelled by timeout', 'cancelled by timeout', 'shipped mail sending', 'shipped mail sent', 'confirm mail sending', 'cashier export process', 'ready for cashier export', 'ready for return', 'refund - not received', 'ready for refund', 'refund items group', 'closed', 'cashier order exporting fail', 'release time slot and cancel', 'need to release time slot')
                INNER JOIN spy_sales_order_item ssoiB on ssoiB.fk_sales_order = sso.id_sales_order
                INNER JOIN spy_oms_order_item_state sooisB on sooisB.id_oms_order_item_state = ssoiB.fk_oms_order_item_state
                    AND sooisB.name in ('picked')
            WHERE sso.created_at > now() - INTERVAL 20 DAY
            ) s ON s.id_sales_order = ssoi.fk_sales_order
        INNER JOIN spy_oms_order_item_state soois on soois.id_oms_order_item_state = ssoi.fk_oms_order_item_state
            AND soois.name in ('collection process', 'ready for collection', 'collection cancelled by store', 'cancellation process', 'order cancellation recalculated', 'cashier order exporting', 'cashier order exported', 'collected by customer', 'accepted by customer', 'invoice process', 'started invoice process', 'generated invoice reference', 'invoice generated', 'order invoiced', 'picking cancelled by timeout', 'collection cancelled by timeout', 'cancelled by timeout', 'shipped mail sending', 'shipped mail sent', 'confirm mail sending', 'cashier export process', 'ready for cashier export', 'ready for return', 'refund - not received', 'ready for refund', 'refund items group', 'closed', 'cashier order exporting fail', 'release time slot and cancel', 'need to release time slot')";
    }

    /**
     * @return string
     */
    public function selectSqlQueryForCancelledDueToNotInStockStatus(): string
    {
        return "SELECT distinct sso.*
                FROM spy_sales_order_item m_ssoi
                    INNER JOIN spy_sales_order sso on sso.id_sales_order = m_ssoi.fk_sales_order
                    INNER JOIN spy_sales_order_item cdnis_ssoi on cdnis_ssoi.fk_sales_order = m_ssoi.fk_sales_order
                    INNER JOIN spy_oms_order_item_state cdnis_soois ON cdnis_soois.id_oms_order_item_state = cdnis_ssoi.fk_oms_order_item_state
                        AND cdnis_soois.name in ('cancelled due to not in stock')
                    INNER JOIN spy_sales_order_item picked_ssoi on picked_ssoi.fk_sales_order = m_ssoi.fk_sales_order
                    INNER JOIN spy_oms_order_item_state picked_soois ON picked_soois.id_oms_order_item_state = picked_ssoi.fk_oms_order_item_state
                        AND picked_soois.name in ('picked')";
    }

    /**
     * @return string
     */
    public function updateSqlQueryForCancelledDueToNotInStockStatus(): string
    {
        return "UPDATE spy_sales_order_item m_ssoi
                    INNER JOIN spy_sales_order_item cdnis_ssoi on cdnis_ssoi.fk_sales_order = m_ssoi.fk_sales_order
                    INNER JOIN spy_oms_order_item_state cdnis_soois ON cdnis_soois.id_oms_order_item_state = cdnis_ssoi.fk_oms_order_item_state
                        AND cdnis_soois.name in ('cancelled due to not in stock')
                    INNER JOIN spy_sales_order_item picked_ssoi on picked_ssoi.fk_sales_order = m_ssoi.fk_sales_order
                    INNER JOIN spy_oms_order_item_state picked_soois ON picked_soois.id_oms_order_item_state = picked_ssoi.fk_oms_order_item_state
                        AND picked_soois.name in ('picked')
                    LEFT OUTER JOIN
                        (
                        SELECT DISTINCT ready_for_picking_ssoi.fk_sales_order
                        FROM spy_sales_order_item ready_for_picking_ssoi
                            INNER JOIN spy_oms_order_item_state ready_for_picking_soois ON ready_for_picking_soois.id_oms_order_item_state = ready_for_picking_ssoi.fk_oms_order_item_state
                        WHERE ready_for_picking_soois.name in ('ready for picking', 'new' )
                        ) ready_for_picking ON ready_for_picking.fk_sales_order = m_ssoi.fk_sales_order
                SET m_ssoi.fk_oms_order_item_state = (SELECT id_oms_order_item_state FROM spy_oms_order_item_state WHERE name = 'cancelled')
                WHERE ready_for_picking.fk_sales_order is null
                    AND m_ssoi.fk_oms_order_item_state = (SELECT id_oms_order_item_state FROM spy_oms_order_item_state WHERE name = 'cancelled due to not in stock')";
    }

    /**
     * @return string
     */
    public function fromSqlQueryRemoveStatusNew(): string
    {
        return "call pyzx_select_order_status()";
    }

    /**
     * @return string
     */
    public function updateRowsWhereIsStatusNew(): string
    {
        return "call pyzx_update_order_status()";
    }
}
