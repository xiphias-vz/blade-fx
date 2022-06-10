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

    INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
    select DISTINCT spc.fk_category, 'Entity.spy_category.publish', now()
    from spy_product_abstract_page_search spaps
             inner join spy_store ss on spaps.store = ss.name
             inner join spy_price_product spp on spaps.fk_product_abstract = spp.fk_product_abstract
             inner join spy_price_product_store spps on spp.id_price_product = spps.fk_price_product and ss.id_store = spps.fk_store
            inner join spy_product_category spc on spp.fk_product_abstract = spc.fk_product_abstract
    where not spps.price_per_kg is null
      and spp.fk_price_type = 1
      and IFNULL(cast(JSON_VALUE(spaps.`data`, '$.search-result-data.prices.*.PRICE_PER_KG.DEFAULT') as int), 0) <> spps.price_per_kg;

    INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
    select DISTINCT spc.fk_category, 'Entity.spy_category.publish', now()
    from spy_product_abstract_page_search spaps
             inner join spy_store ss on spaps.store = ss.name
             inner join spy_price_product spp on spaps.fk_product_abstract = spp.fk_product_abstract
             inner join spy_price_product_store spps on spp.id_price_product = spps.fk_price_product and ss.id_store = spps.fk_store
             inner join spy_product_category spc on spp.fk_product_abstract = spc.fk_product_abstract
    where spps.price_per_kg is null
      and spp.fk_price_type = 1
      and IFNULL(cast(JSON_VALUE(spaps.`data`, '$.search-result-data.prices.*.GROSS_MODE.DEFAULT') as int), 0) <> spps.gross_price;

    INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
    select DISTINCT spc.fk_category, 'Entity.spy_category.publish', now()
    from spy_product_abstract_page_search spaps
             inner join spy_store ss on spaps.store = ss.name
             inner join spy_price_product spp on spaps.fk_product_abstract = spp.fk_product_abstract
             inner join spy_price_product_store spps on spp.id_price_product = spps.fk_price_product and ss.id_store = spps.fk_store
             inner join spy_product_category spc on spp.fk_product_abstract = spc.fk_product_abstract
    where spps.price_per_kg is null
      and spp.fk_price_type = 2
      and IFNULL(cast(JSON_VALUE(spaps.`data`, '$.search-result-data.prices.*.GROSS_MODE.ORIGINAL') as int), 0) <> spps.gross_price;

END;
