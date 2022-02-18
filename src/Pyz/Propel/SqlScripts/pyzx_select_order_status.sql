delimiter //
create or replace procedure pyzx_select_order_status()
BEGIN
    SELECT distinct sso.customer_reference, sso.email, sso.id_sales_order, ssoi.id_sales_order_item, ssoi.fk_oms_order_item_state
              , sso2.id_sales_order
    FROM spy_sales_order sso
         INNER JOIN spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
         INNER JOIN spy_oms_order_item_state soois on soois.id_oms_order_item_state = ssoi.fk_oms_order_item_state
         INNER JOIN spy_sales_order sso2 on sso2.id_sales_order between sso.id_sales_order -1 and sso.id_sales_order +1
            AND sso2.id_sales_order <> sso.id_sales_order
            AND sso2.customer_reference = sso.customer_reference
            AND sso.created_at > DATE_ADD(now(), INTERVAL -1 day)
            AND ABS(TIMESTAMPDIFF(SECOND, sso.created_at, sso2.created_at)) < 60
         INNER JOIN spy_sales_order_item ssoi2 on ssoi2.fk_sales_order = sso2.id_sales_order
         INNER JOIN spy_oms_order_item_state soois2 on soois2.id_oms_order_item_state = ssoi2.fk_oms_order_item_state
    WHERE soois.name = ('new')
        AND sso.id_sales_order < sso2.id_sales_order;
END;
