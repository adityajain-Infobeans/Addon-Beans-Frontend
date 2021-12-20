FROM node:lts-alpine
RUN set -eux \
    & apk add \
        --no-cache \
        nodejs \
        yarn
WORKDIR /app
COPY package.json ./
RUN  yarn install
EXPOSE 8080
CMD ["yarn", "serve"]


# docker-compose up # to start the compilation process
# to install npm package run
# docker-compose exec web npm i bootstrap