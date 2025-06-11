FROM node:22-alpine

RUN apk add --no-cache chromium \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

COPY . .

RUN npm install
RUN node node_modules/.bin/mocha --timeout 100000 --exit test/*.spec.js
RUN npm ci -production && npm cache clean --force


EXPOSE 3000
CMD [ "node", "app.js" ]