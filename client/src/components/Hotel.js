import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './componentscss/plane.css'; //traincss and hotelcss extends planecss 

const Hotel = ({ company, location, price, onClick, onDelete }) => {
    return (
        <Card className='hotel-card'>
            <Card.Body>
                <Card.Title className='hotel-title'>At {location}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted hotel-company'>{company}</Card.Subtitle>
                <Card.Text className='hotel-price'>
                    Price: <strong>${price}</strong>
                </Card.Text>
                <div className='button-group'>
                    <Button variant='primary' onClick={onClick}>Update</Button>
                    <Button variant='danger' onClick={onDelete}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Hotel;