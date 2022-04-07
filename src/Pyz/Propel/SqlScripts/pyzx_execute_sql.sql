delimiter //
ALTER TABLE spy_oms_transition_log DROP CONSTRAINT IF EXISTS `spy_oms_transition_log-fk_oms_order_process`;
delimiter //
ALTER TABLE spy_oms_transition_log DROP CONSTRAINT IF EXISTS `spy_oms_transition_log-fk_sales_order`;
delimiter //
ALTER TABLE spy_oms_transition_log DROP CONSTRAINT IF EXISTS `spy_oms_transition_log-fk_sales_order_item`;
delimiter //
ALTER TABLE spy_oms_transition_log DROP INDEX IF EXISTS `index-spy_oms_transition_log-fk_oms_order_process`;
delimiter //
ALTER TABLE spy_oms_transition_log DROP INDEX IF EXISTS `index-spy_oms_transition_log-fk_sales_order`;
delimiter //
ALTER TABLE spy_oms_transition_log DROP INDEX IF EXISTS `index-spy_oms_transition_log-fk_sales_order_item`;
