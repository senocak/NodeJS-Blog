/*
    This file was automatically generated by Studio 3T.

    MongoDB Source Collection: `nodejs.kategori`

    Warnings about type conversion issues are stored as comments above the
    corresponding INSERT statement of each document.
*/


SET NAMES 'utf8' COLLATE 'utf8_general_ci';

DROP TABLE IF EXISTS `kategori`;
CREATE TABLE `kategori` (
    `__v` INTEGER,
    `_id` VARBINARY(12) NOT NULL,
    `baslik` LONGTEXT,
    `resim` LONGTEXT,
    `tarih` DATETIME,
    `url` LONGTEXT,
    PRIMARY KEY (`_id`)
) CHARSET=utf8;

INSERT INTO `kategori` (`__v`, `_id`, `baslik`, `resim`, `tarih`, `url`)
    VALUES
        (0, x'5CB9BB7AB9ACDA2D6CF92B32', 'Dimebag Darrell', 'dimebag-darrell.jpg', '2019-04-20 14:01:28.115000', 'dimebag-darrell');
INSERT INTO `kategori` (`__v`, `_id`, `baslik`, `resim`, `tarih`, `url`)
    VALUES
        (0, x'5CB9BB7AB9ACDA2D6CF92B33', 'Zakk Wylde', 'zakk-wylde.jpg', '2019-04-20 14:01:28.117000', 'zakk-wylde');
