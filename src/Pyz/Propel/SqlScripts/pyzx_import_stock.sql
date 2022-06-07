delimiter //
create or replace procedure pyzx_import_stock()
BEGIN
	delete pis2
	from pyz_imp_stock pis2
	inner join
	(
		select pis.id
			, ROW_NUMBER() over (partition by pis.store, pis.sapnumber, pis.gtin ORDER BY pis.dtImported DESC) as nr
		from pyz_imp_stock pis
	) pis3 on pis2.id = pis3.id and pis3.nr > 1;

    insert into spy_stock
        (is_active, name)
    select DISTINCT 1 as is_active, pis.store
    from pyz_imp_stock pis
             left outer join spy_stock ss2 on pis.store = ss2.name
    where ss2.id_stock is null;

    insert into spy_stock_store
        (fk_stock, fk_store)
    select DISTINCT ss2.id_stock, ss.id_store
    from pyz_imp_stock pis
             inner join spy_store ss on pis.store = ss.name
             inner join spy_stock ss2 on ss.name = ss2.name
             left outer join spy_stock_store sss on sss.fk_store = ss.id_store
    where sss.id_stock_store is null;

    DROP TEMPORARY TABLE IF EXISTS tmp_stock;
	CREATE TEMPORARY TABLE tmp_stock (
        id bigint,
        fk_product int,
        fk_product_abstract int,
        fk_stock int,
        id_stock_product int,
        instock decimal(20,10),
        `sequence` varchar(200),
        shelf varchar(200),
        shelf_field varchar(200),
        shelf_floor varchar(200),
	    fk_store int
	);

    insert into tmp_stock
        (id, fk_product, fk_product_abstract, fk_stock, id_stock_product, instock, `sequence`, shelf, shelf_field, shelf_floor, fk_store)
    select id, id_product, fk_product_abstract, fk_stock, id_stock_product, instock, `sequence`, shelf, shelf_field, shelf_floor, fk_store
    from (
         select pis.id
              , sp.id_product
              , sp.fk_product_abstract
              , sss.fk_stock
              , ssp.id_stock_product
              , 0                                         as is_never_out_of_stock
              , pis.instock
              , COALESCE(psd.`sequence`, psd2.`sequence`) as `sequence`
              , COALESCE(pis.shelf, ssp.shelf)            as shelf
              , COALESCE(pis.shelffield, ssp.shelf_field) as shelf_field
              , COALESCE(pis.shelffloor, ssp.shelf_floor) as shelf_floor
              , ROW_NUMBER() over(partition BY sp.id_product, sss.fk_stock order by pis.gtin desc) as nr
              , ss.id_store as fk_store
         from pyz_imp_stock pis
                  inner join spy_store ss on pis.store = ss.name
                  inner join spy_stock_store sss on sss.fk_store = ss.id_store
                  inner join spy_product sp
                             on (pis.gtin = sp.sku or pis.gtin is null) and pis.sapnumber = sp.sap_number
                  left outer join spy_stock_product ssp
                                  on sss.fk_stock = ssp.fk_stock and sp.id_product = ssp.fk_product
                  left outer join pyz_shelf_definition psd
                                  on sss.fk_stock = psd.fk_stock and pis.shelf = psd.shelf and
                                     pis.shelffield = psd.shelf_field and pis.shelffloor = psd.shelf_floor
                  left outer join pyz_shelf_definition psd2
                                  on sss.fk_stock = psd2.fk_stock and ssp.shelf = psd2.shelf and
                                     ssp.shelf_field = psd2.shelf_field and ssp.shelf_floor = psd2.shelf_floor
    ) tbl
    where tbl.nr = 1;

    CREATE INDEX ix_tmp_stock ON tmp_stock (id);
    CREATE INDEX ix_tmp_stock_2 ON tmp_stock (fk_product, fk_stock);
    CREATE INDEX ix_tmp_stock_id_stock_product ON tmp_stock (id_stock_product);
    CREATE INDEX ix_tmp_stock_3 ON tmp_stock (fk_product_abstract, fk_store);

    insert into pyz_product_abstract_store
        (fk_product_abstract, fk_store)
    select distinct ts.fk_product_abstract, ts.fk_store
    from tmp_stock ts
        left outer join pyz_product_abstract_store ppas on ts.fk_product_abstract = ppas.fk_product_abstract and ts.fk_store = ppas.fk_store
    where ts.id_stock_product is null
        and ppas.id_product_abstract_store is null;

    /*only for initial import*/
    IF (EXISTS(select * from pyz_product_abstract_store) = 0) THEN
        insert into pyz_product_abstract_store
            (fk_product_abstract, fk_store)
        select distinct fk_product_abstract, fk_store
        from tmp_stock ts;
    END IF;

    insert into pyz_product_abstract_store
        (fk_product_abstract, fk_store)
    select sp.fk_product_abstract, ss.id_store
    from spy_product sp
         inner join spy_store ss on 1 = 1
         inner join spy_merchant sm on ss.name = sm.merchant_short_name
            and sm.is_active = 1
         left outer join pyz_product_abstract_store ppas on sp.fk_product_abstract = ppas.fk_product_abstract
            AND ss.id_store = ppas.fk_store
    WHERE sp.created_at > DATE_ADD(NOW(), INTERVAL -1 DAY)
        AND ppas.id_product_abstract_store is null;

    update tmp_stock ts
        left outer join pyz_product_abstract_store ppas on ts.fk_product_abstract = ppas.fk_product_abstract and ts.fk_store = ppas.fk_store
    set ts.instock = 0
    where ppas.id_product_abstract_store is null;

    INSERT INTO pyz_data_import_event
        (entity_id, event_name, created_at)
    select DISTINCT ts.fk_product_abstract, 'Product.product_abstract.publish', now()
    from tmp_stock ts
    where ts.id_stock_product is null;

    insert into spy_stock_product
        (fk_product, fk_stock, is_never_out_of_stock, quantity, `sequence`, shelf, shelf_field, shelf_floor)
    select fk_product, fk_stock, 0 as is_never_out_of_stock, instock, `sequence`, shelf, shelf_field, shelf_floor
    from tmp_stock ts
    where ts.id_stock_product is null;

    update tmp_stock ts
        inner join spy_stock_product ssp on ts.fk_stock = ssp.fk_stock and ts.fk_product = ssp.fk_product
        set ts.id_stock_product = ssp.id_stock_product
    where ts.id_stock_product is null;

    INSERT INTO pyz_data_import_event
    (entity_id, event_name, created_at)
    select DISTINCT ts.fk_product_abstract, 'Product.product_abstract.publish', now()
    from tmp_stock ts
         inner join spy_stock_product ssp on ts.id_stock_product = ssp.id_stock_product
    where ssp.quantity is null or ssp.quantity <> ts.instock;

    update tmp_stock ts
    inner join spy_stock_product ssp on ts.id_stock_product = ssp.id_stock_product
    set ssp.quantity = ts.instock,
        ssp.`sequence` = ts.`sequence`,
        ssp.shelf = ts.shelf,
        ssp.shelf_field = ts.shelf_field,
        ssp.shelf_floor = ts.shelf_floor
    where ssp.quantity is null
       or ssp.quantity <> ts.instock
       or IFNULL(ssp.shelf, '') <> IFNULL(ts.shelf, '');

    update spy_stock_product ssp
    left outer join tmp_stock ts on ssp.id_stock_product = ts.id_stock_product
    set
        ssp.quantity = 0
    where ssp.fk_stock in (select distinct fk_stock from tmp_stock)
        and ts.id is null;

    DROP TEMPORARY TABLE IF EXISTS tmp_stock;

END;

