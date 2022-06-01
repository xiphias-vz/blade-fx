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
SELECT DISTINCT 'FF_PRICE_CHECK' AS `key`, 100 as executed_every_x_minutes, DATE_ADD(NOW(), INTERVAL -100 MINUTE) as last_executed
FROM pyz_monitor_scheduled_checks
    WHERE NOT EXISTS(select * from pyz_monitor_scheduled_checks where `key` = 'FF_PRICE_CHECK')
    AND EXISTS(select * from spy_merchant where region_name = 'Germany');
delimiter //
INSERT INTO pyz_monitor_scheduled_checks (`key`, executed_every_x_minutes, last_executed)
SELECT DISTINCT 'CSV_IMPORT_CHECK' AS `key`, 100 as executed_every_x_minutes, DATE_ADD(NOW(), INTERVAL -100 MINUTE) as last_executed
FROM pyz_monitor_scheduled_checks
WHERE NOT EXISTS(select * from pyz_monitor_scheduled_checks where `key` = 'CSV_IMPORT_CHECK');
delimiter //
INSERT INTO pyz_monitor_scheduled_checks (`key`, executed_every_x_minutes, last_executed)
SELECT DISTINCT 'ORDER_CREATION_CHECK' AS `key`, 100 as executed_every_x_minutes, DATE_ADD(NOW(), INTERVAL -100 MINUTE) as last_executed
FROM pyz_monitor_scheduled_checks
WHERE NOT EXISTS(select * from pyz_monitor_scheduled_checks where `key` = 'ORDER_CREATION_CHECK');
delimiter //
INSERT INTO pyz_monitor_email_definition
(role_name, send_to_email)
SELECT DISTINCT 'ORDER_CREATION_CHECK' as role_name, pmed.send_to_email
FROM pyz_monitor_email_definition pmed
WHERE pmed.role_name = 'CSV_IMPORT_CHECK'
  AND NOT EXISTS(SELECT * FROM pyz_monitor_email_definition WHERE role_name = 'ORDER_CREATION_CHECK');
delimiter //
INSERT INTO pyz_monitor_scheduled_checks (`key`, executed_every_x_minutes, last_executed)
SELECT DISTINCT 'PRICE_CHECK' AS `key`, 240 as executed_every_x_minutes, DATE_ADD(NOW(), INTERVAL -100 MINUTE) as last_executed
FROM pyz_monitor_scheduled_checks
WHERE NOT EXISTS(select * from pyz_monitor_scheduled_checks where `key` = 'PRICE_CHECK');
delimiter //
INSERT INTO pyz_monitor_email_definition (role_name, send_to_email)
SELECT DISTINCT 'PRICE_CHECK' as role_name, pmed.send_to_email
FROM pyz_monitor_email_definition pmed
WHERE pmed.role_name = 'CSV_IMPORT_CHECK'
  AND NOT EXISTS(SELECT * FROM pyz_monitor_email_definition WHERE role_name = 'PRICE_CHECK');
