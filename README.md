# rantlr.fun

## Set up

I just assume you're on a platform that can run shell scripts, and have Docker installed (`brew cask install docker`)

1. Install dependencies: `yarn`
1. Start a postgres database with Docker: `./scripts/run-pg-docker.sh` (this
   creates and mounts `/tmp/rants` into the container for persistent data)
1. Set up tables etc. in the database: `yarn knex migrate:latest`

## Start the server with save-to-reload

1. `cd server`
2. `nodemon index.js` (if you don't already have `nodemon`, do `yarn global add nodemon`)

## Start the frontend

1. `yarn start`
