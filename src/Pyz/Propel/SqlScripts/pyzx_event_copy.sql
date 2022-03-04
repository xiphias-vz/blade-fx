delimiter //
create or replace procedure pyzx_event_copy()
BEGIN
    INSERT INTO pyz_import_csv_old (csv_value_old, created_at, sku, sap_number)
    SELECT csv_value_new, created_at, sku, sap_number
    FROM pyz_import_csv_new;
END;
