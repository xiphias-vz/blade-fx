delimiter //
create or replace procedure pyzx_monitoring_cashier()
BEGIN

SELECT sso.id_sales_order, max(sooish.created_at) as max_created_at, sso.merchant_filial_number, sso.order_reference
     , case when sm.is_cashier_txt = 1 then concat(sso.merchant_filial_number, '_', sso.id_sales_order, '_order.txt' )
            else concat('cc_', sso.merchant_filial_number, '_', replace(cast(cast(max(sooish.created_at) as date) as varchar(10)), '-',''), '_' , sso.order_reference, '_order.xml' )
    end as cashier_filename
     , sm.is_cashier_xml as xml_file
FROM spy_sales_order sso
         INNER JOIN spy_sales_order_item ssoi on ssoi.fk_sales_order = sso.id_sales_order
         INNER JOIN spy_merchant_sales_order smso on smso.fk_sales_order = sso.id_sales_order
         INNER JOIN spy_oms_order_item_state_history sooish on sooish.fk_sales_order_item = ssoi.id_sales_order_item
         INNER JOIN spy_oms_order_item_state soois on soois.id_oms_order_item_state = sooish.fk_oms_order_item_state
    AND soois.name = 'cashier order exported'
         INNER JOIN spy_merchant sm on sm.filial_number = sso.merchant_filial_number
WHERE is_cashier_export_success = 1
  AND smso.requested_delivery_date > date_add(now(), INTERVAL -1 DAY)
GROUP BY sso.id_sales_order, merchant_filial_number, sso.merchant_filial_number, sso.order_reference
ORDER BY max(sooish.created_at) DESC
    LIMIT 25;

END;
