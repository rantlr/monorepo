#!/bin/sh
scripts_dir="$(dirname "$0")"
sql_file_name="$1"
container_sql_file_path=/tmp/sql/"$sql_file_name"

"$scripts_dir"/run-psql.sh \
  -f "$container_sql_file_path"
