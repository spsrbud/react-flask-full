# Build stage
FROM docker.io/library/node:18-alpine AS build
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend .
RUN npm run build

# Serve stage
FROM docker.io/library/nginx:alpine
RUN apk add --no-cache bash
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
