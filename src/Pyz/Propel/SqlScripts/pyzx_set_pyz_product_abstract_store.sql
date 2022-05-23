delimiter //
CREATE OR REPLACE PROCEDURE pyzx_set_pyz_product_abstract_store(
    IN fk_product_abstract INT,
    IN fk_store_relations VARCHAR(500)
)
BEGIN
    set fk_store_relations = case when ifnull(fk_store_relations, '') = '' then '0' else fk_store_relations end;

	set @sqlInsert = CONCAT('insert ignore into pyz_product_abstract_store (fk_product_abstract, fk_store) select '
						, fk_product_abstract
						, ', id_store from spy_store where id_store in('
						, fk_store_relations
						, ')');

	set @sqlDelete = CONCAT('delete from pyz_product_abstract_store where fk_product_abstract = '
						, fk_product_abstract
						, ' and not fk_store in ('
						, fk_store_relations, ')');

    PREPARE stmt FROM @sqlInsert;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

    PREPARE stmt FROM @sqlDelete;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

    update spy_product sp
        inner join spy_stock_product ssp on sp.id_product = ssp.fk_product
        inner join spy_stock_store sss on ssp.fk_stock = sss.fk_stock
        left outer join pyz_product_abstract_store ppas on sss.fk_store = ppas.fk_store and sp.fk_product_abstract = ppas.fk_product_abstract
        set ssp.is_never_out_of_stock = 0,
            ssp.quantity = 0
    where sp.fk_product_abstract = fk_product_abstract
        and ppas.id_product_abstract_store is null;

    update spy_product sp
        inner join spy_stock_product ssp on sp.id_product = ssp.fk_product
        inner join spy_stock_store sss on ssp.fk_stock = sss.fk_stock
        inner join spy_store ss on sss.fk_store = ss.id_store
        inner join pyz_product_abstract_store ppas on sss.fk_store = ppas.fk_store and sp.fk_product_abstract = ppas.fk_product_abstract
        inner join pyz_imp_stock pis on ss.name = pis.store
        and sp.sap_number = pis.sapnumber
        and (sp.sku = pis.gtin or pis.gtin is null)
        set ssp.is_never_out_of_stock = case when pis.filename like '%NOS%' then 1 else 0 end,
            ssp.quantity = pis.instock
        where sp.fk_product_abstract = fk_product_abstract;

    call pyzx_availability_update(fk_product_abstract);

END
