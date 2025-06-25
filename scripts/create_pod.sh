# Create pod
podman pod create --name myapp -p 3000:3000 -p 5000:5000 -p 5001:5001

podman network create react-flask-net
