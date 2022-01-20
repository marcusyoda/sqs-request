FROM node:16-alpine

WORKDIR /app

ADD ./src /app/src
ADD ./package.json /app/package.json
ADD ./yarn.lock /app/yarn.lock

RUN yarn install-lock

RUN rm -rf /app/src

CMD ["node" , "/app/lib/index.js"]
