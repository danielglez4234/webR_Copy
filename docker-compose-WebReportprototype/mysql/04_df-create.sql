create database datafactory;
CREATE USER 'dfuser'@'%' IDENTIFIED BY 'gtcmysqlbdd';
grant all privileges on datafactory.* to 'dfuser'@'%';
