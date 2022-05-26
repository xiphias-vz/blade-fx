delimiter //
create or replace procedure pyzx_set_timeslot_definition_per_store(
    IN startTimeInt VARCHAR(50),
    IN endTimeInt VARCHAR(50),
    IN intervalMinutes TINYINT,
    IN defaultCapacity INT,
    IN merchant_reference VARCHAR(50),
    IN fkUser int
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


