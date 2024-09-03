from flask import Flask
from flask_restx import Api
from models import User, Plane, Train, Hotel
from exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from auth import auth_ns
from planes import plane_ns
from trains import train_ns
from hotels import hotel_ns
from flask_cors import CORS
from config import DevConfig  # Import your config class here

def create_app(config=None):  # Allow None as a default argument
    app = Flask(__name__)

    # If no config is passed, use DevConfig by default
    if config is None:
        config = DevConfig

    app.config.from_object(config)
    CORS(app)
    db.init_app(app)
    migrate = Migrate(app, db)
    JWTManager(app)

    api = Api(app, doc='/docs')

    api.add_namespace(auth_ns)
    api.add_namespace(plane_ns)
    api.add_namespace(train_ns)
    api.add_namespace(hotel_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "User": User,
            "Plane": Plane,
            "Train": Train,
            "Hotel": Hotel,
        }
    
    return app
