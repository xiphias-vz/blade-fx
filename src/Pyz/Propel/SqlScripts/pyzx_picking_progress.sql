delimiter //
create or replace procedure pyzx_picking_progress(IN delivery_date varchar(50), IN merchant_ref varchar(10))
BEGIN

	CREATE TEMPORARY TABLE orders_items
    SELECT right(sss.requested_delivery_date, 11) as timeSlot
        , ppz.name as pickZone
        , sso.id_sales_order, ssoi.id_sales_order_item, ssoi.sku, ssoi.price_per_kg
        , soois.name as status, ssoi.quantity, ssoi.new_weight
        , cast('' as varchar(50)) as statusCalc
        , cast('' as varchar(50)) as statusOrder
        , ROW_NUMBER() over (partition by sso.id_sales_order, ssoi.sku order by ssoi.id_sales_order_item) as rbr
    FROM spy_sales_order sso
    inner join spy_sales_order_item ssoi on sso.id_sales_order = ssoi.fk_sales_order
    inner join spy_oms_order_item_state soois on soois.id_oms_order_item_state = ssoi.fk_oms_order_item_state
    inner join spy_sales_shipment sss on sso.id_sales_order = sss.fk_sales_order
    inner join pyz_picking_zone ppz on ssoi.pick_zone = ppz.name
        and ssoi.pick_zone = ppz.name
    WHERE sss.requested_delivery_date like concat(delivery_date, '%')
        and sso.merchant_reference = merchant_ref;

    delete from orders_items where not status in('cancelled', 'picked', 'ready for picking', 'ready for collection', 'order invoiced');
    delete from orders_items where not price_per_kg is NULL and status = 'cancelled' and rbr > 1;

    update orders_items item
    INNER JOIN
    (
        SELECT i.timeSlot, i.pickZone, i.id_sales_order
        , case when no_readyForPicking > 0 and (no_cancelled + no_picked + no_readyForCollection) = 0  then 1 else 0 end as noItemReadyForPicking
        , case when no_readyForPicking > 0 and (no_cancelled + no_picked + no_readyForCollection) > 0  then 1 else 0 end as noItemPicking
        , case when no_picked > 0 and (no_readyForPicking + no_readyForCollection + i.no_orderInvoiced) = 0  then 1 else 0 end as noItemPicked
        , case when no_readyForCollection > 0 and (no_readyForPicking + no_picked + i.no_orderInvoiced) = 0  then 1 else 0 end as noItemReadyForCollection
        , case when i2.no_orderInvoiced > 0 or (i.no_orderInvoiced > 0 and (no_picked + no_readyForCollection) = 0)  then 1 else 0 end as noItemInvoiced
        FROM
        (
            SELECT timeSlot, pickZone, id_sales_order
                , COUNT(DISTINCT CASE WHEN status = 'cancelled' THEN id_sales_order_item end) as no_cancelled
                , COUNT(DISTINCT CASE WHEN status = 'picked' THEN id_sales_order_item end) as no_picked
                , COUNT(DISTINCT CASE WHEN status = 'ready for picking' THEN id_sales_order_item end) as no_readyForPicking
                , COUNT(DISTINCT CASE WHEN status = 'ready for collection' THEN id_sales_order_item end) as no_readyForCollection
                , COUNT(DISTINCT CASE WHEN status = 'order invoiced' THEN id_sales_order_item end) as no_orderInvoiced
                , COUNT(DISTINCT id_sales_order_item) as no_items
            FROM orders_items
            GROUP BY timeSlot, pickZone, id_sales_order
        ) i
        INNER JOIN
        (
            SELECT id_sales_order
                , MAX(CASE WHEN status = 'order invoiced' THEN 1 else 0 end) as no_orderInvoiced
            FROM orders_items
            GROUP BY id_sales_order
        ) i2 on i.id_sales_order = i2.id_sales_order
    ) u on item.timeSlot = u.timeSlot and item.pickZone = u.pickZone and item.id_sales_order = u.id_sales_order
    SET statusCalc = case
        when u.noItemReadyForPicking > 0 then '1 ready for picking'
        when u.noItemPicking > 0 then '2 in picking'
        when u.noItemPicked > 0 then '3 picked'
        when u.noItemReadyForCollection > 0 then '4 ready for collection'
        when u.noItemInvoiced > 0 then '5 order invoiced'
    end;

    update orders_items item
    INNER JOIN
    (
        SELECT id_sales_order
        , min(statusCalc) as statusCalc
        from orders_items
        group by id_sales_order
    ) u on item.id_sales_order = u.id_sales_order
    SET statusOrder = SUBSTRING(u.statusCalc, 3);


    SELECT timeSlot, pickZone, SUBSTRING(statusCalc, 3) as status,
       COUNT(DISTINCT id_sales_order) as ordersCount,
       COUNT(DISTINCT id_sales_order + sku) as orderItemsCount,
       COUNT(DISTINCT id_sales_order_item) as orderItemsQuantity
    FROM orders_items
    where statusCalc = '1 ready for picking'
    group by timeSlot, pickZone, statusCalc
    union ALL
    SELECT timeSlot, pickZone, SUBSTRING(statusCalc, 3) as status,
       COUNT(DISTINCT id_sales_order) as ordersCount,
       COUNT(DISTINCT id_sales_order + sku) as orderItemsCount,
       COUNT(DISTINCT id_sales_order_item) as orderItemsQuantity
    FROM orders_items
    where statusCalc = '2 in picking'
    group by timeSlot, pickZone, statusCalc
    union ALL
    SELECT timeSlot, pickZone, SUBSTRING(statusCalc, 3) as status,
       COUNT(DISTINCT id_sales_order) as ordersCount,
       COUNT(DISTINCT id_sales_order + sku) as orderItemsCount,
       COUNT(DISTINCT id_sales_order_item) as orderItemsQuantity
    FROM orders_items
    where statusCalc = '3 picked'
    group by timeSlot, pickZone, statusCalc
    union ALL
    SELECT timeSlot, pickZone, SUBSTRING(statusCalc, 3) as status,
       COUNT(DISTINCT id_sales_order) as ordersCount,
       COUNT(DISTINCT id_sales_order + sku) as orderItemsCount,
       COUNT(DISTINCT id_sales_order_item) as orderItemsQuantity
    FROM orders_items
    where statusCalc = '4 ready for collection'
    group by timeSlot, pickZone, statusCalc
    union ALL
    SELECT timeSlot, pickZone, SUBSTRING(statusCalc, 3) as status,
       COUNT(DISTINCT id_sales_order) as ordersCount,
       COUNT(DISTINCT id_sales_order + sku) as orderItemsCount,
       COUNT(DISTINCT id_sales_order_item) as orderItemsQuantity
    FROM orders_items
    where statusCalc = '5 order invoiced'
    group by timeSlot, pickZone, statusCalc
    UNION ALL
    SELECT timeSlot, 'Total' as pickZone, statusOrder as status,
       COUNT(DISTINCT id_sales_order) as ordersCount,
       COUNT(DISTINCT id_sales_order + sku) as orderItemsCount,
       COUNT(DISTINCT id_sales_order_item) as orderItemsQuantity
    FROM orders_items
    where statusOrder = 'ready for picking'
    group by timeSlot, statusOrder
    union ALL
    SELECT timeSlot, 'Total' as pickZone, statusOrder as status,
       COUNT(DISTINCT id_sales_order) as ordersCount,
       COUNT(DISTINCT id_sales_order + sku) as orderItemsCount,
       COUNT(DISTINCT id_sales_order_item) as orderItemsQuantity
    FROM orders_items
    where statusOrder = 'in picking'
    group by timeSlot, statusOrder
    union ALL
    SELECT timeSlot, 'Total' as pickZone, statusOrder as status,
       COUNT(DISTINCT id_sales_order) as ordersCount,
       COUNT(DISTINCT id_sales_order + sku) as orderItemsCount,
       COUNT(DISTINCT id_sales_order_item) as orderItemsQuantity
    FROM orders_items
    where statusOrder = 'picked'
    group by timeSlot, statusOrder
    union ALL
    SELECT timeSlot, 'Total' as pickZone, statusOrder as status,
       COUNT(DISTINCT id_sales_order) as ordersCount,
       COUNT(DISTINCT id_sales_order + sku) as orderItemsCount,
       COUNT(DISTINCT id_sales_order_item) as orderItemsQuantity
    FROM orders_items
    where statusOrder = 'ready for collection'
    group by timeSlot, statusOrder
    union ALL
    SELECT timeSlot, 'Total' as pickZone, statusOrder as status,
       COUNT(DISTINCT id_sales_order) as ordersCount,
       COUNT(DISTINCT id_sales_order + sku) as orderItemsCount,
       COUNT(DISTINCT id_sales_order_item) as orderItemsQuantity
    FROM orders_items
    where statusOrder = 'order invoiced'
    group by timeSlot, statusOrder;
    DROP TEMPORARY TABLE orders_items;

END
