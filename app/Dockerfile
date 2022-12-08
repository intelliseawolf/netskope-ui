FROM node:current-alpine

WORKDIR /usr/src/app/app

COPY package*.json ./

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

EXPOSE 3000

CMD ["npm", "start"]