delimiter //
CREATE OR REPLACE TRIGGER trg_set_history_insert AFTER INSERT ON pyz_time_slot FOR EACH ROW
    INSERT INTO pyz_time_slot_history (created_at, merchant_reference, fk_user, time_slot_changed, day_changed, date_changed, capacity_set_to, action_performed, is_trigger)
    VALUES (SYSDATE(), NEW.merchant_reference, null, NEW.time_slot, NEW.day, NEW.date, NEW.capacity, 'INSERT', 1);
delimiter //
CREATE OR REPLACE TRIGGER trg_set_history_update AFTER UPDATE ON pyz_time_slot FOR EACH ROW
    INSERT INTO pyz_time_slot_history (created_at, merchant_reference, fk_user, time_slot_changed, day_changed, date_changed, capacity_set_from, capacity_set_to, action_performed, is_trigger)
    VALUES (SYSDATE(), NEW.merchant_reference, null, NEW.time_slot, NEW.day, NEW.date, OLD.capacity, NEW.capacity, 'UPDATE', 1);
delimiter //
CREATE OR REPLACE TRIGGER trg_set_history_delete AFTER DELETE ON pyz_time_slot FOR EACH ROW
    INSERT INTO pyz_time_slot_history (created_at, merchant_reference, fk_user, time_slot_changed, day_changed, date_changed, capacity_set_from, action_performed, is_trigger)
    VALUES (SYSDATE(), OLD.merchant_reference, null, OLD.time_slot, OLD.day, OLD.date, OLD.capacity, 'DELETE', 1);
