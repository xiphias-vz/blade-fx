delimiter //
create or replace procedure pyzx_category_order_update()
BEGIN
    update spy_category_node
        INNER JOIN
        (
            select scn1.id_category_node, sc1.category_key
                , ROW_NUMBER() over (order by sc1.`position`,sc1.displaysequence,scn1.node_order) as rbr
            from spy_category scRoot
                INNER join spy_category_node scnRoot on scRoot.id_category = scnRoot.fk_category
                INNER JOIN spy_category_node scn1 on scRoot.id_category = scn1.fk_parent_category_node
                INNER JOIN spy_category sc1 on scn1.fk_category = sc1.id_category AND sc1.is_active = 1
            where scRoot.is_active = 1
                AND scnRoot.is_root = 1
        ) n ON spy_category_node.id_category_node = n.id_category_node
        SET spy_category_node.node_order = n.rbr;

    update spy_category_node
        INNER JOIN
        (
            select scn2.id_category_node, sc2.category_key
                , ROW_NUMBER() over (order by sc1.`position`, sc2.`position`,
                    sc1.displaysequence, sc2.displaysequence,
                    scn1.node_order,scn2.node_order) + 10000 as rbr
            from spy_category scRoot
                INNER join spy_category_node scnRoot on scRoot.id_category = scnRoot.fk_category
                INNER JOIN spy_category_node scn1 on scRoot.id_category = scn1.fk_parent_category_node
                INNER JOIN spy_category_node scn2 on scn1.fk_category = scn2.fk_parent_category_node
                INNER JOIN spy_category sc1 on scn1.fk_category = sc1.id_category AND sc1.is_active = 1
                INNER JOIN spy_category sc2 on scn2.fk_category = sc2.id_category AND sc2.is_active = 1
            where scRoot.is_active = 1
                AND scnRoot.is_root = 1
        ) n ON spy_category_node.id_category_node = n.id_category_node
        SET spy_category_node.node_order = n.rbr;

    update spy_category_node
        INNER JOIN
        (
            select scn3.id_category_node, sc3.category_key
                , ROW_NUMBER() over (order by
                    sc1.`position`, sc2.`position`, sc3.`position`,
                    sc1.displaysequence, sc2.displaysequence, sc3.displaysequence,
                    scn1.node_order, scn2.node_order, scn3.node_order) + 20000 as rbr
            from spy_category scRoot
                INNER join spy_category_node scnRoot on scRoot.id_category = scnRoot.fk_category
                INNER JOIN spy_category_node scn1 on scRoot.id_category = scn1.fk_parent_category_node
                INNER JOIN spy_category_node scn2 on scn1.fk_category = scn2.fk_parent_category_node
                INNER JOIN spy_category_node scn3 on scn2.fk_category = scn3.fk_parent_category_node
                INNER JOIN spy_category sc1 on scn1.fk_category = sc1.id_category AND sc1.is_active = 1
                INNER JOIN spy_category sc2 on scn2.fk_category = sc2.id_category AND sc2.is_active = 1
                INNER JOIN spy_category sc3 on scn3.fk_category = sc3.id_category AND sc3.is_active = 1
            where scRoot.is_active = 1
                AND scnRoot.is_root = 1
        ) n ON spy_category_node.id_category_node = n.id_category_node
        SET spy_category_node.node_order = n.rbr;

    update spy_category_node
        INNER JOIN
        (
            select scn4.id_category_node, sc4.category_key
                , ROW_NUMBER() over (order by
                    sc1.`position`, sc2.`position`, sc3.`position`, sc4.`position`,
                    sc1.displaysequence, sc2.displaysequence, sc3.displaysequence, sc4.displaysequence,
                    scn1.node_order, scn2.node_order, scn3.node_order, scn4.node_order) + 30000 as rbr
            from spy_category scRoot
                INNER join spy_category_node scnRoot on scRoot.id_category = scnRoot.fk_category
                INNER JOIN spy_category_node scn1 on scRoot.id_category = scn1.fk_parent_category_node
                INNER JOIN spy_category_node scn2 on scn1.fk_category = scn2.fk_parent_category_node
                INNER JOIN spy_category_node scn3 on scn2.fk_category = scn3.fk_parent_category_node
                INNER JOIN spy_category_node scn4 on scn3.fk_category = scn4.fk_parent_category_node
                INNER JOIN spy_category sc1 on scn1.fk_category = sc1.id_category AND sc1.is_active = 1
                INNER JOIN spy_category sc2 on scn2.fk_category = sc2.id_category AND sc2.is_active = 1
                INNER JOIN spy_category sc3 on scn3.fk_category = sc3.id_category AND sc3.is_active = 1
                INNER JOIN spy_category sc4 on scn4.fk_category = sc4.id_category AND sc4.is_active = 1
            where scRoot.is_active = 1
                AND scnRoot.is_root = 1
        ) n ON spy_category_node.id_category_node = n.id_category_node
        SET spy_category_node.node_order = n.rbr;

    update spy_category_node
        INNER JOIN
        (
            select scn5.id_category_node, sc5.category_key
                , ROW_NUMBER() over (order by
                    sc1.`position`, sc2.`position`, sc3.`position`, sc4.`position`, sc5.`position`,
                    sc1.displaysequence, sc2.displaysequence, sc3.displaysequence, sc4.displaysequence, sc5.displaysequence,
                    scn1.node_order, scn2.node_order, scn3.node_order, scn4.node_order, scn5.node_order) + 40000 as rbr
            from spy_category scRoot
                INNER join spy_category_node scnRoot on scRoot.id_category = scnRoot.fk_category
                INNER JOIN spy_category_node scn1 on scRoot.id_category = scn1.fk_parent_category_node
                INNER JOIN spy_category_node scn2 on scn1.fk_category = scn2.fk_parent_category_node
                INNER JOIN spy_category_node scn3 on scn2.fk_category = scn3.fk_parent_category_node
                INNER JOIN spy_category_node scn4 on scn3.fk_category = scn4.fk_parent_category_node
                INNER JOIN spy_category_node scn5 on scn4.fk_category = scn5.fk_parent_category_node
                INNER JOIN spy_category sc1 on scn1.fk_category = sc1.id_category AND sc1.is_active = 1
                INNER JOIN spy_category sc2 on scn2.fk_category = sc2.id_category AND sc2.is_active = 1
                INNER JOIN spy_category sc3 on scn3.fk_category = sc3.id_category AND sc3.is_active = 1
                INNER JOIN spy_category sc4 on scn4.fk_category = sc4.id_category AND sc4.is_active = 1
                INNER JOIN spy_category sc5 on scn5.fk_category = sc5.id_category AND sc5.is_active = 1
            where scRoot.is_active = 1
                AND scnRoot.is_root = 1
        ) n ON spy_category_node.id_category_node = n.id_category_node
        SET spy_category_node.node_order = n.rbr;

    update spy_category_node
        INNER JOIN
        (
            select scn6.id_category_node, sc6.category_key
                , ROW_NUMBER() over (order by
                    sc1.`position`, sc2.`position`, sc3.`position`, sc4.`position`, sc5.`position`, sc6.`position`,
                    sc1.displaysequence, sc2.displaysequence, sc3.displaysequence, sc4.displaysequence, sc5.displaysequence, sc6.displaysequence,
                    scn1.node_order, scn2.node_order, scn3.node_order, scn4.node_order, scn5.node_order, scn6.node_order) + 50000 as rbr
            from spy_category scRoot
                INNER join spy_category_node scnRoot on scRoot.id_category = scnRoot.fk_category
                INNER JOIN spy_category_node scn1 on scRoot.id_category = scn1.fk_parent_category_node
                INNER JOIN spy_category_node scn2 on scn1.fk_category = scn2.fk_parent_category_node
                INNER JOIN spy_category_node scn3 on scn2.fk_category = scn3.fk_parent_category_node
                INNER JOIN spy_category_node scn4 on scn3.fk_category = scn4.fk_parent_category_node
                INNER JOIN spy_category_node scn5 on scn4.fk_category = scn5.fk_parent_category_node
                INNER JOIN spy_category_node scn6 on scn5.fk_category = scn6.fk_parent_category_node
                INNER JOIN spy_category sc1 on scn1.fk_category = sc1.id_category AND sc1.is_active = 1
                INNER JOIN spy_category sc2 on scn2.fk_category = sc2.id_category AND sc2.is_active = 1
                INNER JOIN spy_category sc3 on scn3.fk_category = sc3.id_category AND sc3.is_active = 1
                INNER JOIN spy_category sc4 on scn4.fk_category = sc4.id_category AND sc4.is_active = 1
                INNER JOIN spy_category sc5 on scn5.fk_category = sc5.id_category AND sc5.is_active = 1
                INNER JOIN spy_category sc6 on scn6.fk_category = sc6.id_category AND sc6.is_active = 1
            where scRoot.is_active = 1
                AND scnRoot.is_root = 1
        ) n ON spy_category_node.id_category_node = n.id_category_node
        SET spy_category_node.node_order = n.rbr;

    update spy_category_node
        INNER JOIN
        (
            select scn7.id_category_node, sc7.category_key
                , ROW_NUMBER() over (order by
                    sc1.`position`, sc2.`position`, sc3.`position`, sc4.`position`, sc5.`position`, sc6.`position`, sc7.`position`,
                    sc1.displaysequence, sc2.displaysequence, sc3.displaysequence, sc4.displaysequence, sc5.displaysequence, sc6.displaysequence, sc7.displaysequence,
                    scn1.node_order, scn2.node_order, scn3.node_order, scn4.node_order, scn5.node_order, scn6.node_order, scn7.node_order) + 60000 as rbr
            from spy_category scRoot
                INNER join spy_category_node scnRoot on scRoot.id_category = scnRoot.fk_category
                INNER JOIN spy_category_node scn1 on scRoot.id_category = scn1.fk_parent_category_node
                INNER JOIN spy_category_node scn2 on scn1.fk_category = scn2.fk_parent_category_node
                INNER JOIN spy_category_node scn3 on scn2.fk_category = scn3.fk_parent_category_node
                INNER JOIN spy_category_node scn4 on scn3.fk_category = scn4.fk_parent_category_node
                INNER JOIN spy_category_node scn5 on scn4.fk_category = scn5.fk_parent_category_node
                INNER JOIN spy_category_node scn6 on scn5.fk_category = scn6.fk_parent_category_node
                INNER JOIN spy_category_node scn7 on scn6.fk_category = scn7.fk_parent_category_node
                INNER JOIN spy_category sc1 on scn1.fk_category = sc1.id_category AND sc1.is_active = 1
                INNER JOIN spy_category sc2 on scn2.fk_category = sc2.id_category AND sc2.is_active = 1
                INNER JOIN spy_category sc3 on scn3.fk_category = sc3.id_category AND sc3.is_active = 1
                INNER JOIN spy_category sc4 on scn4.fk_category = sc4.id_category AND sc4.is_active = 1
                INNER JOIN spy_category sc5 on scn5.fk_category = sc5.id_category AND sc5.is_active = 1
                INNER JOIN spy_category sc6 on scn6.fk_category = sc6.id_category AND sc6.is_active = 1
                INNER JOIN spy_category sc7 on scn7.fk_category = sc7.id_category AND sc7.is_active = 1
            where scRoot.is_active = 1
                AND scnRoot.is_root = 1
        ) n ON spy_category_node.id_category_node = n.id_category_node
        SET spy_category_node.node_order = n.rbr;

    UPDATE spy_navigation_node snn
        INNER JOIN spy_navigation_node_localized_attributes snnla on snn.id_navigation_node = snnla.fk_navigation_node
        INNER JOIN spy_url su on snnla.fk_url = su.id_url
        INNER JOIN spy_category_node scn on su.fk_resource_categorynode = scn.id_category_node
        INNER JOIN spy_category sc ON scn.fk_category = sc.id_category
        SET snn.`position` = scn.node_order,
            snn.is_active = 1
    WHERE sc.is_active = 1;

    UPDATE spy_navigation_node snn
        INNER JOIN spy_navigation_node_localized_attributes snnla on snn.id_navigation_node = snnla.fk_navigation_node
        INNER JOIN spy_url su on snnla.fk_url = su.id_url
        LEFT OUTER JOIN spy_category_node scn on su.fk_resource_categorynode = scn.id_category_node
        LEFT OUTER JOIN spy_category sc ON scn.fk_category = sc.id_category
        SET snn.is_active = sc.is_active
    WHERE snn.node_type = 'category'
      AND (sc.id_category IS NULL OR snn.is_active <> sc.is_active);

END;

