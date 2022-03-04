delimiter //
create or replace procedure pyzx_event_purge_new()
BEGIN
    TRUNCATE TABLE pyz_import_csv_new;
END;
