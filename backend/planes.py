from flask_restx import Namespace, Resource, fields
from models import Plane
from flask_jwt_extended import jwt_required
from flask import request

plane_ns = Namespace('plane', description="A namespace for Planes")

plane_model = plane_ns.model(
    "Plane",
    {
        "id": fields.Integer(),
        "company": fields.String(),
        "destination": fields.String(),
        "price": fields.Integer()
    }
)

@plane_ns.route('/planes')
class PlanesResource(Resource):
    
    @plane_ns.marshal_list_with(plane_model) 
    def get(self):
        """Get all planes"""
        planes = Plane.query.all()
        return planes
    
    @plane_ns.marshal_with(plane_model) 
    @plane_ns.expect(plane_model)  
    @jwt_required()
    def post(self):
        """Create a new Plane"""
        data = request.get_json()
        new_plane = Plane(
            company=data.get('company'),
            destination=data.get('destination'),
            price=data.get('price')
        )
        new_plane.save()
        return new_plane, 201

@plane_ns.route('/<int:id>')
class PlaneResource(Resource):

    @plane_ns.marshal_with(plane_model) 
    def get(self, id):
        """Get specific plane by id"""
        plane = Plane.query.get_or_404(id)
        return plane
    
    @plane_ns.marshal_with(plane_model) 
    @jwt_required()
    def put(self, id):
        """Update specific plane by id"""
        plane_to_update = Plane.query.get_or_404(id)
        data = request.get_json()
        plane_to_update.update(
            company=data.get('company'),
            destination=data.get('destination'),
            price=data.get('price')
        )
        return plane_to_update
    
    @plane_ns.marshal_with(plane_model)  
    @jwt_required()
    def delete(self, id):
        """Delete specific plane by id"""
        plane_to_delete = Plane.query.get_or_404(id)
        plane_to_delete.delete()
        return plane_to_delete
