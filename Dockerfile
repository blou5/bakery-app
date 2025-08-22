##### Stage 1: Build Angular Application
FROM node:lts-alpine AS build
WORKDIR /app

# Install brotli once
RUN apk add --no-cache brotli

# Install deps & build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build:prod

# Precompress only text assets inside the browser folder
RUN cd /app/dist && find . -type f -exec brotli {} \;
##### Stage 2: Nginx with HTTP/3 support
FROM ghcr.io/macbre/nginx-http3:latest

# (Optional) ensure default site doesn’t shadow your config
# Not strictly required if you overwrite the same filename,
# but this avoids surprises if the base image changes.
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy Angular app (note the /browser)
COPY --from=build /app/dist/bakery-app/browser /usr/share/nginx/html

# Copy your Nginx configs
COPY ./config/dev/default.conf /etc/nginx/conf.d/default.conf
COPY ./config/prod/compression.conf /etc/nginx/conf.d/compression.conf

# Nginx listens on 80 (and 443 for TLS/HTTP3)
EXPOSE 4200
# EXPOSE 443/tcp
# EXPOSE 443/udp
