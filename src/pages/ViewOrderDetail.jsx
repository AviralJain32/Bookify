import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/firebase';
const ViewOrderDetail = () => {
    const firebase=useFirebase();
    const params=useParams();
    const [order, setOrder] = useState([])
    console.log(params);
    useEffect(()=>{
        firebase.getOrders(params.bookId).then(orders=>setOrder(orders.docs))
    },[])
  return (
    <div className='container'>
      <h1>Orders</h1>
      <div>{
        order.map(order=>{
            const data=order.data();
            console.log(data);
            return (
                <div key={order.id} className='mt-5' style={{border:"1px solid" , padding:"1px"}}>
                <h3>Order By: {data.displayName}</h3>
                <h4>Quantity : {data.quantity}</h4>
                <h5>Email : {data.userEmail}</h5>
                </div>
            )
        })
        }</div>
    </div>
  )
}

export default ViewOrderDetail
