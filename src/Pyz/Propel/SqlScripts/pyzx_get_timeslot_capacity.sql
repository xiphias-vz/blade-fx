delimiter //
create or replace procedure pyzx_get_timeslot_capacity()
BEGIN
    DROP TEMPORARY TABLE IF EXISTS tmp_tbl_numbers;
    CREATE TEMPORARY TABLE tmp_tbl_numbers(week_day_name char(100), date_wt date);

    INSERT INTO tmp_tbl_numbers(week_day_name, date_wt)
    WITH recursive numbers AS
                   (
                       SELECT 0 as num
                       UNION ALL
                       SELECT num + 1
                       FROM numbers
                       WHERE num < 7
                   )
    SELECT DAYNAME(DATE_ADD(NOW(), INTERVAL num DAY)) as week_day_name,
       CAST(DATE_ADD(NOW(), INTERVAL num DAY) AS DATE) as date_wt
    FROM numbers;

    SELECT sm.merchant_short_name, ttn.date_wt, pts.time_slot, pts.capacity
        , concat(sm.filial_number, '_click_and_collect_', ttn.date_wt, '_', pts.time_slot, ':', LOWER(sm.merchant_short_name)) as key_name
        , IFNULL(orde.ordersCount, 0) as ordersCount
    FROM pyz_time_slot pts
        INNER JOIN tmp_tbl_numbers ttn on (ttn.week_day_name = pts.`day` and pts.`date` is null)
            OR (pts.`date` = ttn.date_wt AND pts.`day` is null)
        INNER JOIN spy_merchant sm on sm.filial_number = pts.merchant_reference
        LEFT OUTER JOIN
        (
            select smso.fk_merchant, smso.requested_delivery_date, sss.requested_delivery_date as timeSlot, count(*) as ordersCount
            from spy_merchant_sales_order smso
            inner join spy_sales_shipment sss on smso.fk_sales_order = sss.fk_sales_order
            where smso.requested_delivery_date > now()
                and not smso.store_status like '%cancelled%'
            group by smso.fk_merchant, smso.requested_delivery_date, sss.requested_delivery_date
        ) orde on sm.id_merchant = orde.fk_merchant
            AND ttn.date_wt = cast(orde.requested_delivery_date as date)
            AND concat(ttn.date_wt, '_', pts.time_slot) = orde.timeSlot
    ;
END;

