from flask_restx import Namespace, Resource, fields
from models import Train
from flask_jwt_extended import jwt_required
from flask import request

train_ns = Namespace('train', description="A namespace for Trains")

train_model = train_ns.model(
    "Train",
    {
        "id": fields.Integer(),
        "company": fields.String(),
        "destination": fields.String(),
        "price": fields.Integer()
    }
)

@train_ns.route('/trains')
class TrainsResource(Resource):
    
    @train_ns.marshal_list_with(train_model)
    def get(self):
        """Get all trains"""
        trains = Train.query.all()
        return trains
    
    @train_ns.marshal_with(train_model)
    @train_ns.expect(train_model)  
    @jwt_required()
    def post(self):
        """Create a new Train"""
        data = request.get_json()
        new_train = Train(
            company=data.get('company'),
            destination=data.get('destination'),
            price=data.get('price')
        )
        new_train.save()
        return new_train, 201

@train_ns.route('/<int:id>')
class TrainResource(Resource):

    @train_ns.marshal_with(train_model) 
    def get(self, id):
        """Get specific train by id"""
        train = Train.query.get_or_404(id)
        return train
    
    @train_ns.marshal_with(train_model)  
    @jwt_required()
    def put(self, id):
        """Update specific train by id"""
        train_to_update = Train.query.get_or_404(id)
        data = request.get_json()
        train_to_update.update(
            company=data.get('company'),
            destination=data.get('destination'),
            price=data.get('price')
        )
        return train_to_update
    
    @train_ns.marshal_with(train_model) 
    @jwt_required()
    def delete(self, id):
        """Delete specific train by id"""
        train_to_delete = Train.query.get_or_404(id)
        train_to_delete.delete()
        return train_to_delete
