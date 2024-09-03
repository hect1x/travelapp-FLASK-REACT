from flask_restx import Namespace, Resource, fields
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask import request, jsonify, make_response

auth_ns=Namespace('auth', description="A namespace for our Authentication")

signup_model=auth_ns.model(
    "Signup",
    {
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()
    }
)

login_model=auth_ns.model(
    "Login",
    {
        "username":fields.String(),
        "password":fields.String()
    }
)

@auth_ns.route('/signup')
class SignUp(Resource):

    @auth_ns.expect(signup_model)
    def post(self):
        """Post new user to database"""

        data=request.get_json()
        curr_username = data.get('username')

        db_user=User.query.filter_by(username=curr_username).first()
        if db_user is not None:
            return make_response(jsonify({"message": f"User with username {curr_username} already exists"}), 409) #i tweaked later if signup successful just go home, but if not i send 409 as to make .status_code in react later
        
        new_user=User(
            username=curr_username,
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )

        new_user.save()

        return make_response(jsonify({ "message" : f"User { curr_username } created successfully"}),201)
    

@auth_ns.route("/login")
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        db_user = User.query.filter_by(username=username).first()

        if db_user and check_password_hash(db_user.password, password):

            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)

            return jsonify(
                {"access_token": access_token, "refresh_token": refresh_token}
            )

        else:
            return jsonify({"message": "Invalid username or password"})
        
@auth_ns.route('/refresh')
class RefreshResource(Resource):

    @jwt_required(refresh=True)
    def post(self):

        current_user=get_jwt_identity()

        new_access_token=create_access_token(identity=current_user)

        return make_response (jsonify({
            "access_token":new_access_token
        }), 200)



