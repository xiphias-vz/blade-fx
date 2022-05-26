delimiter //
create or replace procedure pyzx_set_timeslot_exact_date_capacity(
    IN in_merchantReference VARCHAR(50),
    IN in_exactDate VARCHAR(50),
    IN in_timeSlot VARCHAR(50),
    IN in_capacity INT,
    IN in_old_capacity INT,
    IN in_id_user INT,
    IN in_dtCreated VARCHAR(50)
)
BEGIN
    SET @merchant_reference = in_merchantReference;
    SET @time_slot = in_timeSlot;
    SET @exact_date = in_exactDate;
    SET @capacity = in_capacity;
    SET @old_capacity = in_old_capacity;
    SET @id_user = in_id_user;
    SET @uuid = uuid();

    INSERT INTO pyz_time_slot
    (merchant_reference, `day`, `date`, time_slot, cut_off_time, capacity, created_at)
    SELECT @merchant_reference as merchant_reference
         , @uuid as `day`
         , @exact_date as `date`
         , pts1.time_slot as time_slot
         , pts1.cut_off_time
         , pts1.capacity
         , in_dtCreated as created_at
    FROM
    (
        SELECT DISTINCT pts.time_slot
            , IFNULL(pts4.cut_off_time, pts.cut_off_time) as cut_off_time
            , IFNULL(pts4.capacity, pts.capacity) as capacity
            , pts4.id_time_slot
        FROM pyz_time_slot pts
            LEFT OUTER JOIN pyz_time_slot pts4 ON pts.merchant_reference = pts4.merchant_reference
                AND pts.time_slot = pts4.time_slot
                AND pts4.`date` = @exact_date
        WHERE pts.merchant_reference = @merchant_reference
          AND (pts.`day` = DAYNAME(@exact_date))
          AND pts.`date` is null
    ) pts1
    where pts1.id_time_slot is null;

    UPDATE pyz_time_slot
        SET capacity = @capacity
    WHERE merchant_reference = @merchant_reference
      AND (`date` = @exact_date)
      AND (time_slot = @time_slot);

    insert into pyz_time_slot_history
        (created_at, merchant_reference, fk_user, time_slot_changed, day_changed, date_changed, capacity_set_from, capacity_set_to, action_performed, is_trigger)
    select pts.created_at, pts.merchant_reference, @id_user, pts.time_slot, '' as `day`, pts.`date`
         , @old_capacity, pts.capacity, 'INSERT', 0
    from pyz_time_slot pts
    where pts.`day` = @uuid
      AND pts.time_slot = @time_slot;

    insert into pyz_time_slot_history
        (created_at, merchant_reference, fk_user, time_slot_changed, day_changed, date_changed, capacity_set_from, capacity_set_to, action_performed, is_trigger)
    select pts.created_at, pts.merchant_reference, @id_user, pts.time_slot, '' as `day`, pts.`date`
         , @old_capacity, pts.capacity, 'INSERT', 0
    from pyz_time_slot pts
    where pts.`day` = @uuid
      AND pts.time_slot <> @time_slot;

    insert into pyz_time_slot_history
        (created_at, merchant_reference, fk_user, time_slot_changed, day_changed, date_changed, capacity_set_from, capacity_set_to, action_performed, is_trigger)
    select in_dtCreated as created_at, pts.merchant_reference, @id_user, pts.time_slot, pts.`day`, pts.`date`
         , @old_capacity, pts.capacity, 'UPDATE', 0
    from pyz_time_slot pts
    where pts.`day` <> @uuid
      AND pts.merchant_reference = @merchant_reference
      AND (pts.`date` = @exact_date)
      AND (pts.time_slot = @time_slot);

    update pyz_time_slot
    set `day` = ''
    where `day` = @uuid;

    select pts.*
    from pyz_time_slot pts
    where pts.merchant_reference = @merchant_reference
      AND (pts.`date` = @exact_date);
END;


