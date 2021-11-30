delimiter //
create or replace procedure pyzx_import_prices(IN currencyCode varchar(3))
BEGIN

    insert into spy_price_type (id_price_type, name, price_mode_configuration)
    select 2, 'ORIGINAL', 1
    from spy_price_type
    where not EXISTS(select * from spy_price_type where name = 'ORIGINAL');

    /*delete all import data except last import per store */
    delete pipp
        from pyz_imp_price_product pipp
        inner join
        (
            select id
               , ROW_NUMBER() over (PARTITION BY store, sapnumber, gtin ORDER BY dtImported desc, id desc) as rowNr
            from pyz_imp_price_product pipp
        ) lastImp on pipp.id = lastImp.id
        WHERE lastImp.rowNr > 1;

    /* for Germany set Monday to Sunday */
    update pyz_imp_price_product
    set promotionstart = DATE_ADD(promotionstart, INTERVAL -1 DAY)
    WHERE WEEKDAY(promotionstart) = 0
      AND EXISTS(SELECT * FROM spy_merchant sm WHERE sm.region_name = 'Germany');

    DROP TEMPORARY TABLE IF EXISTS tmp_tbl_price;
    CREATE TEMPORARY TABLE tmp_tbl_price (
        id_store int,
        id_price_product int,
        fk_price_type int,
        id_product_abstract int,
        price int,
        net_price int,
        price_per_kg int,
        taxRate decimal(8,2),
        weightPerItem decimal(9,4),
        promotion varchar(255),
        promotionstart datetime,
        promotionend datetime,
        isDefault bit,
        price_imp decimal(9,2)
    );

    /*PRICE TYPES: 1-DEFAULT, 2-ORIGINAL */
    /*In import table pyz_imp_price_product all default prices are in column price, original price is in column pseudoprice */

    /* insert missing default prices in spy_price_product */
    insert into spy_price_product
    (fk_price_type, fk_product_abstract, price)
    select distinct 1 as fk_price_type, spa.id_product_abstract, 0 as price
    from pyz_imp_price_product pipp
             inner join spy_product sp on pipp.sapnumber = sp.sap_number and (pipp.gtin = sp.sku or pipp.gtin is null)
             inner join spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
             inner join spy_store ss on pipp.store  = ss.name
             left outer join spy_price_product spp on spa.id_product_abstract = spp.fk_product_abstract and spp.fk_price_type = 1
    where spp.id_price_product is null;

    /*insert of action prices */
    insert into tmp_tbl_price
    (id_store, id_price_product, fk_price_type, id_product_abstract, price, weightPerItem, promotion, promotionstart, promotionend, taxRate, price_imp)
    select distinct ss.id_store, spp.id_price_product, 1 as fk_price_type, spa.id_product_abstract, pipp.price * 100 as price
                  , cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) as weightPerItem
                  , pipp.promotion, pipp.promotionstart, pipp.promotionend
                  , str.rate as taxRate, pipp.price
    from pyz_imp_price_product pipp
             inner join spy_product sp on pipp.sapnumber = sp.sap_number and (pipp.gtin = sp.sku or pipp.gtin is null)
             inner join spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
             inner join spy_tax_set sts on spa.fk_tax_set = sts.id_tax_set
             inner join spy_tax_set_tax stst on sts.id_tax_set = stst.fk_tax_set
             inner join spy_tax_rate str on stst.fk_tax_rate = str.id_tax_rate
             inner join spy_store ss on pipp.store  = ss.name
             inner join spy_price_product spp on spa.id_product_abstract = spp.fk_product_abstract and spp.fk_price_type = 1
    where pipp.pseudoprice > 0
      and pipp.price > 0
      and not pipp.promotionstart is null;

    insert into tmp_tbl_price
    (id_store, id_price_product, fk_price_type, id_product_abstract, price, weightPerItem, promotion, promotionstart, promotionend, taxRate, price_imp)
    select distinct ss.id_store, spp.id_price_product, 2 as fk_price_type, spa.id_product_abstract, pipp.pseudoprice * 100 as price
              , cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) as weightPerItem
              , pipp.promotion, pipp.promotionstart, pipp.promotionend
              , str.rate as taxRate, pipp.pseudoprice
    from pyz_imp_price_product pipp
         inner join spy_product sp on pipp.sapnumber = sp.sap_number and (pipp.gtin = sp.sku or pipp.gtin is null)
         inner join spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
         inner join spy_tax_set sts on spa.fk_tax_set = sts.id_tax_set
         inner join spy_tax_set_tax stst on sts.id_tax_set = stst.fk_tax_set
         inner join spy_tax_rate str on stst.fk_tax_rate = str.id_tax_rate
         inner join spy_store ss on pipp.store  = ss.name
         inner join spy_price_product spp on spa.id_product_abstract = spp.fk_product_abstract and spp.fk_price_type = 1
    where pipp.pseudoprice > 0
      and pipp.price > 0
      and not pipp.promotionstart is null;


    /* insert default prices in temp table tmp_tbl_price*/
    insert into tmp_tbl_price
    (id_store, id_price_product, fk_price_type, id_product_abstract, price, weightPerItem, promotion, promotionstart, promotionend, taxRate, price_imp)
    select distinct ss.id_store, spp.id_price_product, 1 as fk_price_type, spa.id_product_abstract, pipp.price * 100 as price
              , cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) as weightPerItem
              , null as promotion, null as promotionstart, null as promotionend
              , str.rate as taxRate, pipp.price
    from pyz_imp_price_product pipp
         inner join spy_product sp on pipp.sapnumber = sp.sap_number and (pipp.gtin = sp.sku or pipp.gtin is null)
         inner join spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
         inner join spy_tax_set sts on spa.fk_tax_set = sts.id_tax_set
         inner join spy_tax_set_tax stst on sts.id_tax_set = stst.fk_tax_set
         inner join spy_tax_rate str on stst.fk_tax_rate = str.id_tax_rate
         inner join spy_store ss on pipp.store  = ss.name
         inner join spy_price_product spp on spa.id_product_abstract = spp.fk_product_abstract and spp.fk_price_type = 1
    where pipp.price > 0
      and (pipp.pseudoprice = 0 or pipp.promotionstart is null);

    CREATE INDEX u ON tmp_tbl_price (fk_price_type, id_product_abstract);

    update tmp_tbl_price
        set net_price = price * (1 - (taxRate / 100));


    /* populating spy_price_product_schedule data */
    insert into spy_price_product_schedule_list
    (name, is_active, created_at)
    select distinct promotion, 1, now()
    from tmp_tbl_price
    where not promotion in(select distinct name from spy_price_product_schedule_list)
      and not promotion is null;

    /* update of all overlapping start or end, only one action can be applied in one period */
    update spy_price_product_schedule spps
        inner join tmp_tbl_price tmp on tmp.id_store = spps.fk_store
        and tmp.fk_price_type = spps.fk_price_type
        and tmp.id_product_abstract = spps.fk_product_abstract
        inner join spy_price_product_schedule_list sppsl on tmp.promotion = sppsl.name
        set
            spps.fk_price_product_schedule_list = sppsl.id_price_product_schedule_list
            , spps.net_price = tmp.net_price
            , spps.gross_price = tmp.price
            , spps.active_from = tmp.promotionstart
            , spps.active_to = tmp.promotionend
            , spps.updated_at = now()
            , spps.is_current = case when spps.gross_price <> tmp.price then 0 else spps.is_current end
    where
        not tmp.promotionstart is null
    and
    (
        (tmp.promotionstart between spps.active_from and spps.active_to)
        or
        (tmp.promotionend between spps.active_from and spps.active_to)
    );

    insert into spy_price_product_schedule
    (fk_currency, fk_store, fk_price_type, fk_product_abstract, fk_price_product_schedule_list, net_price, gross_price, active_from, active_to, is_current, created_at)
    select distinct sc.id_currency, tmp.id_store, tmp.fk_price_type, tmp.id_product_abstract, sppsl.id_price_product_schedule_list
              , tmp.net_price, tmp.price
              , tmp.promotionstart, tmp.promotionend, 0, now()
    from tmp_tbl_price tmp
         inner join spy_price_product_schedule_list sppsl on tmp.promotion = sppsl.name
         inner join spy_currency sc on sc.code = currencyCode
         left outer join spy_price_product_schedule spps on tmp.id_store = spps.fk_store
            and tmp.fk_price_type = spps.fk_price_type
            and tmp.id_product_abstract = spps.fk_product_abstract
            and sppsl.id_price_product_schedule_list = spps.fk_price_product_schedule_list
            and tmp.promotionstart = spps.active_from
            and tmp.promotionend = spps.active_to
    where not tmp.promotionstart is null
      and spps.id_price_product_schedule is null;

    /* delete sceduled prices with out promotion price or promotion */

    delete spps
       from tmp_tbl_price tmp
        inner join spy_price_product_schedule spps on spps.fk_store = tmp.id_store
            and spps.fk_product_abstract = tmp.id_product_abstract
            and spps.is_current = 1
       where tmp.isDefault = 1
        and tmp.promotionstart is null;

   delete spps
   from tmp_tbl_price tmp
   	inner join spy_price_product_schedule spps on spps.fk_store = tmp.id_store
   		and spps.fk_product_abstract = tmp.id_product_abstract
   where tmp.isDefault = 1
   	and now() BETWEEN spps.active_from and spps.active_to
   	and tmp.promotionstart is null;

   delete spps
   from tmp_tbl_price tmp
   	inner join spy_price_product spp on tmp.id_product_abstract = spp.fk_product_abstract and spp.fk_price_type = 2
   	inner join spy_price_product_store spps on spps.fk_store = tmp.id_store
   		and spp.id_price_product  = spps.fk_price_product
   where tmp.isDefault = 1
   	and tmp.promotionstart is null;

    /* on weight article set price_per_kg */
    update tmp_tbl_price
    set
        price_per_kg = price
      , price = weightPerItem * price
      , net_price = weightPerItem * price  * (1 - (taxRate / 100))
    where weightPerItem > 0.0
      and promotionstart is null;

    /* find out default price per store and article */
    update tmp_tbl_price tmp1
        inner join
        (
        select id_store, id_price_product, fk_price_type, id_product_abstract,
        ROW_NUMBER() over (PARTITION BY id_store, id_product_abstract ORDER BY fk_price_type) as priority
        from tmp_tbl_price tmp
        ) tmp2 on tmp1.id_store = tmp2.id_store
        and tmp1.id_price_product = tmp2.id_price_product
        and tmp1.fk_price_type = tmp2.fk_price_type
        and tmp1.id_product_abstract = tmp2.id_product_abstract
        SET
            isDefault = 1
    where tmp2.priority = 1
      and tmp1.promotionstart is null;

    update tmp_tbl_price
    SET
        isDefault = 0
    where isDefault IS NULL;


    /* deleting not used price definitions */

    delete from spy_price_product_default
    where fk_price_product_store IN
      (
          select id_price_product_store
          from
              (
                  select spps.id_price_product_store,
                         ROW_NUMBER() over (PARTITION BY spps.fk_store, spps.fk_price_product, spp.fk_price_type ORDER BY spps.id_price_product_store desc) as priority
                  from spy_price_product_store spps
                           inner join spy_price_product spp on spps.fk_price_product = spp.id_price_product
              ) it
          where it.priority > 1
      );

    delete from spy_price_product_store
    where id_price_product_store IN
      (
          select id_price_product_store
          from
              (
                  select spps.id_price_product_store,
                         ROW_NUMBER() over (PARTITION BY spps.fk_store, spps.fk_price_product, spp.fk_price_type ORDER BY spps.id_price_product_store desc) as priority
                  from spy_price_product_store spps
                           inner join spy_price_product spp on spps.fk_price_product = spp.id_price_product
              ) it
          where it.priority > 1
      );

    delete from spy_price_product_default
    where fk_price_product_store IN
      (
          select spps.id_price_product_store
          from spy_price_product spp
                   inner join spy_price_product_store spps on spp.id_price_product = spps.fk_price_product
                   left outer join tmp_tbl_price tmp on spp.fk_product_abstract  = tmp.id_product_abstract and spp.fk_price_type = tmp.fk_price_type
          where tmp.id_price_product is null
      );

    delete from spy_price_product_offer
    where fk_price_product_store IN
      (
          select spps.id_price_product_store
          from spy_price_product spp
                   inner join spy_price_product_store spps on spp.id_price_product = spps.fk_price_product
                   left outer join tmp_tbl_price tmp on spp.fk_product_abstract  = tmp.id_product_abstract and spp.fk_price_type  = tmp.fk_price_type
          where tmp.id_price_product is null
      );

    delete from spy_price_product_store
    where fk_price_product IN
      (
          select spp.id_price_product
          from spy_price_product spp
                   left outer join tmp_tbl_price tmp on spp.fk_product_abstract  = tmp.id_product_abstract and spp.fk_price_type  = tmp.fk_price_type
          where tmp.id_price_product is null
      );


    /* generating events for publish new price data */
    /* for now we publish all prices again on end
        INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
        select DISTINCT tmp.id_product_abstract, 'Price.price_abstract.publish', now()
        from spy_price_product_store spps
                 inner join tmp_tbl_price tmp on spps.fk_price_product = tmp.id_price_product and spps.fk_store = tmp.id_store
        where spps.gross_price <> tmp.price * 100.0 or spps.price_per_kg <> tmp.price_per_kg * 100.0;

        INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
        select DISTINCT tmp.id_product_abstract, 'Product.product_abstract.publish', now()
        from spy_price_product_store spps
                 inner join tmp_tbl_price tmp on spps.fk_price_product = tmp.id_price_product and spps.fk_store = tmp.id_store
        where spps.gross_price <> tmp.price * 100.0;
    */


    /* DEFAULT PRICES */
    update spy_price_product_store spps
    inner join tmp_tbl_price tmp on spps.fk_price_product = tmp.id_price_product and spps.fk_store = tmp.id_store
    SET
        spps.gross_price = tmp.price
        , spps.net_price = tmp.net_price
        , spps.price_data_checksum = tmp.price
        , spps.price_data = '[]'
        , spps.price_per_kg = tmp.price_per_kg
    where (spps.gross_price <> tmp.price or spps.price_per_kg <> tmp.price_per_kg)
      and tmp.isDefault = 1
      and tmp.promotion is null;

    insert into spy_price_product_store
    (fk_currency, fk_price_product, fk_store, gross_price, net_price, price_data, price_data_checksum, price_per_kg)
    select sc.id_currency as fk_currency, tmp.id_price_product, tmp.id_store
     , tmp.price as gross_price, tmp.net_price as net_price
     , '[]' as price_data, tmp.price as price_data_checksum
     , tmp.price_per_kg
    from tmp_tbl_price tmp
         inner join spy_currency sc on sc.code = currencyCode
         left outer join spy_price_product_store spps on spps.fk_price_product = tmp.id_price_product and spps.fk_store = tmp.id_store
    where tmp.isDefault = 1
      and tmp.promotion is null
      and spps.id_price_product_store is null;

    /* PRODUCT DEFAULT TABLE */
    insert into spy_price_product_default
    (fk_price_product_store)
    select spps.id_price_product_store
    from spy_price_product_store spps
         left outer join spy_price_product_default sppd on spps.id_price_product_store = sppd.fk_price_product_store
    where sppd.id_price_product_default is null;

    DROP TEMPORARY TABLE IF EXISTS tmp_tbl_price;

    INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
    select distinct spp.fk_product_abstract , 'Price.price_abstract.publish', now()
    from spy_price_product spp
             inner join spy_product sp on spp.fk_product_abstract  = sp.fk_product_abstract
    where sp.is_active = 1;

END;

