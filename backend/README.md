$ export DEBUG=app:*
$ export app_password=
$ export app_token=
$ DEBUG=app:* nodemon index.js

# Install Requirements
`yarn install`

# Start Server
`yarn run start`

# Start Mongo (docker)
`./mongo_start`

You must have docker and be able to run it without sudo.
See https://docs.docker.com/engine/install/linux-postinstall/

# Mongo Client (docker)
`./mongo_client`