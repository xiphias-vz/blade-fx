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
delimiter //
INSERT INTO pyz_monitor_scheduled_checks (`key`, executed_every_x_minutes, last_executed)
SELECT 'FF_PRICE_CHECK' AS `key`, 100 as executed_every_x_minutes, DATE_ADD(NOW(), INTERVAL -100 MINUTE) as last_executed
    WHERE NOT EXISTS(select * from pyz_monitor_scheduled_checks where `key` = 'FF_PRICE_CHECK')
    AND EXISTS(select * from spy_merchant where region_name = 'Germany');
delimiter //
INSERT INTO pyz_monitor_scheduled_checks (`key`, executed_every_x_minutes, last_executed)
SELECT 'CSV_IMPORT_CHECK' AS `key`, 100 as executed_every_x_minutes, DATE_ADD(NOW(), INTERVAL -100 MINUTE) as last_executed
WHERE NOT EXISTS(select * from pyz_monitor_scheduled_checks where `key` = 'CSV_IMPORT_CHECK');
