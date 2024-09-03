import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth'
import Hotel from '../components/Hotel'
import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import '../pagescss/planepage.css' //trainpagecss and hotelpagecss extends planepagecss





const Loggedin = () => {
    const [hotels, setHotels] = useState([])
    const [show, setShow] = useState(false)
    const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm()
    const [ hotelId, setHotelId ] = useState(0)

    useEffect(
        () => {
            fetch('/hotel/hotels')
                .then(res => res.json())
                .then(data => {
                    setHotels(data)
                })
                .catch(err => console.log(err))
        }, []
    );


    const closeModal = () => {
        setShow(false)
    }

    const showModal = (id) => {
        setShow(true)
        setHotelId(id)
        hotels.map(
            (hotel) => {
                if (hotel.id === id) {
                    setValue('company', hotel.company)
                    setValue('location', hotel.location)
                    setValue('price', hotel.price)
                }
            }
        )
    }

    let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

    const updateHotel = (data) => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }

        fetch(`/hotel/${hotelId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const deleteHotel = (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            }
        }
        fetch(`/hotel/${id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="container-hotel">
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Hotel
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Form.Group>
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="text"
                                {...register('company', { required: true, maxLength: 25 })}
                            />
                        </Form.Group>
                        {errors.company && <p style={{ color: 'red' }}><small>Company name is required</small></p>}
                        {errors.company?.type === "maxLength" && <p style={{ color: 'red' }}>
                            <small>Company name should be less than 25 characters</small>
                        </p>}
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control as="textarea" rows={5}
                                {...register('location', { required: true, maxLength: 255 })}
                            />
                        </Form.Group>
                        {errors.location && <p style={{ color: 'red' }}><small>Location is required</small></p>}
                        {errors.location?.type === "maxLength" && <p style={{ color: 'red' }}>
                            <small>Location should be less than 255 characters</small>
                        </p>}
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('price', {
                                    required: true,
                                    pattern: {value: /^[0-9]*$/}
                                })}
                                placeholder="Enter price"
                            />
                        </Form.Group>
                        {errors.price && <p style={{ color: 'red' }}><small>Price is required</small></p>}
                        <Form.Group>
                            <Button variant="primary" onClick={handleSubmit(updateHotel)}>
                                Save
                            </Button>
                        </Form.Group>
                    </form>
                </Modal.Body>
            </Modal>
            <h1 className="heading">List of Hotels</h1>
            {
                hotels.map(
                    (hotel) => (
                        <Hotel
                            key={hotel.id}
                            company={hotel.company}
                            location={hotel.location}
                            price={hotel.price}
                            onClick={() => { showModal(hotel.id) }}
                            onDelete={() => { deleteHotel(hotel.id) }}
                        />
                    )
                )
            }
        </div>
    )




}

const Loggedout = () => {
    return(
        <div className="container-hotel">
            <h1 className="heading">Welcome to hotels</h1>
            <Link to='/signup' className="btn btn-primary btn-lg">Get Started</Link>
        </div>
    )
}
const HotelPage = () => {

    const [logged] = useAuth()
    return (
        <div className='root-hotel'>
            {logged ? <Loggedin /> : <Loggedout />}
        </div>
    )
}

export default HotelPage