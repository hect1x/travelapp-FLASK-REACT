import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth'
import Plane from '../components/Plane'
import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import '../pagescss/planepage.css'





const Loggedin = () => {
    const [planes, setPlanes] = useState([])
    const [show, setShow] = useState(false)
    const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm()
    const [ planeId, setPlaneId ] = useState(0)

    useEffect(
        () => {
            fetch('/plane/planes')
                .then(res => res.json())
                .then(data => {
                    setPlanes(data)
                })
                .catch(err => console.log(err))
        }, []
    );


    const closeModal = () => {
        setShow(false)
    }

    const showModal = (id) => {
        setShow(true)
        setPlaneId(id)
        planes.map(
            (plane) => {
                if (plane.id === id) {
                    setValue('company', plane.company)
                    setValue('destination', plane.destination)
                    setValue('price', plane.price)
                }
            }
        )
    }

    let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

    const updatePlane = (data) => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }

        fetch(`/plane/${planeId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const deletePlane = (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            }
        }
        fetch(`/plane/${id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="container-plane">
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Plane
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
                            <Form.Label>Destination</Form.Label>
                            <Form.Control as="textarea" rows={5}
                                {...register('destination', { required: true, maxLength: 255 })}
                            />
                        </Form.Group>
                        {errors.destination && <p style={{ color: 'red' }}><small>Destination is required</small></p>}
                        {errors.destination?.type === "maxLength" && <p style={{ color: 'red' }}>
                            <small>Destination should be less than 255 characters</small>
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
                            <Button variant="primary" onClick={handleSubmit(updatePlane)}>
                                Save
                            </Button>
                        </Form.Group>
                    </form>
                </Modal.Body>
            </Modal>
            <h1 className="heading">List of Planes</h1>
            {
                planes.map(
                    (plane) => (
                        <Plane
                            key={plane.id}
                            company={plane.company}
                            destination={plane.destination}
                            price={plane.price}
                            onClick={() => { showModal(plane.id) }}
                            onDelete={() => { deletePlane(plane.id) }}
                        />
                    )
                )
            }
        </div>
    )




}

const Loggedout = () => {
    return(
        <div className="container-plane">
            <h1 className="heading">Welcome to flights</h1>
            <Link to='/signup' className="btn btn-primary btn-lg">Get Started</Link>
        </div>
    )
}
const PlanePage = () => {

    const [logged] = useAuth()
    return (
        <div className='root-plane'>
            {logged ? <Loggedin /> : <Loggedout />}
        </div>
    )
}

export default PlanePage