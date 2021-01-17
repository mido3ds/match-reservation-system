# Install Requirements
`yarn install`

# Start Server
`yarn run start`

# Env Variables
- To enable all loggers (see [morgan](https://github.com/expressjs/morgan)): `export DEBUG=app:*`

# Start Mongo (docker)
`./mongo_start`

You must have docker and be able to run it without sudo.
See https://docs.docker.com/engine/install/linux-postinstall/

# Mongo Client (docker)
`./mongo_client`

# Fill Mongo
```
pip3 install bcrypt pymongo
./mongo_fill
```

pass `--help` for more options
