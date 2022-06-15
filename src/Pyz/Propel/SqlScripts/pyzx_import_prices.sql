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
		id int not null AUTO_INCREMENT primary key,
		fk_store int,
		fk_price_product int,
		fk_price_type int,
		fk_product_abstract int,
		fk_currency int,
		price int,
		net_price int,
		price_per_kg int,
		taxRate decimal(8,2),
		weightPerItem decimal(9,4),
		promotion varchar(255),
		promotionstart datetime,
		promotionend datetime,
		isDefault bit,
		price_imp decimal(9,2),
		isChanged bit,
		is_permanent_sale_price bit,
		is_promotion bit,
		fk_price_product_schedule int
	);

	/* get default prices */
	insert into tmp_tbl_price
		(fk_store, fk_price_product, fk_price_type, fk_product_abstract, fk_currency, price, weightPerItem, promotion, promotionstart, promotionend, taxRate, price_imp, is_permanent_sale_price, is_promotion)
	select distinct ss.id_store, spp.id_price_product, 1 as fk_price_type, spa.id_product_abstract, sc.id_currency, pipp.price * 100 as price
		, cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) as weightPerItem
		, pipp.promotion, pipp.promotionstart, pipp.promotionend
		, str.rate as taxRate, pipp.price
		, case when pipp.pseudoprice > 0 and (promotion is null or promotionstart is null) then 1 else 0 end as is_permanent_sale_price
		, case when (not promotion is null and not promotionstart is null) then 1 else 0 end as is_promotion
    from pyz_imp_price_product pipp
		inner join spy_product sp on pipp.sapnumber = sp.sap_number
			and (pipp.gtin = sp.sku or pipp.gtin is null)
		inner join spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
		inner join spy_tax_set sts on spa.fk_tax_set = sts.id_tax_set
		inner join spy_tax_set_tax stst on sts.id_tax_set = stst.fk_tax_set
		inner join spy_tax_rate str on stst.fk_tax_rate = str.id_tax_rate
		inner join spy_store ss on pipp.store  = ss.name
		inner join spy_currency sc on sc.code = currencyCode
		left outer join spy_price_product spp on spa.id_product_abstract = spp.fk_product_abstract
			and spp.fk_price_type = 1
	where pipp.price > 0;

	/* get original prices */
	insert into tmp_tbl_price
		(fk_store, fk_price_product, fk_price_type, fk_product_abstract, fk_currency, price, weightPerItem, promotion, promotionstart, promotionend, taxRate, price_imp, is_permanent_sale_price, is_promotion)
	select distinct ss.id_store, spp.id_price_product, 2 as fk_price_type, spa.id_product_abstract, sc.id_currency, pipp.pseudoprice * 100 as price
		, cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) as weightPerItem
		, pipp.promotion, pipp.promotionstart, pipp.promotionend
		, str.rate as taxRate, pipp.pseudoprice
		, case when pipp.pseudoprice > 0 and (promotion is null or promotionstart is null) then 1 else 0 end as is_permanent_sale_price
		, case when (not promotion is null and not promotionstart is null) then 1 else 0 end as is_promotion
	from pyz_imp_price_product pipp
		inner join spy_product sp on pipp.sapnumber = sp.sap_number
			and (pipp.gtin = sp.sku or pipp.gtin is null)
		inner join spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
		inner join spy_tax_set sts on spa.fk_tax_set = sts.id_tax_set
		inner join spy_tax_set_tax stst on sts.id_tax_set = stst.fk_tax_set
		inner join spy_tax_rate str on stst.fk_tax_rate = str.id_tax_rate
		inner join spy_store ss on pipp.store  = ss.name
		inner join spy_currency sc on sc.code = currencyCode
		left outer join spy_price_product spp on spa.id_product_abstract = spp.fk_product_abstract
			and spp.fk_price_type = 2
	where pipp.price > 0
		and (
				(pipp.pseudoprice > 0 and (promotion is null or promotionstart is null))
				or
				(not promotion is null and not promotionstart is null)
			);

	CREATE INDEX ix_tmp_1 ON tmp_tbl_price (fk_store, fk_price_type, fk_product_abstract);
	CREATE INDEX ix_tmp_2 ON tmp_tbl_price (fk_store, fk_price_product);
	CREATE INDEX ix_tmp_3 ON tmp_tbl_price (fk_store, fk_product_abstract);
	CREATE INDEX ix_tmp_4 ON tmp_tbl_price (fk_store, fk_product_abstract, is_promotion, is_permanent_sale_price);
	CREATE INDEX ix_tmp_5 ON tmp_tbl_price (fk_store, fk_product_abstract, is_promotion);

	/* update price per kg for items without promotion */
	update tmp_tbl_price
		set price_per_kg = price
			, price = cast(weightPerItem * price as int)
	where weightPerItem > 0.0
		and is_promotion = 0;

	update tmp_tbl_price
		set net_price = price * (1 - (taxRate / 100));

    /* check for duplicated rows */
    DELETE t
        FROM tmp_tbl_price t
        inner join
        (
            SELECT MAX(id) AS id
            FROM tmp_tbl_price
            GROUP BY fk_store, fk_price_product
            HAVING COUNT(*) > 1
        ) t1 on t.id = t1.id;

	/* insert missing spy_price_product */
	insert into spy_price_product
		(fk_price_type, fk_product_abstract, price)
	select distinct fk_price_type, fk_product_abstract, 0
	from tmp_tbl_price
	where fk_price_product is null;

	update tmp_tbl_price
		set isChanged = 1
	where fk_price_product is null;

	update spy_price_product spp
		inner join tmp_tbl_price t on spp.fk_product_abstract = t.fk_product_abstract
			and spp.fk_price_type = t.fk_price_type
		set t.fk_price_product = spp.id_price_product
	where t.fk_price_product is null;
	/* end - insert missing spy_price_product */

	/* insert new not promotion and permanent prices */
	update tmp_tbl_price t
		left outer join spy_price_product_store spps on spps.fk_store = t.fk_store and spps.fk_price_product = t.fk_price_product
	set isChanged = 1
	where spps.id_price_product_store is null
		and t.is_permanent_sale_price = 0
		and t.is_promotion = 0;

	insert into spy_price_product_store
		(fk_currency, fk_price_product, fk_store, gross_price, is_permanent_sale_price, net_price, price_data, price_data_checksum, price_per_kg, promotion)
	select distinct t.fk_currency, t.fk_price_product, t.fk_store, t.price, t.is_permanent_sale_price, t.net_price, '[]', t.price, t.price_per_kg, t.promotion
	from tmp_tbl_price t
		left outer join spy_price_product_store spps on spps.fk_store = t.fk_store and spps.fk_price_product = t.fk_price_product
	where spps.id_price_product_store is null
		and t.is_permanent_sale_price = 0
		and t.is_promotion = 0;


	/* update changed not promotion and permanent prices */
	update tmp_tbl_price
		set isChanged = 1
	where id IN
	(
		select t.id
		from tmp_tbl_price t
			inner join spy_price_product_store spps on spps.fk_store = t.fk_store
				and spps.fk_price_product = t.fk_price_product
				and t.is_permanent_sale_price = 0
				and t.is_promotion = 0
		where spps.gross_price <> t.price
			or ifnull(spps.price_per_kg, 0) <> ifnull(t.price_per_kg, 0)
			or ifnull(spps.promotion, '') <> ifnull(t.promotion, '')
			or ifnull(spps.is_permanent_sale_price, 0)  <> ifnull(t.is_permanent_sale_price, 0)
	);

	update tmp_tbl_price t
	inner join spy_price_product_store spps on spps.fk_store = t.fk_store
			and spps.fk_price_product = t.fk_price_product
			and t.is_permanent_sale_price = 0
			and t.is_promotion = 0
		set spps.gross_price = t.price
		, spps.net_price = t.net_price
		, spps.price_per_kg = t.price_per_kg
		, spps.promotion = t.promotion
		, spps.is_permanent_sale_price = t.is_permanent_sale_price
	where spps.gross_price <> t.price
		or ifnull(spps.price_per_kg, 0) <> ifnull(t.price_per_kg, 0)
		or ifnull(spps.promotion, '') <> ifnull(t.promotion, '')
		or ifnull(spps.is_permanent_sale_price, 0)  <> ifnull(t.is_permanent_sale_price, 0);

	/* in case when we have active promotion and import is without promotion then set end of promotion */
	CREATE TEMPORARY TABLE tbl_toDelete AS
	select spps2.id_price_product_store
	from spy_price_product_schedule spps
		inner join tmp_tbl_price t on t.fk_store = spps.fk_store
			and t.fk_product_abstract = spps.fk_product_abstract
			and t.is_promotion = 0
			and t.is_permanent_sale_price = 0
			and now() between spps.active_from and spps.active_to
		inner join spy_price_product spp on t.fk_product_abstract = spp.fk_product_abstract and spp.fk_price_type = 2
		inner join spy_price_product_store spps2 on t.fk_store = spps2.fk_store
			and spps2.fk_price_product = spp.id_price_product;

	update tmp_tbl_price
		set isChanged = 1
	where id IN
	(
		select t.id
		from spy_price_product_schedule spps
			inner join tmp_tbl_price t on t.fk_store = spps.fk_store
				and t.fk_product_abstract = spps.fk_product_abstract
				and t.is_promotion = 0
				and now() between spps.active_from and spps.active_to
	);

	update spy_price_product_schedule spps
		inner join tmp_tbl_price t on t.fk_store = spps.fk_store
			and t.fk_product_abstract = spps.fk_product_abstract
			and t.is_promotion = 0
			and now() between spps.active_from and spps.active_to
		set spps.active_to = DATE_ADD(DATE_ADD(DATE_ADD(DATE(DATE_ADD(now(), INTERVAL -1 DAY)), INTERVAL DAY(spps.active_to) MINUTE), INTERVAL MONTH(spps.active_to) HOUR), INTERVAL 35 SECOND)
			, spps.is_current = 0;

	/* insert permanent sale prices */
	update tmp_tbl_price t
		left outer join spy_price_product_store spps on spps.fk_store = t.fk_store
			and spps.fk_price_product = t.fk_price_product
		set t.isChanged = 1
	where spps.id_price_product_store is null
		and t.is_permanent_sale_price = 1;

	insert into spy_price_product_store
		(fk_currency, fk_price_product, fk_store, gross_price, is_permanent_sale_price, net_price, price_data, price_data_checksum, price_per_kg, promotion)
	select distinct t.fk_currency, t.fk_price_product, t.fk_store, t.price, t.is_permanent_sale_price, t.net_price, '[]', t.price, t.price_per_kg, t.promotion
	from tmp_tbl_price t
		left outer join spy_price_product_store spps on spps.fk_store = t.fk_store and spps.fk_price_product = t.fk_price_product
	where spps.id_price_product_store is null
		and t.is_permanent_sale_price = 1;

	update tmp_tbl_price t
		inner join spy_price_product_store spps on spps.fk_store = t.fk_store
			and spps.fk_price_product = t.fk_price_product
			and t.is_permanent_sale_price = 1
	set t.isChanged = 1
	where spps.gross_price <> t.price
		or ifnull(spps.price_per_kg, 0)  <> ifnull(t.price_per_kg, 0)
		or ifnull(spps.promotion, '')  <> ifnull(t.promotion, '')
		or ifnull(spps.is_permanent_sale_price, 0)  <> ifnull(t.is_permanent_sale_price, 0);

	update tmp_tbl_price t
		inner join spy_price_product_store spps on spps.fk_store = t.fk_store
			and spps.fk_price_product = t.fk_price_product
			and t.is_permanent_sale_price = 1
		set spps.gross_price = t.price
			, spps.net_price = t.net_price
			, spps.price_per_kg = t.price_per_kg
			, spps.promotion = t.promotion
			, spps.is_permanent_sale_price = t.is_permanent_sale_price
	where spps.gross_price <> t.price
		or ifnull(spps.price_per_kg, 0)  <> ifnull(t.price_per_kg, 0)
		or ifnull(spps.promotion, '')  <> ifnull(t.promotion, '')
		or ifnull(spps.is_permanent_sale_price, 0)  <> ifnull(t.is_permanent_sale_price, 0);

	/* end of permanent sale prices */

	/* populating spy_price_product_schedule data */
	insert into spy_price_product_schedule_list
		(name, is_active, created_at)
	select distinct promotion, 1, now()
	from tmp_tbl_price
	where not promotion in(select distinct name from spy_price_product_schedule_list)
		and not promotion is null;

	/* check and update existing action prices */
	update spy_price_product_schedule spps
		inner join tmp_tbl_price t on t.fk_store = spps.fk_store
			and t.fk_price_type = spps.fk_price_type
			and t.fk_product_abstract = spps.fk_product_abstract
			and t.promotionstart = spps.active_from
			and t.promotionend = spps.active_to
			and t.is_promotion = 1
		inner join spy_price_product_schedule_list sppsl on t.promotion = sppsl.name
			and spps.fk_price_product_schedule_list = sppsl.id_price_product_schedule_list
	set t.fk_price_product_schedule = spps.id_price_product_schedule;

	update spy_price_product_schedule spps
		inner join tmp_tbl_price t on t.fk_price_product_schedule = spps.id_price_product_schedule
	set t.isChanged = 1
	where spps.gross_price <> t.price;

	update spy_price_product_schedule spps
	inner join tmp_tbl_price t on t.fk_price_product_schedule = spps.id_price_product_schedule
		set spps.net_price = t.net_price
			, spps.gross_price = t.price
			, spps.updated_at = now()
	where spps.gross_price <> t.price;

	/* if exists overlapping promotion then end this promotion and apply new promotion */
	update spy_price_product_schedule spps
		inner join tmp_tbl_price t on t.fk_store = spps.fk_store
			and t.fk_price_type = spps.fk_price_type
			and t.fk_product_abstract = spps.fk_product_abstract
			and (
				(t.promotionstart between spps.active_from and spps.active_to)
				or
				(t.promotionend between spps.active_from and spps.active_to)
			)
			and t.is_promotion = 1
			and t.fk_price_product_schedule is null
		inner join spy_price_product_schedule_list sppsl on t.promotion = sppsl.name
			and spps.fk_price_product_schedule_list = sppsl.id_price_product_schedule_list
	set spps.active_to = DATE_ADD(DATE_ADD(DATE_ADD(DATE(DATE_ADD(t.promotionstart, INTERVAL -1 DAY)), INTERVAL DAY(spps.active_to) MINUTE), INTERVAL MONTH(spps.active_to) HOUR), INTERVAL 35 SECOND);

	/* insert new promotions to table */
	insert into spy_price_product_schedule
		(fk_currency, fk_store, fk_price_type, fk_product_abstract, fk_price_product_schedule_list, net_price, gross_price, active_from, active_to, is_current, created_at)
	select distinct t.fk_currency, t.fk_store, t.fk_price_type, t.fk_product_abstract, sppsl.id_price_product_schedule_list
		, t.net_price, t.price
		, t.promotionstart, t.promotionend, 0, now()
	from tmp_tbl_price t
		inner join spy_price_product_schedule_list sppsl on t.promotion = sppsl.name
	where t.is_promotion = 1
		and t.fk_price_product_schedule is null;

	/* delete on end */
	delete from spy_price_product_default
	where fk_price_product_store IN (select distinct id_price_product_store from tbl_toDelete);

	delete from spy_price_product_offer
	where fk_price_product_store IN (select distinct id_price_product_store from tbl_toDelete);

	delete from spy_price_product_store
	where id_price_product_store IN (select distinct id_price_product_store from tbl_toDelete);


	INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
	select distinct t.fk_product_abstract, 'Price.price_abstract.publish', now()
	from tmp_tbl_price t
	where t.isChanged = 1;

	INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
	select DISTINCT t.fk_product_abstract, 'Product.product_abstract.publish', now()
	from tmp_tbl_price t
	where t.isChanged = 1;

	INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
	select DISTINCT spc.fk_category, 'Entity.spy_category.publish', now()
	from spy_product_category spc
		inner join tmp_tbl_price t on spc.fk_product_abstract = t.fk_product_abstract
	where t.isChanged = 1;

	select CONCAT('Modified products: ', COUNT(DISTINCT fk_product_abstract)) as result from tmp_tbl_price where isChanged = 1;

	DROP TEMPORARY TABLE IF EXISTS tmp_tbl_price;
	DROP TEMPORARY TABLE IF EXISTS tbl_toDelete;

END;

