import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/firebase'
import BookCard from '../components/Card';


const ViewOrder = () => {
    const firebase=useFirebase();
    const [books, setBooks] = useState([])
    useEffect(()=>{
       
        if(firebase.isloggedin){
            firebase.fetchMyBooks(firebase.user.uid)?.then((books)=>setBooks(books.docs));
        }
    },[firebase])

    if(!firebase.isloggedin) return <h1>Please log in</h1>
  return (
    <div>
      {
        books.map(book=>(
        <BookCard key={book.id} id={book.id} link={`/book/orders/${book.id}`} {...book.data()}></BookCard>))
      }
    </div>
  )
}

export default ViewOrder
