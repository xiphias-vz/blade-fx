delimiter //
create or replace procedure pyzx_monitoring_category()
BEGIN
    TRUNCATE TABLE pyz_monitor_categories;

    SELECT @id_parent_category_node := scn.id_category_node
    FROM spy_category sc
        INNER JOIN spy_category_node scn on sc.id_category = scn.fk_category
    WHERE scn.fk_parent_category_node IS NULL
        AND sc.is_active = 1 AND scn.is_root = 1;

    DROP TEMPORARY TABLE IF EXISTS tmp_category;
    CREATE TEMPORARY TABLE tmp_category(id_category int not null, id_category_child int null, deep int);

    INSERT INTO tmp_category (id_category, deep)
    SELECT sc.id_category, 0
    FROM spy_category_node scn
        INNER JOIN spy_category sc on scn.fk_category = sc.id_category
    WHERE scn.fk_parent_category_node = @id_parent_category_node
        AND sc.is_active = 1;

    INSERT INTO tmp_category (id_category, id_category_child, deep)
    SELECT tc.id_category, scn.fk_category, 1
    FROM tmp_category tc
        INNER JOIN spy_category_node scn on tc.id_category = scn.fk_parent_category_node
        INNER JOIN spy_category sc on scn.fk_category = sc.id_category AND sc.is_active = 1
    WHERE tc.deep = 0;

    INSERT INTO tmp_category (id_category, id_category_child, deep)
    SELECT tc.id_category, scn.fk_category, 2
    FROM tmp_category tc
        INNER JOIN spy_category_node scn on tc.id_category_child = scn.fk_parent_category_node
        INNER JOIN spy_category sc on scn.fk_category = sc.id_category AND sc.is_active = 1
    WHERE tc.deep = 1;

    INSERT INTO tmp_category (id_category, id_category_child, deep)
    SELECT tc.id_category, scn.fk_category, 3
    FROM tmp_category tc
        INNER JOIN spy_category_node scn on tc.id_category_child = scn.fk_parent_category_node
        INNER JOIN spy_category sc on scn.fk_category = sc.id_category AND sc.is_active = 1
    WHERE tc.deep = 2;

    INSERT INTO tmp_category (id_category, id_category_child, deep)
    SELECT tc.id_category, scn.fk_category, 4
    FROM tmp_category tc
        INNER JOIN spy_category_node scn on tc.id_category_child = scn.fk_parent_category_node
        INNER JOIN spy_category sc on scn.fk_category = sc.id_category AND sc.is_active = 1
    WHERE tc.deep = 3;

    INSERT INTO tmp_category (id_category, id_category_child, deep)
    SELECT tc.id_category, scn.fk_category, 5
    FROM tmp_category tc
        INNER JOIN spy_category_node scn on tc.id_category_child = scn.fk_parent_category_node
        INNER JOIN spy_category sc on scn.fk_category = sc.id_category AND sc.is_active = 1
    WHERE tc.deep = 4;

    INSERT INTO tmp_category (id_category, id_category_child, deep)
    SELECT tc.id_category, scn.fk_category, 6
    FROM tmp_category tc
        INNER JOIN spy_category_node scn on tc.id_category_child = scn.fk_parent_category_node
        INNER JOIN spy_category sc on scn.fk_category = sc.id_category AND sc.is_active = 1
    WHERE tc.deep = 5;

    INSERT INTO tmp_category (id_category, id_category_child, deep)
    SELECT tc.id_category, scn.fk_category, 7
    FROM tmp_category tc
        INNER JOIN spy_category_node scn on tc.id_category_child = scn.fk_parent_category_node
        INNER JOIN spy_category sc on scn.fk_category = sc.id_category AND sc.is_active = 1
    WHERE tc.deep = 6;

    DROP TEMPORARY TABLE IF EXISTS tbl_availability;

    SELECT @id_store := ss.id_store
    FROM spy_store ss
    ORDER BY ss.id_store
    LIMIT 1;

    CREATE TEMPORARY TABLE tbl_availability AS
    SELECT DISTINCT sp.fk_product_abstract, spas.fk_store as store_related
                  , spps.gross_price
                  , stock.quantity, saa.quantity as abs_quantity, sa.quantity as av_quantity
                  , CAST(json_extract(sas.`data`, '$[0].quantity') as decimal(9,2)) as pub_quantity, sas.`key` as pub_av_key
                  , ss.name as store_name
                  , cast(null as varchar(100)) as abstract_search_key
                  , cast(null as varchar(100)) as abstract_price_key
                  , cast(null as varchar(100)) as abstract_key
                  , cast(null as varchar(100)) as abstract_category_key
    FROM spy_product sp
        INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
        LEFT OUTER JOIN spy_product_abstract_store spas on spa.id_product_abstract = spas.fk_product_abstract
            AND spas.fk_store = @id_store
        LEFT OUTER JOIN spy_price_product spp on sp.fk_product_abstract = spp.fk_product_abstract AND spp.fk_price_type = 1
        LEFT OUTER JOIN spy_price_product_store spps on spp.id_price_product = spps.fk_price_product
            AND spps.fk_store = @id_store
        LEFT OUTER JOIN spy_stock_store sss on spps.fk_store = sss.fk_store
        LEFT OUTER JOIN spy_store ss on sss.fk_store = ss.id_store
        LEFT OUTER JOIN spy_stock_product stock on sp.id_product = stock.fk_product AND sss.fk_stock = stock.fk_stock
        LEFT OUTER JOIN spy_availability_abstract saa on spps.fk_store = saa.fk_store AND spa.sku = saa.abstract_sku
        LEFT OUTER JOIN spy_availability sa on spps.fk_store = sa.fk_store
            AND saa.id_availability_abstract = sa.fk_availability_abstract
            AND sp.sku = sa.sku
        LEFT OUTER JOIN spy_availability_storage sas on sp.fk_product_abstract = sas.fk_product_abstract
            AND saa.id_availability_abstract = sas.fk_availability_abstract
    WHERE sp.is_active = 1
        AND stock.quantity > 0 AND spps.gross_price > 0;

    SELECT @id_store := ss.id_store
    from spy_store ss
    WHERE ss.id_store > @id_store
    ORDER BY ss.id_store
    LIMIT 1;

    WHILE IFNULL(@id_store, 0) < 10 DO

        INSERT INTO tbl_availability
        SELECT DISTINCT sp.fk_product_abstract, spas.fk_store as store_related
                  , spps.gross_price
                  , stock.quantity, saa.quantity as abs_quantity, sa.quantity as av_quantity
                  , CAST(json_extract(sas.`data`, '$[0].quantity') as decimal(9,2)) as pub_quantity, sas.`key` as pub_av_key
                  , ss.name as store_name
                  , cast(null as varchar(100)) as abstract_search_key
                  , cast(null as varchar(100)) as abstract_price_key
                  , cast(null as varchar(100)) as abstract_key
                  , cast(null as varchar(100)) as abstract_category_key
        FROM spy_product sp
             INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
             LEFT OUTER JOIN spy_product_abstract_store spas on spa.id_product_abstract = spas.fk_product_abstract
                AND spas.fk_store = @id_store
             LEFT OUTER JOIN spy_price_product spp on sp.fk_product_abstract = spp.fk_product_abstract AND spp.fk_price_type = 1
             LEFT OUTER JOIN spy_price_product_store spps on spp.id_price_product = spps.fk_price_product
                AND spps.fk_store = @id_store
             LEFT OUTER JOIN spy_stock_store sss on spps.fk_store = sss.fk_store
             LEFT OUTER JOIN spy_store ss on sss.fk_store = ss.id_store
             LEFT OUTER JOIN spy_stock_product stock on sp.id_product = stock.fk_product AND sss.fk_stock = stock.fk_stock
             LEFT OUTER JOIN spy_availability_abstract saa on spps.fk_store = saa.fk_store AND spa.sku = saa.abstract_sku
             LEFT OUTER JOIN spy_availability sa on spps.fk_store = sa.fk_store
                AND saa.id_availability_abstract = sa.fk_availability_abstract
                AND sp.sku = sa.sku
             LEFT OUTER JOIN spy_availability_storage sas on sp.fk_product_abstract = sas.fk_product_abstract
                AND saa.id_availability_abstract = sas.fk_availability_abstract
        WHERE sp.is_active = 1
            AND stock.quantity > 0 AND spps.gross_price > 0;

        SELECT @id_store2 := 100;

        SELECT @id_store2 := ss.id_store
        FROM spy_store ss
        WHERE ss.id_store > @id_store
        ORDER BY ss.id_store
        LIMIT 1;

        SET @id_store = @id_store2;

    END WHILE;

    CREATE INDEX ix_av ON tbl_availability (fk_product_abstract, store_name);

    UPDATE tbl_availability ta
        INNER JOIN spy_product_abstract_page_search spaps on ta.fk_product_abstract = spaps.fk_product_abstract AND ta.store_name = spaps.store
        SET ta.abstract_search_key = spaps.`key`;

    UPDATE tbl_availability ta
        INNER JOIN spy_price_product_abstract_storage sppas on ta.fk_product_abstract = sppas.fk_product_abstract AND ta.store_name = sppas.store
        SET ta.abstract_price_key = sppas.`key`;

    UPDATE tbl_availability ta
        INNER JOIN spy_product_abstract_storage spas2 on ta.fk_product_abstract = spas2.fk_product_abstract AND ta.store_name = spas2.store
        SET ta.abstract_key = spas2.`key`;

    UPDATE tbl_availability ta
        INNER JOIN spy_product_abstract_category_storage spacs on ta.fk_product_abstract = spacs.fk_product_abstract
        SET ta.abstract_category_key = spacs.`key`;

    /*products on store*/
    /*select store_name, count(DISTINCT fk_product_abstract)
    from tbl_availability
    where not store_related is null
        AND NOT abstract_search_key IS NULL
        AND NOT abstract_price_key IS NULL
        AND NOT abstract_key IS NULL
        AND NOT abstract_category_key is null
    GROUP BY store_name;
    */

    /*products per root category*/
    insert into pyz_monitor_categories (created_at, store_name, category_name, number_of_products_db, category_url, is_total, fk_category)
    SELECT NOW(), ta.store_name, sca.name, count(distinct ta.fk_product_abstract) as product_count, su.url, 0, tc.id_category
    FROM tmp_category tc
             INNER JOIN spy_category_attribute sca on tc.id_category = sca.fk_category
             INNER JOIN spy_category_node scn on tc.id_category = scn.fk_category
             INNER JOIN spy_url su on scn.id_category_node = su.fk_resource_categorynode
             INNER JOIN spy_product_category spc on tc.id_category_child = spc.fk_category
             INNER JOIN tbl_availability ta on spc.fk_product_abstract = ta.fk_product_abstract
    WHERE NOT ta.store_related is null
    GROUP BY ta.store_name, sca.name;

    /*total products per store*/
    insert into pyz_monitor_categories (created_at, store_name, category_name, number_of_products_db, category_url, is_total)
    SELECT NOW(), ta.store_name, 'TOTAL', count(distinct ta.fk_product_abstract) as product_count, 'TOTAL', 1
    FROM tmp_category tc
             INNER JOIN spy_category_attribute sca on tc.id_category = sca.fk_category
             INNER JOIN spy_product_category spc on tc.id_category_child = spc.fk_category
             INNER JOIN tbl_availability ta on spc.fk_product_abstract = ta.fk_product_abstract
    WHERE NOT ta.store_related is null
    GROUP BY ta.store_name;

    /*products with out category*/
    insert into pyz_monitor_categories (created_at, store_name, category_name, number_of_products_db, category_url, is_total)
    SELECT NOW(), ta.store_name, 'NO-CATEGORY', count(distinct ta.fk_product_abstract) as product_count, 'NO-CATEGORY', 0
    FROM tbl_availability ta
        LEFT OUTER JOIN spy_product_category spc on spc.fk_product_abstract = ta.fk_product_abstract
    WHERE spc.fk_category is null
    GROUP BY ta.store_name;

    DROP TEMPORARY TABLE IF EXISTS tmp_category;
    DROP TEMPORARY TABLE IF EXISTS tbl_availability;

END;
