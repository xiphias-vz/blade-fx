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
    SET @startTime = CAST(CONCAT(RIGHT(CONCAT('00', startTimeInt),2), ':00') AS TIME);
    SET @endTime = CAST(CONCAT(RIGHT(CONCAT('00', endTimeInt), 2), ':00') AS TIME);

    SET @minutesTotal = HOUR(TIMEDIFF(@endTime, @startTime) * 60) + MINUTE(TIMEDIFF(@endTime, @startTime)) - intervalMinutes;
    SET @sundayDate = CAST(CONCAT(cast('2022-04-17' as date), ' ', @startTime) AS datetime);
    SET @cut_off_time_reference = cast('00:00' as time);


    DROP TEMPORARY TABLE IF EXISTS tmp_tbl_intervals;
    CREATE TEMPORARY TABLE tmp_tbl_intervals(minute_start int not null);

    INSERT INTO tmp_tbl_intervals(minute_start)
    WITH recursive numbers AS
                       (
                           SELECT 0 as num
                           UNION ALL
                           SELECT num + intervalMinutes
                           FROM numbers
                           WHERE num < @minutesTotal
                       )
    SELECT num FROM numbers;

    DROP TEMPORARY TABLE IF EXISTS tmp_tbl_days;
        CREATE TEMPORARY TABLE tmp_tbl_days(day_num int not null);

    INSERT INTO tmp_tbl_days(day_num)
    WITH recursive numbers AS
                       (
                           SELECT 0 as num
                           UNION ALL
                           SELECT num + 1
                           FROM numbers
                           WHERE num < 6
                       )
    SELECT num FROM numbers;


    INSERT INTO pyz_time_slot_history (created_at, merchant_reference, fk_user, day_changed, time_slot_changed, capacity_set_from, capacity_set_to , action_performed, is_trigger)
    SELECT now(), pts.merchant_reference, @fk_user, pts.`day`, pts.time_slot, pts.capacity, 0, 'DELETE - REDEFINE TIMESLOT DEFINITION', 0
    FROM pyz_time_slot pts
             INNER JOIN
         (
             SELECT DAYNAME(date_add(@sundayDate, INTERVAL ttd.day_num DAY)) as day_in_week
             FROM tmp_tbl_days ttd
         ) s on s.day_in_week = pts.`day`
             AND pts.merchant_reference = merchant_reference
             AND pts.`date` is null;

    DELETE pts
        FROM pyz_time_slot pts
            INNER JOIN
            (
            SELECT DAYNAME(date_add(@sundayDate, INTERVAL ttd.day_num DAY)) as day_in_week
            FROM tmp_tbl_days ttd
            ) s on s.day_in_week = pts.`day`
                AND pts.merchant_reference = merchant_reference
                AND pts.`date` is null;

    INSERT INTO pyz_time_slot_history (created_at, merchant_reference, fk_user, date_changed, time_slot_changed, capacity_set_from, capacity_set_to, action_performed, is_trigger)
    SELECT now(), pts.merchant_reference, fkUser, pts.`date`, pts.time_slot, pts.capacity, 0, 'DELETE - REDEFINE TIMESLOT DEFINITION', 0
    FROM pyz_time_slot pts
    WHERE pts.merchant_reference = merchant_reference
      AND pts.`date` > CAST(NOW() AS date);

    DELETE FROM pyz_time_slot
    WHERE merchant_reference = merchant_reference
      AND `date` > CAST(NOW() AS date);

    INSERT INTO pyz_time_slot(merchant_reference, `day`, `date`, time_slot, cut_off_time, capacity)
    SELECT merchant_reference, DAYNAME(a.time_slot_start) as week_day, null
         , CONCAT(LEFT(CAST(a.time_slot_start AS time),5), '-', LEFT(CAST(a.time_slot_end AS time),5)) as time_slot
         ,CEILING(((HOUR(TIMEDIFF(CAST(a.time_slot_start AS TIME), @cut_off_time_reference)) * 60) + MINUTE(TIMEDIFF(CAST(a.time_slot_start AS TIME), @cut_off_time_reference))) / 60) AS cut_off_time
         , defaultCapacity as new_capacity
    FROM
        (
            SELECT date_add(date_add(@sundayDate, INTERVAL ttd.day_num DAY), INTERVAL tts.minute_start MINUTE) as time_slot_start
                 , date_add(date_add(@sundayDate, INTERVAL ttd.day_num DAY), INTERVAL tts.minute_start + intervalMinutes MINUTE) as time_slot_end
                 , ttd.day_num, tts.minute_start
            FROM tmp_tbl_intervals tts
                     CROSS JOIN tmp_tbl_days ttd
        ) a
    ORDER BY day_num, minute_start;

END;
