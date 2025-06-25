from flask import Flask
from flask_socketio import SocketIO, emit
import signal
import sys
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# WebSocket events
@socketio.on('connect')
def on_connect():
    logging.info("WebSocket client connected")
    emit('server_message', {'data': 'Welcome WebSocket client!'})

@socketio.on('disconnect')
def on_disconnect():
    logging.info("WebSocket client disconnected")

@socketio.on('client_message')
def handle_client_message(message):
    logging.info(f"Received message from client: {message}")
    emit('server_message', {'data': f"Echo: {message['data']}"}, broadcast=True)

def signal_handler(signum, frame):
    print("Received shutdown signal, shutting down gracefully...")
    socketio.stop()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
