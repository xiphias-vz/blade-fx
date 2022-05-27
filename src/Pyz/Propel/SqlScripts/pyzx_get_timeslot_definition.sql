delimiter //
create or replace procedure pyzx_get_timeslot_definition(
    IN merchantReference VARCHAR(50),
    IN exactDate VARCHAR(50),
    IN workDay VARCHAR(50)
)
BEGIN
    SET @merchant_reference = merchantReference;
    SET @work_day = workDay;
    SET @exact_date = exactDate;

    IF (IFNULL(@exact_date, '') = '') THEN
        SET @exact_date = '1990-01-01';
    END IF;

    IF (IFNULL(@work_day, '') = '') THEN
        SET @work_day = 'x9xw';
    END IF;

    SELECT pts.time_slot
    FROM pyz_time_slot pts
    WHERE pts.merchant_reference = @merchant_reference
        AND (pts.`day` = @work_day OR (@exact_date > '1990-01-01' AND pts.`day` = DAYNAME(@exact_date)))
    UNION
    SELECT DISTINCT pts.time_slot
    FROM pyz_time_slot pts
    WHERE pts.merchant_reference = @merchant_reference
        AND (pts.`date` = @exact_date)
    ORDER BY time_slot;

END;


