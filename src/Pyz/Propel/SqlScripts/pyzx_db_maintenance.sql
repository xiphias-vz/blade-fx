delimiter //
CREATE OR REPLACE PROCEDURE pyzx_db_maintenance()
BEGIN
    OPTIMIZE TABLE spy_price_product_schedule;
    OPTIMIZE TABLE spy_sales_order;
END
