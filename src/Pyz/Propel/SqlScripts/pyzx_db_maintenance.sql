delimiter //
CREATE OR REPLACE PROCEDURE pyzx_db_maintenance()
BEGIN
    /* delete spy_price_product_schedule old data */
    START TRANSACTION;

        insert into pyz_price_product_schedule_archive
            (id_price_product_schedule, fk_currency
            , fk_store, fk_price_type
            , fk_product, fk_product_abstract
            , fk_price_product_schedule_list, net_price
            , gross_price, price_data
            , active_from, active_to
            , is_current, created_at
            , updated_at, deleted_at)
        select id_price_product_schedule, fk_currency
            , fk_store, fk_price_type
            , fk_product, fk_product_abstract
            , fk_price_product_schedule_list, net_price
            , gross_price, price_data
            , active_from, active_to
            , is_current, created_at
            , updated_at, now() as deleted_at
        from spy_price_product_schedule spps
        where spps.active_to < DATE_ADD(NOW(), INTERVAL -6 MONTH);

        delete
        from spy_price_product_schedule
        where active_to < DATE_ADD(NOW(), INTERVAL -6 MONTH);

    COMMIT;

    delete
    from pyz_import_csv_new
    where created_at < DATE_ADD(ifnull((select max(created_at) from pyz_import_csv_new), now()), INTERVAL -1 MONTH);

    OPTIMIZE TABLE spy_price_product_schedule;
    OPTIMIZE TABLE spy_sales_order;
    OPTIMIZE TABLE pyz_imp_price_product;
    OPTIMIZE TABLE pyz_imp_stock;
    OPTIMIZE TABLE pyz_order_picking_block;
    OPTIMIZE TABLE pyz_picking_sales_order;
    OPTIMIZE TABLE pyz_product_abstract_store;
    OPTIMIZE TABLE spy_availability;
    OPTIMIZE TABLE spy_availability_abstract;
    OPTIMIZE TABLE spy_price_product;
    OPTIMIZE TABLE spy_price_product_default;
    OPTIMIZE TABLE spy_price_product_store;
    OPTIMIZE TABLE spy_stock_product;

END
