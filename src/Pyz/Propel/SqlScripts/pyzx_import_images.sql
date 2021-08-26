delimiter //
create or replace procedure pyzx_import_images(IN url varchar(1000), IN localeName varchar(5))
BEGIN
    DROP TEMPORARY TABLE IF EXISTS tmp_tbl_images;
    CREATE TEMPORARY TABLE tmp_tbl_images (fk_product int, image_name varchar(500), sort_order int);
CREATE INDEX u ON tmp_tbl_images (fk_product, image_name);

DROP TEMPORARY TABLE IF EXISTS tmp_tbl_images_message;
    CREATE TEMPORARY TABLE tmp_tbl_images_message (fk_product int, id_product_image int, image_name varchar(500), publish bit);
CREATE INDEX u ON tmp_tbl_images_message (fk_product, id_product_image);

    DELETE FROM spy_product_image_set_to_product_image
    WHERE id_product_image_set_to_product_image in
      (
          select spistpi.id_product_image_set_to_product_image
          FROM spy_product_image_set spis
              INNER JOIN spy_product_image spi on spi.id_product_image = spis.fk_product_image
          where spi.image_name is null
      );

    DELETE FROM spy_product_image where image_name is null;

SET @max_number_of_images = (SELECT MAX(JSON_LENGTH(`images`, '$.default.images')) FROM spy_product WHERE is_active = 1);
    SET @cur_number_of_images = 0;

    WHILE @cur_number_of_images < @max_number_of_images DO
            INSERT INTO tmp_tbl_images(fk_product, image_name, sort_order)
SELECT id_product,
       JSON_VALUE(`images`,
                  CONCAT('$.default.images[', @cur_number_of_images, ']')
           ),
       @cur_number_of_images
FROM spy_product
WHERE is_active = 1
  AND JSON_VALUE(`images`,
                 CONCAT('$.default.images[', @cur_number_of_images, ']')
    ) IS NOT NULL
  AND images IS NOT NULL;

SET @cur_number_of_images = @cur_number_of_images + 1;
END WHILE;

    /*marking images that needs to be un-publish*/
INSERT INTO tmp_tbl_images_message (fk_product, id_product_image, image_name, publish)
SELECT s.fk_product, s.id_product_image, s.image_name, 0
FROM 	(
            SELECT spis.fk_product, spi.id_product_image, spi.image_name
            FROM spy_product_image_set spis
                     INNER JOIN spy_product_image_set_to_product_image ssss on ssss.fk_product_image_set = spis.id_product_image_set
                     INNER JOIN spy_product_image spi on spi.id_product_image = ssss.fk_product_image
            WHERE spis.fk_product is not null
            UNION
            SELECT sp.id_product, spi.id_product_image, spi.image_name
            FROM spy_product_image_set spis
                     INNER JOIN spy_product sp on sp.fk_product_abstract = spis.fk_product_abstract
                     INNER JOIN spy_product_image_set_to_product_image ssss on ssss.fk_product_image_set = spis.id_product_image_set
                     INNER JOIN spy_product_image spi on spi.id_product_image = ssss.fk_product_image
        ) s
            LEFT OUTER JOIN tmp_tbl_images imp on s.fk_product = imp.fk_product
    AND s.image_name = imp.image_name
WHERE imp.fk_product is null;

DELETE FROM spy_product_image_set_to_product_image
WHERE id_product_image_set_to_product_image in
      (
          select spistpi.id_product_image_set_to_product_image
          FROM spy_product_image_set spis
                   INNER JOIN spy_product_image_set_to_product_image spistpi
                              on spis.id_product_image_set = spistpi.fk_product_image_set
                   INNER JOIN tmp_tbl_images_message ttim
                              on spis.fk_product = ttim.fk_product and spistpi.fk_product_image = ttim.id_product_image
      );

DELETE FROM spy_product_image
WHERE id_product_image in
      (
          select spi.id_product_image
          FROM spy_product_image spi
                   INNER JOIN tmp_tbl_images_message ttim on spi.id_product_image = ttim.id_product_image
      );

/*remove images from import that already exists in DB*/
DELETE imp
    FROM tmp_tbl_images imp
             INNER JOIN spy_product_image_set spis on spis.fk_product = imp.fk_product
             INNER JOIN spy_product_image_set_to_product_image spistpi on spis.id_product_image_set = spistpi.fk_product_image_set
             INNER JOIN spy_product_image spi on spistpi.fk_product_image = spi.id_product_image AND spi.image_name = imp.image_name;

    /*adding new images*/
INSERT INTO spy_product_image (image_name, external_url_large, external_url_small, created_at)
SELECT imp.image_name,
       concat(url, imp.image_name),
       concat(url, imp.image_name),
       now()
FROM tmp_tbl_images imp
         LEFT JOIN spy_product_image spi on imp.image_name = spi.image_name
where spi.image_name is null
GROUP BY imp.image_name
;

/*marking images that needs to be publish*/
INSERT INTO tmp_tbl_images_message (fk_product, id_product_image, image_name, publish)
SELECT imp.fk_product, sps.id_product_image, imp.image_name, 1
FROM tmp_tbl_images imp
         INNER JOIN spy_product_image sps ON imp.image_name = sps.image_name;

select id_locale into @idLocale from spy_locale where locale_name = localeName limit 1;

/*adding rows to spy_product_image_set*/
INSERT INTO spy_product_image_set (fk_locale, fk_product, fk_product_abstract, name, created_at)
SELECT @idLocale, imp.fk_product, sp.fk_product_abstract , 'default', now()
FROM tmp_tbl_images imp
         INNER JOIN spy_product sp on sp.id_product = imp.fk_product
         LEFT OUTER JOIN spy_product_image_set spis on spis.fk_product = imp.fk_product
         LEFT OUTER JOIN spy_product_image_set spis2 on sp.fk_product_abstract = spis.fk_product_abstract
WHERE spis.id_product_image_set is NULL
  AND spis2.id_product_image_set is NULL
GROUP BY imp.fk_product, sp.fk_product_abstract;

/*adding rows to spy_product_image_set_to_product_image*/
INSERT INTO spy_product_image_set_to_product_image (fk_product_image, fk_product_image_set, sort_order)
SELECT spi.id_product_image, spis.id_product_image_set, imp.sort_order
FROM tmp_tbl_images imp
         INNER JOIN spy_product_image_set spis on spis.fk_product = imp.fk_product
         INNER JOIN spy_product_image spi on spi.image_name = imp.image_name
    ON DUPLICATE KEY UPDATE sort_order = imp.sort_order;

SELECT fk_product, fk_product_abstract, publish
FROM (
         SELECT ttim.fk_product,
                ttim.publish,
                sp.fk_product_abstract,
                ROW_NUMBER() over (partition by ttim.fk_product order by ttim.publish desc) as rbr
         FROM tmp_tbl_images_message ttim
                  LEFT OUTER JOIN spy_product sp on ttim.fk_product = sp.id_product
     ) img
WHERE img.rbr = 1;

DROP TEMPORARY TABLE IF EXISTS tmp_tbl_images;
    DROP TEMPORARY TABLE IF EXISTS tmp_tbl_images_message;

END;

