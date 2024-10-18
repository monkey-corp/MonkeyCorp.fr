FROM mysql:9.1.0

ENV MYSQL_ROOT_HOST='%'
ENV MYSQL_DATABASE=monkey-corp-com

# Run the database creation scipt
COPY ./create.sql /docker-entrypoint-initdb.d/AAAAA_create.sql
