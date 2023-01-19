FROM node:alpine

WORKDIR /usr/nodeapp

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]