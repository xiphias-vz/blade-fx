delimiter //
create or replace procedure pyzx_ff_export_categories()
BEGIN
SELECT Facet, FacetValue, URL
FROM
    (
        SELECT 'CategoryPath' AS Facet
             , CONCAT_WS( '/', sca5.name, sca4.name, sca3.name, sca2.name, sca.name) AS FacetValue
             , su.url  AS URL, scn.node_order
             , COALESCE(sc.position,sc2.position,sc3.position,sc4.position,sc5.position) as pos
        FROM spy_category sc
                 INNER JOIN spy_category_attribute sca on sc.id_category = sca.fk_category
                 LEFT OUTER JOIN spy_category_node scn on sc.id_category = scn.fk_category
                 INNER JOIN spy_url su on scn.id_category_node = su.fk_resource_categorynode
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
        WHERE sc.is_active = 1 AND sc.is_in_menu = 1
        UNION ALL
        SELECT 'CategoryPath' AS Facet, 'Angebote' AS FacetValue, '/de/outlet' AS URL, 999999 AS node_order, '999999999' AS pos
    ) cat
ORDER BY cat.pos;
END;

