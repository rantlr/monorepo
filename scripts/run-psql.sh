#!/bin/sh

# Exposes ./sql/ on /tmp/sql in the container and runs psql,
# forwarding all arguments.
# Must be run from the base monorepo directory.

db_container_name="rantlr-postgres"
network_name="rantlr-bridge"

local_base_dirname=$(pwd)
local_sql_dir="$local_base_dirname/sql"
container_sql_dir="/tmp/sql"

docker run \
  -it \
  --rm \
  -v "$local_sql_dir":"$container_sql_dir":ro \
  --network "$network_name" \
  -e PGPASSWORD="rantrantrant" \
  postgres \
  psql \
  -h "$db_container_name" \
  -U rant \
  "$@"
