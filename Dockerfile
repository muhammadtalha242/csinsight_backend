# #will build with production node_modules
# docker build -t hortimod_api . --build-arg BUILD_TYPE=production
# #will build with dev node_modules
# docker build -t hortimod_api . --build-arg BUILD_TYPE=development

ARG BUILD_TYPE=production
FROM node:16.16.0-slim as builder
RUN apt-get update; apt-get -y install build-essential gnupg
RUN npm install -g wait-on typescript bunyan nodemon
WORKDIR /src
COPY ./package*.json ./
RUN npm install

FROM node:16.16.0-slim
WORKDIR /src
COPY --from=builder /src/node_modules /src/node_modules
COPY . ./
CMD npm run start
EXPOSE 8080