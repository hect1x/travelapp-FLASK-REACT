import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const SignUpPage = () => {

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();

    const [show, setShow] = useState(false)
    const [ serverResponse, setServerResponse ] =useState('')

    const submitForm = (data) => {

        const body = {
            username: data.username,
            email: data.email,
            password: data.password
        }

        if (data.password === data.confirmPassword) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(body)
            }
            fetch('/auth/signup', requestOptions)
                .then(res => res.json())
                .then(data =>{
                    setServerResponse(data.message)
                    setShow(true)
                })
                .catch(err => console.log(err))
            reset()
        }
        else {
            alert("Passwords do not match")
        }


    }


    return (
        <div className="container">
            <div className='form'>

                {show?
                    <>
                        <h1>Sign Up Pages</h1>
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            <Alert.Heading>Successful!</Alert.Heading>
                            <p>
                                { serverResponse }
                            </p>
                        </Alert>
                    </>
                    :
                    <h1>Sign Up Pages</h1>
                }

                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your username"
                            {...register("username", { required: true, maxLength: 25 })}
                        ></Form.Control>
                    </Form.Group>
                    {errors.username && <p style={{ color: "red" }}><small>Username is required</small></p>}
                    {errors.username?.type === "maxLength" && <p style={{ color: "red" }}><small>Username max length is 25</small></p>}
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Your email"
                            {...register("email", { required: true, maxLength: 80 })}
                        ></Form.Control>
                    </Form.Group>
                    {errors.email && <p style={{ color: "red" }}><small>Email is required</small></p>}
                    {errors.email?.type === "maxLength" && <p style={{ color: "red" }}><small>Email max length is 80</small></p>}
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Your password"
                            {...register("password", { required: true, minLength: 8 })}
                        ></Form.Control>
                    </Form.Group>
                    {errors.password && <p style={{ color: "red" }}><small>Password required</small></p>}
                    {errors.password?.type === "minLength" && <p style={{ color: "red" }}><small>Password min length is 8</small></p>}
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Your password"
                            {...register("confirmPassword", { required: true, minLength: 8 })}
                        ></Form.Control>
                    </Form.Group>
                    {errors.confirmPassword && <p style={{ color: "red" }}><small>Password required</small></p>}
                    {errors.confirmPassword?.type === "minLength" && <p style={{ color: "red" }}><small>Password min length is 8</small></p>}
                    <Form.Group>
                        <Button as="sub" variant='primary' onClick={handleSubmit(submitForm)} >
                            Sign Up
                        </Button>
                    </Form.Group>

                    <Form.Group>
                        <small>Already have an account? <Link to="/login">Log In</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage