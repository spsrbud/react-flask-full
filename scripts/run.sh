# Run REST API container in pod
podman run -d --name backend-api --network react-flask-net -p 5000:80 backend-api-img

# Run WebSocket container in pod
podman run -d --name backend-websocket --network react-flask-net backend-websocket-img

# Run frontend container in pod
podman run -d --name nginx --network react-flask-net -p 3000:80 nginx-img
