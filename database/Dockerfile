ARG DB_NAME="monkey-corp-com"

FROM mysql:9.1.0 AS prod

ARG DB_NAME
ENV MYSQL_DATABASE=$DB_NAME

# Run the database creation scipt
COPY ./create.sql /docker-entrypoint-initdb.d/0_create.sql

FROM mysql:9.1.0 AS test

ARG DB_NAME
ENV MYSQL_DATABASE=$DB_NAME

# Copy prod scripts
COPY --from=prod /docker-entrypoint-initdb.d /docker-entrypoint-initdb.d

# Initialize database
COPY ./insert.sql /docker-entrypoint-initdb.d/1_insert.sql
