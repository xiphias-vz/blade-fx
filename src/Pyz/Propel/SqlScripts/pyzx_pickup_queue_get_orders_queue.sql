delimiter //
create or replace procedure pyzx_pickup_queue_get_orders_queue(IN store_reference INT)
BEGIN
    SET @merchant_filial_number = store_reference;
    SELECT sso.order_reference, popq.created_at, TIMESTAMPDIFF(SECOND, popq.created_at, now()) as seconds_in_queue
         , popq.data_structured
    FROM spy_sales_order sso
             INNER JOIN pyz_order_pickup_queue popq ON popq.fk_sales_order = sso.id_sales_order
    WHERE popq.picked_up_at is null
      AND sso.merchant_filial_number = @merchant_filial_number;
END;
