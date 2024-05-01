import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/firebase';
import { Button } from 'react-bootstrap';
import Form from "react-bootstrap/Form"

const DetailsPage = () => {
  const params=useParams();
  console.log(params);
  const firebase=useFirebase();
  const [Data, setData] = useState("")
  const [URL, setURL] = useState(null)
  const [qty, setqty] = useState(1)
  useEffect(()=>{
    firebase.getBookById(params.bookID).then(value=>(console.log(value.data()),setData(value.data())))
  },[])

  useEffect(()=>{
    if(Data){
      const imageURL=Data.imageURL;
      firebase.getImageURL(imageURL).then(url=>setURL(url))
    }
  })

  const placeorder=async()=>{
    const result=await firebase.placeOrder(params.bookID,qty)
    console.log("order placed",result);
  }

  if(Data==null) return <h1>Loading... </h1>

  return (
    <div className='container mt-5'>
      <h1>{Data.name}</h1>
      <img src={URL} style={{borderRadius:"10px"}}/>
      <h1>Details</h1>
      <h2>price : Rs. {Data.price}</h2>
      <h2>ISBN number : {Data.isbn}</h2>
      <h1>Owner Details</h1>
      <img src={Data.photoURL?Data.photoURL:""} alt="" />
      <h2>Name :{Data.displayName}</h2>
      <h2>Email : {Data.userEmail}</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Quantity</Form.Label>
            <Form.Control   
            onChange={(e)=>setqty(e.target.value)}
            value={qty}
            type="number" placeholder="Enter quantity" />
        </Form.Group>
      <Button variant='success' onClick={placeorder}>Buy Now</Button>
    </div>
  )
}

export default DetailsPage
