from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

class HelloAPI(Resource):
    def get(self):
        return {"message": "Hello from Flask REST API"}

api.add_resource(HelloAPI, "/api/hello")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
