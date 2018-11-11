#!/bin/sh

dirname=$(dirname $0)
$dirname/psql-docker.sh < $dirname/../sql/tables.sql
