#!/bin/sh

docker run \
  -p 5432:5432 \
  -v /tmp/rants-data:/var/lib/postgresql/data \
  -e POSTGRES_USER=rant \
  -e POSTGRES_PASSWORD=rantrantrant \
  postgres
