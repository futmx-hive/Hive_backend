FROM node:16-alpine
WORKDIR /fe
ARG pkg='package.json'
COPY ${pkg} .
RUN yarn install
COPY . .
EXPOSE 3001
CMD [ "npm","run","dev" ]