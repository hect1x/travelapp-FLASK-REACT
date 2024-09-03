import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './componentscss/plane.css'; //traincss and hotelcss extends planecss 

const Train = ({ company, destination, price, onClick, onDelete }) => {
    return (
        <Card className='train-card'>
            <Card.Body>
                <Card.Title className='train-title'>To {destination}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted train-company'>{company}</Card.Subtitle>
                <Card.Text className='train-price'>
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

export default Train;
