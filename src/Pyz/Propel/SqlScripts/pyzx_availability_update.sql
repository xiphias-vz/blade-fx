delimiter //
CREATE OR REPLACE PROCEDURE pyzx_availability_update(
    IN in_fk_product_abstract INT
)
BEGIN

	delete spas
	from spy_product sp
        inner join spy_merchant sm on sp.sku like concat('%\_', sm.filial_number)
        inner join spy_store ss on sm.merchant_short_name  = ss.name
        inner join spy_product_abstract_store spas on sp.fk_product_abstract = spas.fk_product_abstract and ss.id_store = spas.fk_store
	where sp.is_active = 0;

	DROP TEMPORARY TABLE IF EXISTS tbl_availability;

	CREATE TEMPORARY TABLE tbl_availability
	AS
    SELECT s.id_store, s.name as store_name, ss.is_active as stock_is_active,
           ssp.fk_product, ssp.is_never_out_of_stock, ssp.quantity,
           sp.sku, sp.is_active as product_is_active,
           sopr.reservation_quantity,
           sa.id_availability, sa.is_never_out_of_stock as av_is_never_out_of_stock, sa.quantity as av_quantity,
           saa.id_availability_abstract, spa.sku as abstract_sku, saa.quantity as ab_quantity,
           sas.id_availability_storage,
           IF(ssp.is_never_out_of_stock = true or ssp.quantity = 999999.0, 999999.0, ssp.quantity - IFNULL(sopr.reservation_quantity, 0.0)) as real_quantity,
           case when saa.id_availability_abstract is null then 1 else 0 end as isNewAbstract,
           case when sa.id_availability is null then 1 else 0 end as isNew,
           0 as isModified
    FROM spy_store s
             LEFT JOIN spy_stock_store sss ON (s.id_store = sss.fk_store)
             LEFT JOIN spy_stock ss ON (sss.fk_stock = ss.id_stock)
             LEFT JOIN spy_stock_product ssp on (ss.id_stock = ssp.fk_stock)
             LEFT JOIN spy_product sp ON (ssp.fk_product=sp.id_product)
             LEFT JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
             LEFT JOIN spy_availability_abstract saa on sss.fk_store = saa.fk_store AND spa.sku = saa.abstract_sku
             LEFT JOIN spy_availability sa on saa.id_availability_abstract = sa.fk_availability_abstract AND sp.sku = sa.sku
             LEFT JOIN spy_availability_storage sas on sa.fk_availability_abstract = sas.fk_availability_abstract
             LEFT JOIN spy_oms_product_reservation sopr on s.id_store = sopr.fk_store AND sp.sku = sopr.sku
    WHERE not sp.sku is null
      and (in_fk_product_abstract is null or sp.fk_product_abstract = in_fk_product_abstract)
      and (sa.id_availability is null or saa.id_availability_abstract is null or sas.id_availability_storage is null);

    CREATE INDEX ix_tbl_availability3 ON tbl_availability (id_store, sku);

    INSERT INTO tbl_availability
    (id_store, store_name, stock_is_active, fk_product, is_never_out_of_stock, quantity,
     sku, product_is_active, reservation_quantity, id_availability, av_is_never_out_of_stock, av_quantity,
     id_availability_abstract, abstract_sku, ab_quantity, id_availability_storage, real_quantity,
     isNewAbstract, isNew, isModified)
    SELECT s.id_store, s.name as store_name, ss.is_active as stock_is_active,
           ssp.fk_product, ssp.is_never_out_of_stock, ssp.quantity,
           sp.sku, sp.is_active as product_is_active,
           sopr.reservation_quantity,
           sa.id_availability, sa.is_never_out_of_stock as av_is_never_out_of_stock, sa.quantity as av_quantity,
           saa.id_availability_abstract, spa.sku as abstract_sku, saa.quantity as ab_quantity,
           sas.id_availability_storage,
           IF(ssp.is_never_out_of_stock = true or ssp.quantity = 999999.0, 999999.0, ssp.quantity - IFNULL(sopr.reservation_quantity, 0.0)) as real_quantity,
           case when saa.id_availability_abstract is null then 1 else 0 end as isNewAbstract,
           case when sa.id_availability is null then 1 else 0 end as isNew,
           0 as isModified
    FROM spy_store s
        LEFT JOIN spy_stock_store sss ON (s.id_store = sss.fk_store)
        LEFT JOIN spy_stock ss ON (sss.fk_stock = ss.id_stock)
        LEFT JOIN spy_stock_product ssp on (ss.id_stock = ssp.fk_stock)
        LEFT JOIN spy_product sp ON (ssp.fk_product=sp.id_product)
        LEFT JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
        LEFT JOIN spy_availability_abstract saa on sss.fk_store = saa.fk_store AND spa.sku = saa.abstract_sku
        LEFT JOIN spy_availability sa on saa.id_availability_abstract = sa.fk_availability_abstract AND sp.sku = sa.sku
        LEFT JOIN spy_availability_storage sas on sa.fk_availability_abstract = sas.fk_availability_abstract
        LEFT JOIN spy_oms_product_reservation sopr on s.id_store = sopr.fk_store AND sp.sku = sopr.sku
        LEFT JOIN tbl_availability t on s.id_store = t.id_store AND t.sku = sp.sku
    WHERE (
            (ssp.is_never_out_of_stock <> sa.is_never_out_of_stock)
            or ((ssp.quantity - ifnull(sopr.reservation_quantity, 0.0)) <> ifnull(sa.quantity, 0.0))
            or ((ssp.quantity - ifnull(sopr.reservation_quantity, 0.0)) <> ifnull(saa.quantity, 0.0))
        )
        AND (in_fk_product_abstract is null or sp.fk_product_abstract = in_fk_product_abstract)
        AND t.id_store is null;

    CREATE INDEX ix_tbl_availability ON tbl_availability (id_availability_abstract);
    CREATE INDEX ix_tbl_availability2 ON tbl_availability (id_store, abstract_sku);

    insert into spy_availability_abstract
        (fk_store, abstract_sku, quantity)
    select id_store, abstract_sku, max(real_quantity)
    from tbl_availability
    where id_availability_abstract is null
    group by id_store, abstract_sku;

    update tbl_availability ta
        inner join spy_availability_abstract saa on ta.id_store = saa.fk_store AND ta.abstract_sku = saa.abstract_sku
        set ta.id_availability_abstract = saa.id_availability_abstract
    where ta.id_availability_abstract is null;

    update tbl_availability ta
        inner join spy_availability sa on ta.id_store = sa.fk_store AND ta.sku = sa.sku
            set ta.id_availability = sa.id_availability
    where ta.id_availability is null;

    insert into spy_availability
        (fk_availability_abstract, fk_store, is_never_out_of_stock, quantity, sku)
    select ta.id_availability_abstract, ta.id_store
         , case when ta.real_quantity = 999999.0 then 1 else 0 end as is_never_out_of_stock
         , max(ta.real_quantity) as quantity, ta.sku
    from tbl_availability ta
    where ta.id_availability is null
    group by ta.id_availability_abstract, ta.id_store, ta.sku;

    update tbl_availability ta
        inner join spy_availability sa on ta.id_store = sa.fk_store AND ta.sku = sa.sku
        set ta.id_availability = sa.id_availability
    where ta.id_availability is null;

    update tbl_availability ta
        inner join spy_availability sa on ta.id_availability = sa.id_availability
        set sa.quantity = ta.real_quantity,
            sa.is_never_out_of_stock = ta.is_never_out_of_stock,
            ta.isModified = 1
    where sa.quantity <> ta.real_quantity
        or sa.is_never_out_of_stock <> ta.is_never_out_of_stock;

    update
        tbl_availability ta1
        inner join (select fk_availability_abstract, max(quantity) as real_quantity from spy_availability group by fk_availability_abstract) ta on ta1.id_availability_abstract = ta.fk_availability_abstract
        inner join spy_availability_abstract saa on ta.fk_availability_abstract = saa.id_availability_abstract
        set saa.quantity = ta.real_quantity,
            ta1.isModified = 1
    where saa.quantity <> ta.real_quantity;

    insert into pyz_data_import_event (entity_id, event_name, class_name, event_data, created_at)
    select abstract_sku as entity_id, 'Entity.spy_availability_abstract.create' as event_name
         , 'EventEntityTransfer' as class_name
         , CONCAT('{"id":', id_availability_abstract ,',"event":"Entity.spy_availability_abstract.create","name":"spy_availability_abstract","foreign_keys":{"spy_availability_abstract.fk_store":', id_store ,'},"modified_columns":["spy_availability_abstract.abstract_sku","spy_availability_abstract.fk_store","spy_availability_abstract.quantity"]}') as event_data
         , NOW() as created_at
    from tbl_availability
    where isNewAbstract = 1;

    insert into pyz_data_import_event (entity_id, event_name, class_name, event_data, created_at)
    select sku as entity_id, 'Entity.spy_availability.update' as event_name
         , 'EventEntityTransfer' as class_name
         , CONCAT('{"id":', id_availability ,',"event":"Entity.spy_availability.update","name":"spy_availability","foreign_keys":{"spy_availability.fk_availability_abstract":"', id_availability_abstract ,'","spy_availability.fk_store":"', id_store ,'"},"modified_columns":["spy_availability.quantity","spy_availability.is_never_out_of_stock"]}') as event_data
         , NOW() as created_at
    from tbl_availability
    where isNew = 1 or isModified = 1;

    insert into pyz_data_import_event (entity_id, event_name, class_name, event_data, created_at)
    select sku as entity_id, 'availability_notification' as event_name
         , 'AvailabilityNotificationDataTransfer' as class_name
         , CONCAT('{"sku":"', sku, '","store":{"id_store":', id_store, ',"name":"', store_name, '"}}') as event_data
         , NOW() as created_at
    from tbl_availability
    where isNew = 1 or isModified = 1;

    DROP TEMPORARY TABLE IF EXISTS tbl_availability;

END;
