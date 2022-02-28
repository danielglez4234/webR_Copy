USE monitormanager;
--
-- Table structure for table `magnitude_description`
--

DROP TABLE IF EXISTS `magnitude_description`;
CREATE TABLE `magnitude_description` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_monitor_component` int(11) NOT NULL,
  `magnitude` varchar(255) NOT NULL,
  `version` varchar(8) NOT NULL,
  `type` varchar(1) NOT NULL,
  `id_magnitude_type` int(11) DEFAULT NULL,
  `default_value` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `MagnitudeUnique` (`id_monitor_component`,`magnitude`,`version`)
) ENGINE=InnoDB AUTO_INCREMENT=6435 DEFAULT CHARSET=latin1;

--
-- Table structure for table `magnitude_type`
--

DROP TABLE IF EXISTS `magnitude_type`;
CREATE TABLE `magnitude_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4867 DEFAULT CHARSET=latin1;

--
-- Table structure for table `magnitude_sample`
--

DROP TABLE IF EXISTS `magnitude_sample`;
CREATE TABLE `magnitude_sample` (
  `time_sample` bigint(20) unsigned NOT NULL,
  `date_sample` date NOT NULL,
  `id_magnitude_description` smallint(5) unsigned NOT NULL,
  `id_magnitude_value` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`date_sample`,`id_magnitude_description`,`time_sample`),
  KEY `id_magnitude_description` (`id_magnitude_description`,`date_sample`,`time_sample`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `magnitude_value`
--

DROP TABLE IF EXISTS `magnitude_value`;
CREATE TABLE `magnitude_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `id_magnitude_type` int(11) DEFAULT NULL,
  `value` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MagnitudeUnique` (`id_magnitude_type`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7432 DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_component`
--

DROP TABLE IF EXISTS `monitor_component`;
CREATE TABLE `monitor_component` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `className` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MagnitudeUnique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1429 DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_config`
--

DROP TABLE IF EXISTS `monitor_config`;
CREATE TABLE `monitor_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storage_period` int(10) unsigned NOT NULL,
  `propagate_period` int(10) unsigned NOT NULL,
  `active` tinyint(1) NOT NULL,
  `persite_by_default` tinyint(1) NOT NULL,
  `epsilon` double NOT NULL,
  `id_monitor_description` int(11) NOT NULL,
  `id_monitor_configuration` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MonitorConfigUnique` (`id_monitor_description`,`id_monitor_configuration`)
) ENGINE=InnoDB AUTO_INCREMENT=112711 DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_configuration`
--

DROP TABLE IF EXISTS `monitor_configuration`;
CREATE TABLE `monitor_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `active` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MonitorConfigUnique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_description`
--

DROP TABLE IF EXISTS `monitor_description`;
CREATE TABLE `monitor_description` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_monitor_component` int(11) NOT NULL,
  `magnitude` varchar(255) NOT NULL,
  `version` varchar(8) NOT NULL,
  `unit` varchar(18) NOT NULL,
  `type` varchar(1) NOT NULL,
  `dimension_x` smallint(5) unsigned NOT NULL,
  `dimension_y` smallint(5) unsigned NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MagnitudeUnique` (`id_monitor_component`,`magnitude`,`version`)
) ENGINE=InnoDB AUTO_INCREMENT=13580 DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_range`
--

DROP TABLE IF EXISTS `monitor_range`;
CREATE TABLE `monitor_range` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `pos` smallint(5) unsigned NOT NULL,
  `max` double DEFAULT NULL,
  `min` double DEFAULT NULL,
  `id_monitor_config` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `monitor_range_index` (`id_monitor_config`,`pos`,`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1052752 DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_sample_array_double`
--

DROP TABLE IF EXISTS `monitor_sample_array_double`;
CREATE TABLE `monitor_sample_array_double` (
  `time_sample` bigint(20) unsigned NOT NULL,
  `date_sample` date NOT NULL,
  `pos` smallint(5) unsigned NOT NULL,
  `id_monitor_description` smallint(5) unsigned NOT NULL,
  `value` double NOT NULL,
  PRIMARY KEY (`date_sample`,`id_monitor_description`,`time_sample`,`pos`),
  KEY `id_monitor_description` (`id_monitor_description`,`date_sample`,`time_sample`,`pos`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_sample_array_float`
--

DROP TABLE IF EXISTS `monitor_sample_array_float`;
CREATE TABLE `monitor_sample_array_float` (
  `time_sample` bigint(20) unsigned NOT NULL,
  `date_sample` date NOT NULL,
  `pos` smallint(5) unsigned NOT NULL,
  `id_monitor_description` smallint(5) unsigned NOT NULL,
  `value` float NOT NULL,
  PRIMARY KEY (`date_sample`,`id_monitor_description`,`time_sample`,`pos`),
  KEY `id_monitor_description` (`id_monitor_description`,`date_sample`,`time_sample`,`pos`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_sample_array_long`
--

DROP TABLE IF EXISTS `monitor_sample_array_long`;
CREATE TABLE `monitor_sample_array_long` (
  `time_sample` bigint(20) unsigned NOT NULL,
  `date_sample` date NOT NULL,
  `pos` smallint(5) unsigned NOT NULL,
  `id_monitor_description` smallint(5) unsigned NOT NULL,
  `value` bigint(20) NOT NULL,
  PRIMARY KEY (`date_sample`,`id_monitor_description`,`time_sample`,`pos`),
  KEY `id_monitor_description` (`id_monitor_description`,`date_sample`,`time_sample`,`pos`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_sample_array_octet`
--

DROP TABLE IF EXISTS `monitor_sample_array_octet`;
CREATE TABLE `monitor_sample_array_octet` (
  `time_sample` bigint(20) unsigned NOT NULL,
  `date_sample` date NOT NULL,
  `pos` smallint(5) unsigned NOT NULL,
  `id_monitor_description` smallint(5) unsigned NOT NULL,
  `value` tinyint(4) NOT NULL,
  PRIMARY KEY (`date_sample`,`id_monitor_description`,`time_sample`,`pos`),
  KEY `id_monitor_description` (`id_monitor_description`,`date_sample`,`time_sample`,`pos`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_sample_array_short`
--

DROP TABLE IF EXISTS `monitor_sample_array_short`;
CREATE TABLE `monitor_sample_array_short` (
  `time_sample` bigint(20) unsigned NOT NULL,
  `date_sample` date NOT NULL,
  `pos` smallint(5) unsigned NOT NULL,
  `id_monitor_description` smallint(5) unsigned NOT NULL,
  `value` smallint(6) NOT NULL,
  PRIMARY KEY (`date_sample`,`id_monitor_description`,`time_sample`,`pos`),
  KEY `id_monitor_description` (`id_monitor_description`,`date_sample`,`time_sample`,`pos`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_sample_double`
--

DROP TABLE IF EXISTS `monitor_sample_double`;
CREATE TABLE `monitor_sample_double` (
  `time_sample` bigint(20) unsigned NOT NULL,
  `date_sample` date NOT NULL,
  `id_monitor_description` smallint(5) unsigned NOT NULL,
  `value` double NOT NULL,
  PRIMARY KEY (`date_sample`,`id_monitor_description`,`time_sample`),
  KEY `id_monitor_description` (`id_monitor_description`,`date_sample`,`time_sample`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_sample_float`
--

DROP TABLE IF EXISTS `monitor_sample_float`;
CREATE TABLE `monitor_sample_float` (
  `time_sample` bigint(20) unsigned NOT NULL,
  `date_sample` date NOT NULL,
  `id_monitor_description` smallint(5) unsigned NOT NULL,
  `value` float NOT NULL,
  PRIMARY KEY (`date_sample`,`id_monitor_description`,`time_sample`),
  KEY `id_monitor_description` (`id_monitor_description`,`date_sample`,`time_sample`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_sample_long`
--

DROP TABLE IF EXISTS `monitor_sample_long`;
CREATE TABLE `monitor_sample_long` (
  `time_sample` bigint(20) unsigned NOT NULL,
  `date_sample` date NOT NULL,
  `id_monitor_description` smallint(5) unsigned NOT NULL,
  `value` bigint(20) NOT NULL,
  PRIMARY KEY (`date_sample`,`id_monitor_description`,`time_sample`),
  KEY `id_monitor_description` (`id_monitor_description`,`date_sample`,`time_sample`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_sample_octet`
--

DROP TABLE IF EXISTS `monitor_sample_octet`;
CREATE TABLE `monitor_sample_octet` (
  `time_sample` bigint(20) unsigned NOT NULL,
  `date_sample` date NOT NULL,
  `id_monitor_description` smallint(5) unsigned NOT NULL,
  `value` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`date_sample`,`id_monitor_description`,`time_sample`),
  KEY `id_monitor_description` (`id_monitor_description`,`date_sample`,`time_sample`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `monitor_sample_short`
--

DROP TABLE IF EXISTS `monitor_sample_short`;
CREATE TABLE `monitor_sample_short` (
  `time_sample` bigint(20) unsigned NOT NULL,
  `date_sample` date NOT NULL,
  `id_monitor_description` int(11) NOT NULL,
  `value` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`date_sample`,`id_monitor_description`,`time_sample`),
  KEY `id_monitor_description` (`id_monitor_description`,`date_sample`,`time_sample`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `state_sample`
--

DROP TABLE IF EXISTS `state_sample`;
CREATE TABLE `state_sample` (
  `time_sample` bigint(20) NOT NULL,
  `date_sample` date NOT NULL,
  `id_monitor_component` int(11) NOT NULL,
  `id_state_value` int(11) NOT NULL,
  PRIMARY KEY (`date_sample`,`id_monitor_component`,`time_sample`),
  KEY `date_sample` (`date_sample`,`id_monitor_component`,`time_sample`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `state_value`
--

DROP TABLE IF EXISTS `state_value`;
CREATE TABLE `state_value` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `StateUnique` (`name`,`value`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
