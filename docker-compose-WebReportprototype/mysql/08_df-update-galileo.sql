USE datafactory;

ALTER TABLE `reduction_result_data_config` ADD `keyword` VARCHAR(10) DEFAULT NULL;
ALTER TABLE `reduction_result_data_config` ADD `data_type` VARCHAR(25) DEFAULT NULL;


CREATE TABLE `reduction_result_frame` (
  `id_reduction_result` INT(11) NOT NULL,
  `id_frame` INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `header_comment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`,`comment`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `header` ADD `id_header_comment` INT(11) DEFAULT NULL;
