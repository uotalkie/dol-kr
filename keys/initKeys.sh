#!/usr/bin/env bash

# This is for restore JKS from environment.
# Should only be used on CI.

# $KEYSTORE_FILE_B64    : Base64-nized Keystore
# $KEYSTORE_ALIAS       : Key Alias
# $KEYSTORE_STORE_PASS  : Store Password
# $KEYSTORE_KEY_PASS    : Key Password

# Proceed only keystore file environment is defined.
BASE=$(pwd)
KEYS_BASE=$BASE/keys
APP_BASE=$BASE/devTools/androidsdk/image/cordova
PROP_BASE=$APP_BASE/platforms/android
KEYSTORE_FILE_NAME=keystore.jks
KEYSTORE_FILE_PATH=$APP_BASE/$KEYSTORE_FILE_NAME
KEYSTORE_DOCKER_PATH=/cordovasrc/$KEYSTORE_FILE_NAME

if [ -z ${KEYSTORE_ALIAS} ]; then
    echo "No keystore configuration found. exiting..."

    # Fix issue with build config
    echo "{}" > $APP_BASE/build.json
    exit 0;
fi

# Save key to keystore.
echo -n $KEYSTORE_FILE_B64 | base64 -d > $KEYSTORE_FILE_PATH

# Debug sigining key property
cat << EOF > $PROP_BASE/debug-signing.properties
storeFile=${KEYSTORE_DOCKER_PATH}
storeType=jks
keyAlias=${KEYSTORE_ALIAS}
keyPassword=${KEYSTORE_KEY_PASS}
storePassword=${KEYSTORE_STORE_PASS}
EOF

# Release sigining key property
cat << EOF > $PROP_BASE/release-signing.properties
storeFile=${KEYSTORE_DOCKER_PATH}
storeType=jks
keyAlias=${KEYSTORE_ALIAS}
keyPassword=${KEYSTORE_KEY_PASS}
storePassword=${KEYSTORE_STORE_PASS}
EOF

# build.json signing key
cat << EOF > $APP_BASE/build.json
{
    "android": {
        "debug": {
            "keystore": "${KEYSTORE_DOCKER_PATH}",
            "storePassword": "${KEYSTORE_STORE_PASS}",
            "alias": "${KEYSTORE_ALIAS}",
            "password" : "${KEYSTORE_KEY_PASS}",
            "keystoreType": "jks",
            "packageType": "apk"
        },
        "release": {
            "keystore": "${KEYSTORE_DOCKER_PATH}",
            "storePassword": "${KEYSTORE_STORE_PASS}",
            "alias": "${KEYSTORE_ALIAS}",
            "password" : "${KEYSTORE_KEY_PASS}",
            "keystoreType": "jks",
            "packageType": "apk"
        }
    }
}
EOF


# Make fake keystore for new apk CI build (bypass keystore check)
ABS_KEYSTORE_FILE_PATH=$KEYS_BASE/dol.keystore
echo -n $KEYSTORE_FILE_B64 | base64 -d > $ABS_KEYSTORE_FILE_PATH

# make new apk build.json for CI
NEW_APP_BASE=$BASE/devTools/apkbuilder
cat << EOF > $NEW_APP_BASE/build.json
{
    "android": {
        "debug": {
            "keystore": "${ABS_KEYSTORE_FILE_PATH}",
            "storePassword": "${KEYSTORE_STORE_PASS}",
            "alias": "${KEYSTORE_ALIAS}",
            "password" : "${KEYSTORE_KEY_PASS}",
            "keystoreType": "jks",
            "packageType": "apk"
        },
        "release": {
            "keystore": "${ABS_KEYSTORE_FILE_PATH}",
            "storePassword": "${KEYSTORE_STORE_PASS}",
            "alias": "${KEYSTORE_ALIAS}",
            "password" : "${KEYSTORE_KEY_PASS}",
            "keystoreType": "jks",
            "packageType": "apk"
        }
    }
}
EOF
