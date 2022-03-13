delimiter //
create or replace procedure pyzx_monitoring_redis()
BEGIN
    SET @ms_count = (SELECT COUNT(DISTINCT merchant_short_name) * 2 FROM spy_merchant);
    SELECT spas.store, spas.`key`, @ms_count AS ms_count
    FROM spy_product_abstract_storage spas
             INNER JOIN (SELECT DISTINCT fk_product_abstract FROM spy_product ORDER BY updated_at DESC LIMIT 1) sp on spas.fk_product_abstract = sp.fk_product_abstract
             INNER JOIN (SELECT DISTINCT merchant_short_name FROM spy_merchant) sm on sm.merchant_short_name = spas.store
    UNION
    SELECT DISTINCT  merchant_short_name, CONCAT('merchants_list:', merchant_short_name) AS `key`, @ms_count AS ms_count
    FROM spy_merchant;
END;
