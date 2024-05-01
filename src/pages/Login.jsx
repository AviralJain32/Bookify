import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const firebase=useFirebase();
  const [Email, setEmail] = useState("")
  const [Password, setPassword ] = useState("")
    const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("login the user");
    await firebase.signInUserWithEmailAndPassword(Email,Password)
    console.log("login Sucess");
  }

  useEffect(() => {
    if(firebase.isloggedin){
        navigate("/");
    }
  }, [firebase,navigate])
  return (
    <div className='container mt-5'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control   
            onChange={(e)=>setEmail(e.target.value)}
            value={Email}
            type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            onChange={(e)=>setPassword(e.target.value)}
            value={Password}
            type="password" placeholder="Password" />
        </Form.Group>
        <Button onClick={handleSubmit} variant="primary" type="submit">
            Login
        </Button>
        </Form>
        <h1 className='mt-5 mb-5'>OR</h1>
        <Button variant="danger" onClick={firebase.signInUserWithGoogle}>Sign in with Google</Button>
    </div>
  )
}

export default Login
