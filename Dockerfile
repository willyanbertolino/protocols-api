# create node image for linux

FROM node:alpine

WORKDIR /usr/nodeapp

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]