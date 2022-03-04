delimiter //
create or replace procedure pyzx_event_purge_old()
BEGIN
    TRUNCATE TABLE pyz_import_csv_old;
END;
