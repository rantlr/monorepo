#!/bin/sh

container_name="rantlr-postgres"
network_name="rantlr-bridge"

echo "Creating network $network_name..."
docker network create $network_name
echo "Created network $network_name"

shutdown() {
  echo "Caught SIGINT; removing Docker container $container_name..."
  docker rm $container_name
  echo "Removed container $container_name; removing network $network_name..."
  docker network rm $network_name
  echo "Removed network $network_name"
  exit 0
}

sigint=2
trap shutdown $sigint

docker run \
  --name "$container_name" \
  --network "$network_name" \
  -p 5432:5432 \
  -v /tmp/rants-data:/var/lib/postgresql/data \
  -e POSTGRES_USER=rant \
  -e POSTGRES_PASSWORD=rantrantrant \
  postgres
