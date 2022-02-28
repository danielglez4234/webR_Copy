FROM mysql:5.6

ADD 01_mm-create.sql /docker-entrypoint-initdb.d
ADD 02_mm-scheme.sql /docker-entrypoint-initdb.d
ADD 03_mm-data.sql /docker-entrypoint-initdb.d

EXPOSE 3306
