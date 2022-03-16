DELIMITER //
CREATE OR REPLACE PROCEDURE pyzx_pickup_queue_add_queue(
    IN order_reference VARCHAR(50),
    IN store_reference VARCHAR(50),
    IN is_remote TINYINT
)
BEGIN
    SET @order_reference = LPAD(order_reference, 9, 0);
    SET @store_short_code = store_reference;
    SET @is_remote = is_remote;

    SET @error_code = 500;

    SELECT b.error_code
         ,	CASE WHEN b.error_code IN (21, 22) THEN b.requested_delivery_date_timeslot
                   ELSE CASE WHEN b.error_code = 40 THEN b.store
                             ELSE CASE WHEN b.error_code = 10 THEN b.cbc_status_dt
                                 END
                       END
        END as error_data
         , 1, b.no_rows
    INTO @error_code, @error_data, @flag, @no_rows
    FROM
        (
            SELECT CASE WHEN a.order_status LIKE '%Collected by customer%' OR a.order_status LIKE 'order invoiced' THEN 10
                        ELSE CASE WHEN a.order_status NOT LIKE '%Ready for collection%' AND now() > a.requested_delivery_date_to THEN 21
                                  ELSE CASE WHEN a.order_status NOT LIKE '%Ready for collection%' AND now() < a.requested_delivery_date_from THEN 22
                                            ELSE CASE WHEN a.merchant_filial_number <> @store_short_code THEN 40
                                                      ELSE 0
                                                END
                                      END
                            END
                END as error_code
                 , a.requested_delivery_date_timeslot
                 , a.store
                 , a.cbc_status_dt
                 , count(*) as no_rows
            FROM
                (
                    SELECT sso.id_sales_order, sso.order_reference, sso.store, sss.requested_delivery_date as requested_delivery_date_timeslot
                         , smso.requested_delivery_date as requested_delivery_date_from
                         , GROUP_CONCAT(DISTINCT soois.name) as order_status
                         , ADDTIME(CAST(CAST(smso.requested_delivery_date as date) as datetime), MID(sss.requested_delivery_date, LOCATE('-', sss.requested_delivery_date, LOCATE('_', sss.requested_delivery_date)) + 1, 999)) requested_delivery_date_to
                         , cbc.cbc_status_dt
                         , sso.merchant_filial_number
                    FROM spy_sales_order sso
                             INNER JOIN spy_sales_order_item ssoi ON ssoi.fk_sales_order = sso.id_sales_order
                             INNER JOIN spy_oms_order_item_state soois ON soois.id_oms_order_item_state = ssoi.fk_oms_order_item_state
                             INNER JOIN spy_merchant_sales_order smso on smso.fk_sales_order = sso.id_sales_order
                             INNER JOIN spy_sales_shipment sss on sss.fk_sales_order = sso.id_sales_order
                             LEFT JOIN
                         (
                             SELECT CAST(MAX(ssoi.updated_at) as VARCHAR(100)) as cbc_status_dt, sso.id_sales_order
                             FROM spy_sales_order sso
                                      INNER JOIN spy_sales_order_item ssoi ON ssoi.fk_sales_order = sso.id_sales_order
                                      INNER JOIN spy_oms_order_item_state soois ON soois.id_oms_order_item_state = ssoi.fk_oms_order_item_state
                             WHERE sso.order_reference = @order_reference
                               AND soois.name  = 'Collected by customer'
                         ) cbc ON cbc.id_sales_order = sso.id_sales_order
                    WHERE sso.order_reference = @order_reference
                    GROUP BY sso.id_sales_order, sso.order_reference, smso.requested_delivery_date
                ) a
        ) b;

    SET @error_code = (SELECT CASE WHEN @no_rows = 0 then 30 else @error_code END);

    INSERT INTO pyz_order_pickup_queue (fk_sales_order, created_at, is_remote, merchant_filial_number, data_structured)
    SELECT sso.id_sales_order, NOW(), @is_remote, @store_short_code
         , CONCAT('{"order_data":{"no_of_containers_total":'
        , COUNT(DISTINCT ssoi.container_code) -- number_of_containers_total
        , ',"no_of_containers_collected":'
        , COUNT(DISTINCT ppso.container_code) -- number_of_containers_on_shelf
        , ',"no_of_articles_total":'
        , COUNT(DISTINCT ssoi.id_sales_order_item) -- number_of_articles_total
        , ',"no_of_articles_collected":'
        , SUM(CASE WHEN ppso.id_picking_sales_order IS NULL THEN 0 ELSE 1 END) -- number_of_articles_on_shelf
        , '}}') AS data_structured
    FROM spy_sales_order sso
             INNER JOIN spy_sales_order_item ssoi on ssoi.fk_sales_order = sso.id_sales_order
             LEFT JOIN pyz_picking_sales_order ppso on ppso.fk_sales_order = sso.id_sales_order
        AND ppso.container_code = ssoi.container_code
    WHERE sso.order_reference = @order_reference
      AND @error_code = 0
    GROUP BY sso.id_sales_order
    ON DUPLICATE KEY UPDATE data_structured =
                                (
                                    SELECT CONCAT('{"order_data":{"no_of_containers_total":'
                                               , COUNT(DISTINCT ssoi.container_code) -- number_of_containers_total
                                               , ',"no_of_containers_collected":'
                                               , COUNT(DISTINCT ppso.container_code) -- number_of_containers_on_shelf
                                               , ',"no_of_articles_total":'
                                               , COUNT(DISTINCT ssoi.id_sales_order_item) -- number_of_articles_total
                                               , ',"no_of_articles_collected":'
                                               , SUM(CASE WHEN ppso.id_picking_sales_order IS NULL THEN 0 ELSE 1 END) -- number_of_articles_on_shelf
                                               , '}}') AS data_structured
                                    FROM spy_sales_order sso
                                             INNER JOIN spy_sales_order_item ssoi on ssoi.fk_sales_order = sso.id_sales_order
                                             LEFT JOIN pyz_picking_sales_order ppso on ppso.fk_sales_order = sso.id_sales_order
                                        AND ppso.container_code = ssoi.container_code
                                    WHERE sso.order_reference = @order_reference
                                    GROUP BY sso.id_sales_order
                                ),
                            updated_at = NOW();

    SELECT @error_code as error_code, @error_data as error_data;
END;
