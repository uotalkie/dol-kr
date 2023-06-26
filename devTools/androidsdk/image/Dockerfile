# IMPORTANT: this is the last debian version to support jdk8
# As android studio *still* requires 8, be sure to continue using debian:stretch
FROM node:14-bullseye

# Use bash as default shell
SHELL ["/bin/bash", "-c"] 

# Add backports to make it easier to install npm
# RUN echo "deb http://deb.debian.org/debian buster-backports main" > /etc/apt/sources.list.d/buster-backports.list
RUN \
apt-get update && \
apt-get upgrade -y && \
apt-get install -y --no-install-recommends \
    lib32stdc++6 lib32z1 \
    zip unzip

# Set java and gradle version
ENV JAVA_VERSION 8.0.372-tem
ENV GRADLE_VERSION 4.10.3
# Install it with sdkman
RUN \
curl -s "https://get.sdkman.io" | bash && \
source "$HOME/.sdkman/bin/sdkman-init.sh" && \
sdk install java ${JAVA_VERSION} && sdk default java ${JAVA_VERSION} && sdk use java ${JAVA_VERSION} && \
sdk install gradle ${GRADLE_VERSION} && sdk default gradle ${GRADLE_VERSION} && sdk use gradle ${GRADLE_VERSION}
ENV JAVA_HOME /root/.sdkman/candidates/java/current

WORKDIR /tmp
ENV ANDROID_HOME /usr/local/android-sdk-linux
ENV ANDROID_SDK_ROOT ${ANDROID_HOME}
ENV PATH $PATH:$ANDROID_HOME/cmdline-tools/latest/bin:/root/.sdkman/candidates/java/current/bin:/root/.sdkman/candidates/gradle/current/bin
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