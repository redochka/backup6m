FROM node:12.19.0-buster-slim

RUN apt-get update
RUN apt-get install -y mariadb-client

WORKDIR /app

COPY . ./

RUN npm install
CMD npm start
