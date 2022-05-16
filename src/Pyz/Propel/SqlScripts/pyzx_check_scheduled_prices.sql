delimiter //
create or replace procedure pyzx_check_scheduled_prices()
BEGIN
	CREATE TEMPORARY TABLE tbl_prices AS
    select *
    FROM
        (
        select ss.id_store, pipp.store, pipp.sapnumber, sp.sku
             , cast(JSON_VALUE(sp.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) as weightPerItem
             , pipp.price * 100 as price
             , cast(cast(JSON_VALUE(sp.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) * pipp.price * 100 as int) as weight_price
             , spps.gross_price
             , pipp.pseudoprice * 100 as pseudoprice
             , cast(cast(JSON_VALUE(sp.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) * pipp.pseudoprice * 100 as int) as weight_pseudo_price
             , spps2.gross_price as pseudo_gross_price
             , pipp.promotionstart, pipp.promotionend
             , sp.fk_product_abstract
             , 1 as is_promotion
        from pyz_imp_price_product pipp
                 inner join spy_store ss on pipp.store = ss.name
                 inner join spy_product sp on pipp.sapnumber = sp.sap_number and (pipp.gtin = sp.sku or pipp.gtin is null)
                 left outer join spy_price_product spp on sp.fk_product_abstract = spp.fk_product_abstract and spp.fk_price_type = 1
                 left outer join spy_price_product_store spps on spp.id_price_product = spps.fk_price_product and ss.id_store = spps.fk_store
                 left outer join spy_price_product spp2 on sp.fk_product_abstract = spp2.fk_product_abstract and spp2.fk_price_type = 2
                 left outer join spy_price_product_store spps2 on spp2.id_price_product = spps2.fk_price_product and ss.id_store = spps2.fk_store
        where sp.is_active = 1
          and now() between promotionstart and promotionend
    ) prc
    where COALESCE(prc.weight_price, prc.price) <> gross_price
       OR COALESCE(prc.weight_pseudo_price, prc.pseudoprice) <> pseudo_gross_price;

    INSERT INTO tbl_prices
    select *
    FROM
        (
        select ss.id_store, pipp.store, pipp.sapnumber, sp.sku
             , cast(JSON_VALUE(sp.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) as weightPerItem
             , pipp.price * 100 as price
             , cast(cast(JSON_VALUE(sp.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) * pipp.price * 100 as int) as weight_price
             , spps.gross_price
             , pipp.pseudoprice * 100 as pseudoprice
             , cast(cast(JSON_VALUE(sp.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) * pipp.pseudoprice * 100 as int) as weight_pseudo_price
             , spps2.gross_price as pseudo_gross_price
             , pipp.promotionstart, pipp.promotionend
             , sp.fk_product_abstract
             , 0 as is_promotion
        from pyz_imp_price_product pipp
                 inner join spy_store ss on pipp.store = ss.name
                 inner join spy_product sp on pipp.sapnumber = sp.sap_number and (pipp.gtin = sp.sku or pipp.gtin is null)
                 left outer join spy_price_product spp on sp.fk_product_abstract = spp.fk_product_abstract and spp.fk_price_type = 1
                 left outer join spy_price_product_store spps on spp.id_price_product = spps.fk_price_product and ss.id_store = spps.fk_store
                 left outer join spy_price_product spp2 on sp.fk_product_abstract = spp2.fk_product_abstract and spp2.fk_price_type = 2
                 left outer join spy_price_product_store spps2 on spp2.id_price_product = spps2.fk_price_product and ss.id_store = spps2.fk_store
        where sp.is_active = 1
          and (promotionstart IS NULL OR promotionend IS NULL OR pipp.pseudoprice = 0)
    ) prc
    where COALESCE(prc.weight_price, prc.price) <> gross_price;

    CREATE INDEX ix_tbl_prices ON tbl_prices (fk_product_abstract, id_store);

    update tbl_prices tp
        inner join spy_price_product_schedule spps on tp.fk_product_abstract = spps.fk_product_abstract AND tp.id_store = spps.fk_store
        set spps.active_to = DATE_ADD(DATE_ADD(DATE_ADD(DATE(DATE_ADD(NOW(), INTERVAL -1 DAY)), INTERVAL DAY(spps.active_to) MINUTE), INTERVAL MONTH(spps.active_to) HOUR), INTERVAL 35 SECOND)
    where tp.is_promotion = 0
      and tp.pseudo_gross_price > 0
      and now() between spps.active_from AND spps.active_to;


    delete spps2
	from tbl_prices tp
		inner join spy_price_product spp2 on tp.fk_product_abstract = spp2.fk_product_abstract and spp2.fk_price_type = 2
		inner join spy_price_product_store spps2 on spp2.id_price_product = spps2.fk_price_product and tp.id_store = spps2.fk_store
	where tp.is_promotion = 0;

    update tbl_prices tp
        inner join spy_price_product spp2 on tp.fk_product_abstract = spp2.fk_product_abstract and spp2.fk_price_type = 1
        inner join spy_price_product_store spps2 on spp2.id_price_product = spps2.fk_price_product and tp.id_store = spps2.fk_store
        set spps2.gross_price = COALESCE(tp.weight_price, tp.price)
    where tp.is_promotion = 0
      AND spps2.gross_price <> COALESCE(tp.weight_price, tp.price);

    INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
    select DISTINCT tp.fk_product_abstract, 'Price.price_abstract.publish', now()
    from tbl_prices tp
    where tp.is_promotion = 0;

    DROP TEMPORARY TABLE IF EXISTS tbl_prices;

	CREATE TEMPORARY TABLE tbl_prices_ns AS
    select ss.id_store, ss.name
         , sp.fk_product_abstract
         , spp2.fk_price_type
         , spp2.id_price_product
         , spps2.id_price_product_store
         , case when promotionstart IS NULL OR promotionend IS NULL OR pipp.pseudoprice = 0 then 1 else 0 end as doDelete
    from pyz_imp_price_product pipp
             inner join spy_store ss on pipp.store = ss.name
             inner join spy_product sp on pipp.sapnumber = sp.sap_number and (pipp.gtin = sp.sku or pipp.gtin is null)
             inner join spy_price_product spp2 on sp.fk_product_abstract = spp2.fk_product_abstract and spp2.fk_price_type = 2
             inner join spy_price_product_store spps2 on spp2.id_price_product = spps2.fk_price_product and ss.id_store = spps2.fk_store
    where sp.is_active = 1
      and (promotionstart IS NULL OR promotionend IS NULL OR pipp.pseudoprice = 0 OR promotionend < now() OR promotionstart > NOW());

    CREATE INDEX ix_tbl_prices_ns ON tbl_prices_ns (fk_product_abstract, id_store);


    delete tpn
	from spy_price_product_schedule spps
		inner join tbl_prices_ns tpn on spps.fk_product_abstract = tpn.fk_product_abstract
			and spps.fk_price_type = tpn.fk_price_type and spps.fk_store = tpn.id_store
	where now() BETWEEN spps.active_from and spps.active_to
		and tpn.doDelete = 0;

	delete spps
	from spy_price_product_store spps
		inner join tbl_prices_ns tpn on spps.id_price_product_store = tpn.id_price_product_store;

    INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
    select DISTINCT tp.fk_product_abstract, 'Price.price_abstract.publish', now()
    from tbl_prices_ns tp;

    DROP TEMPORARY TABLE IF EXISTS tbl_prices_ns;

    update spy_price_product_schedule spps3
        inner join
        (
            select sp.fk_product_abstract, ss.id_store, spp.fk_price_type, spps2.active_from, spps2.active_to
            from spy_product sp
                inner join spy_price_product spp on sp.fk_product_abstract = spp.fk_product_abstract
                inner join spy_price_product_store spps on spp.id_price_product = spps.fk_price_product
                inner join spy_store ss on spps.fk_store = ss.id_store
                inner join spy_price_product_schedule spps2 on sp.fk_product_abstract = spps2.fk_product_abstract
                    and ss.id_store = spps2.fk_store
                    and spp.fk_price_type = spps2.fk_price_type
                    and now() between spps2.active_from and spps2.active_to
            where case when spps.price_per_kg is null then spps.gross_price else spps.price_per_kg end <> spps2.gross_price
                and sp.is_active = 1
        ) spps4 on spps3.fk_product_abstract = spps4.fk_product_abstract
            and spps3.fk_store = spps4.id_store
            and spps3.fk_price_type = 2
            and spps3.active_from = spps4.active_from
            and spps3.active_to = spps4.active_to
        set spps3.is_current = 0;

    update spy_product sp
        inner join spy_price_product spp on sp.fk_product_abstract = spp.fk_product_abstract
        inner join spy_price_product_store spps on spp.id_price_product = spps.fk_price_product
        inner join spy_store ss on spps.fk_store = ss.id_store
        inner join spy_price_product_schedule spps2 on sp.fk_product_abstract = spps2.fk_product_abstract
        and ss.id_store = spps2.fk_store
        and spp.fk_price_type = spps2.fk_price_type
        and now() between spps2.active_from and spps2.active_to
        set spps2.is_current = 0
    where case when spps.price_per_kg is null then spps.gross_price else spps.price_per_kg end <> spps2.gross_price
            and sp.is_active = 1;
END
