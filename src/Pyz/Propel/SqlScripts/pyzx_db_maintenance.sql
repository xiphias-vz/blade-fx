delimiter //
CREATE OR REPLACE PROCEDURE pyzx_db_maintenance()
BEGIN
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
