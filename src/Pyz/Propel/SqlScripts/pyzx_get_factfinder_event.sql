delimiter //
create or replace procedure pyzx_get_factfinder_event(IN eventName varchar(100))
BEGIN
    DELETE pffe
    FROM pyz_fact_finder_event pffe
	    INNER JOIN spy_product sp ON pffe.fk_product_abstract = sp.fk_product_abstract
    WHERE sp.is_active = 0;

	IF eventName LIKE 'records.%' THEN
        SELECT JSON_SET(CONCAT('{"CategoryPath":[["', CONCAT_WS( '","', cat.c5, cat.c4, cat.c3, cat.c2, cat.c1), '"]]}')
           , '$.MasterArticleNumber', sp.product_number
           , '$.ArticleNumber', sp.sku
           , '$.SapNumber', sp.sap_number
           , '$.Title', spala.name
           , '$.Description', spala.description
           , '$.ImageUrl', img.external_url_large
           , '$.Brand', json_extract(sp.`attributes`, '$.supplier')
           , '$.ReleaseDate', sp.created_at
           , '$.SalesRanking', cast(ifnull(cat.product_order, 0) * -1 as varchar(10))
           , '$.ProductUrl', su.url) as publishData
            , sp.fk_product_abstract
        FROM spy_product sp
         INNER JOIN spy_product_abstract_localized_attributes spala on sp.fk_product_abstract = spala.fk_product_abstract
         INNER JOIN spy_url su on su.fk_resource_product_abstract = sp.fk_product_abstract
            AND spala.fk_locale = su.fk_locale
         INNER JOIN pyz_fact_finder_event pffe ON sp.fk_product_abstract = pffe.fk_product_abstract
         LEFT OUTER JOIN
        (
         select spis.fk_product_abstract, spis.fk_locale, spi.external_url_large
         FROM spy_product_image_set spis
                  LEFT OUTER JOIN spy_product_image_set_to_product_image spistpi on spistpi.fk_product_image_set = spis.id_product_image_set
                  LEFT OUTER JOIN spy_product_image spi on spi.id_product_image = spistpi.fk_product_image
         GROUP BY spis.fk_product_abstract, spis.fk_locale
        ) img on sp.fk_product_abstract = img.fk_product_abstract
            AND spala.fk_locale = img.fk_locale
         LEFT OUTER JOIN
        (
         SELECT spc.fk_product_abstract, spc.product_order, sca5.name as c5, sca4.name as c4, sca3.name as c3, sca2.name as c2, sca.name as c1
         FROM spy_product_category spc
                  LEFT OUTER JOIN spy_category sc on spc.fk_category = sc.id_category AND sc.is_active = 1 AND sc.is_in_menu = 1
                  LEFT OUTER JOIN spy_category_attribute sca on sc.id_category = sca.fk_category
                  LEFT OUTER JOIN spy_category_node scn on sc.id_category = scn.fk_category
                  LEFT OUTER JOIN spy_category sc2 on scn.fk_parent_category_node = sc2.id_category AND sc2.is_active = 1 AND sc2.is_in_menu = 1
                  LEFT OUTER JOIN spy_category_attribute sca2 on sc2.id_category = sca2.fk_category
                  LEFT OUTER JOIN spy_category_node scn2 on sc2.id_category = scn2.fk_category
                  LEFT OUTER JOIN spy_category sc3 on scn2.fk_parent_category_node = sc3.id_category AND sc3.is_active = 1 AND sc3.is_in_menu = 1
                  LEFT OUTER JOIN spy_category_attribute sca3 on sc3.id_category = sca3.fk_category
                  LEFT OUTER JOIN spy_category_node scn3 on sc3.id_category = scn3.fk_category
                  LEFT OUTER JOIN spy_category sc4 on scn3.fk_parent_category_node = sc4.id_category AND sc4.is_active = 1 AND sc4.is_in_menu = 1
                  LEFT OUTER JOIN spy_category_attribute sca4 on sc4.id_category = sca4.fk_category
                  LEFT OUTER JOIN spy_category_node scn4 on sc4.id_category = scn4.fk_category
                  LEFT OUTER JOIN spy_category sc5 on scn4.fk_parent_category_node = sc5.id_category AND sc5.is_active = 1 AND sc5.is_in_menu = 1
                  LEFT OUTER JOIN spy_category_attribute sca5 on sc5.id_category = sca5.fk_category
                  LEFT OUTER JOIN spy_category_node scn5 on sc5.id_category = scn5.fk_category
         GROUP BY spc.fk_product_abstract
        ) cat ON sp.fk_product_abstract = cat.fk_product_abstract
        WHERE pffe.event_name = eventName;

        ELSEIF eventName like 'geodata.%' THEN
            SELECT JSON_SET('{}'
               , '$.ArticleNumber', sp.sku
               , '$.StoreId', cast(sm.filial_number as varchar(10))
               , '$.Price', ROUND(MAX(sppsDef.gross_price) / 100, 2)
               , '$.PseudoPrice', ROUND(MAX(sppsOrig.gross_price) / 100, 2)
               , '$.Stock', ROUND(MAX(sa.quantity))
               , '$.BasePrice', MAX(CASE
                                    WHEN sppsDef.price_per_kg > 0 THEN
                                        REPLACE(CONCAT(ROUND(sppsDef.price_per_kg / 100, 2),
                                                       ' ', sc.symbol ,'/', JSON_VALUE(spa.`attributes`, '$.grundpreismasseinheit[0]')), '.', ',')
                                    WHEN JSON_VALUE(spa.`attributes`, '$.grundpreisinhalt[0]') > 0 AND JSON_VALUE(spa.`attributes`, '$.grundeinheit[0]') > 0 THEN
                                        REPLACE(CONCAT((ROUND(sppsDef.gross_price / 100 / JSON_VALUE(spa.`attributes`, '$.grundpreisinhalt[0]') * JSON_VALUE(spa.`attributes`, '$.grundeinheit[0]'), 2)),
                                                       ' ', sc.symbol ,'/', JSON_VALUE(spa.`attributes`, '$.grundeinheit[0]'), ' ', JSON_VALUE(spa.`attributes`, '$.grundpreismasseinheit[0]')), '.', ',')
                                    ELSE
                                        REPLACE(CONCAT(ROUND(sppsDef.gross_price / 100, 2), ' ', sc.symbol), '.', ',')
                END)) as publishData
                , sp.fk_product_abstract
            FROM spy_product sp
                INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
                INNER JOIN pyz_fact_finder_event pffe ON sp.fk_product_abstract = pffe.fk_product_abstract
                INNER JOIN spy_price_product spp on spp.fk_product_abstract = sp.fk_product_abstract
                INNER JOIN spy_price_product_store sppsDef on sppsDef.fk_price_product = spp.id_price_product
                    AND spp.fk_price_type = 1
                LEFT JOIN spy_currency sc on sppsDef.fk_currency = sc.id_currency
                 LEFT JOIN spy_price_product_default sppd on sppd.fk_price_product_store = sppsDef.id_price_product_store
                 LEFT JOIN spy_availability sa on sa.sku = sp.sku
                    AND sa.fk_store = sppsDef.fk_store
                LEFT JOIN spy_price_product sppOrig on sppOrig.fk_product_abstract = sp.fk_product_abstract
                LEFT JOIN spy_price_product_store sppsOrig on sppsOrig.fk_price_product = sppOrig.id_price_product
                    AND sppOrig.fk_price_type = 2
                 LEFT JOIN spy_price_product_default sppdOrig on sppdOrig.fk_price_product_store = sppsOrig.id_price_product_store
                 INNER JOIN spy_merchant sm on sm.fk_store = sppsDef.fk_store
            WHERE pffe.event_name = eventName
            GROUP BY sp.sku, sp.id_product, sm.filial_number;
        END IF;

END;
