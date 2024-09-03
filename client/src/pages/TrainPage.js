import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth'
import Train from '../components/Train'
import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import '../pagescss/planepage.css' //trainpagecss and hotelpagecss extends planepagecss





const Loggedin = () => {
    const [trains, setTrains] = useState([])
    const [show, setShow] = useState(false)
    const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm()
    const [ trainId, setTrainId ] = useState(0)

    useEffect(
        () => {
            fetch('/train/trains')
                .then(res => res.json())
                .then(data => {
                    setTrains(data)
                })
                .catch(err => console.log(err))
        }, []
    );


    const closeModal = () => {
        setShow(false)
    }

    const showModal = (id) => {
        setShow(true)
        setTrainId(id)
        trains.map(
            (train) => {
                if (train.id === id) {
                    setValue('company', train.company)
                    setValue('destination', train.destination)
                    setValue('price', train.price)
                }
            }
        )
    }

    let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

    const updateTrain = (data) => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }

        fetch(`/train/${trainId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const deleteTrain = (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            }
        }
        fetch(`/train/${id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="container-train">
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Train
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
                            <Button variant="primary" onClick={handleSubmit(updateTrain)}>
                                Save
                            </Button>
                        </Form.Group>
                    </form>
                </Modal.Body>
            </Modal>
            <h1 className="heading">List of Trains</h1>
            {
                trains.map(
                    (train) => (
                        <Train
                            key={train.id}
                            company={train.company}
                            destination={train.destination}
                            price={train.price}
                            onClick={() => { showModal(train.id) }}
                            onDelete={() => { deleteTrain(train.id) }}
                        />
                    )
                )
            }
        </div>
    )




}

const Loggedout = () => {
    return(
        <div className="container-train">
            <h1 className="heading">Welcome to flights</h1>
            <Link to='/signup' className="btn btn-primary btn-lg">Get Started</Link>
        </div>
    )
}
const TrainPage = () => {

    const [logged] = useAuth()
    return (
        <div className='root-train'>
            {logged ? <Loggedin /> : <Loggedout />}
        </div>
    )
}

export default TrainPage