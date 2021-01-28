#/bin/bash

# For OSX
realpath() {
	[[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}

name='crc_keycloak'
command="start $name"
script=$(realpath -s $0)
scriptdir=$(dirname $script)

# If container doesn't exist yet
if ! docker ps --format '{{.Names}}' -a | grep -w $name &> /dev/null
then
  docker run \
    --name $name \
    -p 8180:8080 \
    -e KEYCLOAK_USER=admin \
    -e KEYCLOAK_PASSWORD=admin \
    -e DB_VENDOR=h2 \
    -v $scriptdir/realm_export.json:/tmp/realm_export.json \
    -d \
    jboss/keycloak \
    -Dkeycloak.migration.action=import \
    -Dkeycloak.migration.provider=singleFile \
    -Dkeycloak.migration.file=/tmp/realm_export.json \
    -Dkeycloak.migration.strategy=OVERWRITE_EXISTING
else
  docker start $name
fi

