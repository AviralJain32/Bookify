import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';

const ListingPage = () => {

    const firebase=useFirebase()

    const [name, setname] = useState("")
    const [isbnNumber, setIsbnNumber] = useState("")
    const [price, setPrice] = useState("")
    const [coverPic, setCoverPic] = useState("")

        const handleSubmit=async(e)=>{
            e.preventDefault();
            await firebase.handleCreateNewListing(name,isbnNumber,price,coverPic)

        }

  return (
      <div className='container mt-5'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Book Name</Form.Label>
            <Form.Control   
            onChange={(e)=>setname(e.target.value)}
            value={name}
            type="text" placeholder="Enter Book Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ISBN</Form.Label>
            <Form.Control 
            onChange={(e)=>setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text" placeholder="ISBN Number" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control 
            onChange={(e)=>setPrice(e.target.value)}
            value={price}
            type="text" placeholder="Enter Price" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cover Pic</Form.Label>
            <Form.Control 
            onChange={(e)=>setCoverPic(e.target.files[0])}
            // value={coverPic}
            type="file" />
        </Form.Group>
        <Button onClick={handleSubmit} variant="primary" type="submit">
            Create
        </Button>
        </Form>
    </div>
  )
}

export default ListingPage
