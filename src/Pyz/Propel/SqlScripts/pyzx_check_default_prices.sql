delimiter //
create or replace procedure pyzx_check_default_prices()
BEGIN

	CREATE TEMPORARY TABLE tmpDefaultPrice
	AS
    SELECT sp.fk_product_abstract, sp.sku
         , sm.filial_number, sm.fk_store, sm.merchant_short_name
         , max(sppsNovi.id_price_product_store) as id_def_price
    FROM spy_product sp
        INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
        INNER JOIN spy_availability sa on sa.sku = sp.sku
        INNER JOIN spy_merchant sm on sm.fk_store = sa.fk_store
        INNER JOIN spy_price_product sppNovi on sppNovi.fk_product_abstract = sp.fk_product_abstract
            AND sppNovi.fk_price_type = 1
        INNER JOIN spy_price_product_store sppsNovi on sppsNovi.fk_price_product = sppNovi.id_price_product
            AND sppsNovi.fk_store = sm.fk_store
        LEFT JOIN
        (
             SELECT spp.fk_product_abstract, sppsDef.fk_store
             FROM spy_price_product spp
                      INNER JOIN spy_price_product_store sppsDef on sppsDef.fk_price_product = spp.id_price_product
                 AND spp.fk_price_type = 1
                      INNER JOIN spy_currency sc on sppsDef.fk_currency = sc.id_currency
                      INNER JOIN spy_price_product_default sppd on sppd.fk_price_product_store = sppsDef.id_price_product_store
        ) a on a.fk_product_abstract = spa.id_product_abstract
             AND a.fk_store = sa.fk_store
    WHERE IFNULL(sa.quantity, 0) > 0
        AND sp.is_active = 1
        AND a.fk_product_abstract is null
    GROUP BY sp.fk_product_abstract, sm.merchant_short_name, sp.sku, sm.filial_number, sm.fk_store;


    INSERT INTO tmpDefaultPrice
    SELECT sp.fk_product_abstract, sp.sku
         , sm.filial_number, sm.fk_store, sm.merchant_short_name
         , max(sppsNovi.id_price_product_store) as id_def_price
    FROM spy_product sp
        INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
        INNER JOIN spy_availability sa on sa.sku = sp.sku
        INNER JOIN spy_merchant sm on sm.fk_store = sa.fk_store
        INNER JOIN spy_price_product sppNovi on sppNovi.fk_product_abstract = sp.fk_product_abstract
            AND sppNovi.fk_price_type = 2
        INNER JOIN spy_price_product_store sppsNovi on sppsNovi.fk_price_product = sppNovi.id_price_product
            AND sppsNovi.fk_store = sm.fk_store
        LEFT JOIN
        (
             SELECT spp.fk_product_abstract, sppsDef.fk_store
             FROM spy_price_product spp
                      INNER JOIN spy_price_product_store sppsDef on sppsDef.fk_price_product = spp.id_price_product
                 AND spp.fk_price_type = 2
                      INNER JOIN spy_currency sc on sppsDef.fk_currency = sc.id_currency
                      INNER JOIN spy_price_product_default sppd on sppd.fk_price_product_store = sppsDef.id_price_product_store
        ) a on a.fk_product_abstract = spa.id_product_abstract
             AND a.fk_store = sa.fk_store
    WHERE IFNULL(sa.quantity, 0) > 0
        AND sp.is_active = 1
        AND a.fk_product_abstract is null
    GROUP BY sp.fk_product_abstract, sm.merchant_short_name, sp.sku, sm.filial_number, sm.fk_store;

    INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
    select DISTINCT fk_product_abstract, 'Price.price_abstract.publish', now()
    from tmpDefaultPrice;

    INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
    select DISTINCT fk_product_abstract, 'Product.product_abstract.publish', now()
    from tmpDefaultPrice;

    INSERT INTO spy_price_product_default (fk_price_product_store)
    select DISTINCT id_def_price
    from tmpDefaultPrice;

    DROP TEMPORARY TABLE tmpDefaultPrice;
END;

