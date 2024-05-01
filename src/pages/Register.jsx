import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const register = () => {
  const firebase=useFirebase();
  const [Email, setEmail] = useState("")
  const [Password, setPassword ] = useState("")
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("signing up the user");
    await firebase.signupUserWithEmailAndPassword(Email,Password)
    console.log("Signup Sucess");
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
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            onChange={(e)=>setPassword(e.target.value)}
            value={Password}
            type="password" placeholder="Password" />
        </Form.Group>
        <Button onClick={handleSubmit} variant="primary" type="submit">
            Create Account
        </Button>
        </Form>
    </div>
  )
}

export default register
