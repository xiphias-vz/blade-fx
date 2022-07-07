delimiter //
create or replace procedure pyzx_ff_export_prices()
BEGIN
    TRUNCATE TABLE pyz_monitor_ff_export_prices;

    INSERT INTO pyz_monitor_ff_export_prices
        (ean, storeID, price, pseudoPrice, quantity, sale, ShelfInfo, DicountText, basePrice, Promotion, fk_product, dt_created)
    SELECT sp.sku as ean, sm.filial_number as storeID
         , ROUND(sppsDef.gross_price / 100, 2) as price
         , CASE WHEN NOT sppsDef.promotion IS NULL THEN ROUND(orig.gross_price / 100, 2) ELSE null end as pseudoPrice
         , ROUND(sa.quantity) as quantity
         , CASE WHEN NOT sppsDef.promotion IS NULL THEN 1 else 0 end as sale
         , null as ShelfInfo
         , CASE WHEN sppsDef.gross_price < orig.gross_price THEN
                    CONCAT('-', FLOOR((1 - (sppsDef.gross_price / 100) / (orig.gross_price / 100)) * 100),'%')
                ELSE NULL
            END as DicountText
         , CASE
               WHEN sppsDef.price_per_kg > 0 THEN
                   REPLACE(CONCAT(ROUND(sppsDef.price_per_kg / 100, 2),
                                  ' ', sc.symbol ,'/', JSON_VALUE(spa.`attributes`, '$.grundpreismasseinheit[0]')), '.', ',')
               WHEN JSON_VALUE(spa.`attributes`, '$.grundpreisinhalt[0]') > 0 AND JSON_VALUE(spa.`attributes`, '$.grundeinheit[0]') > 0 THEN
                   REPLACE(CONCAT((ROUND(sppsDef.gross_price / 100 / JSON_VALUE(spa.`attributes`, '$.grundpreisinhalt[0]') * JSON_VALUE(spa.`attributes`, '$.grundeinheit[0]'), 2)),
                                  ' ', sc.symbol ,'/', JSON_VALUE(spa.`attributes`, '$.grundeinheit[0]'), ' ', JSON_VALUE(spa.`attributes`, '$.grundpreismasseinheit[0]')), '.', ',')
               ELSE
                   REPLACE(CONCAT(ROUND(sppsDef.gross_price / 100, 2), ' ', sc.symbol, '/1 ',  IFNULL(JSON_VALUE(spa.`attributes`, '$.grundpreismasseinheit[0]'), '')), '.', ',')
            END as basePrice
        , sppsDef.promotion  as Promotion
        , sp.id_product
        , now()
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

    SELECT ean, storeID, price, pseudoPrice, quantity, sale, ShelfInfo, DicountText, basePrice, Promotion
    FROM pyz_monitor_ff_export_prices;

END;

