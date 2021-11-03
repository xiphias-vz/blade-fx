delimiter //
create or replace procedure pyzx_update_product_label()
BEGIN

	CREATE TEMPORARY TABLE tmp_data_import_event (
        entity_id int,
        event_name varchar(100),
        created_at datetime,
        id_product_label int);

    insert into spy_product_label
    (front_end_reference, is_active, is_dynamic, is_exclusive, is_published, name, `position`, created_at)
    select 'highlight' as front_end_reference,
           1 as is_active,
           1 as is_dynamic,
           0 as is_exclusive,
           0 as is_published,
           CONCAT('SALE-', ss.name) as name,
           3 as `position`,
           now() as created_at
    from spy_store ss
             left outer join spy_product_label spl on CONCAT('SALE-', ss.name) = spl.name
    where spl.id_product_label is null;

    insert into spy_product_label_store
    (fk_product_label, fk_store)
    select
        spl.id_product_label,
        ss.id_store
    from spy_store ss
             inner join spy_product_label spl on CONCAT('SALE-', ss.name) = spl.name
    where spl.created_at > DATE_SUB(now(), INTERVAL 1 MINUTE);

    insert into spy_product_label_localized_attributes
    (fk_locale, fk_product_label, name)
    select
        (select fk_locale from spy_product_label_localized_attributes limit 1) as fk_locale,
            spl.id_product_label,
            'SALE %'
    from spy_product_label spl
    where spl.created_at > DATE_SUB(now(), INTERVAL 1 MINUTE);


    INSERT INTO tmp_data_import_event (entity_id, event_name, created_at)
    select
        spl.id_product_label,
        'ProductLabel.product_label_dictionary.publish',
        now()
    from spy_store ss
             inner join spy_product_label spl on CONCAT('SALE-', ss.name) = spl.name
    where spl.created_at > DATE_SUB(now(), INTERVAL 1 MINUTE);

    INSERT INTO tmp_data_import_event
    (entity_id, event_name, created_at, id_product_label)
    select DISTINCT sp.fk_product_abstract, 'ProductLabel.product_abstract_label.publish', now(), spl.id_product_label
    from spy_store ss
             inner join spy_product_label_store spls on ss.id_store = spls.fk_store
             inner join spy_product_label spl on spls.fk_product_label = spl.id_product_label
             inner join spy_price_product_store sppsDef on ss.id_store = sppsDef.fk_store
             inner join spy_price_product sppDef on sppsDef.fk_price_product = sppDef.id_price_product and sppDef.fk_price_type = 1
             inner join spy_price_product_default sppdDef on sppsDef.id_price_product_store = sppdDef.fk_price_product_store
             inner join spy_product sp on sppDef.fk_product_abstract = sp.fk_product_abstract
             inner join spy_price_product_store sppsOrg on ss.id_store = sppsOrg.fk_store
             inner join spy_price_product sppOrg on sppsOrg.fk_price_product = sppOrg.id_price_product and sppOrg.fk_price_type = 2 and sp.fk_product_abstract = sppOrg.fk_product_abstract
             inner join spy_price_product_default sppdOrg on sppsOrg.id_price_product_store = sppdOrg.fk_price_product_store
             left outer join spy_product_label_product_abstract splpa on spls.fk_product_label = splpa.fk_product_label and sp.fk_product_abstract =splpa.fk_product_abstract
    where sp.is_active = 1
      and sppsDef.gross_price > 0
      and sppsDef.gross_price < sppsOrg.gross_price
      and splpa.id_product_label_product_abstract is null;
    /*
        insert into spy_product_label_product_abstract
        (fk_product_abstract, fk_product_label)
        select DISTINCT sp.fk_product_abstract, spl.id_product_label
        from spy_store ss
                 inner join spy_product_label_store spls on ss.id_store = spls.fk_store
                 inner join spy_product_label spl on spls.fk_product_label = spl.id_product_label
                 inner join spy_price_product_store sppsDef on ss.id_store = sppsDef.fk_store
                 inner join spy_price_product sppDef on sppsDef.fk_price_product = sppDef.id_price_product and sppDef.fk_price_type = 1
                 inner join spy_price_product_default sppdDef on sppsDef.id_price_product_store = sppdDef.fk_price_product_store
                 inner join spy_product sp on sppDef.fk_product_abstract = sp.fk_product_abstract
                 inner join spy_price_product_store sppsOrg on ss.id_store = sppsOrg.fk_store
                 inner join spy_price_product sppOrg on sppsOrg.fk_price_product = sppOrg.id_price_product and sppOrg.fk_price_type = 2 and sp.fk_product_abstract = sppOrg.fk_product_abstract
                 inner join spy_price_product_default sppdOrg on sppsOrg.id_price_product_store = sppdOrg.fk_price_product_store
                 left outer join spy_product_label_product_abstract splpa on spls.fk_product_label = splpa.fk_product_label and sp.fk_product_abstract =splpa.fk_product_abstract
        where sp.is_active = 1
          and sppsDef.gross_price < sppsOrg.gross_price
          and splpa.id_product_label_product_abstract is null;
    */
    INSERT INTO tmp_data_import_event
    (entity_id, event_name, created_at, id_product_label)
    select splpa.fk_product_abstract, 'ProductLabel.product_abstract_label.unpublish', now(), splpa.fk_product_label
    from spy_product_label_product_abstract splpa
             left outer join
         (
             select DISTINCT sp.fk_product_abstract, spl.id_product_label
             from spy_store ss
                      inner join spy_product_label_store spls on ss.id_store = spls.fk_store
                      inner join spy_product_label spl on spls.fk_product_label = spl.id_product_label
                      inner join spy_price_product_store sppsDef on ss.id_store = sppsDef.fk_store
                      inner join spy_price_product sppDef on sppsDef.fk_price_product = sppDef.id_price_product and sppDef.fk_price_type = 1
                      inner join spy_price_product_default sppdDef on sppsDef.id_price_product_store = sppdDef.fk_price_product_store
                      inner join spy_product sp on sppDef.fk_product_abstract = sp.fk_product_abstract
                      inner join spy_price_product_store sppsOrg on ss.id_store = sppsOrg.fk_store
                      inner join spy_price_product sppOrg on sppsOrg.fk_price_product = sppOrg.id_price_product and sppOrg.fk_price_type = 2 and sp.fk_product_abstract = sppOrg.fk_product_abstract
                      inner join spy_price_product_default sppdOrg on sppsOrg.id_price_product_store = sppdOrg.fk_price_product_store
             where sp.is_active = 1
               and sppsDef.gross_price > 0
               and sppsDef.gross_price < sppsOrg.gross_price
         ) ss1 on ss1.id_product_label = splpa.fk_product_label and ss1.fk_product_abstract = splpa.fk_product_abstract
    where ss1.fk_product_abstract is null;
    /*
        delete splpa
        from spy_product_label_product_abstract splpa
        left outer join
        (
            select DISTINCT sp.fk_product_abstract, spl.id_product_label
            from spy_store ss
                inner join spy_product_label_store spls on ss.id_store = spls.fk_store
                inner join spy_product_label spl on spls.fk_product_label = spl.id_product_label
                inner join spy_price_product_store sppsDef on ss.id_store = sppsDef.fk_store
                inner join spy_price_product sppDef on sppsDef.fk_price_product = sppDef.id_price_product and sppDef.fk_price_type = 1
                inner join spy_price_product_default sppdDef on sppsDef.id_price_product_store = sppdDef.fk_price_product_store
                inner join spy_product sp on sppDef.fk_product_abstract = sp.fk_product_abstract
                inner join spy_price_product_store sppsOrg on ss.id_store = sppsOrg.fk_store
                inner join spy_price_product sppOrg on sppsOrg.fk_price_product = sppOrg.id_price_product and sppOrg.fk_price_type = 2 and sp.fk_product_abstract = sppOrg.fk_product_abstract
                inner join spy_price_product_default sppdOrg on sppsOrg.id_price_product_store = sppdOrg.fk_price_product_store
            where sp.is_active = 1
                and sppsDef.gross_price < sppsOrg.gross_price
        ) ss1 on ss1.id_product_label = splpa.fk_product_label and ss1.fk_product_abstract = splpa.fk_product_abstract
        where ss1.fk_product_abstract is null;

        INSERT INTO tmp_data_import_event
            (entity_id, event_name, created_at)
        select DISTINCT entity_id, 'Product.product_abstract.publish', now()
        from tmp_data_import_event
        where event_name = 'ProductLabel.product_abstract_label.publish'
      */
    select *
    from tmp_data_import_event
    order by id_product_label;

    drop table tmp_data_import_event;

END;

