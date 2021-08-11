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
                $sql = $this->updateSqlQuery();
                $this->getResult($sql, false);
            } else {
                dump("Currently there are no items with incorrect statuses!");
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
}
