USE datafactory;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_frame` INT(11) DEFAULT NULL,
  `value` text,
  `extension` INT(11) DEFAULT NULL,
  `order_comment` INT(11) DEFAULT NULL,
  `observation_date` DATE NOT NULL DEFAULT '0000-00-00',
  PRIMARY KEY (`id`,`observation_date`),
  UNIQUE KEY `id_frame` (`id_frame`,`order_comment`,`extension`,`observation_date`),
  KEY `frame_index` (`id_frame`)
) ENGINE=InnoDB AUTO_INCREMENT=5610172 DEFAULT CHARSET=latin1;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_frame` INT(11) DEFAULT NULL,
  `value` text,
  `extension` INT(11) DEFAULT NULL,
  `order_history` INT(11) DEFAULT NULL,
  `observation_date` DATE NOT NULL DEFAULT '0000-00-00',
  PRIMARY KEY (`id`,`observation_date`),
  UNIQUE KEY `id_frame` (`id_frame`,`order_history`,`extension`,`observation_date`),
  KEY `frame_index` (`id_frame`)
) ENGINE=InnoDB AUTO_INCREMENT=2683 DEFAULT CHARSET=latin1;

ALTER TABLE `frame` ADD `observation_date_date` DATE NOT NULL;
ALTER TABLE `frame` ADD INDEX frame_date_index(`observation_date_date`,`id_camera`,`id_observation_mode`);
ALTER TABLE `frame` ADD INDEX observation_mode_index(`id_observation_mode`);

ALTER TABLE `header` ADD INDEX header_index_definition(`id_header_definition`);
ALTER TABLE `header` ADD INDEX frame_index(`id_frame`);


