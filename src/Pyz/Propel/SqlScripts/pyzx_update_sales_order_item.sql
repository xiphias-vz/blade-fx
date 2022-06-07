delimiter //
create or replace procedure pyzx_update_sales_order_item()
BEGIN
update spy_sales_order_item ssoi
	INNER JOIN spy_product sp on ssoi.sku = sp.sku
	INNER JOIN spy_sales_order sso on ssoi.fk_sales_order = sso.id_sales_order
    INNER JOIN spy_store ss on ssoi.store = ss.name
	INNER JOIN spy_stock_store sss on ss.id_store = sss.fk_store
	INNER JOIN spy_stock_product ssp on sss.fk_stock = ssp.fk_stock and sp.id_product = ssp.fk_product
	INNER JOIN spy_merchant_sales_order smso on smso.fk_sales_order = sso.id_sales_order
	SET
		ssoi.shelf = ssp.shelf,
        ssoi.shelf_field = ssp.shelf_field,
        ssoi.shelf_floor = ssp.shelf_floor,
        ssoi.`sequence` = ssp.`sequence`
    where smso.requested_delivery_date > DATE_ADD(now(), INTERVAL 12 HOUR)
      AND ssoi.fk_oms_order_item_state in
        (
            select id_oms_order_item_state
            from spy_oms_order_item_state
            where spy_oms_order_item_state.name in ('new', 'confirmed', 'ready for picking')
        )
      AND
        (
            ssoi.shelf <> ssp.shelf
            OR ssoi.shelf_field <> ssp.shelf_field
        );
END;
