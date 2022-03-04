delimiter //
create or replace procedure pyzx_event_filtering()
BEGIN
    DELETE pdie
    FROM pyz_data_import_event pdie
	INNER JOIN spy_product sp on (sp.id_product = pdie.entity_id AND pdie.event_name in ('Product.product_concrete.publish'))
    OR (sp.fk_product_abstract = pdie.entity_id AND pdie.event_name in ('Product.product_abstract.publish', 'ProductCategory.category.publish' ))
	INNER JOIN pyz_import_csv_old pico on pico.sku = sp.sku
	INNER JOIN pyz_import_csv_new picn on pico.sku = picn.sku
    WHERE pico.csv_value_old = picn.csv_value_new;
END;
