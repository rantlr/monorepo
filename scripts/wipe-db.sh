#!/bin/sh

scripts_dir="$(dirname "$0")"

"$scripts_dir"/run-psql.sh \
  -f /tmp/sql/drop-tables.sql
