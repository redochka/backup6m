FROM node:16-bullseye-slim

RUN apt-get update
RUN apt-get install -y mariadb-client

WORKDIR /app

COPY . ./

RUN npm install
CMD npm start
