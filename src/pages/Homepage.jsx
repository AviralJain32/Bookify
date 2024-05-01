import React, { useState } from 'react'
import { useEffect } from 'react'
import { useFirebase } from '../context/firebase'
import Card from '../components/Card';
import { CardGroup } from 'react-bootstrap';



const Homepage = () => {
    const firebase=useFirebase();
    const [books, setbooks] = useState([])
    useEffect(()=>{
        firebase.listAllBooks().then((books)=>setbooks(books.docs))
    },[])
  return (
    <div className='container mt-5' >
      {books.map((book)=>(
        <CardGroup key={book.id}>
        <Card  id={book.id} link={`/book/view/${book.id}`} {...book.data()}/>
        </CardGroup>
      ))}
    </div>
  )
}

export default Homepage
