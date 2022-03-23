delimiter //
create or replace procedure pyzx_picking_collection_signal_set(IN merchant_ref VARCHAR(20))
    BEGIN
        IF (EXISTS(select * from pyz_picking_collection_signal where merchant_reference = merchant_ref)) THEN
            UPDATE pyz_picking_collection_signal
            SET has_new_item = 1
            WHERE merchant_reference = merchant_ref;
        ELSE
            INSERT INTO pyz_picking_collection_signal
                (merchant_reference, has_new_item)
            VALUES
                (merchant_ref, 1);
        END IF;
END;
