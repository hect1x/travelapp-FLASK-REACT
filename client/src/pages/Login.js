import React, { useState } from 'react'
import { Form,Button } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../auth'
import { useNavigate } from 'react-router-dom'
import '../pagescss/login.css'
const LoginPage = () => {

    const { register, handleSubmit, watch, reset, formState: { errors } } =useForm()

    const navigate = useNavigate()

    const loginUser = (data) =>{
        console.log(data)

        const requestOptions={
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        }

        fetch('/auth/login', requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            login(data.access_token)
            console.log(data.access_token)
            navigate('/')
        })

        reset()
    }

    return(
        <div className="container">
            <div className='form'>
                <h1>Login Page</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                         type="text"
                         placeholder="Your username"
                         {...register("username", {required:true, maxLength:25})}
                         ></Form.Control>
                    </Form.Group>
                    {errors.username && <p style={{ color: "red" }}><small>Username is required</small></p>}
                    {errors.username?.type === "maxLength" && <p style={{ color: "red" }}><small>Username max length is 25</small></p>}
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                         type="password"
                         placeholder="Your password"
                         {...register("password", {required:true, minLength:8})}
                          ></Form.Control>
                    </Form.Group>
                    {errors.password && <p style={{ color: "red" }}><small>Password required</small></p>}
                    {errors.password?.type === "minLength" && <p style={{ color: "red" }}><small>Password min length is 8</small></p>}
                    <Form.Group>
                        <Button as="sub" variant='primary' onClick={ handleSubmit(loginUser) } >
                            Login
                        </Button>
                    </Form.Group>

                    <Form.Group>
                        <small>Dont have an account? <Link to="/signup">Create One</Link> </small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default LoginPage