USE datafactory;

ALTER TABLE `frame` ADD `file_name` VARCHAR(255) NOT NULL;
ALTER TABLE `frame` ADD `number_extensions` INT(11) NOT NULL;
ALTER TABLE `frame` ADD `number_frame` INT(25) NOT NULL;
ALTER TABLE `frame` ADD `version` INT(11) DEFAULT '0';
ALTER TABLE `frame` DROP PRIMARY KEY, ADD PRIMARY KEY(`id`,`version`,`observation_date`);

ALTER TABLE `header` ADD `order_keyword` INT(11) NOT NULL;
ALTER TABLE `header` ADD `observation_date` DATE NOT NULL;




