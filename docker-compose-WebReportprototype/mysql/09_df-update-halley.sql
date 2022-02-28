USE datafactory;

ALTER TABLE header DROP COLUMN id_header_definition;
ALTER TABLE header CHANGE COLUMN  string_value value_string varchar(255);
ALTER TABLE header CHANGE COLUMN  long_value value_long varchar(255);
ALTER TABLE header CHANGE COLUMN  double_value value_double varchar(255);
ALTER TABLE header CHANGE COLUMN   order_keyword  `order` int;
ALTER TABLE header ADD COLUMN `type` enum('LONG','STRING','DOUBLE','BOOL') DEFAULT NULL;
ALTER TABLE header ADD COLUMN `name` varchar(72) NOT NULL;

ALTER TABLE header_definition DROP COLUMN id_observation_mode;
ALTER TABLE header_definition ADD `id_camera` int(11) NOT NULL DEFAULT '0';



