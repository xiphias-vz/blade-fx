delimiter //
CREATE OR REPLACE PROCEDURE pyzx_monitor_scheduled_checks()
BEGIN
    /*check ff export prices*/
    IF (SELECT 1 = 1 FROM pyz_monitor_scheduled_checks
                     WHERE `key` = 'FF_PRICE_CHECK' AND last_executed < DATE_ADD(NOW(), INTERVAL executed_every_x_minutes * (-1) MINUTE)
                        AND EXISTS(select * from pyz_monitor_email_definition pmed where pmed.role_name = 'FF_PRICE_CHECK')
                        AND HOUR(NOW()) BETWEEN 2 AND 20
        ) THEN
    BEGIN
        CREATE TEMPORARY TABLE tbl_ff_prices(storeID varchar(10), price DECIMAL(13,2), pseudoPrice DECIMAL(13,2), quantity DECIMAL(13,2), fk_product INT);

        INSERT INTO tbl_ff_prices
        SELECT sm.filial_number as storeID
             , ROUND(sppsDef.gross_price / 100, 2) as price
             , CASE WHEN sppsDef.gross_price < orig.gross_price THEN ROUND(orig.gross_price / 100, 2) ELSE null end as pseudoPrice
             , ROUND(sa.quantity) as quantity
             , sp.id_product
        FROM spy_product sp
                 INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
                 INNER JOIN spy_price_product spp on spp.fk_product_abstract = sp.fk_product_abstract
                 INNER JOIN spy_price_product_store sppsDef on sppsDef.fk_price_product = spp.id_price_product
            AND spp.fk_price_type = 1
                 INNER JOIN spy_product_abstract_store spas on spa.id_product_abstract = spas.fk_product_abstract
            AND sppsDef.fk_store = spas.fk_store
                 INNER JOIN spy_currency sc on sppsDef.fk_currency = sc.id_currency
                 INNER JOIN spy_price_product_default sppd on sppd.fk_price_product_store = sppsDef.id_price_product_store
                 INNER JOIN spy_availability sa on sa.sku = sp.sku
            AND sa.fk_store = sppsDef.fk_store
                 INNER JOIN spy_merchant sm on sm.fk_store = sppsDef.fk_store
                 LEFT JOIN
             (
                 SELECT sppsOrig.fk_store, sppsOrig.gross_price, sppOrig.fk_product_abstract
                 FROM spy_price_product sppOrig
                          INNER JOIN spy_price_product_store sppsOrig on sppsOrig.fk_price_product = sppOrig.id_price_product
                     AND sppOrig.fk_price_type = 2
                          INNER JOIN spy_price_product_default sppdOrig on sppdOrig.fk_price_product_store = sppsOrig.id_price_product_store
             ) orig ON orig.fk_store = sa.fk_store
                 AND spp.fk_product_abstract = orig.fk_product_abstract
        WHERE IFNULL(sa.quantity, 0) > 0
          AND sppsDef.gross_price > 0
          AND sp.is_active = 1;

        CREATE INDEX ix_tbl_ff_prices ON tbl_ff_prices (fk_product, storeID);

        SELECT @emailBody := GROUP_CONCAT(CONCAT('<tr><td>' , sp.sku,
                                                 '</td><td>', sp.sap_number,
                                                 '</td><td>', tp.storeID,
                                                 '</td><td>', ifnull(tp.price, '?'),
                                                 '</td><td>', ifnull(tp.pseudoPrice, ''),
                                                 '</td><td>', ifnull(pmf.price, '?'),
                                                 '</td><td>', ifnull(pmf.pseudoPrice, ''),
                                                 '</td><td>', ifnull(Round(CAST(json_extract(sppas.`data`, '$[0].prices.EUR.GROSS_MODE.DEFAULT') as decimal(13,2)) / 100, 2), ''),
                                                 '</td></tr>') SEPARATOR '') as dat
        FROM tbl_ff_prices tp
                 INNER JOIN spy_merchant sm on tp.storeID = sm.merchant_reference
                 INNER JOIN spy_product sp on tp.fk_product = sp.id_product
                 LEFT OUTER JOIN pyz_monitor_ff_export_prices pmf on tp.fk_product = pmf.fk_product and tp.storeID = pmf.storeID
                 LEFT OUTER JOIN spy_price_product_abstract_storage sppas on sp.fk_product_abstract = sppas.fk_product_abstract
                    AND sm.merchant_short_name = sppas.store
        WHERE ifnull(tp.price, 0) <> ifnull(pmf.price, 0)
           OR ifnull(tp.pseudoPrice, 0) <> ifnull(pmf.pseudoPrice, 0)
           OR tp.price * 100 <> CAST(json_extract(sppas.`data`, '$[0].prices.EUR.GROSS_MODE.DEFAULT') as decimal(13,2))
        LIMIT 100;

        IF(@emailBody is not null) THEN
            BEGIN
                SELECT @emailBody := CONCAT(
                    '<table border="1" cellspacing="0">'
                    , '<tr><th>' , 'sku'
                    , '</th><th>', 'sap_number'
                    , '</th><th>', 'storeID'
                    , '</th><th>', 'price'
                    , '</th><th>', 'pseudoPrice'
                    , '</th><th>', 'ff_price'
                    , '</th><th>', 'ff_pseudoPrice'
                    , '</th><th>', 'PDP_price'
                    , '</th></tr>', @emailBody, '</table>');

                INSERT INTO pyz_email_send
                    (sender_job_description, send_to_email, subject, body_description, is_html, created_at)
                SELECT 'FF price check', pmed.send_to_email, 'FF price check', @emailBody, 1, NOW()
                FROM pyz_monitor_email_definition pmed
                WHERE pmed.role_name = 'FF_PRICE_CHECK';
            END;
            END IF;

        UPDATE pyz_monitor_scheduled_checks
            SET last_executed = NOW()
        WHERE `key` = 'FF_PRICE_CHECK';
    END;
    END IF;

    IF (SELECT 1 = 1 FROM pyz_monitor_scheduled_checks
                     WHERE `key` = 'CSV_IMPORT_CHECK' AND last_executed < DATE_ADD(NOW(), INTERVAL executed_every_x_minutes * (-1) MINUTE)
                       AND EXISTS(select * from pyz_monitor_email_definition pmed where pmed.role_name = 'CSV_IMPORT_CHECK')
        ) THEN
    BEGIN
        SELECT @emailBody := GROUP_CONCAT(
            CONCAT('<tr><td>', pih.created_at, '</td><td>', pih.file_type, '</td><td>', pih. file_name, '</td><td>', pih.number_of_rows_csv, '</td><td>', pih.number_of_rows_db, '</td><tr>')
            SEPARATOR '')
        FROM pyz_import_history pih
                 INNER JOIN pyz_monitor_scheduled_checks pmsc on pmsc.`key` = 'CSV_IMPORT_CHECK'
                    AND pih.created_at > DATE_ADD(IFNULL(pmsc.last_executed, DATE_ADD(NOW(), INTERVAL -1 DAY)), INTERVAL -10 MINUTE)
        WHERE pih.file_type in('category', 'product', 'product-price', 'product-stock', 'alternative-ean')
          AND pih.number_of_rows_csv > pih.number_of_rows_db + 1;

        IF(@emailBody is not null) THEN
            BEGIN
                SELECT @emailBody := CONCAT(
                    '<table border="1" cellspacing="0">'
                    , '<tr><th>' , 'date'
                    , '</th><th>', 'type'
                    , '</th><th>', 'filename'
                    , '</th><th>', 'CSV rows'
                    , '</th><th>', 'DB rows'
                    , '</th></tr>', @emailBody, '</table>');

                INSERT INTO pyz_email_send
                    (sender_job_description, send_to_email, subject, body_description, is_html, created_at)
                SELECT 'CSV import check', pmed.send_to_email, 'CSV import check', @emailBody, 1, NOW()
                FROM pyz_monitor_email_definition pmed
                WHERE pmed.role_name = 'CSV_IMPORT_CHECK';
            END;
            END IF;

        UPDATE pyz_monitor_scheduled_checks
        SET last_executed = NOW()
        WHERE `key` = 'CSV_IMPORT_CHECK';

    END;
    END IF;

    IF (SELECT 1 = 1 FROM pyz_monitor_scheduled_checks pmsc
        WHERE pmsc.`key` = 'ORDER_CREATION_CHECK' AND pmsc.last_executed < DATE_ADD(NOW(), INTERVAL pmsc.executed_every_x_minutes * (-1) MINUTE)
          AND NOT HOUR(pmsc.last_executed) IN (0, 1, 2, 3, 4, 23)
    ) THEN
    BEGIN

	    IF NOT EXISTS(select * from spy_sales_order sso where sso.created_at > (SELECT pmsc.last_executed FROM pyz_monitor_scheduled_checks pmsc WHERE pmsc.`key` = 'ORDER_CREATION_CHECK')) THEN
        BEGIN
            SELECT @last_created_at := MAX(sso.created_at)
            FROM spy_sales_order sso;

            INSERT INTO pyz_email_send
            (sender_job_description, send_to_email, subject, body_description, is_html, created_at)
            SELECT 'Order creation check', pmed.send_to_email, 'Order creation check'
                , CONCAT('Last order created at '
                , DATE_FORMAT(@last_created_at, "%d.%m.%Y %H:%i")
                , '. Time passed since the last creation: '
                , TIMEDIFF(NOW(), @last_created_at)
                , ' hours.'
                ) as emailBody
                 , 0, NOW()
            FROM pyz_monitor_email_definition pmed
            WHERE pmed.role_name = 'ORDER_CREATION_CHECK';

        END;
        END IF;

        UPDATE pyz_monitor_scheduled_checks
        SET last_executed = NOW()
        WHERE `key` = 'ORDER_CREATION_CHECK';

    END;
    END IF;

    IF (SELECT 1 = 1 FROM pyz_monitor_scheduled_checks
        WHERE `key` = 'PRICE_CHECK'
          AND last_executed < DATE_ADD(NOW(), INTERVAL executed_every_x_minutes * (-1) MINUTE)
          AND NOT HOUR(NOW()) in (23, 0, 1, 2, 3, 4, 5, 6, 7)
    ) THEN
    BEGIN

        CREATE TEMPORARY TABLE tbl_prices AS
        SELECT sm.filial_number as storeID
             , sppsDef.gross_price as price
             , cast(CASE WHEN sppsDef.gross_price < orig.gross_price THEN ROUND(orig.gross_price / 100, 2) ELSE null end as int) as pseudoPrice
             , ROUND(sa.quantity) as quantity
             , sppsDef.price_per_kg
             , cast(JSON_VALUE(spaps.`data`, '$.search-result-data.prices.*.PRICE_PER_KG.DEFAULT') as int) as price_per_kg_search
             , cast(JSON_VALUE(spaps.`data`, '$.search-result-data.prices.*.GROSS_MODE.DEFAULT') as int) as gross_price_search
             , cast(JSON_VALUE(sppas.`data`, '$.prices.*.PRICE_PER_KG.DEFAULT') as int) as price_per_kg_pdp
             , cast(JSON_VALUE(sppas.`data`, '$.prices.*.GROSS_MODE.DEFAULT') as int) as gross_price_pdp
             , cast(case when ifnull(pipp.promotionend, '2040-01-01') < now() then pipp.pseudoprice else pipp.price end * 100 as int) as imp_price
             , cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) as weightPerItem
             , sp.id_product
             , sp.sku
             , sp.sap_number
             , sm.merchant_short_name as store
        FROM spy_product sp
         INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
         INNER JOIN spy_price_product spp on spp.fk_product_abstract = sp.fk_product_abstract
         INNER JOIN spy_price_product_store sppsDef on sppsDef.fk_price_product = spp.id_price_product
            AND spp.fk_price_type = 1
         INNER JOIN spy_product_abstract_store spas on spa.id_product_abstract = spas.fk_product_abstract
            AND sppsDef.fk_store = spas.fk_store
         INNER JOIN spy_currency sc on sppsDef.fk_currency = sc.id_currency
         INNER JOIN spy_price_product_default sppd on sppd.fk_price_product_store = sppsDef.id_price_product_store
         INNER JOIN spy_availability sa on sa.sku = sp.sku
            AND sa.fk_store = sppsDef.fk_store
         INNER JOIN spy_merchant sm on sm.fk_store = sppsDef.fk_store
         LEFT JOIN
        (
         SELECT sppsOrig.fk_store, sppsOrig.gross_price, sppOrig.fk_product_abstract
         FROM spy_price_product sppOrig
                  INNER JOIN spy_price_product_store sppsOrig on sppsOrig.fk_price_product = sppOrig.id_price_product
             AND sppOrig.fk_price_type = 2
                  INNER JOIN spy_price_product_default sppdOrig on sppdOrig.fk_price_product_store = sppsOrig.id_price_product_store
        ) orig ON orig.fk_store = sa.fk_store
            AND spp.fk_product_abstract = orig.fk_product_abstract
         LEFT OUTER JOIN spy_product_abstract_page_search spaps on spaps.fk_product_abstract = sp.fk_product_abstract
            AND sm.merchant_short_name = spaps.store
         LEFT OUTER JOIN spy_price_product_abstract_storage sppas on sppas.fk_product_abstract = sp.fk_product_abstract
            AND sm.merchant_short_name = sppas.store
         LEFT OUTER JOIN pyz_imp_price_product pipp on sm.merchant_short_name = pipp.store
            AND sp.sap_number = pipp.sapnumber AND (sp.sku = pipp.gtin OR pipp.gtin IS NULL)
        WHERE IFNULL(sa.quantity, 0) > 0
          AND sppsDef.gross_price > 0
          AND sp.is_active = 1;


        CREATE TEMPORARY TABLE tbl_result AS
        select CONCAT(
           '<tr><td>', store
           , '</td><td>', sap_number
           , '</td><td>', sku
           , '</td><td>', price
           , '</td><td>', ifnull(gross_price_search, '?')
           , '</td><td>', ifnull(gross_price_pdp, '?')
           , '</td><td>', ifnull(price_per_kg, '')
           , '</td><td>', ifnull(price_per_kg_search, '')
           , '</td><td>', ifnull(price_per_kg_pdp, '')
           , '</td><td>', imp_price
           , '</td><td>', ifnull(weightPerItem, '')
           , '</td></tr>'
           ) as item
        from tbl_prices
        where (price - ifnull(gross_price_search, 0) + ifnull(gross_price_pdp, 0) <> price)
           or (ifnull(price_per_kg, 0) - ifnull(price_per_kg_search, 0) + ifnull(price_per_kg_pdp, 0) <> ifnull(price_per_kg, 0))
           or (cast(ifnull(weightPerItem, 1) * imp_price as int) <> price)
        order by store, sap_number, sku
            limit 200;

        SELECT @emailBody := GROUP_CONCAT(item  SEPARATOR '') as dat
        FROM tbl_result;

        IF(@emailBody is not null) THEN
        BEGIN
            SELECT @emailBody := CONCAT(
                    '<table border="1" cellspacing="0">'
                    , '<tr><th>' , 'store'
                    , '</th><th>', 'sap_number'
                    , '</th><th>', 'sku'
                    , '</th><th>', 'price'
                    , '</th><th>', 'gross_price_search'
                    , '</th><th>', 'gross_price_pdp'
                    , '</th><th>', 'price_per_kg'
                    , '</th><th>', 'price_per_kg_search'
                    , '</th><th>', 'price_per_kg_pdp'
                    , '</th><th>', 'imp_price'
                    , '</th><th>', 'weightPerItem'
                    , '</th></tr>', @emailBody, '</table>');

            INSERT INTO pyz_email_send
                (sender_job_description, send_to_email, subject, body_description, is_html, created_at)
            SELECT 'Price check', pmed.send_to_email, 'Price check', @emailBody, 1, NOW()
            FROM pyz_monitor_email_definition pmed
            WHERE pmed.role_name = 'PRICE_CHECK';
        END;
        END IF;

        DROP TEMPORARY TABLE IF EXISTS tbl_prices;
        DROP TEMPORARY TABLE IF EXISTS tbl_result;

        UPDATE pyz_monitor_scheduled_checks
            SET last_executed = NOW()
        WHERE `key` = 'PRICE_CHECK';

    END;
    END IF;

END;
