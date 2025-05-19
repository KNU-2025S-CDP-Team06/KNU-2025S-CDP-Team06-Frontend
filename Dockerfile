FROM node:23-alpine as build

WORKDIR /app

COPY . .

ARG BACKEND_URL

ARG PROXY_URL

ENV VITE_BACKEND_URL=$BACKEND_URL

ENV VITE_PROXY_URL=$PROXY_URL

RUN npm install

RUN npm run build

FROM node:23-alpine

ARG ALLOW_IMAGE_HOSTNAME

ENV ALLOW_IMAGE_HOSTNAME=$ALLOW_IMAGE_HOSTNAME

RUN apk add --no-cache nginx

WORKDIR /app

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY proxy-server.js .

RUN npm install express request

EXPOSE 80

COPY start.sh .

RUN chmod +x start.sh

CMD ["./start.sh"]