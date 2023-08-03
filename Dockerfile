FROM node:20-buster

# Initially based upon:
# https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
RUN  apt-get update \
     && apt-get install -y chromium \
     && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm install
RUN node node_modules/.bin/mocha --exit test/*.spec.js
RUN npm ci -production && npm cache clean --force


EXPOSE 3000
CMD [ "node", "app.js" ]