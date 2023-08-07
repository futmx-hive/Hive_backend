FROM node:16-alpine as builder
WORKDIR /be
ARG pkg='package.json'
COPY ${pkg} .
RUN yarn install
COPY . .
FROM node:16-alpine as runner
WORKDIR /be1
ENV NODE_ENV=production
COPY --from=builder /be1/package.json .
COPY --from=builder /be1/.env .
COPY --from=builder /be1/yarn.lock .
COPY --from=builder /be1/tsconfig.json .
COPY --from=builder /be1/dist .
COPY --from=builder /be1/node_modules .
RUN yarn install
COPY . .
EXPOSE 3000

CMD [ "npm","run","start" ]