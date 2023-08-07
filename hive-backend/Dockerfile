FROM node:16-alpine
WORKDIR /be
ARG pkg='package.json'
COPY ${pkg} .
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "npm","run","start:dev" ]