USE datafactory;

--
-- Table structure for table `camera`
--

DROP TABLE IF EXISTS `camera`;
CREATE TABLE `camera` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `instrument` VARCHAR(255) NOT NULL,
  `camera` VARCHAR(255) NOT NULL,
  `gcs_component` VARCHAR(255) NOT NULL,
  `display_name` VARCHAR(255) NOT NULL,
  `archive_directory` VARCHAR(255) NOT NULL,
  `active` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Table structure for table `fitsKeyword_df`
--

DROP TABLE IF EXISTS `fitsKeyword_df`;
CREATE TABLE `fitsKeyword_df` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_observation_mode` INT(11) NOT NULL,
  `store_in_db` tinyint(4) NOT NULL,
  `gather_process` enum('FROM_DAS','FROM_MONITOR','CALCULATED','FROM_SEQUENCE') NOT NULL,
  `gcs_component` VARCHAR(255) DEFAULT NULL,
  `gcs_monitor` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `comment` VARCHAR(255) DEFAULT NULL,
  `data_type` VARCHAR(255) DEFAULT NULL,
  `enum_label` VARCHAR(255) DEFAULT NULL,
  `dfrange` VARCHAR(255) DEFAULT NULL,
  `monitor_type` enum('SAMPLED','DISCRETE') NOT NULL,
  `convertion` enum('RAD_TO_HMS','RAD_TO_DMS','RAD_TO_DEG') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_obsmode` (`id_observation_mode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `frame`
--

DROP TABLE IF EXISTS `frame`;
CREATE TABLE `frame` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_camera` INT(11) NOT NULL,
  `id_observation_mode` INT(11) NOT NULL,
  `observation_date` datetime NOT NULL,
  `observation_date_microsecond` INT(11) NOT NULL,
  `exposition_time` FLOAT NOT NULL,
  `state` VARCHAR(255) NOT NULL,
  `is_raw` tinyint(4) NOT NULL,
  `id_program` VARCHAR(255) NOT NULL,
  `id_observation_block` VARCHAR(255) NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `id_principal_investigator` VARCHAR(255) DEFAULT NULL,
  `radeg` DOUBLE DEFAULT NULL,
  `decdeg` DOUBLE DEFAULT NULL,
  PRIMARY KEY (`id`,`observation_date`),
  KEY `frame_index` (`id_camera`,`id_observation_mode`,`observation_date`,`radeg`,`decdeg`,`exposition_time`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Table structure for table `header`
--

DROP TABLE IF EXISTS `header`;
CREATE TABLE `header` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_header_definition` INT(11) NOT NULL,
  `id_frame` INT(11) NOT NULL,
  `extension` INT(11) NOT NULL,
  `string_value` VARCHAR(255) DEFAULT NULL,
  `long_value` INT(11) DEFAULT NULL,
  `double_value` DOUBLE DEFAULT NULL,
  PRIMARY KEY (`id`,`id_frame`),
  KEY `header_index` (`id_frame`,`id_header_definition`)
) ENGINE=InnoDB AUTO_INCREMENT=16356 DEFAULT CHARSET=latin1;

--
-- Table structure for table `header_definition`
--

DROP TABLE IF EXISTS `header_definition`;
CREATE TABLE `header_definition` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(256) DEFAULT NULL,
  `name` VARCHAR(256) DEFAULT NULL,
  `data_type` VARCHAR(256) DEFAULT NULL,
  `visible` tinyint(1) DEFAULT NULL,
  `id_observation_mode` INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`id_observation_mode`),
  KEY `header_definition_index` (`comment`,`id_observation_mode`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1123 DEFAULT CHARSET=latin1;

--
-- Table structure for table `observation_mode`
--

DROP TABLE IF EXISTS `observation_mode`;
CREATE TABLE `observation_mode` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mode` VARCHAR(255) NOT NULL,
  `id_camera` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `observation_mode_index` (`id_camera`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Table structure for table `observation_result`
--

DROP TABLE IF EXISTS `observation_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `observation_result` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_observation_mode` INT(11) NOT NULL,
  `commit_date` datetime NOT NULL,
  `id_program` VARCHAR(255) DEFAULT NULL,
  `id_observation_block` VARCHAR(255) NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`,`commit_date`),
  KEY `observation_result_index` (`id_observation_mode`,`commit_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `observation_result_frame`
--

DROP TABLE IF EXISTS `observation_result_frame`;
CREATE TABLE `observation_result_frame` (
  `id_observation_result` INT(11) NOT NULL,
  `id_frame` INT(11) NOT NULL,
  PRIMARY KEY (`id_observation_result`,`id_frame`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `reduction_result`
--

DROP TABLE IF EXISTS `reduction_result`;
CREATE TABLE `reduction_result` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_observation_result` INT(11) DEFAULT NULL,
  `reduction_date` datetime NOT NULL,
  `id_program` VARCHAR(255) DEFAULT NULL,
  `id_observation_block` VARCHAR(255) NOT NULL,
  `id_observation_mode` INT(11) NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `qc` enum('QC_GOOD','QC_BAD','QC_PARTIAL','QC_UNKNOWN') NOT NULL DEFAULT 'QC_UNKNOWN',
  PRIMARY KEY (`id`,`reduction_date`),
  KEY `reduction_result_index` (`id_observation_result`,`reduction_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `reduction_result_data`;
CREATE TABLE `reduction_result_data` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  `id_reduction_result` INT(11) NOT NULL,
  `string_value` VARCHAR(255) DEFAULT NULL,
  `long_value` INT(11) DEFAULT NULL,
  `double_value` DOUBLE DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `reduction_result_data_config`;
CREATE TABLE `reduction_result_data_config` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_observation_mode` INT(11) NOT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `filter` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `sequence_table`
--

DROP TABLE IF EXISTS `sequence_table`;
CREATE TABLE `sequence_table` (
  `seq_name` VARCHAR(255) NOT NULL,
  `seq_count` INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `enabled` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `username` VARCHAR(255) NOT NULL,
  `role` INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 
