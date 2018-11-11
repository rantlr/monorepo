#!/bin/sh

PGPASSWORD=rantrantrant psql -h localhost -p 5432 -U rant "$@"
