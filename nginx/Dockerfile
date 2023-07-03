FROM registry.hub.docker.com/library/nginx:latest

COPY /ssl/certs/localhost.crt /etc/ssl/certs/localhost.crt
COPY /ssl/keys/localhost.key /etc/ssl/private/localhost.key
COPY /config/nginx.conf /etc/nginx/nginx.conf
COPY /config/default.conf /etc/nginx/conf.d/default.conf