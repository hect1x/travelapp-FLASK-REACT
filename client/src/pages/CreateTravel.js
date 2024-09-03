import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import '../pagescss/createtravel.css'

const CreateTravelPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [method, setMethod] = useState('createPlane'); // Default option

    const onSubmit = (data) => {

        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY'); 

        let apiData;
        if (method === 'createPlane') {
            apiData = {
                company: data.company,
                destination: data.destination, 
                price: data.price
            };

            fetch('/plane/planes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${JSON.parse(token)}`
                },
                body: JSON.stringify(apiData),
            })
            .then(response => response.json())
            .then(result => {
                reset();
            })
            .catch(error =>console.error('Error:', error));
           
        } else if (method === 'createTrain') {
            apiData = {
                company: data.company,
                destination: data.destination, 
                price: data.price
            };
            fetch('/train/trains', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${JSON.parse(token)}`
                },
                body: JSON.stringify(apiData),
            })
            .then(response => response.json())
            .then(result => {
                reset();
            })
            .catch(error =>console.error('Error:', error));
            
        } else if (method === 'createHotel') {
            apiData = {
                company: data.company,
                location: data.destination, 
                price: data.price
            };
            fetch('/hotel/hotels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${JSON.parse(token)}`
                },
                body: JSON.stringify(apiData),
            })
            .then(response => response.json())
            .then(result => {
                reset();
            })
            .catch(error =>console.error('Error:', error));
        }
        reset()
    };

    return (
        <div className='container'>
            <h1>Create New Method</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Select Method</Form.Label>
                    <Form.Control
                        as="select"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="createPlane">Create Plane</option>
                        <option value="createTrain">Create Train</option>
                        <option value="createHotel">Create Hotel</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" {...register('company', { required: true, maxLength: 25 })} />
                </Form.Group>
                {errors.company && <p style={{ color: 'red' }}><small>Company name is required</small></p>}
                {errors.company?.type === "maxLength" && <p style={{ color: 'red' }}><small>Company name should be less than 25 characters</small></p>}

                <Form.Group>
                    <Form.Label>Destination or Location</Form.Label>
                    <Form.Control as="textarea" rows={5} {...register('destination', { required: true, maxLength: 255 })} />
                </Form.Group>
                {errors.destination && <p style={{ color: 'red' }}><small>Destination is required</small></p>}
                {errors.destination?.type === "maxLength" && <p style={{ color: 'red' }}><small>Destination should be less than 255 characters</small></p>}

                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('price', {
                            required: true,
                            pattern: { value: /^[0-9]*$/ }
                        })}
                        placeholder="Enter price"
                    />
                </Form.Group>
                {errors.price && <p style={{ color: 'red' }}><small>Price is required</small></p>}

                <Form.Group>
                    <Button variant='primary' type="submit">
                        Save
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default CreateTravelPage;
