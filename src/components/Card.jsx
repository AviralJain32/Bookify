import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const BookCard = ({name,displayName,price,imageURL,id,link}) => {
    const navigate=useNavigate()
    const firebase=useFirebase()
    const [url, seturl] = useState(null)

    useEffect(()=>{
        firebase.getImageURL(imageURL).then(url=>seturl(url))
    },[])
  return (
    <Card style={{ width: '18rem' ,margin:"1rem"}}>
    <Card.Img variant="top"  src={url} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>
        This book has a title {name} and this book is sold by {displayName} and this book costs {price}
      </Card.Text>
      <Button onClick={e=>navigate(link)} variant="primary">View</Button>
    </Card.Body>
  </Card>
  )
}

export default BookCard
