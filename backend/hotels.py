from flask_restx import Namespace, Resource, fields
from models import Hotel
from flask_jwt_extended import jwt_required
from flask import request

hotel_ns = Namespace('hotel', description="A namespace for Hotels")

hotel_model = hotel_ns.model(
    "Hotel",
    {
        "id": fields.Integer(),
        "company": fields.String(),
        "location": fields.String(),
        "price": fields.Integer()
    }
)

@hotel_ns.route('/hotels')
class HotelsResource(Resource):
    
    @hotel_ns.marshal_list_with(hotel_model)
    def get(self):
        hotels = Hotel.query.all()
        return hotels
    
    @hotel_ns.marshal_with(hotel_model)
    @hotel_ns.expect(hotel_model)
    @jwt_required()
    def post(self):
        data = request.get_json()

        new_hotel = Hotel(
            company=data.get('company'),
            location=data.get('location'),
            price=data.get('price')
        )

        new_hotel.save()
        return new_hotel, 201

@hotel_ns.route('/<int:id>')
class HotelResource(Resource):

    @hotel_ns.marshal_with(hotel_model)
    def get(self, id):
        hotel = Hotel.query.get_or_404(id)
        return hotel
    
    @hotel_ns.marshal_with(hotel_model)
    @jwt_required()
    def put(self, id):
        hotel_to_update = Hotel.query.get_or_404(id)

        data = request.get_json()
        hotel_to_update.update(
            company=data.get('company'),
            location=data.get('location'),
            price=data.get('price')
        )

        return hotel_to_update
    
    @hotel_ns.marshal_with(hotel_model)
    @jwt_required()
    def delete(self, id):
        hotel_to_delete = Hotel.query.get_or_404(id)
        hotel_to_delete.delete()
        return hotel_to_delete
