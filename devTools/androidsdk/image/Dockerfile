# This can potentially be further concised or optimized, but it works for now
FROM node:buster

# This way we can build with jdk-8 while on a newer image
RUN apt install -y wget apt-transport-https
RUN mkdir -p /etc/apt/keyrings
RUN wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | tee /etc/apt/keyrings/adoptium.asc
RUN echo "deb [signed-by=/etc/apt/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list
RUN apt-get update
RUN apt install -y temurin-8-jdk


# Add backports to make it easier to install npm
# RUN echo "deb http://deb.debian.org/debian buster-backports main" > /etc/apt/sources.list.d/buster-backports.list
RUN \
apt-get update && \
apt-get install -y --no-install-recommends \
    lib32stdc++6 lib32z1 \
    gradle \
    unzip

WORKDIR /tmp
ENV ANDROID_HOME /usr/local/android-sdk-linux
ENV ANDROID_SDK_ROOT ${ANDROID_HOME}
ENV PATH $PATH:$ANDROID_HOME/cmdline-tools/latest/bin
ADD commandlinetools-linux-6609375_latest.zip /tmp/
RUN unzip /tmp/commandlinetools-linux-6609375_latest.zip
RUN mkdir -p ${ANDROID_HOME}/cmdline-tools/
RUN mv /tmp/tools/ ${ANDROID_HOME}/cmdline-tools/latest/

RUN yes | sdkmanager --licenses
RUN sdkmanager "platforms;android-28" "build-tools;29.0.2"

VOLUME [ "/src" ]
COPY "cordova" "/cordovasrc"

WORKDIR "/cordovasrc"
RUN npm ci
RUN npm run env -- cordova telemetry off
RUN npm run build-debug-ci

