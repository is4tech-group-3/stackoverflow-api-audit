FROM node:20.11.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --production

# Bundle app source
COPY . .

EXPOSE 3000

ENV TZ=America/Guatemala
RUN apk add --update tzdata && cp /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone


CMD [ "node", "index.js" ]