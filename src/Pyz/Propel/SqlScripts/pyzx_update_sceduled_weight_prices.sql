delimiter //
create or replace procedure pyzx_update_sceduled_weight_prices()
BEGIN

    INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
    select DISTINCT sp.fk_product_abstract, 'Price.price_abstract.publish', now()
    from spy_price_product_schedule spps
             inner join spy_price_product spp on spps.fk_product_abstract = spp.fk_product_abstract and spps.fk_price_type = spp.fk_price_type
             inner join spy_product sp on spp.fk_product_abstract = sp.fk_product_abstract
             INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
             inner join spy_tax_set sts on spa.fk_tax_set = sts.id_tax_set
             inner join spy_tax_set_tax stst on sts.id_tax_set = stst.fk_tax_set
             inner join spy_tax_rate str on stst.fk_tax_rate = str.id_tax_rate
             INNER JOIN spy_price_product_store spps2 on spp.id_price_product = spps2.fk_price_product
        AND spps.fk_store = spps2.fk_store
             INNER JOIN spy_merchant sm on sm.fk_store = spps2.fk_store
    where now() BETWEEN spps.active_from and spps.active_to
      and cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) > 0
      and (cast(cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) * spps.gross_price as int) <> spps2.gross_price
        or spps.gross_price <> spps2.price_per_kg
        )
      and spps.is_current = 1;

    INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
    select DISTINCT sp.fk_product_abstract, 'Product.product_abstract.publish', now()
    from spy_price_product_schedule spps
             inner join spy_price_product spp on spps.fk_product_abstract = spp.fk_product_abstract and spps.fk_price_type = spp.fk_price_type
             inner join spy_product sp on spp.fk_product_abstract = sp.fk_product_abstract
             INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
             inner join spy_tax_set sts on spa.fk_tax_set = sts.id_tax_set
             inner join spy_tax_set_tax stst on sts.id_tax_set = stst.fk_tax_set
             inner join spy_tax_rate str on stst.fk_tax_rate = str.id_tax_rate
             INNER JOIN spy_price_product_store spps2 on spp.id_price_product = spps2.fk_price_product
        AND spps.fk_store = spps2.fk_store
             INNER JOIN spy_merchant sm on sm.fk_store = spps2.fk_store
    where now() BETWEEN spps.active_from and spps.active_to
      and cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) > 0
      and (cast(cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) * spps.gross_price as int) <> spps2.gross_price
        or spps.gross_price <> spps2.price_per_kg
        )
      and spps.is_current = 1;

    UPDATE spy_price_product_schedule spps
        inner join spy_price_product spp on spps.fk_product_abstract = spp.fk_product_abstract and spps.fk_price_type = spp.fk_price_type
        inner join spy_product sp on spp.fk_product_abstract = sp.fk_product_abstract
        INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
        inner join spy_tax_set sts on spa.fk_tax_set = sts.id_tax_set
        inner join spy_tax_set_tax stst on sts.id_tax_set = stst.fk_tax_set
        inner join spy_tax_rate str on stst.fk_tax_rate = str.id_tax_rate
        INNER JOIN spy_price_product_store spps2 on spp.id_price_product = spps2.fk_price_product
        AND spps.fk_store = spps2.fk_store
        INNER JOIN spy_merchant sm on sm.fk_store = spps2.fk_store
        SET
            spps2.price_per_kg = spps.gross_price
            , spps2.gross_price = cast(cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) * spps.gross_price as int)
            , spps2.net_price = cast((cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) * spps.gross_price) * (1 - (str.rate / (100 + str.rate))) as int)
            , spps2.price_data_checksum = cast(cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) * spps.gross_price as int)
    where now() BETWEEN spps.active_from and spps.active_to
      and cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) > 0
      and (cast(cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) * spps.gross_price as int) <> spps2.gross_price
       or spps.gross_price <> spps2.price_per_kg
        )
      and spps.is_current = 1;

END;
