delimiter //
CREATE OR REPLACE PROCEDURE pyzx_product_price_schedule_apply()
BEGIN
	DROP TEMPORARY TABLE IF EXISTS tbl_prices;

	CREATE TEMPORARY TABLE tbl_prices AS
	select spps2.fk_currency
		, spp.id_price_product as fk_price_product
		, spps2.fk_store
		, spps2.gross_price
		, spps2.net_price
		, '[]' as price_data
		, spps2.gross_price as price_data_checksum
		, cast(null as int) as price_per_kg
		, valid.name as promotion
		, cast(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,4)) as weightPerItem
		, str.rate as tax_rate
		, spp.fk_price_type
		, spps2.id_price_product_schedule
		, spa.id_product_abstract
		, cast(null as int) as fk_price_product_store
	from spy_price_product_schedule spps2
		inner join
		(
			select spps.id_price_product_schedule, sppsl.name
				, ROW_NUMBER() OVER (PARTITION BY spps.fk_store, spps.fk_price_type, spps.fk_product_abstract
					ORDER BY GREATEST(spps.created_at, ifnull(spps.updated_at, '1901-01-01')) DESC, spps.id_price_product_schedule DESC) as rbr
			from spy_price_product_schedule_list sppsl
				inner join spy_price_product_schedule spps on sppsl.id_price_product_schedule_list = spps.fk_price_product_schedule_list
			where sppsl.is_active = 1
				and now() BETWEEN spps.active_from AND spps.active_to
		) valid on spps2.id_price_product_schedule  = valid.id_price_product_schedule
		inner join spy_price_product spp on spps2.fk_price_type = spp.fk_price_type AND spps2.fk_product_abstract = spp.fk_product_abstract
		inner join spy_product_abstract spa on spps2.fk_product_abstract = spa.id_product_abstract
		left outer join spy_tax_set sts on spa.fk_tax_set = sts.id_tax_set
		left outer join spy_tax_set_tax stst on sts.id_tax_set = stst.fk_tax_set
		left outer join spy_tax_rate str on stst.fk_tax_rate = str.id_tax_rate
	where valid.rbr = 1;

	CREATE UNIQUE INDEX u ON tbl_prices (fk_currency, fk_price_product, fk_store);

	### calculate price per kg ####
		update tbl_prices
			set price_per_kg = gross_price
				, gross_price = cast(gross_price * weightPerItem as int)
				, net_price = gross_price / (100 + tax_rate) * 100
		where weightPerItem > 0;

	### update of spy_price_product_store ####
		CREATE TEMPORARY TABLE tbl_modified AS
		select t.id_product_abstract
		from spy_price_product_store spps
			inner join tbl_prices t on spps.fk_currency = t.fk_currency
				and spps.fk_price_product = t.fk_price_product
				and spps.fk_store = t.fk_store
		where spps.gross_price <> t.gross_price
				or ifnull(spps.net_price, 0) <> ifnull(t.net_price, 0)
				or ifnull(spps.price_per_kg, 0) <> ifnull(t.price_per_kg, 0)
				or ifnull(spps.promotion, '') <> ifnull(t.promotion, '');

		update spy_price_product_store spps
			inner join tbl_prices t on spps.fk_currency = t.fk_currency
				and spps.fk_price_product = t.fk_price_product
				and spps.fk_store = t.fk_store
			set t.fk_price_product_store = spps.id_price_product_store;

		update spy_price_product_store spps
			inner join tbl_prices t on spps.fk_currency = t.fk_currency
				and spps.fk_price_product = t.fk_price_product
				and spps.fk_store = t.fk_store
			set spps.gross_price = t.gross_price
				, spps.net_price = t.net_price
				, spps.price_per_kg = t.price_per_kg
				, spps.promotion = t.promotion
		where spps.gross_price <> t.gross_price
			or ifnull(spps.net_price, 0) <> ifnull(t.net_price, 0)
			or ifnull(spps.price_per_kg, 0) <> ifnull(t.price_per_kg, 0)
			or ifnull(spps.promotion, '') <> ifnull(t.promotion, '');

		INSERT INTO tbl_modified
		select id_product_abstract
		from tbl_prices
		where fk_price_product_store is null;

		insert into spy_price_product_store
			(fk_currency, fk_price_product, fk_store, gross_price, net_price, price_data, price_data_checksum, price_per_kg, promotion)
		select fk_currency, fk_price_product, fk_store, gross_price, net_price, price_data, price_data_checksum, price_per_kg, promotion
		from tbl_prices
		where fk_price_product_store is null;

	### update unvalid promotion prices with original prices ####
		INSERT INTO tbl_modified
		select spp.fk_product_abstract
		from  spy_price_product_store spps
			inner join spy_price_product spp on spps.fk_price_product = spp.id_price_product
				and spp.fk_price_type = 2
			inner join spy_price_product spp2 on spp.fk_product_abstract = spp2.fk_product_abstract and spp2.fk_price_type = 1
			inner join spy_price_product_store spps2 on spps.fk_currency = spps2.fk_currency
				and spps.fk_store = spps2.fk_store
				and spp2.id_price_product = spps2.fk_price_product
			left outer join tbl_prices t on spps.fk_currency = t.fk_currency
				and spps.fk_price_product = t.fk_price_product
				and spps.fk_store = t.fk_store
		where t.fk_price_product is null
			and spps.gross_price > 0;

		update spy_price_product_store spps
			inner join spy_price_product spp on spps.fk_price_product = spp.id_price_product
				and spp.fk_price_type = 2
			inner join spy_price_product spp2 on spp.fk_product_abstract = spp2.fk_product_abstract and spp2.fk_price_type = 1
			inner join spy_price_product_store spps2 on spps.fk_currency = spps2.fk_currency
				and spps.fk_store = spps2.fk_store
				and spp2.id_price_product = spps2.fk_price_product
			left outer join tbl_prices t on spps.fk_currency = t.fk_currency
				and spps.fk_price_product = t.fk_price_product
				and spps.fk_store = t.fk_store
			set spps2.gross_price = spps.gross_price
				, spps2.net_price = spps.net_price
				, spps2.price_per_kg = spps.price_per_kg
				, spps2.price_data_checksum = spps.price_data_checksum
				, spps2.promotion = null
		where t.fk_price_product is null
			and spps.gross_price > 0;

		# update promotion name to null for unvalid promotions #
		INSERT INTO tbl_modified
		select spp.fk_product_abstract
		from spy_price_product_store spps
			inner join spy_price_product spp on spps.fk_price_product = spp.id_price_product
				and spp.fk_price_type = 1
			left outer join tbl_prices t on spps.fk_currency = t.fk_currency
				and spps.fk_price_product = t.fk_price_product
				and spps.fk_store = t.fk_store
		where t.fk_price_product is null
			and not spps.promotion is null;

		update spy_price_product_store spps
			inner join spy_price_product spp on spps.fk_price_product = spp.id_price_product
				and spp.fk_price_type = 1
			left outer join tbl_prices t on spps.fk_currency = t.fk_currency
				and spps.fk_price_product = t.fk_price_product
				and spps.fk_store = t.fk_store
			set spps.promotion = null
		where t.fk_price_product is null
			and not spps.promotion is null;

	### delete unvalid original prices ####
		INSERT INTO tbl_modified
		select spp.fk_product_abstract
		from spy_price_product_store spps
			inner join spy_price_product spp on spps.fk_price_product = spp.id_price_product
				and spp.fk_price_type = 2
			left outer join tbl_prices t on spps.fk_currency = t.fk_currency
				and spps.fk_price_product = t.fk_price_product
				and spps.fk_store = t.fk_store
		where t.fk_price_product is null;

		delete from spy_price_product_default
		where fk_price_product_store in
		(
			select spps.id_price_product_store
			from spy_price_product_store spps
				inner join spy_price_product spp on spps.fk_price_product = spp.id_price_product
					and spp.fk_price_type = 2
				left outer join tbl_prices t on spps.fk_currency = t.fk_currency
					and spps.fk_price_product = t.fk_price_product
					and spps.fk_store = t.fk_store
			where t.fk_price_product is null
		);

		delete spps
		from spy_price_product_store spps
			inner join spy_price_product spp on spps.fk_price_product = spp.id_price_product
				and spp.fk_price_type = 2
			left outer join tbl_prices t on spps.fk_currency = t.fk_currency
				and spps.fk_price_product = t.fk_price_product
				and spps.fk_store = t.fk_store
		where t.fk_price_product is null;

		## set promotion name to null for prices without origiinal price ##
		INSERT INTO tbl_modified
        select spp.fk_product_abstract
        from spy_price_product spp
            inner join spy_price_product_store spps on spp.id_price_product = spps.fk_price_product
        group by spp.fk_product_abstract, spps.fk_store
        having count(*) = 1 and max(spps.promotion) is not null;

        update spy_price_product_store spps2
        inner join
        (
            select spp.fk_product_abstract, spps.fk_store, max(spps.id_price_product_store) as id_price_product_store
            from spy_price_product spp
            inner join spy_price_product_store spps on spp.id_price_product = spps.fk_price_product
            group by spp.fk_product_abstract, spps.fk_store
            having count(*) = 1 and max(spps.promotion) is not null
        ) s on spps2.id_price_product_store = s.id_price_product_store
        set spps2.promotion = null;

	### insert new default prices ####
		INSERT INTO tbl_modified
		select t.id_product_abstract
		from spy_price_product_store spps
			inner join tbl_prices t on spps.fk_currency = t.fk_currency
				and spps.fk_price_product = t.fk_price_product
				and spps.fk_store = t.fk_store
			left outer join spy_price_product_default sppd on spps.id_price_product_store = sppd.fk_price_product_store
		where sppd.id_price_product_default is null;

		insert into spy_price_product_default
			(fk_price_product_store)
		select spps.id_price_product_store
		from spy_price_product_store spps
			inner join tbl_prices t on spps.fk_currency = t.fk_currency
				and spps.fk_price_product = t.fk_price_product
				and spps.fk_store = t.fk_store
			left outer join spy_price_product_default sppd on spps.id_price_product_store = sppd.fk_price_product_store
		where sppd.id_price_product_default is null;

	### set price scedule current ####
		update spy_price_product_schedule
			set is_current = 0
		where is_current = 1;

		update tbl_prices t
			inner join spy_price_product_schedule spps on t.id_price_product_schedule = spps.id_price_product_schedule
		set spps.is_current = 1;

	### insert events to event table ####
		delete t
		from tbl_modified t
			inner join spy_product sp on t.id_product_abstract = sp.fk_product_abstract
		where sp.is_active = 0;

	    INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
	    select DISTINCT id_product_abstract, 'Price.price_abstract.publish', now()
	    from tbl_modified;

		INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
	    select DISTINCT id_product_abstract, 'Product.product_abstract.publish', now()
	    from tbl_modified;

        INSERT INTO pyz_data_import_event (entity_id, event_name, created_at)
	   	select DISTINCT spc.fk_category, 'Entity.spy_category.publish', now()
	   	from spy_product_category spc
	   		inner join tbl_modified t on spc.fk_product_abstract = t.id_product_abstract;

        select CONCAT('Modified products: ', COUNT(DISTINCT id_product_abstract)) as result from tbl_modified;

		DROP TEMPORARY TABLE IF EXISTS tbl_prices;
		DROP TEMPORARY TABLE IF EXISTS tbl_modified;

END;
