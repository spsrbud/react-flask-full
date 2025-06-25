# Build frontend image
podman build -t nginx-img -f ./nginx/Dockerfile .

# Build REST API image
podman build -t backend-api-img ./backend-api

# Build WebSocket image
podman build -t backend-websocket-img ./backend-websocket
