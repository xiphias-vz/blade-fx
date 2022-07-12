delimiter //
create or replace procedure pyzx_ff_export_products()
BEGIN
    DROP TEMPORARY TABLE IF EXISTS tbl_ffAttribute;

    CREATE TEMPORARY TABLE tbl_ffAttribute AS
    select spa.id_product_abstract,
           GROUP_CONCAT(DISTINCT case when json_extract(spa.attributes, CONCAT('$[0].' , k.key)) = "1" THEN
               IFNULL(sgt.value, k.key) ELSE null END SEPARATOR '#') as ffMultiAttributeText
    from spy_product_abstract spa
        inner join spy_product sp ON spa.id_product_abstract = sp.fk_product_abstract AND sp.is_active = 1
        cross join (
            select spak.`key`
            from spy_product_attribute_key spak
            where spak.ff_export = 1
        ) k
        left outer join spy_glossary_key sgk on sgk.`key` = CONCAT('product.attribute.', k.key)
        left outer join spy_locale sl on sl.locale_name = 'de_DE'
        left outer join spy_glossary_translation sgt on sgk.id_glossary_key = sgt.fk_glossary_key
            and sgt.fk_locale = sl.id_locale
    GROUP BY spa.id_product_abstract;

    DELETE FROM tbl_ffAttribute WHERE ffMultiAttributeText IS NULL;

    CREATE INDEX ix_ffAttribute ON tbl_ffAttribute (id_product_abstract);

    SELECT sp.sku as ArticleNumber
         , sp.product_number as MasterArticleNumber
         , spala.name as Title
         , spala.description
         , json_extract(sp.`attributes`, '$.supplier') as Brand
         , sp.created_at as ReleaseDate
         , null as Availability
         , null as BrandURL
         , CONCAT(
                REPLACE(REPLACE(GROUP_CONCAT(CONCAT_WS( '/', sca5.name, sca4.name, sca3.name, sca2.name, sca.name, '|')), '/|,', '|'), '/|', ''),
                CASE WHEN NOT price.fk_product_abstract IS NULL THEN '|Angebote' ELSE '' END) as CategoryPath
         , su.url as ProductURL
         , REPLACE(img.external_url_large, '.com/', '.com/thumb_') as ImageURL
         , img.rbr
         , CASE WHEN tatt.id_product_abstract IS NULL THEN NULL ELSE
                CONCAT('|Eigenschaften=', tatt.ffMultiAttributeText, '|')
            END as MultiAttributeText
         , null as Attribute
         , ifnull(spc.product_order, 0) * -1 as SalesRanking
         , null as ArticleType
         , null as BadgeText
         , json_extract(sp.`attributes`, '$.pfandbetrag') as Deposit
         , sp.sap_number as SapNumber
         , null as PackUnit
         , sp.fk_product_abstract as id_product_abstract
         , CASE WHEN CAST(JSON_VALUE(spa.`attributes`, '$.grundpreisinhalt[0]') as decimal(9,3)) > 0
        AND NOT JSON_VALUE(spa.`attributes`, '$.verpackungseinheit[0]') IS NULL THEN
                    CASE WHEN CAST(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,3)) > 0 THEN
                             CONCAT(' - ', REPLACE(TRIM(CAST(JSON_VALUE(spa.`attributes`, '$.einzelgewicht[0]') as decimal(9,3))) + 0, '.', ','), ' ', JSON_VALUE(spa.`attributes`, '$.grundpreismasseinheit[0]'))
                         ELSE
                             CONCAT(' - ', REPLACE(TRIM(CAST(JSON_VALUE(spa.`attributes`, '$.grundpreisinhalt[0]') as decimal(9,3))) + 0, '.', ','), ' ', JSON_VALUE(spa.`attributes`, '$.grundpreismasseinheit[0]'))
                        END
                ELSE ''
        END as popNameExtension
         , json_extract(sp.`attributes`, '$.quality') as Quality
         , '' as ValidUntil
         , null as Incomplete
         , null as SapWgr
         , 0 as LowestPrice
    FROM spy_product sp
        INNER JOIN spy_product_abstract spa on sp.fk_product_abstract = spa.id_product_abstract
        INNER JOIN spy_product_abstract_localized_attributes spala on sp.fk_product_abstract = spala.fk_product_abstract
        INNER JOIN spy_url su on su.fk_resource_product_abstract = sp.fk_product_abstract
            AND spala.fk_locale = su.fk_locale
        LEFT OUTER JOIN
        (
            SELECT spis.fk_locale, spis.fk_product_abstract, spi.external_url_large as external_url_large
                  , ROW_NUMBER() OVER(partition by spis.fk_product_abstract order by spistpi.sort_order) as rbr
            FROM spy_product_image_set spis
                INNER JOIN spy_product_image_set_to_product_image spistpi on spistpi.fk_product_image_set = spis.id_product_image_set
                INNER JOIN spy_product_image spi on spi.id_product_image = spistpi.fk_product_image
        ) img ON sp.fk_product_abstract = img.fk_product_abstract AND spala.fk_locale = img.fk_locale AND img.rbr = 1
        LEFT OUTER JOIN
        (
            SELECT spp.fk_product_abstract
            FROM spy_price_product spp
                INNER JOIN spy_price_product_store spps ON spp.id_price_product = spps.fk_price_product AND spp.fk_price_type = 1
                INNER JOIN spy_price_product spp2 ON spp.fk_product_abstract = spp2.fk_product_abstract AND spp2.fk_price_type  = 2
                INNER JOIN spy_price_product_store spps2 ON spp2.id_price_product = spps2.fk_price_product
             WHERE spps.gross_price < spps2.gross_price
             GROUP BY spp.fk_product_abstract
        ) 	price ON sp.fk_product_abstract = price.fk_product_abstract
        INNER JOIN spy_product_category spc on sp.fk_product_abstract = spc.fk_product_abstract
        INNER JOIN spy_category sc on spc.fk_category = sc.id_category AND sc.is_active = 1 AND sc.is_in_menu = 1
        LEFT OUTER JOIN spy_category_attribute sca on sc.id_category = sca.fk_category
        LEFT OUTER JOIN spy_category_node scn on sc.id_category = scn.fk_category
        LEFT OUTER JOIN spy_category_node scn2 on scn.fk_parent_category_node = scn2.id_category_node
        LEFT OUTER JOIN spy_category_node scn3 on scn2.fk_parent_category_node = scn3.id_category_node
        LEFT OUTER JOIN spy_category_node scn4 on scn3.fk_parent_category_node = scn4.id_category_node
        LEFT OUTER JOIN spy_category_node scn5 on scn4.fk_parent_category_node = scn5.id_category_node
        LEFT OUTER JOIN spy_category sc2 on scn2.fk_category = sc2.id_category AND sc2.is_active = 1 AND sc2.is_in_menu = 1
        LEFT OUTER JOIN spy_category sc3 on scn3.fk_category = sc3.id_category  AND sc3.is_active = 1 AND sc3.is_in_menu = 1
        LEFT OUTER JOIN spy_category sc4 on scn4.fk_category = sc4.id_category  AND sc4.is_active = 1 AND sc4.is_in_menu = 1
        LEFT OUTER JOIN spy_category sc5 on scn5.fk_category = sc5.id_category  AND sc5.is_active = 1 AND sc5.is_in_menu = 1
        LEFT OUTER JOIN spy_category_attribute sca2 on sc2.id_category = sca2.fk_category
        LEFT OUTER JOIN spy_category_attribute sca3 on sc3.id_category = sca3.fk_category
        LEFT OUTER JOIN spy_category_attribute sca4 on sc4.id_category = sca4.fk_category
        LEFT OUTER JOIN spy_category_attribute sca5 on sc5.id_category = sca5.fk_category
        LEFT OUTER JOIN tbl_ffAttribute tatt on sp.fk_product_abstract = tatt.id_product_abstract
    WHERE sp.is_active = 1
    GROUP BY sp.sku, sp.product_number;
END;

