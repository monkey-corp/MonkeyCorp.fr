#!/bin/bash

COMPOSE_PROD='docker-compose.prod.yml'
COMPOSE_DEV='docker-compose.dev.yml'

if [[ -z $1 ]]; then
    echo No argument given
    exit 1
fi

if [ "$1" = 'prod' ]; then

    command="docker compose -f $COMPOSE_PROD"

elif [ "$1" = 'dev' ]; then

    command="docker compose -f $COMPOSE_DEV"

elif [ "$1" = 'test' ]; then

    echo "WARNING: Running the test suite will erase db-dev's data"
    # TODO add site test
    command="docker compose -f $COMPOSE_DEV down -v && docker compose -f $COMPOSE_DEV run --build api-dev npm run test"

else

    echo Wrong argument given: "'"$1"'"
    exit 2

fi

shift
command="$command $@"

echo Running: "$command"
# exec $command
bash -c "$command"
