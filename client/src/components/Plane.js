import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './componentscss/plane.css'; 

const Plane = ({ company, destination, price, onClick, onDelete }) => {
    return (
        <Card className='plane-card'>
            <Card.Body>
                <Card.Title className='plane-title'>To {destination}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted plane-company'>{company}</Card.Subtitle>
                <Card.Text className='plane-price'>
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

export default Plane;
