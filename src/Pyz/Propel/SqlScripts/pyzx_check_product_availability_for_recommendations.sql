delimiter //
CREATE OR REPLACE PROCEDURE pyzx_check_product_availability_for_recommendations(IN customer_reference INT)
BEGIN
    SET @customer_id = customer_reference;
    SELECT CONCAT('{', GROUP_CONCAT(CONCAT('"', c.filial_number, '":'), c.a_level), '}') as reco_available
    FROM
        (
            SELECT sm.filial_number, CONCAT('[',GROUP_CONCAT(CONCAT('"', i.sku, '"')), ']') as a_level
            FROM
                (
                    SELECT sp.fk_product_abstract, sp.sku, sp.id_product, sp.is_active
                    FROM spy_customer sc
                             CROSS JOIN
                         (
                             SELECT row_number() over(order by id_sales_order) as count_number
                             FROM spy_sales_order sso
                             WHERE sso.id_sales_order < 61
                         ) cn
                             INNER JOIN spy_product sp on sp.sku = REPLACE(json_extract(sc.reco, concat('$.ResultObjectId[', cn.count_number,']')),'"','')
                    WHERE sc.id_customer = @customer_id
                      AND cn.count_number < json_length(sc.reco, '$.ResultObjectId')
                      AND sp.is_active = 1
                ) i
                    INNER JOIN spy_price_product spp on spp.fk_product_abstract = i.fk_product_abstract
                    INNER JOIN spy_price_product_store spps on spps.fk_price_product = spp.id_price_product
                    INNER JOIN spy_price_product_default sppd on sppd.fk_price_product_store = spps.id_price_product_store
                    INNER JOIN spy_store ss on ss.id_store = spps.fk_store
                    INNER JOIN spy_merchant sm on sm.fk_store = ss.id_store
                    INNER JOIN spy_stock_store sss on sss.fk_store = ss.id_store
                    INNER JOIN spy_stock_product ssp on ssp.fk_product = i.id_product
                    AND ssp.fk_stock = sss.fk_stock
            WHERE (ssp.quantity > 0 or ssp.is_never_out_of_stock = 1)
            GROUP BY sm.filial_number
        ) c;
END;
