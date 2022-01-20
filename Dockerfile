FROM node:16-alpine

ADD ./node_modules /node_modules
ADD ./lib /lib

CMD ["node" , "/lib/main.js"]
