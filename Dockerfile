# Using Alpine linux to save some space
# This is a minimal image, containing everything a usual 
# design studio needs.
FROM node:20-alpine
MAINTAINER Tamas Kecskes <tamas.kecskes@vanderbilt.edu>

RUN apk update
RUN apk add --no-cache make g++ git python3 py3-pip py3-setuptools
RUN pip3 install webgme-bindings

RUN mkdir /usr/app

WORKDIR /usr/app

# copy app source
ADD . /usr/app/

# Install node-modules
RUN npm install -g npm@latest
RUN npm cache clean --force
RUN npm install --force --no-package-lock

CMD ["node", "app.js"]