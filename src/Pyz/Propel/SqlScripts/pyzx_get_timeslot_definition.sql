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

    SELECT DISTINCT time_slot
    FROM pyz_time_slot pts
    WHERE merchant_reference = @merchant_reference
      AND
        (
            (
                CASE WHEN `day` IS NOT NULL THEN `day` ELSE 1 END = CASE WHEN `day` IS NOT NULL THEN @work_day ELSE 1 END
                AND
                CASE WHEN `day` IS NULL THEN IFNULL(`date`, CAST('1990-01-01' as date)) ELSE `date` END = CAST('1990-01-01' as date)
            )
            OR
            (
                CASE WHEN `day` IS NULL THEN `date` ELSE IFNULL(`date`, CAST('1990-01-01' as date)) END = CASE WHEN `day` IS NULL THEN @exact_date ELSE IFNULL(`date`, CAST('1990-01-01' as date)) END
            )
        )
    ORDER BY time_slot;

END;


