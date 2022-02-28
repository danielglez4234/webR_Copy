create database monitormanager;
CREATE USER 'mmuser'@'%' IDENTIFIED BY 'gtcmysqlbdd';
grant all privileges on monitormanager.* to 'mmuser'@'%';
